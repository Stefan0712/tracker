import { SignalHigh, SignalLow, SignalMedium, SignalZero, Tag } from "lucide-react";
import type { Exercise as IExercise } from "../../../types/types";

interface IProps {
    exercise: IExercise;
    showExercise: ()=>void;
}

const LibraryExercise: React.FC<IProps> = ({exercise, showExercise}) => {

    const DifficultyIcon =  exercise.difficulty === 'Advanced' ? <SignalHigh /> :
                            exercise.difficulty === 'Intermediate' ? <SignalMedium /> :
                            exercise.difficulty === 'Beginner' ? <SignalLow /> :
                            <SignalZero />

    return (
        <div className="w-full p-4 border border-white/10 rounded-lg" onClick={showExercise}>
            <h1>{exercise.name}</h1>
            <div className="flex gap-2 items-center">
                {DifficultyIcon}
                <p>{exercise.difficulty}</p>
            </div>
            <div className="w-full flex overflow-hidden items-center gap-2">
                <Tag className="h-10" />
                {exercise && exercise.tags && exercise.tags.length > 0 ? exercise.tags?.map(i=><p key={i} className="px-2 py-1 text-nowrap text-sm bg-zinc-900 rounded">
                    {i}
                </p>) 
                : <p>No tags.</p>}
            </div>
            
        </div>
    )
}

export default LibraryExercise;