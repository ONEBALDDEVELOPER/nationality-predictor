# 🗺️ Nationality Predictor

A simple React web application that predicts a person's nationality based on their first name.  
It uses the [Nationalize.io](https://nationalize.io/) API to return the most likely countries and their probabilities.

---

## 📌 Features
- Predict nationality by entering a first name.
- Displays top country matches with probability scores.
- Responsive, clean UI built with React and Vite.
- Real-time API calls with instant results.

---

## 🛠️ Tech Stack
- **Frontend:** React, Vite
- **Styling:** CSS
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
	1.	Enter a first name into the search box.
	2.	Click Predict.
	3.	View the top predicted nationalities and their probabilities.

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
   
