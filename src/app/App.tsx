import { RouterProvider } from 'react-router';
import { Toaster } from 'sonner';
import { router } from './routes';

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#FFFFFF',
            border: '1px solid #E5E7EB',
            borderRadius: '10px',
            padding: '16px',
            fontFamily: 'Inter, sans-serif'
          },
          className: 'sonner-toast'
        }}
      />
    </>
  );
}
