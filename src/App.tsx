import { Routes, Route, Outlet } from 'react-router-dom';
import Library from './components/Layout/Library/Library';
import ManageExercise from './components/Exercise/ManageExercise';
import { ToastProvider } from './context/ToastContext';
import Nav from './components/Layout/Nav';
import ManageWorkout from './components/Workout/ManageWorkout/ManageWorkout';
import ViewWorkout from './components/Workout/ViewWorkout';
import Exercise from './components/Exercise/Exercise';
import Menu from './components/Menu/Menu';
import { Logs } from './components/Logs/Logs';
import Workout from './components/Workout/Workout';



function App() {
  return (
    <ToastProvider>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<div className="p-4">Home Dashboard</div>} /> 
          <Route path="/library" element={<Library />} />
          <Route path="/plan" element={<div className="p-4">Calendar Page</div>} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/logs" element={<Logs />} />
        </Route>

        <Route path='/exercise/new' element={<ManageExercise /> } />
        <Route path='/exercise/:id/start' element={<Exercise /> } />
        <Route path='/exercise/:id/edit' element={<ManageExercise /> } />

        <Route path='/workout/new' element={<ManageWorkout /> } />
        <Route path='/workout/:id/start' element={<Workout /> } />
        <Route path='/workout/:id/view' element={<ViewWorkout /> } />


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
