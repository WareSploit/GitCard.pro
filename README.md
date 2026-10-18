# 🚀 GitCard.pro

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-green.svg?style=flat-square)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)

**GitCard.pro** is a minimalist, fast, and stylish web application designed to search and explore GitHub developer profiles. Inspired by the official GitHub UI, it provides a seamless experience to view user statistics, discover top developers, and explore trending profiles.

🔗 **[Live Demo](https://gitcard.pro)** *(Coming soon)*

---

## ✨ Features

- **User Search:** Find any GitHub user by their username and instantly view their stats, bio, and avatar.
- **Top 10 Leaderboard:** A curated list of the most popular and legendary developers on GitHub.
- **Most Viewed (RU Web):** A special section featuring the most searched developers in the Russian-speaking community (e.g., `flowseal`).
- **Interactive Lists:** Click on any user in the leaderboards to instantly render their full profile card.
- **Celebratory Animations:** Custom Canvas-based confetti explosion when viewing the #1 Top Legend profile.
- **Dual-Language Support:** Fully localized in 🇷🇺 Russian and 🇺🇸 English with local storage persistence.
- **Minimalist Dark UI:** A clean, GitHub-inspired dark theme built with pure CSS.
- **Responsive Design:** Works perfectly on both desktop and mobile devices.

## 🛠️ Tech Stack

This project is built with vanilla web technologies. No heavy frameworks, no bundlers—just clean code.

- **HTML5:** Semantic markup and structure.
- **CSS3:** Custom variables, Flexbox, Grid, and keyframe animations.
- **JavaScript (ES6+):** DOM manipulation, asynchronous Fetch API requests, and Canvas API for particle animations.
- **API:** [GitHub REST API](https://docs.github.com/en/rest) for user data.
- **Assets:** Directly fetched via GitHub CDN for avatars and SVG icons.

---

## 📂 Project Structure

```text
gitcard-pro/
├── index.html      # Main HTML structure
├── style.css       # All styling, animations, and layout
├── app.js          # Logic, API calls, translations, and confetti
└── README.md       # Project documentation
