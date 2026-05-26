# 🌌 AI-Powered Full-Stack Task Dashboard

A premium, futuristic full-stack MERN dashboard application built with modern architecture, fine-grained Role-Based Access Control (RBAC), and real-time AI Insights powered by OpenRouter.

<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f2027,100:2c5364&height=200&section=header&text=AI%20Task%20Dashboard&fontSize=40&fontColor=ffffff&animation=fadeIn" alt="AI Task Dashboard Banner" />
  <br />
  <img src="https://readme-typing-svg.herokuapp.com?font=Orbitron&size=22&duration=3000&color=00F7FF&center=true&vCenter=true&width=600&lines=Role-Based+Task+Management;AI-Powered+Insights;Secure+JWT+Authentication;Enterprise-Grade+Architecture" alt="Typing SVG" />
</div>

---

## 🌟 Key Features

*   **🔐 Secure JWT Authentication:** Robust cookie/token-based authentication with auto-expiration handling and user context preservation.
*   **🛡️ Role-Based Access Control (RBAC):** 
    *   **Admin:** Complete control over tasks, user management, promoting user roles, and advanced insights.
    *   **Manager:** Full CRUD control over tasks (create, assign, update, delete) and dashboard insights.
    *   **User:** Personal task interaction (viewing tasks, updating status) and role-tailored dashboard insights.
*   **🧠 Intelligent AI Insights Engine:** Leverages OpenRouter models (like LLaMA 3.3 70B) to generate actionable insights based on task status, completion metrics, and user roles. 
*   **⚡ Fresh Insight Refreshing:** Instant, cache-busting AI insights with detailed "Powered by" model-attribution tags.
*   **🎨 Premium Glassmorphic UI:** Built using React, TailwindCSS, Framer Motion, and Lucide React icons, offering custom animations and modern responsive designs.

---

## ⚙️ Tech Stack

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | React 19, Vite, TailwindCSS | Ultra-fast client-side builds, glassmorphism design system. |
| **Animation** | Framer Motion | Smooth transitions and state-based page animations. |
| **Backend** | Node.js, Express | Modular, service-oriented API endpoints. |
| **Database** | MongoDB, Mongoose | Scalable Document Database modeling. |
| **Authentication**| JSON Web Tokens (JWT), bcrypt | Secure password hashing and request verification. |
| **AI Integration**| OpenAI SDK + OpenRouter | Custom-engineered prompts dynamically built based on roles. |

---

## 📁 Repository Structure

```text
Dashboard01FullStack/
├── backend/
│   ├── config/          # DB connections
│   ├── controller/      # Route controllers (Auth, Tasks, Admin, AI)
│   ├── middleware/      # Authentication & role verification
│   ├── model/           # Mongoose schemas (User, Task, AIInsight)
│   ├── routers/         # Express API endpoints
│   ├── services/        # Business logic (LLM integrations, AI Prompt builder)
│   ├── app.js           # App setup (CORS, Middlewares)
│   └── server.js        # Entry point
│
└── frontend/
    ├── src/
    │   ├── api/         # Axios configuration & API client services
    │   ├── auth/        # Auth Context and Provider
    │   ├── components/  # Layout elements & UI cards (InsightsCard, TaskList)
    │   ├── Pages/       # Dashboard, Login, Admin, Task pages
    │   └── App.jsx      # Navigation routing
```

---

## 🚀 Setup & Installation

### Prerequisites
*   Node.js (v18+)
*   MongoDB (Local or Atlas Cluster)
*   OpenRouter API Key

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend/` directory:
   ```env
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   OPENROUTER_API_KEY=your_openrouter_api_key
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite dev server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🌐 Deployment Configuration

This project is pre-configured for a split full-stack deployment (e.g., Render/Railway for backend, Vercel/Netlify for frontend):

*   **CORS Enabled:** The backend app automatically supports cross-origin requests.
*   **Dynamic API Switching:** The frontend Axios instance automatically switches to your production backend via the `VITE_API_URL` environment variable:
    *   Set `VITE_API_URL` in your frontend host environment (e.g. `https://your-backend.onrender.com`).
*   **SPA Redirects:** A `vercel.json` file is included in the `frontend` to route all page requests to `index.html` for clean React client-side routing.
