import { Info, List, Pause, Play, StickyNote } from "lucide-react";
import type {WorkoutExercise } from "../../../types/types"
import { useState } from "react";
import DetailsPage from "./DetailsPage";
import ExercisesList from "./ExercisesList";
import { InstructionPage } from "./InstructionsPage";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../../db";

interface WorkoutPagesProps {
    exercise: WorkoutExercise;
    exercises: WorkoutExercise[];
    formattedTime: string;
    isRunning: boolean;
    expand: ()=>void;
    toggle: ()=>void;
    close: ()=>void;
}
const WorkoutPages: React.FC<WorkoutPagesProps> = ({exercise, exercises, formattedTime, expand, isRunning, toggle, close}) => {

    const [selectedScreen, setSelectedScreen] = useState('details');

    const fullExercise = useLiveQuery(
        () => (exercise?.exerciseId ? db.exercises.get(exercise.exerciseId) : undefined),
        [exercise?.exerciseId]
    );
    return (
        <div className="w-full h-full grid grid-rows-[50px_1fr] gap-2">
            <div className="h-12.5 w-full flex gap-1 items-center" onClick={expand}>
                <button className="px-2 py-1" onClick={()=>setSelectedScreen('details')}><Info /></button>
                <button className="px-2 py-1" onClick={()=>setSelectedScreen('exercises')}><List /></button>
                <button className="px-2 py-1" onClick={()=>setSelectedScreen('instructions')}><StickyNote /></button>
                <div className="flex items-center justify-center gap-2 ml-auto">
                    <p>{formattedTime}</p>
                    <button className="px-2 py-1" onClick={toggle}>
                        {isRunning ? <Pause /> : <Play />}
                    </button>
                </div>
            </div>
            <div className="w-full h-full">
                {selectedScreen === 'details' ? <DetailsPage exercise={fullExercise} /> : 
                 selectedScreen === 'exercises' ? <ExercisesList exercises={exercises} exercise={exercise} /> :
                 selectedScreen === 'instructions' ? <InstructionPage exercise={exercise} />
                 : <DetailsPage exercise={fullExercise} />}
            </div>
        </div>
    )
}

export default WorkoutPages;

