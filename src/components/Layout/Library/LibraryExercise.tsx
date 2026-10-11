import { BicepsFlexed, Tag } from "lucide-react";
import type { Exercise as IExercise } from "../../../types/types";

interface IProps {
    exercise: IExercise;
    showExercise: ()=>void;
}

const LibraryExercise: React.FC<IProps> = ({exercise, showExercise}) => {

    return (
        <div className="w-full p-4 bg-zinc-950 border border-white/5 rounded-lg flex flex-col gap-2" onClick={showExercise}>
            <h1>{exercise.name}</h1>
            <div className="w-full gap-2 grid grid-cols-[30px_1fr]">
                <Tag size={16} />
                <div className="w-full flex flex-wrap gap-1 items-center">
                    {exercise && exercise.tags && exercise.tags.length > 0 ? exercise.tags?.map(i=><p key={i} className="px-2 py-1 text-nowrap text-xs opacity-50 bg-zinc-900 rounded">
                        {i}
                    </p>) 
                    : <p>No tags</p>}
                </div>
            </div>
            <div className="w-full gap-2 grid grid-cols-[30px_1fr]">
                <BicepsFlexed size={16} />
                <div className="w-full flex flex-wrap gap-1 items-center">
                    {exercise && exercise.muscles && exercise.muscles.length > 0 ? exercise.muscles?.map(i=><p key={i._id} className="px-2 py-1 text-nowrap text-xs opacity-50 bg-zinc-900 rounded">
                        {i.name}
                    </p>) 
                    : <p>No muscles</p>}
                </div>
            </div>
            
        </div>
    )
}

export default LibraryExercise;