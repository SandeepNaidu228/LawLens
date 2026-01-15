# LawLens - AI Powered Legal Awareness Platform

LawLens is an AI-powered Indian legal awareness platform designed to help citizens understand their legal rights. It maps natural language incident descriptions to relevant Indian Penal Code (IPC) sections, providing clear, jargon-free explanations.

## Features

-   **AI Incident Analysis**: Describe an incident in plain English to get relevant IPC sections.
-   **Privacy First**: No data storage. Queries are processed statelessly.
-   **IPC Library**: Browse and search the complete Indian Penal Code.
-   **Google Authentication**: Secure, anonymous sign-in to access the dashboard.
-   **Profile Management**: View your account details and usage stats.

## Tech Stack

-   **Frontend**: React, Vite
-   **Styling**: Vanilla CSS, Lucide React (Icons)
-   **Authentication**: Google OAuth 2.0 (`@react-oauth/google`)
-   **Routing**: React Router DOM

## Getting Started

### Prerequisites

-   Node.js (v18+)
-   npm

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/yourusername/LawLens.git
    cd LawLens/frontend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Configure Environment Variables:
    -   Copy `.env.example` to `.env`.
    -   Add your `VITE_GOOGLE_CLIENT_ID`.
    ```bash
    cp .env.example .env
    ```

4.  Run the development server:
    ```bash
    npm run dev
    ```

## Project Structure

```
src/
├── components/
│   └── Layout/          # Sidebar, DashboardLayout
├── context/
│   └── AuthContext.jsx  # Authentication state management
├── pages/
│   ├── Dashboard/       # Dashboard sub-pages (Home, Discover, Profile)
│   ├── LandingPage.jsx  # Public landing page
│   └── SignIn.jsx       # Login page
├── App.jsx              # Main routing configuration
└── main.jsx             # Entry point & Providers
```

## Contributing

1.  Fork the repository.
2.  Create a feature branch (`git checkout -b feature/amazing-feature`).
3.  Commit your changes (`git commit -m 'Add amazing feature'`).
4.  Push to the branch (`git push origin feature/amazing-feature`).
5.  Open a Pull Request.

## License

This project is licensed under the MIT License.
