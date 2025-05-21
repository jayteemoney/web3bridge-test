#  Dynamic Quiz Game

A vibrant, interactive quiz game built using **React**, **Vite**, and **Tailwind CSS**. Designed for speed and engagement, players race against the clock to answer 10 multiple-choice questions across three categories: **Tech**, **Entertainment**, and **Politics**. With real-time scoring and a persistent leaderboard, this is a fast-paced challenge for curious minds.

---

##  Game Overview

Test your knowledge with 10 questions:
- 4 questions from **Tech**
- 3 questions from **Entertainment**
- 3 questions from **Politics**

Each question must be answered within **10 seconds** — or it’s automatically submitted! Your final score is displayed at the end, and if you're among the best, you'll be immortalized in the **Top 5 Leaderboard**!

---

##  Features

-  **Dynamic Questions**: Pulled from a configurable `questions.js` file.
-  **10-Second Timer**: Keeps the game fast-paced and exciting.
-  **Colorful UI**: Responsive design with gradient backgrounds and animations like fade-in, pulse, and bounce.
-  **Score Tracking**: Shows your current score and final result after the quiz.
-  **Leaderboard**: Top 5 high scores saved using browser `localStorage`.
-  **Robust Error Handling**: Handles missing questions, unanswered prompts, and storage edge cases gracefully.

---

## Tech Stack

- **React**: Component-based UI architecture
- **Vite**: Lightning-fast development and build tool
- **Tailwind CSS**: Utility-first CSS for styling
- **JavaScript (ES6+)**: Dynamic logic and state management
- **Local Storage**: Persistent leaderboard data

---

##  Project Structure

dynamic-quiz-game/
├── public/
├── src/
│ ├── assets/ # Images and icons
│ ├── components/ # UI Components ( Quiz, Leaderboard, )
│ ├── data/
│ │ └── questions.js # Source of all quiz questions
│ ├── styles/
│ │ └── index.css # Tailwind CSS setup
│ ├── App.jsx
│ └── main.jsx
├── tailwind.config.js
├── vite.config.js
└── package.json


---

## Getting Started

### Prerequisites

Make sure you have the following installed:

- **Node.js** (v16 or above)
- **npm** or **yarn**

### Installation

```bash
# Clone the repo
git clone https://github.com/jayteemoney/web3bridge-test.git
cd web3bridge-test

# Install dependencies
npm install

# Start development server
npm run dev
