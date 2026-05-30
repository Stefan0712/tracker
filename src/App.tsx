import { Routes, Route, Link, Outlet } from 'react-router-dom';
import Library from './components/Layout/Library';
import { Calendar, Home, List, Settings } from 'lucide-react';
import ManageExercise from './components/Exercise/ManageExercise';


const btnStyle = 'w-full h-full items-center justify-center flex flex-col gap-1 text-black/50';

function App() {
  return (
    <Routes>

      <Route element={<MainLayout />}>
        <Route index element={<div className="p-4">Home Dashboard</div>} /> 
        <Route path="/library" element={<Library />} />
        <Route path="/plan" element={<div className="p-4">Calendar Page</div>} />
        <Route path="/settings" element={<div className="p-4">Settings</div>} />
      </Route>

      <Route path="/active" element={<ActiveWorkout />} />
      <Route path='/exercise/new' element={<ManageExercise /> } />

    </Routes>
  );
}

export default App;


const MainLayout = () => {
  return (
    <div className="min-h-screen text-gray-900 pb-20 bg-slate-850">
      
      <main>
        <Outlet /> 
      </main>

      <nav className="fixed bottom-0 w-full bg-white border-t border-gray-200 flex justify-around p-3 pb-safe">
        <Link to="/" className={btnStyle}>
          <Home />
          <span className="text-sm">Home</span>
        </Link>
        <Link to="/library" className={btnStyle}>
          <List />
          <span className="text-sm">Library</span>
        </Link>
        <Link to="/plan" className={btnStyle}>
          <Calendar />
          <span className="text-sm">Plan</span>
        </Link>
        <Link to="/settings" className={btnStyle}>
          <Settings />
          <span className="text-sm">Settings</span>
        </Link>
      </nav>
    </div>
  );
};

const ActiveWorkout = () => (
  <div className="min-h-screen bg-gray-900 text-white p-4">
    <h1 className="text-2xl font-bold">Workout in Progress</h1>
    <p>No distractions here!</p>
  </div>
);