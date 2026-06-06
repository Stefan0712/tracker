import { Plus, RefreshCcw } from "lucide-react"
import { Link } from "react-router-dom";
import { seedExercises } from "../../../helpers/seed";
import { useEffect, useMemo, useState } from "react";
import { db } from "../../../db";
import type { Exercise, Workout } from "../../../types/types";


const Library = () => {

    const [type, setType] = useState('exercises');

    const [exercises, setExercises] = useState<Exercise[]>([])
    const [workouts, setWorkouts] = useState<Workout[]>([]);


    const fetchExercises = async () => {
        try {
            const rawExercises = await db.exercises.toArray();
            if(rawExercises){
                console.log(`Fetched ${rawExercises.length} exercises`)
                setExercises(rawExercises)
            }
        } catch (error) {
            console.error(error)
        }
    }

    const fetchWorkouts = async () => {
        try {
            const rawWorkouts = await db.workouts.toArray();
            if(rawWorkouts){
                console.log(`Fetched ${rawWorkouts.length} workouts`)
                setWorkouts(rawWorkouts)
            }
        } catch (error) {
            console.error(error)
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
        console.log("Fetching items...")
        fetchItems();
    }, [type])


    return (
        <div>
            <div className="w-full h-15 flex px-4 items-center justify-between">
                <h1 className="font-bold text-lg">Library</h1>
                <Link to={'/exercise/new'}>
                    <Plus />
                </Link>
            </div>
            {/* <button className="primary-button" onClick={()=>seedExercises()}>SEED LIBRARY</button> */}
            <div className="w-full flex items-center justify-between px-4">
                <div className="flex items-center gap-2">
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
                <button onClick={fetchItems}>
                    <RefreshCcw />
                </button>
            </div>

            {/* Container for items */}

            <div className="flex flex-col gap-2 overflow-y-auto overflow-x-hidden">
                {
                    type === 'exercises' ? exercises?.length > 0 ? exercises.map(item=><MockItem type="exercise" item={item} />) : <p>No exercises</p> : workouts?.length > 0 ? workouts.map(item=><MockItem type="workout" item={item} />) : <p>No workouts</p>
                }
            </div>
        </div>
    )
}


export default Library;

interface MockItem {
    type: string;
    item: Exercise | Workout;
}
const MockItem: React.FC<MockItem> = ({type, item}) => {


    return (
        <div className="w-full p-4 rounded border border-black-1 flex flex-col gap-2">
            <h1>{item.name}</h1>
            <b>{type}</b>
        </div>
    )
} 