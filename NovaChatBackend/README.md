# 🚀 NovaChat Backend & Protocol Documentation

This document provides a comprehensive technical overview of the NovaChat backend architecture, including API endpoints, WebSocket communication, and data persistence strategies.

---

## 1. System Overview
*   **Environment**: Node.js with Express.js
*   **Real-time Protocol**: Socket.io
*   **Database**: File-based JSON storage (will change later)
*   **Default URL**: `http://localhost:8000`

---

## 2. REST API Reference
All endpoints are prefixed with `/api`.
### **GET /api/chatHistories**
*   **Endpoint**: `http://localhost:8000/api/chatHistories`
*   **Method**: `GET`
*   **Description**: Reads the `chatHistories.json` file and returns the full array of chat sessions.
*   **Constraint**: The request header must include `'Content-Type': 'application/json'`.
*   **Success Response**: `200 OK` with a JSON array of chat objects.
*   **Error Response**: `500 Internal Server Error` with `{Failed to parse chat histories}` or `{Failed to read chat histories}`.

### **POST /api/updateChatHistory**
*   **Endpoint**: `http://localhost:8000/api/updateChatHistory`
*   **Method**: `POST`
*   **Description**: Receives a chat object from the frontend and either updates an existing entry (by ID) or appends a new one to the JSON file.
*   **Constraint**: The request header must include `'Content-Type': 'application/json'`.
*   **Success Response**: `200 OK` with `{message: "Saved successfully"}`.
*   **Error Response**: `500 Internal Server Error` with `{Error saving data}`.

### **DELETE /api/updateChatHistory/:id**
*   **Endpoint**: `http://localhost:8000/api/updateChatHistory/:id`
*   **Method**: `DELETE`
*   **Description**: Removes a specific chat session from the JSON database using its unique ID.
*   **URL Parameters**: `id` (The UUID of the chat to be deleted).
*   **Success Response**: `200 OK` with `{ "message": "Chat deleted successfully" }`.
*   **Error Response**: `500 Internal Server Error` with `{Error deleting data}`.

## 3. WebSocket (Socket.io) Events
Real-time messaging is handled through a bidirectional socket connection.

| Event Name | Direction | Payload | Description |
| :--- | :--- | :--- | :--- |
| `connection` | Client -> Server | N/A | Triggered when the user enters the ChatBot page. |
| `sendMessage` | Client -> Server | `String` | Sends the user's input text to the backend. |
| `messageResponse` | Server -> Client | `String` | Emits the AI-generated reply back to the client. |
| `disconnect` | Client -> Server | N/A | Triggered when the socket connection is closed. |

---

## 4. Data Model (Schema)
To maintain synchronization between the Sidebar and the Chat Window, the following structure is strictly followed:
```javascript
{
  "id": "String (UUID)",       // Unique ID for the chat session
  "topic": "String",           // Truncated first message (sidebar title)
  "content": [                 // Array of message objects
    {
      "id": "String (UUID)",   // Unique ID for the specific message
      "sender": "user" | "bot",// Identifies who sent the message
      "content": "String"      // The actual text of the message
    }
  ]
}
```

## 🚀 Getting Started

1. **Install**: `node js`
2. **Run the dev server**: `run server.js`
3. **Open**`http://localhost:8000/` (see `Hi! Welcome to NovaChat backend server!` mean backend work)