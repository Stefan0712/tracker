import { useState, type Dispatch, type SetStateAction } from "react"
import { ExerciseDrawer } from "../../modals/ExerciseDrawer";
import type { Exercise, PlannedSet, WorkoutExercise } from "../../../types/types";
import { useToast } from "../../../context/ToastContext";
import SmartExerciseCard from "./SmartExerciseCard";
import ObjectID from "bson-objectid";

export interface WorkoutItem extends Exercise {
    type: string;
    sourceId: string;
}

interface ExercisesTabProps {
    items: WorkoutExercise[];
    setItems: Dispatch<SetStateAction<WorkoutExercise[]>>;
}

export const ExercisesTab: React.FC<ExercisesTabProps> = ({items, setItems}) => {

    const { addToast } = useToast();

    const [showExerciseDrawer, setShowExerciseDrawer] = useState(false);



    const handleAddExercise = (exercise: WorkoutItem) => {
        const convertedExercise: WorkoutExercise = {
            _id: ObjectID().toHexString(),
            sourceId: exercise.sourceId,
            name: exercise.name,
            type: 'exercise',
            tags: exercise.tags ?? [],
            muscles: exercise.muscles ?? [],
            exerciseId: exercise._id,
            trackingFields: exercise.trackingFields ?? [],
            order: items.length, 
            sets: [{_id: ObjectID().toHexString(), order: 1, fields: exercise.trackingFields || []}],
            rest: 90,
            isOptional: false
        }
        setItems(prev=>[...prev, convertedExercise]);
        addToast(`Added ${exercise.name}!`);
    }

    const handleUpdateSet = (exerciseId: string, setId: string, fieldId: string, value: number) => {
        setItems((prev) =>
            prev.map((e) =>
                e._id === exerciseId
                ? {
                    ...e,
                    sets: e.sets.map((s) =>
                        s._id === setId
                        ? {
                            ...s,
                            fields: s.fields.map((f) =>
                                f._id === fieldId ? { ...f, value: value } : f
                            ),
                            }
                        : s
                    ),
                    }
                : e
            )
        );
    }

    const handleAddSet = (exerciseId: string, newSet: PlannedSet) => {
        console.log(exerciseId, newSet)
        setItems(prev=>prev.map(e=>e._id === exerciseId ? {...e, sets: [...e.sets, newSet]} : e))
    }
    const handleResetSets = (exerciseId: string) => {
        setItems(prev=>prev.map(e=>e._id === exerciseId ? {...e, sets: []} : e))
    }
    const handleUpdateRest = (exerciseId: string, newRest: number) => {
        setItems(prev=>prev.map(e=>e._id === exerciseId ? {...e, rest: newRest} : e))
    }

    return (
        <div className="w-full h-full px-4 grid grid-rows-[50px_1fr_50px] pb-4">
            <div className="w-full h-12.5">
                <p>Total exercises: 15</p>
            </div>
            <div className="w-full h-full flex flex-col gap-2 overflow-y-auto pb-4">
                {items?.length > 0 ? items.map((item: WorkoutExercise)=>
                <SmartExerciseCard 
                    key={item._id} 
                    exercise={item} 
                    handleAddSet={handleAddSet} 
                    handleUpdateSet={handleUpdateSet}
                    handleResetSets={handleResetSets}
                    handleUpdateRest={handleUpdateRest}
                />) : <p>No exercises added</p>}
            </div>
            <div className="w-full flex items-center justify-center gap-2">
                <button className="h-full px-4 roudned bg-zinc-500 rounded">Add Break</button>
                <button className="h-full px-4 roudned bg-zinc-500 rounded" onClick={()=>setShowExerciseDrawer(true)}>Add Exercise</button>
            </div>
            {showExerciseDrawer ? <ExerciseDrawer 
                existingExercises={items.filter(item=>item.type === 'exercise')} 
                addExercise={(exercise: WorkoutItem)=>handleAddExercise(exercise)} 
                close={()=>setShowExerciseDrawer(false)} 
            /> : null}
        </div>
    )
    
}