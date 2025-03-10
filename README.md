# Internet-in-Russia-WebDev-End-of-Module-Project
This is a simple web project displaying major events in the history of the internet in Russia. The project consists of a frontend (HTML, CSS, JavaScript) and a backend (Node.js, Express) that serves JSON data.
# 📖 Project Overview

This is a simple web project displaying major events in the history of the internet in Russia. The project consists of a **frontend** (HTML, CSS, JavaScript) and a **backend** (Node.js, Express) that serves JSON data.

## Features
- **Dynamic rendering** of events and news using **Handlebars.js**.
- **REST API** serving historical events and news.
- **Responsive design** with a **dashboard** visualization.
- **Accessibility improvements** (Lighthouse validation passed).

---

## 📂 Project Structure
```
/final-project
│── backend/
│   ├── data.json           # Historical events dataset
│   ├── news.json           # News dataset
│   ├── server.js           # Express server
│   ├── package-lock.js     # Auto-generated lock file
│   ├── package.js          # Dependencies and scripts
│── frontend/
│   ├── css/
│   │   ├── style.css       # Styles for the project
│   ├── html/
│   │   ├── index.html      # Main page
│   │   ├── history.html    # Detailed history
│   │   ├── dashboard.html  # Tableau visualization
│   │   ├── news.html       # News page
│   ├── img/
│   │   ├── dashboard.png   # Static image for dashboard fallback
│   ├── js/
│   │   ├── script.js       # Handles main event rendering
│   │   ├── news.js         # Handles news rendering
│   │   ├── script_history.js # Handles history page
│── lighhouse_reports/      # Documentation and reports
│── README.md               # Project documentation (this file)
```

---

## 🚀 How to Run the Project

### **1️⃣ Install dependencies**
Make sure you have **Node.js** installed. Then run:
```sh
npm install
```

### **2️⃣ Start the server**
Run the following command to start the Express server:
```sh
node backend/server.js
```
By default, the server runs on `http://localhost:3000/`

### **3️⃣ Open the frontend**
Simply open `frontend/html/index.html` in your browser. The pages dynamically fetch data from the backend.

---

## 🔗 API Endpoints

The backend serves two main endpoints:

| Method | Endpoint | Description |
|--------|---------|-------------|
| GET    | `/api/events` | Returns a list of historical events |
| GET    | `/api/news` | Returns a list of news articles |
| POST   | `/api/events` | Adds a new historical event (JSON required) |
| POST   | `/api/news` | Adds a new news article (JSON required) |

Example JSON structure for a **news item**:
```json
{
  "year": 2024,
  "title": "New Internet Regulation",
  "description": "A new regulation affecting internet access was introduced.",
  "url": "https://example.com/news"
}
```
- The `url` field is **optional**.

---

## 🛠 Troubleshooting
- If the frontend does **not display data**, make sure the backend is running (`node backend/server.js`).
- If you see **CORS errors**, check your browser's console and ensure API requests are not blocked.
- If the **dashboard visualization is broken**, verify the Tableau embed URL.

---

## 📌 Future Improvements
- Improve CSS styling and UI design.
- Add database storage instead of JSON files.
- Implement **search & filtering** for events.
- Improve deployment options.

---

🎉 **Enjoy exploring the history of the internet!** 🚀

