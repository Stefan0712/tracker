import { Routes, Route, Outlet } from 'react-router-dom';
import Library from './components/Layout/Library/Library';
import ManageExercise from './components/Exercise/ManageExercise';
import { ToastProvider } from './context/ToastContext';
import Nav from './components/Layout/Nav';



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
  return (
    <div className="h-dvh w-dvw text-gray-900 bg-slate-850 overflow-hidden grid grid-rows-[1fr_var(--nav-height)]">
      <Outlet /> 
      <Nav />
    </div>
  );
};
