# Webora Solutions - Frontend

Modern, responsive frontend for the Webora Solutions digital agency, built with React, Vite, and Tailwind CSS. Integrated with a Django REST Framework backend.

## 🚀 Technologies

-   **Framework**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Routing**: [React Router v6](https://reactrouter.com/)
-   **HTTP Client**: [Axios](https://axios-http.com/)
-   **Icons**: [React Icons](https://react-icons.github.io/react-icons/)

## 🛠️ Prerequisites

-   Node.js (v18 or higher)
-   npm (v9 or higher)

## 📦 Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/Vinaypenke01/Webora-Frontend.git
    cd Webora-Frontend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Configure Environment Variables:
    Create a `.env` file in the root directory:
    ```env
    VITE_API_URL=http://localhost:8000/api/v1
    ```

## 🏃‍♂️ Running the Project

### Development Server
Start the development server with hot reload:
```bash
npm run dev
```
Access the app at `http://localhost:5173`.

### Production Build
Build the application for production:
```bash
npm run build
```
Preview the production build:
```bash
npm run preview
```

## 📂 Project Structure

```text
src/
├── assets/         # Static assets (images, logos)
├── components/     # Reusable UI components
│   └── ui/         # Generic UI elements (Buttons, Cards)
├── context/        # React Context (Auth, App State)
├── data/           # Mock data (for static content)
├── hooks/          # Custom React hooks
├── layouts/        # Page layouts (Admin, Public)
├── pages/          # Page components
│   ├── admin/      # Admin dashboard pages
│   └── public/     # Public facing pages
├── routes/         # Router configuration
├── services/       # API integration services
└── utils/          # Helper functions
```

## 🔗 Backend Integration

This frontend is designed to work with the [Webora Backend](https://github.com/Vinaypenke01/WeboraBackend).

-   **API Service**: `src/services/api.js` handles all HTTP requests.
-   **Authentication**: JWT-based auth via `AuthContext`. Tokens are stored in `localStorage`.
-   **Dynamic Data**: Projects, Services, Blogs, Messages, and Settings are fetched from the backend.
-   **Static Data**: Testimonials, Team Members, and Tech Stack are currently static (in `src/data/mockData.js`).
