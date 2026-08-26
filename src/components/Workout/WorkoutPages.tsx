import { Info, List, Pause, Play, StickyNote } from "lucide-react";
import type {WorkoutExercise } from "../../types/types"
import { useState } from "react";

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

    const [selectedScreen, setSelectedScreen] = useState('exercises');


    return (
        <div className="w-full h-full grid grid-rows-[50px_1fr] gap-2">
            <div className="h-[50px] w-full flex gap-1 items-center" onClick={expand}>
                <button className="px-2 py-1"><Info /></button>
                <button className="px-2 py-1"><StickyNote /></button>
                <button className="px-2 py-1"><List /></button>
                <div className="flex items-center justify-center gap-2 ml-auto">
                    <p>{formattedTime}</p>
                    <button className="px-2 py-1" onClick={toggle}>
                        {isRunning ? <Pause /> : <Play />}
                    </button>
                </div>
            </div>
            <div className="w-full h-full">
                <h1>{selectedScreen}</h1>
            </div>
        </div>
    )
}

export default WorkoutPages;

