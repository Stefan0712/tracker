import { Plus } from "lucide-react";
import { db } from "../../db";
import type { Exercise } from "../../types/types"
import type { WorkoutItem } from "../Workout/ManageWorkout/ExercisesTab";
import { useLiveQuery } from "dexie-react-hooks";


interface IProps {
    existingExercises?: Exercise[];
    addExercise: (exercise: WorkoutItem) => void;
    close: ()=>void;
}


export const ExerciseDrawer: React.FC<IProps> = ({existingExercises, addExercise, close}) => {
    


    const savedExercises: Exercise[] = useLiveQuery(() => db.exercises.toArray()) ?? [];



    return (
        <div className="w-full h-dscreen grid grid-rows-[50px_1fr_50px] gap-2 absolute bottom-0 left-0 bg-zinc-900 rounded-t-xl z-50 p-4">
            <h1>My Library ({savedExercises.length})</h1>
            <div className="h-full w-full flex flex-col overflow-y-auto">
                {savedExercises?.length > 0 ? savedExercises.map((exercise: Exercise)=><ExerciseItem exercise={exercise} />) : <p>No exercises</p>}
            </div>
            <button className="w-full h-12 rounded-xl bg-zinc-700 flex items-center justify-center" onClick={close}>Close</button>
        </div>
    )
}

interface ExerciseProp {
    exercise: Exercise;
}
const ExerciseItem: React.FC<ExerciseProp> = ({exercise}) => {

    return (
        <div className="w-full p-4 rounded-xl flex flex-col gap-2" key={exercise._id}>
            <div className="w-full grid grid-cols-[1fr_auto] gap-2">
                <div className="w-full h-full flex flex-col overflow-hidden">
                    <h3>{exercise.name}</h3>
                    <div className="flex items-center gap-2 w-full overflow-hidden truncate">{exercise.tags && exercise.tags.length > 0 ? exercise.tags.map(item=><p key={item}>{item}</p>) : <p>No tags</p>}</div>
                    <div className="flex items-center gap-2 w-full overflow-hidden truncate">{exercise.muscles && exercise.muscles.length > 0 ? exercise.muscles.map(item=><p key={item._id}>{item.name}</p>) : <p>No muscles</p>}</div>
                </div>
                <button className="flex items-center justify-center w-full h-full">
                    <Plus />
                </button>
            </div>
            <div className="w-full flex gap-2">
                {exercise.trackingFields?.length}
            </div>
        </div>
    )
}