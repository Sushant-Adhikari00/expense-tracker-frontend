import { useNavigate } from 'react-router-dom';
import { Home, AlertCircle } from 'lucide-react';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-950 flex items-center
                    justify-center px-4">
      <div className="text-center">
        <div className="w-20 h-20 bg-gray-800 rounded-3xl
                        flex items-center justify-center mx-auto mb-6">
          <AlertCircle size={36} className="text-gray-500" />
        </div>

        <h1 className="text-6xl font-bold text-white mb-3">404</h1>
        <p className="text-gray-400 text-lg mb-2">Page not found</p>
        <p className="text-gray-500 text-sm mb-8">
          The page you are looking for does not exist.
        </p>

        <button
          onClick={() => navigate('/dashboard')}
          className="btn-primary mx-auto"
        >
          <Home size={16} />
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;