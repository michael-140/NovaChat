# NovaChat Frontend 🚀

NovaChat is a sleek, AI-powered conversation interface built with **React**. It features a modern "Glassmorphic" UI, dynamic state management, and an interactive sidebar for a professional chat experience.

## ✨ Key Features

### 1. Dynamic Chat Management
- **Chat Histories**: Users can create multiple chat sessions, which are tracked and managed in the global state.
- **Sidebar Controls**: A responsive sidebar that allows users to switch between chats or delete specific histories.
- **Collapsible UI**: The sidebar can be toggled between "Max" and "Min" sizes to optimize screen real estate.

### 2. Intelligent Message Interface
- **Auto-Scrolling**: The chat window automatically scrolls to the latest message whenever a new one is added.
- **Dynamic Topics**: The system automatically generates a chat topic title based on the first few characters of the opening message.
- **Sender Distinction**: Distinct visual styling and icons for "User" vs "Bot" messages.

### 3. Smart Input System
- **Anti-Spam Warning**: Includes a `WarnWindow` component that prevents users from sending new messages while waiting for an AI response.
- **Keyboard Support**: Full support for `Enter` to send and `Escape` to blur the input focus.
- **Validation**: Prevents empty messages from being sent to maintain chat quality.

Adding a New Chat
Users can click the "New Chat" button in the sidebar to reset the workspace. The system automatically generates a temporary topic title based on the first few characters of the user's first message.

## Message Flow
1. Click the ChatBot in the header
2. Enters text in Chat Input.
3. The system validates that the input is not empty and is not waiting message state
4. A "User" message is added to the active history.
5. After a 1-second delay (simulated AI processing), a "Bot" response is appended, and the global chatHistories list is updated.
6. The sidebar will be also updated and append to the new chat history.

        The AI response is "Sorry~ So far AI function does not available!" because the backend and AI model still in progress.

## 🚀 Getting Started

1. **Clone the project**
2. **Install dependencies**: `npm install`
3. **Run the dev server**: `npm run dev`
4. **Open**`http://localhost:5173/`