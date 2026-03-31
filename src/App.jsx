import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster }        from 'react-hot-toast';
import { AuthProvider }   from './context/AuthContext';
import ProtectedRoute     from './components/common/ProtectedRoute';
import LoginPage          from './pages/LoginPage';
import RegisterPage       from './pages/RegisterPage';
import DashboardPage      from './pages/DashboardPage';
import IncomePage         from './pages/IncomePage';
import ExpensePage        from './pages/ExpensePage';
import GoalsPage          from './pages/GoalsPage';
import NotFoundPage       from './pages/NotFoundPage';
import AIPage from './pages/AIPage';

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#111827',
            color:      '#f9fafb',
            border:     '1px solid #1f2937',
            borderRadius: '12px',
            fontSize:   '14px',
          },
          success: {
            iconTheme: { primary: '#10b981', secondary: '#111827' },
          },
          error: {
            iconTheme: { primary: '#ef4444', secondary: '#111827' },
          },
        }}
      />

      <Routes>
        {/* Public */}
        <Route path="/login"    element={<LoginPage    />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected */}
        <Route path="/dashboard" element={
          <ProtectedRoute><DashboardPage /></ProtectedRoute>
        }/>

        <Route path="/ai" element={
          <ProtectedRoute><AIPage /></ProtectedRoute>
        }/>

        <Route path="/income" element={
          <ProtectedRoute><IncomePage /></ProtectedRoute>
        }/>
        <Route path="/expenses" element={
          <ProtectedRoute><ExpensePage /></ProtectedRoute>
        }/>
        <Route path="/goals" element={
          <ProtectedRoute><GoalsPage /></ProtectedRoute>
        }/>

        {/* Redirects */}
        <Route path="/"  element={<Navigate to="/dashboard" replace />} />
        <Route path="*"  element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

export default App;