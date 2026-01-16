import pandas as pd
import numpy as np
import re
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# =====================================================
# CONFIGURATION (PUBLIC-SAFE, RELIABLE)
# =====================================================
TOP_K = 5
STRONG_MATCH = 0.35
MODERATE_MATCH = 0.10
MIN_PHRASE_OVERLAP = 0

# Broad, human-centric legal signal words
LEGAL_ACTION_WORDS = [
    "threat", "threaten", "threatening",
    "harm", "hurt", "kill", "beat", "scare", "fear",
    "money", "pay", "payment", "demand", "extort",
    "forgery", "forged", "fake", "cheat", "fraud",
    "message", "messages", "online", "anonymous",
    "force", "abuse", "blackmail", "pressure", "pressuring"
]

# Legal normalization dictionary
LEGAL_SYNONYMS = {
    "threatened": "intimidation",
    "threaten": "intimidation",
    "threatening": "intimidation",
    "demanded": "extortion",
    "demand": "extortion",
    "pay": "money",
    "payment": "money",
    "pressuring": "coercion",
    "pressure": "coercion",
    "hurt": "injury",
    "harm": "injury",
    "kill": "injury",
    "forged": "forgery",
    "signature": "document",
    "online": "communication",
    "message": "communication",
    "messages": "communication",
    "anonymous": "conceal"
}

# =====================================================
# LOAD DATA
# =====================================================
data = pd.read_csv("ipc_dataset_cleaned.csv")

data["ipc_section"] = pd.to_numeric(data["ipc_section"], errors="coerce")
data = data.dropna(subset=["ipc_section"])
data["ipc_section"] = data["ipc_section"].astype(int).astype(str)

# =====================================================
# TEXT PROCESSING
# =====================================================
def clean_text(text):
    text = str(text).lower()
    text = text.replace("’", "'")  # normalize smart quotes
    text = re.sub(r"[^a-z\s]", "", text)
    return text

def normalize_legal_terms(text):
    for k, v in LEGAL_SYNONYMS.items():
        text = text.replace(k, v)
    return text

data["text"] = (
    data["Description"].apply(clean_text).apply(normalize_legal_terms)
    + " "
    + data["Offense"].apply(clean_text).apply(normalize_legal_terms)
)

# Use only real offence sections for matching
ml_data = data[data["Offense"] != "Not Available"].reset_index(drop=True)

# =====================================================
# TF-IDF VECTOR SPACE
# =====================================================
vectorizer = TfidfVectorizer(
    stop_words="english",
    ngram_range=(1, 2),
    max_features=5000
)

tfidf_matrix = vectorizer.fit_transform(ml_data["text"])

# =====================================================
# HELPER FUNCTIONS
# =====================================================
def looks_like_legal_incident(text):
    return any(word in text for word in LEGAL_ACTION_WORDS)

def phrase_overlap(user_text, section_text):
    user_vec = vectorizer.transform([user_text]).toarray()[0]
    sec_vec = vectorizer.transform([section_text]).toarray()[0]
    overlap = (user_vec > 0) & (sec_vec > 0)
    return overlap.sum()

def generate_explanation(user_text, offense_text):
    reasons = []

    if "intimidation" in offense_text:
        reasons.append("The description involves threatening language, which aligns with criminal intimidation.")

    if "extortion" in offense_text or "money" in user_text:
        reasons.append("A demand or pressure involving money is mentioned, which is relevant for extortion-related offences.")

    if "communication" in user_text:
        reasons.append("The incident involves communication such as messages or online interaction.")

    if "forgery" in offense_text:
        reasons.append("The issue involves document or signature misuse, which is associated with forgery offences.")

    if not reasons:
        reasons.append("This section shares legal characteristics with the described situation.")

    return " ".join(reasons)

# =====================================================
# CORE ANALYSIS FUNCTION (PUBLIC-SAFE)
# =====================================================
def analyze_incident(user_input):
    user_input_clean = normalize_legal_terms(clean_text(user_input))

    # Soft domain signal (do NOT hard-block)
    domain_signal = looks_like_legal_incident(user_input_clean)

    user_vector = vectorizer.transform([user_input_clean])
    similarities = cosine_similarity(user_vector, tfidf_matrix)[0]

    top_indices = similarities.argsort()[-TOP_K:][::-1]

    strong_matches = []
    possible_matches = []

    for idx in top_indices:
        score = similarities[idx]
        row = ml_data.iloc[idx]

        overlap = phrase_overlap(user_input_clean, row["text"])

        # Allow threat + money cases even with low phrase overlap (PUBLIC-SAFE RELAXATION)
        threat_money_case = (
            ("intimidation" in user_input_clean or "threat" in user_input_clean)
            and "money" in user_input_clean
        )

        if score < MODERATE_MATCH:
            continue

        if overlap < MIN_PHRASE_OVERLAP and not threat_money_case:
            continue

        explanation = generate_explanation(user_input_clean, row["Offense"].lower())

        result = {
            "ipc_section": row["ipc_section"],
            "offense": row["Offense"],
            "confidence": round(score * 100, 2),
            "explanation": explanation,
            "url": row["URL"],
            "punishment": row["Punishment"],
            "cognizable": row["Cognizable"],
            "bailable": row["Bailable"],
            "court": row["Court"]
        }

        if score >= STRONG_MATCH and domain_signal:
            strong_matches.append(result)
        else:
            possible_matches.append(result)

    if strong_matches:
        return {
            "status": "likely_matches",
            "results": strong_matches,
            "note": "These sections are commonly associated with similar incidents.",
            "disclaimer": "For legal awareness only. Not legal advice."
        }

    if possible_matches:
        return {
            "status": "possible_matches",
            "results": possible_matches,
            "note": "These sections may be relevant based on partial similarity. A legal professional can confirm applicability.",
            "disclaimer": "For legal awareness only. Not legal advice."
        }

    return {
        "status": "no_clear_match",
        "message": "We could not confidently associate this description with specific IPC offences.",
        "suggestion": "Try adding more details such as threats, fear, money demand, or document misuse.",
        "disclaimer": "For legal awareness only. Not legal advice."
    }

# =====================================================
# LOCAL TESTS
# =====================================================
if __name__ == "__main__":
    tests = [
        "Someone sent me messages threatening to harm me if I don’t pay them money.",
        "I received anonymous messages online saying they will hurt my family.",
        "My colleague keeps pressuring me to repay money I borrowed.",
        "Someone forged my signature on a document."
    ]

    for t in tests:
        print("\nINPUT:", t)
        print("OUTPUT:\n", analyze_incident(t))
