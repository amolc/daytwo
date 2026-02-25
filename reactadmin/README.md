# Milkman React Admin Panel

This project is a modern React-based admin panel for the Milkman management system. It was developed to replicate and modernize the original AngularJS-based backend admin panel.



### 1. Scaffolding the Project
The project was initialized using Vite with the React template:
```bash
npm create vite@latest reactadmin -- --template react
cd reactadmin
npm install
```

### 2. Installing Core Dependencies
Essential libraries were added to handle routing, API requests, and styling:
```bash
npm install axios react-router-dom bootstrap
```




## Development Overview

The app was built using **Vite** for a fast development experience and **React** for a robust, component-based architecture. Key architectural decisions include:

- **State Management**: Used React hooks (`useState`, `useEffect`) for localized state management within CRUD components.
- **Routing**: Implemented `react-router-dom` with a `HashRouter` to handle client-side routing, including a `PrivateRoute` component to protect management pages.
- **API Integration**: Used **Axios** with request/response interceptors to handle authentication tokens and automatic logout on session expiration (401 errors).
- **Styling**: Integrated **Bootstrap 5** for a responsive and clean UI, matching the styling of the original project.

## Project Structure

- `src/services/api.js`: Centralized axios configuration for API calls.
- `src/components/Layout.jsx`: Shared navigation and layout component.
- `src/pages/`: Contains all management pages (Staff, Customer, Category, Product, Subscription).
- `src/App.jsx`: Main routing and application structure.

## Initial Creation & Development Phase

The development began by scaffolding a new React project and migrating the existing AngularJS logic.

### 3. Transitioning from AngularJS to React
The development process involved several key steps to ensure feature parity with the original AngularJS admin panel:

- **Authentication Migration**: Replicated the AngularJS token-based login by creating a custom `api.js` service with Axios interceptors. This ensures every request includes the `Authorization` header and handles session expiry automatically.
- **Routing Setup**: Replaced `ngRoute` with `react-router-dom`'s `HashRouter`. Implemented a `PrivateRoute` wrapper to protect management routes, mirroring the access control of the original app.
- **Component Implementation**:
    - **Staff, Customer, Category, Product, Subscription**: Each AngularJS controller and template pair was converted into a functional React component using `useState` for form handling and `useEffect` for data fetching.
    - **Layout**: Created a shared `Layout.jsx` component to provide a consistent navigation bar across all pages.
- **Styling**: Linked Bootstrap 5 in `App.jsx` to maintain the visual design of the original admin panel while removing default Vite styles for a cleaner look.

## Installation & Setup

### Prerequisites

- **Node.js**: Ensure you have Node.js installed.
- **Backend Server**: The Django backend (in the `milkman` folder) must be running on `http://localhost:8000`.

### Steps to Run

1.  **Navigate to the project directory**:
    ```bash
    cd reactadmin
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Start the development server**:
    ```bash
    npm run dev
    ```

4.  **Access the application**:
    Open your browser and navigate to the URL provided by Vite (typically `http://localhost:5173`).

## Backend Configuration (CORS)

The Django backend has been configured to allow requests from this React app. Ensure your `settings.py` includes the following:

- `CORS_ALLOW_ALL_ORIGINS = True`
- `CORS_ALLOW_CREDENTIALS = True`
- Proper `CORS_ALLOW_METHODS` and `CORS_ALLOW_HEADERS`.

## Features

- **Staff Authentication**: Secure login with token persistence in `localStorage`.
- **Staff Management**: View, add, and delete staff members.
- **Customer Management**: Full CRUD for customers.
- **Category Management**: Manage product categories.
- **Product Management**: Manage products with category associations.
- **Subscription Management**: Track and manage customer subscriptions.
