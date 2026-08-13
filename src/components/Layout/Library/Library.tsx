import { Database, PlusIcon, RefreshCcw } from "lucide-react"
import { Link } from "react-router-dom";
import { seedExercises } from "../../../helpers/seed";
import { useEffect, useState } from "react";
import { db } from "../../../db";
import type { Exercise as IExercise, Workout } from "../../../types/types";
import { useToast } from "../../../context/ToastContext";
import ViewExercise from "../../Exercise/ViewExercise";
import NewLibraryItemMenu from "./NewLibraryItemMenu";
import LibraryExercise from "./LibraryExercise";


const Library = () => {

    const { addToast } = useToast();


    const [selectedExercise, setSelectedExercise] = useState<null | string>(null)

    const [type, setType] = useState('exercises');

    const [exercises, setExercises] = useState<IExercise[]>([])
    const [workouts, setWorkouts] = useState<Workout[]>([]);


    const [showNewMenu, setShowNewMenu] = useState(false);


    const fetchExercises = async () => {
        try {
            const rawExercises = await db.exercises.toArray();
            if(rawExercises){
                //addToast(`Fetched ${rawExercises.length} exercises`, 'success')
                setExercises(rawExercises)
            }
        } catch (error) {
            console.error(error);
            addToast("Failed to seed exercises", "error")
        }
    }

    const fetchWorkouts = async () => {
        try {
            const rawWorkouts = await db.workouts.toArray();
            if(rawWorkouts){
                //addToast(`Fetched ${rawWorkouts.length} workouts`, 'success')
                setWorkouts(rawWorkouts)
            }
        } catch (error) {
            console.error(error);
            addToast("Failed to seed workouts", "error")
        }
    }

    const fetchItems = () => {
        if(type === 'exercises') {
            fetchExercises();
        } else if(type === 'workouts') {
            fetchWorkouts();
        }
    }

    useEffect(()=>{
        //addToast("Fetching items...", 'info')
        fetchItems();
    }, [type])


    return (
        <div className="content-container bg-main flex flex-col text-white">
            {selectedExercise ? <ViewExercise id={selectedExercise} close={()=>setSelectedExercise(null)}/> : null}
            <div className="w-full h-15 flex px-4 items-center justify-between">
                <h1 className="font-bold text-lg">Library</h1>
                <button onClick={fetchItems}>
                    <RefreshCcw />
                </button>
            </div>
            <div className="w-full flex items-center px-4 gap-2 overflow-y-auto">
                <div className="flex items-center gap-2 mr-auto">
                    <button 
                        className={`h-10 px-2 border border-black-1 rounded-lg ${type === 'exercises' ? 'bg-zinc-900 text-white' : ''}`}
                        onClick={()=>setType('exercises')}
                    >
                        Exercises
                        </button>
                    <button 
                        className={`h-10 px-2 border border-black-1 rounded-lg ${type === 'workouts' ? 'bg-zinc-900 text-white' : ''}`}
                        onClick={()=>setType('workouts')}
                    >
                        Workouts
                    </button>
                </div>
                <button onClick={seedExercises}>
                    <Database />
                </button>
            </div>

            {/* Container for items */}

            <div className="flex flex-col gap-2 overflow-y-auto overflow-x-hidden p-2">
                {
                    type === 'exercises' ? exercises?.length > 0 ? exercises.map(item=><LibraryExercise key={item._id} showExercise={()=>setSelectedExercise(item._id)} exercise={item} />) : <p className="no-items-text">No items to show</p> : workouts?.length > 0 ? workouts.map(item=><MockItem type="workout" item={item} />) : <p className="no-items-text">No workouts</p>
                }
            </div>

            <button className="w-12 h-12 rounded-xl bg-zinc-700 flex items-center justify-center absolute right-4 bottom-(--absolute-bottom-15) z-10" onClick={()=>setShowNewMenu(true)}>
                <PlusIcon />
            </button>
            {showNewMenu ? <NewLibraryItemMenu close={()=>setShowNewMenu(false)} /> : null}
        </div>
    )
}


export default Library;

interface MockItem {
    type: string;
    item: IExercise | Workout;
}
const MockItem: React.FC<MockItem> = ({type, item}) => {


    return (
        <div className="w-full p-4 rounded border border-black-1 flex flex-col gap-2">
            <h1>{item.name}</h1>
            <b>{type}</b>
            <Link to={`/workout/${item._id}/view`}>View Workout</Link>
        </div>
    )
} 