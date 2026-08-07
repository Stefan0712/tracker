import { useState } from "react"
import { ExerciseDrawer } from "../../modals/ExerciseDrawer";
import type { Exercise, WorkoutExercise } from "../../../types/types";
import { useToast } from "../../../context/ToastContext";
import SmartExerciseCard from "./SmartExerciseCard";
import ObjectID from "bson-objectid";

export interface WorkoutItem extends Exercise {
    type: string;
    sourceId: string;
}


export const ExercisesTab = () => {

    const { addToast } = useToast();

    const [showExerciseDrawer, setShowExerciseDrawer] = useState(false);

    const [items, setItems] = useState<WorkoutExercise[]>([]);


    const handleAddExercise = (exercise: WorkoutItem) => {
        const convertedExercise: WorkoutExercise = {
            _id: ObjectID().toHexString(),
            name: exercise.name,
            type: 'exercise',
            tags: exercise.tags ?? [],
            muscles: exercise.muscles ?? [],
            exerciseId: exercise._id,
            order: items.length, 
            sets: [{_id: ObjectID().toHexString(), order: 1, fields: exercise.trackingFields || []}],
            rest: 90,
            isOptional: false
        }
        setItems(prev=>[...prev, convertedExercise]);
        addToast(`Added ${exercise.name}!`);
    }

    return (
        <div className="w-full h-full px-4 grid grid-rows-[50px_1fr_50px] pb-4">
            <div className="w-full h-12.5">
                <p>Total exercises: 15</p>
            </div>
            <div className="w-full h-full flex flex-col gap-2">
                {items?.length > 0 ? items.map((item: WorkoutExercise)=><SmartExerciseCard key={item._id} exercise={item} />) : <p>No exercises added</p>}
            </div>
            <div className="w-full flex items-center justify-center gap-2">
                <button className="h-full px-4 roudned bg-zinc-500 rounded">Add Break</button>
                <button className="h-full px-4 roudned bg-zinc-500 rounded" onClick={()=>setShowExerciseDrawer(true)}>Add Exercise</button>
            </div>
            {showExerciseDrawer ? <ExerciseDrawer existingExercises={items.filter(item=>item.type === 'exercise')} addExercise={(exercise: WorkoutItem)=>handleAddExercise(exercise)} close={()=>setShowExerciseDrawer(false)} /> : null}
        </div>
    )
    
}