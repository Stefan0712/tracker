import { Routes, Route, Link, Outlet } from 'react-router-dom';
import Library from './components/Layout/Library/Library';
import { Calendar, Home, List, Settings } from 'lucide-react';
import ManageExercise from './components/Exercise/ManageExercise';
import { ToastProvider } from './context/ToastContext';


const btnStyle = 'w-full h-full items-center justify-center flex flex-col gap-1 text-black/50';

function App() {
  return (
    <ToastProvider>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<div className="p-4">Home Dashboard</div>} /> 
          <Route path="/library" element={<Library />} />
          <Route path="/plan" element={<div className="p-4">Calendar Page</div>} />
          <Route path="/settings" element={<div className="p-4">Settings</div>} />
        </Route>

        <Route path='/exercise/new' element={<ManageExercise /> } />

      </Routes>
    </ToastProvider>
  );
}

export default App;


const MainLayout = () => {

  const buttonText = 'text-sm text-white/50'
  return (
    <div className="min-h-screen text-gray-900 pb-20 bg-slate-850">
      
      <main>
        <Outlet /> 
      </main>

      <nav className="fixed bottom-0 h-[60] w-full bg-main text-white flex justify-around p-3 pb-safe border-t border-white/10">
        <Link to="/" className={btnStyle}>
          <Home className='text-white/50' />
          <span className={buttonText}>Home</span>
        </Link>
        <Link to="/library" className={btnStyle}>
          <List className='text-white/50' />
          <span className={buttonText}>Library</span>
        </Link>
        <Link to="/plan" className={btnStyle}>
          <Calendar className='text-white/50' />
          <span className={buttonText}>Plan</span>
        </Link>
        <Link to="/settings" className={btnStyle}>
          <Settings className='text-white/50' />
          <span className={buttonText}>Settings</span>
        </Link>
      </nav>
    </div>
  );
};
