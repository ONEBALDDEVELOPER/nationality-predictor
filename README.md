# 🗺️ Nationality Predictor

A simple React web application that predicts a person's nationality based on their first name.  
It uses the [Nationalize.io](https://nationalize.io/) API to return the most likely countries and their probabilities.

---

## 📌 Features
- Predict nationality by entering a name.
- Displays the top 3 country matches with flag emoji, country name, and animated probability bars.
- One-click example names to try it instantly.
- Playful UI: animated gradient background, confetti burst on a successful prediction, and a loading spinner while the request is in flight.
- Submit with Enter or the Predict button.
- Friendly error states for empty input or no matches.
- Responsive layout built with React and Vite.

---

## 🛠️ Tech Stack
- **Frontend:** React, Vite
- **Styling:** Plain CSS (custom animations, Google Fonts)
- **API:** [Nationalize.io](https://nationalize.io/) REST API
- **Package Management:** npm

---

## Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/nationality-predictor.git
   cd nationality-predictor
2.	**Install dependencies**
    ```bash
  	npm install
3.  **Run the app**
    ```bash
  	npm run dev
4.  **Open in browser**
    ```bash
  	http://localhost:5173

## 🚀 Usage
	1.	Enter a name into the search box (or click one of the example chips).
	2.	Click Predict, or press Enter.
	3.	View the top 3 predicted nationalities with flags and probabilities.

## 📂 Project Structure 
  nationality-predictor/
│── public/             # Static assets
│── src/
│   ├── App.jsx         # Main UI and API handling
│   ├── main.jsx        # React entry point
│   ├── App.css         # Component styles
│   └── index.css       # Global styles
│── index.html          # Root HTML file
│── package.json        # Project dependencies
│── vite.config.js      # Vite configuration
   
