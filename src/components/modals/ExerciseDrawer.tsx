import { BicepsFlexed, Copy, Plus, Tag } from "lucide-react";
import { db } from "../../db";
import type { Exercise, WorkoutExercise } from "../../types/types"
import type { WorkoutItem } from "../Workout/ManageWorkout/ExercisesTab";
import { useLiveQuery } from "dexie-react-hooks";
import { useState } from "react";
import ObjectID from "bson-objectid";


interface IProps {
    existingExercises?: WorkoutExercise[];
    addExercise: (exercise: WorkoutItem) => void;
    close: ()=>void;
}


export const ExerciseDrawer: React.FC<IProps> = ({existingExercises, addExercise, close}) => {
    


    const savedExercises: Exercise[] = useLiveQuery(() => db.exercises.toArray()) ?? [];



    return (
        <div className="w-full h-screen grid grid-rows-[50px_1fr_50px] overflow-hidden gap-2 fixed bottom-0 left-0 bg-zinc-900 rounded-t-xl z-50 p-4">
            <h1 className="text-white/60 font-bold text-xl">My Library ({savedExercises.length})</h1>
            <div className="h-full w-full flex flex-col overflow-y-auto gap-2">
                {savedExercises?.length > 0 ? savedExercises.map((exercise: Exercise)=><ExerciseItem key={exercise._id} alreadyExists={existingExercises?.some(item=>item.sourceId === exercise._id) ?? false} exercise={exercise} addExercise={addExercise}/>) : <p>No exercises</p>}
            </div>
            <button className="w-full h-12 rounded-xl bg-zinc-700 flex items-center justify-center" onClick={close}>Close</button>
        </div>
    )
}

interface ExerciseProp {
    exercise: Exercise;
    addExercise: (exercise: WorkoutItem) => void;
    alreadyExists: boolean;
}
const ExerciseItem: React.FC<ExerciseProp> = ({exercise, addExercise, alreadyExists}) => {


    const [isExpanded, setIsExpanded] = useState(false);

    // Add message to let the user know the exercise is duplicated if already exists
    return (
        <div className="w-full p-4 rounded-xl flex flex-col gap-2 bg-zinc-950">
            <div className="w-full grid grid-cols-[1fr_auto] gap-2">
                <div className="w-full h-full flex flex-col gap-2 overflow-hidden" onClick={()=>setIsExpanded(prev=>!prev)}>
                    <h3 className="font-bold text-xl">{exercise.name}</h3>
                    <div className="flex items-center gap-2 w-full overflow-hidden truncate text-white/40 text-sm">
                        <Tag size={16} className="shrink-0" />
                        {exercise.tags && exercise.tags.length > 0 ? exercise.tags.map(item=><p key={item}>{item}</p>) : <p>No tags</p>}
                    </div>
                    <div className="flex items-center gap-2 w-full overflow-hidden truncate text-white/40 text-sm">
                        <BicepsFlexed size={16} className="shrink-0" />
                        {exercise.muscles && exercise.muscles.length > 0 ? exercise.muscles.map(item=><p key={item._id}>{item.name}</p>) : <p>No muscles</p>}
                    </div>
                </div>
                <button className="flex justify-center w-full h-full" onClick={()=>addExercise({...exercise, sourceId: exercise._id,  _id: ObjectID().toHexString(), type: 'exercise'})}>
                    {alreadyExists ? <Copy /> : <Plus />}
                </button>
            </div>
            {isExpanded ? <div className="w-full flex flex-col gap-2 transition-all duration-300 ease-out">
                {exercise?.trackingFields && exercise?.trackingFields?.length > 0 ? exercise.trackingFields.map(field=><div key={field._id} className="w-full flex gap-2 items-center bg-zinc-500/20 px-2 py-1 rounded">
                    <b className="mr-auto">{field.name}</b>
                    <p className="w-fit">{field.unit ?? ''}</p>
                    <p className="w-fit">{field.target}</p>
                </div>) : <p>No fields</p>}
            </div> : null}
        </div>
    )
}