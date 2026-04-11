import { useNavigate } from 'react-router';
import { Home, ArrowLeft } from 'lucide-react';
import { Button } from '../components/Button';

export function NotFound() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] p-4">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-[#2563EB]/10 rounded-[20px] mb-6">
          <span className="text-6xl">🏢</span>
        </div>
        
        <h1 className="text-4xl font-semibold text-[#111827] mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-[#111827] mb-2">Page Not Found</h2>
        <p className="text-[#6B7280] mb-8 max-w-md">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex gap-3 justify-center">
          <Button variant="outline" onClick={() => navigate(-1)}>
            <ArrowLeft size={18} />
            Go Back
          </Button>
          <Button onClick={() => navigate('/')}>
            <Home size={18} />
            Go to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}
