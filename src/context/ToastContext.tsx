import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import ObjectID from "bson-objectid";


export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

export interface ToastContextType {
  addToast: (message: string, type?: Toast['type']) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

interface ToastProviderProps {
  children: ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback((message: string, type: Toast['type'] = 'success') => {
    const id = ObjectID().toHexString();
    
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      removeToast(id);
    }, 3000);
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      
      {/* Global Toast Container */}
      <div className="fixed top-12 right-0 z-50 flex flex-col gap-2 w-screen pointer-events-none px-2 max-h-[50vh] overflow-y-auto overflow-x-hidden ">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            onClick={() => removeToast(toast.id)}
            className={`
              pointer-events-auto p-4 rounded-lg shadow-lg text-white font-medium border border-white/10
              transform transition-all duration-300 animate-fade-in cursor-pointer
              hover:opacity-90 active:scale-[0.98] select-none
              ${toast.type === 'error' ? 'bg-rose-500' : ''}
              ${toast.type === 'success' ? 'bg-green-600' : ''}
              ${toast.type === 'info' ? 'bg-zinc-800' : ''}
            `}
            role="button"
            title="Click to dismiss"
          >
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};