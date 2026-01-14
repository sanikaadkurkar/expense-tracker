# Expense Tracker Application

A full-stack expense tracker application with user authentication, expense management, and data visualization.

## 🚀 Features

- **User Authentication**: Sign up and login with JWT token-based authentication
- **Expense Management**: Add, view, edit, and delete expenses
- **Data Visualization**: Interactive pie chart showing category-wise expense distribution
- **Modern UI**: Beautiful glassmorphism design with smooth animations
- **Real-time Updates**: Instant feedback on all CRUD operations

## 🛠️ Tech Stack

### Backend
- **Flask**: Python web framework
- **MySQL**: Relational database
- **SQLAlchemy**: ORM for database operations
- **JWT**: JSON Web Tokens for authentication
- **Flask-CORS**: Cross-Origin Resource Sharing

### Frontend
- **React**: UI library
- **Vite**: Build tool and development server
- **React Router**: Client-side routing
- **Axios**: HTTP client
- **Chart.js**: Data visualization
- **CSS**: Custom design system with glassmorphism

## 📋 Prerequisites

- Python 3.8+
- Node.js 16+
- MySQL 8.0+

## ⚙️ Installation & Setup

### 1. Database Setup

First, create the MySQL database:

```bash
# Login to MySQL
mysql -u root -p

# Run the schema file
mysql -u root -p < database/schema.sql
```

Or manually create the database:

```sql
CREATE DATABASE expense_tracker;
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment (optional but recommended)
python -m venv venv
venv\Scripts\activate  # On Windows
# source venv/bin/activate  # On macOS/Linux

# Install dependencies
pip install -r requirements.txt

# Run the Flask server
python run.py
```

The backend will run on `http://localhost:5000`

**Configuration**: You can modify database credentials in `backend/app/config.py` or set environment variables:
- `MYSQL_USER` (default: root)
- `MYSQL_PASSWORD` (default: root)
- `MYSQL_HOST` (default: localhost)
- `MYSQL_DATABASE` (default: expense_tracker)

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Run the development server
npm run dev
```

The frontend will run on `http://localhost:5173`

## 📱 Usage

1. **Sign Up**: Create a new account at `/signup`
2. **Login**: Login with your credentials at `/login`
3. **Dashboard**: View and manage your expenses at `/dashboard`
   - Add new expenses using the form
   - Edit existing expenses by clicking the Edit button
   - Delete expenses by clicking the Delete button
4. **Analytics**: View category-wise distribution at `/analytics`
   - Interactive pie chart
   - Detailed breakdown by category
   - Total spending summary

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user

### Expenses (Protected)
- `GET /api/expenses` - Get all expenses
- `POST /api/expenses` - Create new expense
- `PUT /api/expenses/<id>` - Update expense
- `DELETE /api/expenses/<id>` - Delete expense

### Analytics (Protected)
- `GET /api/analytics/category-distribution` - Get category-wise distribution

## 📂 Project Structure

```
Dost Project/
├── backend/
│   ├── app/
│   │   ├── __init__.py       # Flask app initialization
│   │   ├── config.py         # Configuration
│   │   ├── models.py         # Database models
│   │   ├── auth.py           # Authentication routes
│   │   ├── expenses.py       # Expense routes
│   │   └── analytics.py      # Analytics routes
│   ├── requirements.txt      # Python dependencies
│   └── run.py               # Application entry point
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/           # Page components
│   │   ├── context/         # Auth context
│   │   ├── utils/           # API utilities
│   │   ├── App.jsx          # Main app component
│   │   ├── main.jsx         # Entry point
│   │   └── index.css        # Styles
│   ├── package.json         # npm dependencies
│   └── vite.config.js       # Vite configuration
└── database/
    └── schema.sql           # Database schema
```

## 🎨 Features Showcase

### Authentication System
- Secure password hashing with werkzeug
- JWT token generation and validation
- Protected routes requiring authentication
- Automatic token attachment to API requests

### Expense Categories
- Food & Dining
- Transportation
- Shopping
- Entertainment
- Bills & Utilities
- Healthcare
- Education
- Personal Care
- Travel
- Other

### UI/UX Highlights
- Modern glassmorphism design
- Vibrant gradient color scheme
- Smooth animations and transitions
- Responsive design for all devices
- Interactive data visualization
- Real-time form validation
- Loading states and error handling

## 🔒 Security Features

- Password hashing using werkzeug
- JWT token-based authentication
- Protected API routes
- CORS configuration for secure cross-origin requests
- Input validation on both frontend and backend

## 📝 License

This project is open source and available for educational purposes.


## 📧 Contact

sanikaadkurkar@gmail.com
---

