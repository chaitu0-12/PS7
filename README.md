# VisionAI: CIFAKE Image Detector

Welcome to **VisionAI**, a modern and interactive full-stack web application designed to detect whether an image is AI-generated (Fake) or Real. 

This project uses a pre-trained **InceptionV3** Deep Learning model that achieves a ~98% accuracy on the CIFAKE dataset.

---

## 🚀 Project Overview

The project is split into two straightforward parts:

### 1. The Frontend (React + Vite)
- **Location:** The `/frontend` directory.
- **Tech Stack:** React, TypeScript, Vite, Tailwind CSS, Framer Motion, Recharts.
- **What it does:** It provides a beautiful, 3D animated user interface where users can drag and drop images. It connects out to the backend to get a prediction and gracefully displays the result (Is it AI or Real?) and confidence score.

### 2. The Backend (Python Flask API)
- **Location:** The `/backend` directory.
- **Tech Stack:** Python, Flask, TensorFlow (Keras), PIL (Pillow).
- **What it does:** It runs a lightweight local server (usually on `http://localhost:5000`). When the frontend sends an image, the backend resizes the image to 299x299 pixels to match the InceptionV3 requirement, runs it through our `final_inception_model.h5`, and replies with the prediction!

---

## 🛠️ How to Run Locally

To test out this project on your own machine, you need to start **both** the backend and the frontend.

### Step 1: Start the Backend (API)
1. Open up a terminal.
2. Navigate into the backend folder:
   ```bash
   cd backend
   ```
3. Install the required Python packages (only doing this once is enough):
   ```bash
   pip install -r requirements.txt
   ```
4. Start the server!
   ```bash
   python app.py
   ```
   > You should wait until the terminal says "Model loaded successfully!" and "Running on http://127.0.0.1:5000".

### Step 2: Start the Frontend (User Interface)
1. Open a **second** terminal window.
2. Navigate into the frontend folder:
   ```bash
   cd frontend
   ```
3. Install the web packages (only doing this once is enough):
   ```bash
   npm install
   ```
4. Launch the web app:
   ```bash
   npm run dev
   ```
5. It will give you a local URL (like `http://localhost:5173`). Ctrl+Click that link to open it in your browser!

---

## 💡 How It Works (The Workflow)

1. **Upload:** You upload a standard image (JPEG/PNG) on the React Dashboard.
2. **Transfer:** The frontend sends a `POST` network request containing this image to the `/predict` route on our Python Flask Server.
3. **Analyze:** The backend loads the image in memory, resizes it appropriately, and asks the Deep Learning model to guess.
4. **Result:** The backend replies with `"is_ai": true/false` and its confidence percentage (e.g. 99.8%).
5. **Display:** The React dashboard successfully lights up and shows you the final result! 

Good luck, and Happy Hacking!
