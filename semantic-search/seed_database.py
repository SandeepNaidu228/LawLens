import json
import os
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure
from dotenv import load_dotenv

load_dotenv()

# Configuration
JSON_FILE_PATH = 'ipc_sections.json'
DATABASE_NAME = 'lawlens'
COLLECTION_NAME = 'ipc_sections'

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/") 

def seed_database():
    print("--- LawLens Database Seeder ---")
    
    if not MONGO_URI:
        print("Error: MONGO_URI not found in .env file.")
        return

    print(f"Using MongoDB URI from .env: {MONGO_URI.split('@')[1] if '@' in MONGO_URI else '...'}...") 
    connection_string = MONGO_URI

    try:
        client = MongoClient(connection_string)
        # The ismaster command is cheap and does not require auth.
        client.admin.command('ismaster')
        print("Connected to MongoDB successfully!")
    except ConnectionFailure as e:
        print(f"Server not available. Error: {e}")
        return
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        return

    db = client[DATABASE_NAME]
    collection = db[COLLECTION_NAME]

    # Load JSON data
    try:
        with open(JSON_FILE_PATH, 'r', encoding='utf-8') as f:
            data = json.load(f)
            print(f"Loaded {len(data)} records from {JSON_FILE_PATH}")
    except FileNotFoundError:
        print(f"Error: {JSON_FILE_PATH} not found.")
        return
    except json.JSONDecodeError:
        print(f"Error: Failed to decode {JSON_FILE_PATH}.")
        return

    # Option to clear existing data
    if collection.count_documents({}) > 0:
        choice = input(f"Collection '{COLLECTION_NAME}' already has {collection.count_documents({})} documents. Clear it? (y/n): ").lower()
        if choice == 'y':
            collection.delete_many({})
            print("Cleared existing data.")
        else:
            print("Appending to existing data.")

    # Insert data
    if data:
        try:
            result = collection.insert_many(data)
            print(f"Successfully inserted {len(result.inserted_ids)} documents into '{DATABASE_NAME}.{COLLECTION_NAME}'.")
        except Exception as e:
            print(f"Error inserting documents: {e}")
    else:
        print("No data to insert.")

    print("Done.")

if __name__ == "__main__":
    seed_database()
