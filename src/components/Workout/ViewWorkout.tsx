import { useEffect, useState } from "react";
import { db } from "../../db";
import { Link, useParams } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import type { Workout, WorkoutExercise } from "../../types/types";

const ViewWorkout = () => {
    const [workout, setWorkout] = useState<Workout | null>(null);
    const [loading, setLoading] = useState(true);

    const {id} = useParams();

    useEffect(() => {
        setLoading(true);
        
        if(id){
            db.workouts.get(id)
            .then((data) => {
                setWorkout(data ?? null);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Failed to fetch workout:", err);
                setLoading(false);
            });
        }
    }, [id]);

    if (loading) {
        return <div className="text-white p-4">Loading workout...</div>;
    }

    if (!workout) {
        return <div className="text-white p-4">Workout not found (ID: {id})</div>;
    }

    const section = 'rounded-lg bg-zinc-900 p-4 flex flex-col gap-1';
    const listItem = 'px-2 text-sm text-white/50';
    const list = 'flex gap-1 flex-wrap';

    return (
        <div className="w-full h-full absolute top-0 left-0 bg-zinc-950 p-4 z-50 text-white flex flex-col gap-2 overflow-y-auto">
            <div className="w-full h-[50px] grid grid-cols-[50px_1fr]">
                <Link to={'/library'}>
                    <ChevronLeft />
                </Link>
                <h1>{workout.name}</h1>
            </div>
            <div className={`${section}`} onClick={()=>console.log(workout)}>
                <label>Workout ID</label>
                <b className="text-zinc-500 text-sm">{id}</b>
            </div>
            <div className="w-full flex justify-between items-center gap-3">
                <button className="border border-white/10 bg-red-500/90 px-2 text-white rounded">Delete</button>
                <Link to={id ? `/workout/${id}/edit` : '#'} className="border border-white/10 bg-zinc-500/90 px-2 text-white rounded">Edit</Link>
            </div>
            <div className={`${section}`}>
                <label>Description</label>
                <p>{workout._id}</p>
            </div>
            <div className={`${section}`}>
                <label>Description</label>
                <p>Created at {workout.createdAt.toISOString()}</p>
                <p>Updated at {workout.updatedAt.toISOString()}</p>
            </div>
            <div className={`${section}`}>
                <div className="flex flex-col gap-1">
                    <label>Duration</label>
                    <p>{workout.estimatedDuration} s</p>
                </div>
                <div className="flex flex-col gap-1">
                    <label>Private</label>
                    <p>{workout.isPrivate ? "True" : "False"}</p>
                </div>
                <div className="flex flex-col gap-1">
                    <label>Shared</label>
                    <p>{workout.isShared ? "Shared" : "Not Shared"}</p>
                </div>
            </div>
            <div className={`${section}`}>
                <label>Muscles</label>
                <div className={list}>{workout.muscles && workout.muscles?.length > 0 ? workout.muscles?.map(item=><p key={item._id} className={listItem}>{item.name}</p>): <p>No muscles </p>}</div>
            </div>
            <div className={`${section}`}>
                <label>Tags</label>
                <div className={list}>{workout.tags && workout.tags?.length > 0 ? workout.tags?.map(item=><p key={item} className={listItem}>{item}</p>): <p>No tags </p>}</div>
            </div>
            <div className={`${section}`}>
                <label>Equipment</label>
                <div className={list}>{workout.equipment && workout.equipment?.length > 0 ? workout.equipment?.map(item=><p key={item._id} className={listItem}>{item.name}</p>): <p>No equipment </p>}</div>
            </div>
            <div className={`${section}`}>
                <label>Exercises</label>
                <div className={list}>{workout.exercises && workout.exercises?.length > 0 ? workout.exercises?.map((item: WorkoutExercise)=>
                    <Exercise key={item._id} exercise={item} />)
                : <p>No exercises </p>}</div>
            </div>
            <div className={`flex flex-col gap-2 ${section}`}>
                <label>Notes</label>
                <div className={list}>{workout.notes && workout.notes?.length > 0 ? workout.notes?.map(item=><p key={item} className={`${listItem} border-transparent pb-1 border-b-white/10 border`}>{item}</p>): <p>No notes </p>}</div>
            </div>
        </div>
    );
};

export default ViewWorkout;


const Exercise = ({exercise}: {exercise: WorkoutExercise}) => {
    
    return (
        <div 
            className="w-full rounded bg-zinc-950 flex gap-2 itemns-center p-2 flex flex-col" 
            onClick={()=>console.log(exercise)}
        >
            <div className="w-full flex items-center justify-between">
                <h1>{exercise?.name}</h1>
                <b>x {exercise.sets.length}</b>
            </div>
            <div className="flex items-center gap-1">{exercise?.trackingFields?.map(field=><p className="bg-zinc-900 rounded px-2 py-1">{field?.name}</p>)}</div>
        </div>
    )
}