# 💬 ChatKaro - Real-Time Chat Application

ChatKaro is a modern, real-time chat application built for seamless communication. It allows users to create accounts, send and receive messages instantly, and join chat rooms or private conversations.

## Features
- User Authentication (Sign Up, Login, Profile Management)
- Real-time Messaging
- Chat Rooms and Private Conversations
- Responsive Design
- Light/Dark Theme Support

## Project Structure

### Backend
The backend is built with Node.js and Express.js. It handles user authentication, message storage, and real-time communication using WebSockets.

#### Key Directories and Files:
- **`src/index.js`**: Entry point for the backend server.
- **`src/controllers/`**: Contains controllers for handling authentication and messaging logic.
  - `auth.controller.js`
  - `message.controller.js`
- **`src/lib/`**: Utility libraries for database connection, cloudinary integration, and socket handling.
  - `cloudinary.js`
  - `db.js`
  - `socket.js`
  - `utils.js`
- **`src/middleware/`**: Middleware for authentication.
  - `auth.middleware.js`
- **`src/models/`**: Database models for users and messages.
  - `user.model.js`
  - `message.model.js`
- **`src/routes/`**: API routes for authentication and messaging.
  - `auth.route.js`
  - `message.route.js`

### Frontend
The frontend is built with React and Vite. It provides a responsive and interactive user interface.

#### Key Directories and Files:
- **`src/main.jsx`**: Entry point for the React application.
- **`src/components/`**: Reusable UI components.
  - `AuthImagePattern.jsx`
  - `ChatContainer.jsx`
  - `ChatHeader.jsx`
  - `MessageInput.jsx`
  - `Navbar.jsx`
  - `NoChatSelected.jsx`
  - `Sidebar.jsx`
  - `skeletons/`
    - `MessageSkeleton.jsx`
    - `SidebarSkeleton.jsx`
- **`src/pages/`**: Pages for different routes.
  - `HomePage.jsx`
  - `LoginPage.jsx`
  - `ProfilePage.jsx`
  - `SettingsPage.jsx`
  - `SignUpPage.jsx`
- **`src/store/`**: State management using custom hooks.
  - `useAuthStore.js`
  - `useChatStore.js`
  - `useThemeStore.js`
- **`src/lib/`**: Utility libraries for API calls and other helpers.
  - `axios.js`
  - `utils.js`

## Installation

### Prerequisites
- Node.js (v16 or higher)
- npm

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/rohittgupta/Chatkaro-main.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Chatkaro-main
   ```
3. Install dependencies for both backend and frontend:
   ```bash
   cd backend
   npm install
   cd ../frontend
   npm install
   ```
4. Set up environment variables:
   - Create a `.env` file in the `backend` directory and configure the required variables.

5. Start the development servers:
   - Backend:
     ```bash
     cd backend
     npm start
     ```
   - Frontend:
     ```bash
     cd frontend
     npm run dev
     ```
