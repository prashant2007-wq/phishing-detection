# Phishing Detection System - Complete Installation Guide

## 📋 Prerequisites

- Python 3.8 or higher
- Node.js 18 or higher
- npm or yarn package manager
- Git (optional)

---

## 🚀 Quick Setup

### Step 1: Organize Your Project Structure

Reorganize your existing project like this:

```
phishing-detection/
├── backend/                    # Move all existing Flask files here
│   ├── data/
│   │   ├── phishing_urls.csv
│   │   └── clean_data.py
│   ├── model/
│   │   ├── train_model.py
│   │   ├── feature_extraction.py
│   │   └── phishing_model.pkl
│   ├── app.py                  # Updated Flask app (see below)
│   ├── predict.py              # Prediction logic (see below)
│   └── requirements.txt        # Python dependencies
│
└── frontend/                   # New React frontend
    ├── src/
    │   ├── components/
    │   │   ├── AnimatedBackground.tsx
    │   │   ├── Home.tsx
    │   │   ├── Results.tsx
    │   │   ├── About.tsx
    │   │   ├── HowItWorks.tsx
    │   │   └── Navigation.tsx
    │   ├── styles/
    │   │   └── globals.css
    │   ├── App.tsx
    │   └── main.tsx
    ├── index.html
    ├── package.json
    ├── vite.config.ts
    └── tsconfig.json
```

---

## 🔧 Backend Setup (Flask)

### 1. Navigate to backend folder

```bash
cd phishing-detection/backend
```

### 2. Create virtual environment

```bash
# On Windows
python -m venv venv
venv\Scripts\activate

# On macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

### 3. Install Python dependencies

```bash
pip install -r requirements.txt
```

### 4. Replace your `app.py` with the new version

Copy the content from `/setup-instructions/flask-app.py` to your `backend/app.py`

### 5. Update or create `predict.py`

Copy the content from `/setup-instructions/predict.py` to your `backend/predict.py`

**Important:** Adjust the feature extraction in `predict.py` to match exactly what your trained model expects!

### 6. Test the backend

```bash
python app.py
```

You should see:
```
* Running on http://127.0.0.1:5000
```

Test the API:
```bash
curl -X POST http://localhost:5000/api/predict \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com"}'
```

---

## 🎨 Frontend Setup (React)

### 1. Navigate to frontend folder

```bash
cd ../frontend
# or if you're in root: cd phishing-detection/frontend
```

### 2. Create the frontend structure

First, create all the necessary files:

```bash
# Create directories
mkdir -p src/components src/styles

# Copy all the component files from the Figma Make output
# Copy the following files:
# - src/App.tsx
# - src/main.tsx
# - src/components/AnimatedBackground.tsx
# - src/components/Home.tsx
# - src/components/Results.tsx
# - src/components/About.tsx
# - src/components/HowItWorks.tsx
# - src/components/Navigation.tsx
# - src/styles/globals.css
# - index.html
# - package.json (from /setup-instructions/)
# - vite.config.ts (from /setup-instructions/)
```

### 3. Install dependencies

```bash
npm install
```

### 4. Create TypeScript config

Create `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

Create `tsconfig.node.json`:

```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
```

### 5. Start the frontend

```bash
npm run dev
```

You should see:
```
  VITE v5.1.0  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

---

## 🎯 Running Both Together

### Option 1: Using Two Terminals

**Terminal 1 - Backend:**
```bash
cd phishing-detection/backend
source venv/bin/activate  # or venv\Scripts\activate on Windows
python app.py
```

**Terminal 2 - Frontend:**
```bash
cd phishing-detection/frontend
npm run dev
```

Visit: `http://localhost:5173`

### Option 2: Using a Process Manager (Optional)

Install `concurrently`:
```bash
npm install -g concurrently
```

Create `package.json` in root:
```json
{
  "name": "phishing-detection",
  "scripts": {
    "start": "concurrently \"cd backend && python app.py\" \"cd frontend && npm run dev\""
  }
}
```

Run both:
```bash
npm start
```

---

## 🧪 Testing the Integration

1. **Open browser**: Go to `http://localhost:5173`
2. **Enter a URL**: Try `http://192.168.1.1/login@verify.com`
3. **Check results**: Should show phishing detection with features
4. **Check console**: Open browser DevTools to see API calls

---

## 📦 Building for Production

### Build Frontend

```bash
cd frontend
npm run build
```

This creates a `dist` folder with optimized files.

### Serve with Flask (Optional)

Update `backend/app.py`:

```python
from flask import Flask, send_from_directory

app = Flask(__name__, static_folder='../frontend/dist')

@app.route('/')
def serve_frontend():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory(app.static_folder, path)

# ... rest of your API routes
```

---

## 🐛 Troubleshooting

### CORS Errors
Make sure `flask-cors` is installed and enabled in `app.py`

### Model Not Found
Check the path in `predict.py` - adjust `MODEL_PATH` to point to your actual model file

### Port Already in Use
- Backend: Change port in `app.py`: `app.run(port=5001)`
- Frontend: Change port in `vite.config.ts`: `server: { port: 5174 }`

### API Not Responding
- Check if backend is running: `curl http://localhost:5000/api/health`
- Check browser console for errors
- Verify proxy settings in `vite.config.ts`

---

## 📚 Next Steps

1. **Customize Features**: Update `predict.py` to match your exact model features
2. **Add Authentication**: Implement user accounts (optional)
3. **Database Integration**: Store scan history in SQLite/PostgreSQL
4. **Deploy**: Deploy to Heroku, Vercel, or AWS
5. **Add Analytics**: Track usage statistics
6. **Email Reports**: Send scan results via email

---

## 🌐 Deployment Options

### Frontend (Vercel/Netlify)
```bash
cd frontend
npm run build
# Deploy dist folder to Vercel or Netlify
```

### Backend (Heroku)
```bash
cd backend
# Create Procfile
echo "web: gunicorn app:app" > Procfile
# Deploy to Heroku
git init
heroku create your-app-name
git push heroku main
```

---

## 📞 Support

If you encounter issues:
1. Check all file paths are correct
2. Verify Python/Node versions
3. Clear npm cache: `npm cache clean --force`
4. Reinstall dependencies
5. Check browser console and terminal for errors

---

## ✅ Checklist

- [ ] Backend running on port 5000
- [ ] Frontend running on port 5173
- [ ] CORS enabled in Flask
- [ ] Model file exists and loads correctly
- [ ] API endpoint `/api/predict` responds
- [ ] Frontend connects to backend successfully
- [ ] Scan results display correctly

---

Good luck with your project! 🚀
