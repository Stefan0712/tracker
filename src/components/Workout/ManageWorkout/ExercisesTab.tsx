import { useState } from "react"
import { ExerciseDrawer } from "../../modals/ExerciseDrawer";
import type { Exercise } from "../../../types/types";

export interface WorkoutItem extends Exercise {
    type: string;
    sourceId: string;
}


export const ExercisesTab = () => {

    const [showExerciseDrawer, setShowExerciseDrawer] = useState(false);

    const [items, setItems] = useState<WorkoutItem[]>([]);



    return (
        <div className="w-full h-full px-4 grid grid-rows-[50px_1fr_50px] pb-4">
            <div className="w-full h-12.5">
                <p>Total exercises: 15</p>
            </div>
            <div className="w-full h-full flex flex-col gap-2">
                {items?.length > 0 ? items.map(item=><div key={item._id}>{item.name}</div>) : <p>No exercises added</p>}
            </div>
            <div className="w-full flex items-center justify-center gap-2">
                <button className="h-full px-4 roudned bg-zinc-500 rounded">Add Break</button>
                <button className="h-full px-4 roudned bg-zinc-500 rounded" onClick={()=>setShowExerciseDrawer(true)}>Add Exercise</button>
            </div>
            {showExerciseDrawer ? <ExerciseDrawer existingExercises={items.filter(item=>item.type === 'exercise')} addExercise={(exercise: WorkoutItem)=>setItems(prev=>[...prev, exercise])} close={()=>setShowExerciseDrawer(false)} /> : null}
        </div>
    )
    
}