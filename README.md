🚀 AI-Powered Interview Assistant (Crisp)

A single-page React application that simulates a structured, AI-powered interview platform for full-stack (React/Node) candidates. It manages the entire interview lifecycle — from resume upload to final scoring and historical review.

🎯 Core Features
👤 Interviewee (Candidate Chat)

Resume Upload (PDF/DOCX) with auto data extraction (Name, Email, Phone).

Profile Validation via chatbot prompts.

Timed Interview: 6 structured questions (2 Easy, 2 Medium, 2 Hard).

Answer timers: 20s, 60s, 120s

Auto-submit on timeout

Final Summary: Score + AI-style feedback.

👨‍💼 Interviewer (Dashboard)

Candidate List sorted by score.

Search & Filter by name, email, or status.

Detail View: Profile, score, summary, chat history with per-question scoring.

💾 Data Persistence

Redux Toolkit + redux-persist: Saves full app state in localStorage.

Pause/Resume Support: Resume from last checkpoint with a "Welcome Back" modal.

🛠️ Tech Stack

Frontend: React 18

State Management: Redux Toolkit, React-Redux

Persistence: redux-persist
📂 Project Structure
crisp-interview-assistant/
├── public/                # index.html
├── src/
│   ├── api/               # Mock AI logic
│   ├── components/        # UI components
│   │   ├── IntervieweeTab/
│   │   ├── InterviewerTab/
│   │   └── Shared/
│   │   └── AppLayout.jsx
│   ├── store/             # Redux slices
│   ├── App.jsx
│   └── index.jsx
├── package.json
└── package-lock.json

⚙️ Installation & Setup
# Clone the repo
cd D:\Crisp-Interview-Assistant

# Install dependencies
npm install

# Start dev server (use port 3001 to avoid conflicts)
npm start -- --port 3000
https://inspiring-caramel-d43b4d.netlify.app/

UI Library: Ant Design (antd)

Build Tool: react-scripts
