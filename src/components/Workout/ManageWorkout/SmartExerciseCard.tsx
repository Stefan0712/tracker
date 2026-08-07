import { BicepsFlexed, Info, Tag } from "lucide-react";
import { useState } from "react";
import type { WorkoutExercise } from "../../../types/types";


interface IProps {
    exercise: WorkoutExercise;
}
const SmartExerciseCard: React.FC<IProps> = ({exercise}) => {


    const [showDetails, setShowDetails] = useState(false);


    const handleShowDetails = () => {
        console.log(exercise);
        setShowDetails(prev=>!prev);
    }

    if (!exercise || exercise === null || exercise === undefined) return;
    return (
        <div className="w-full p-4 rounded-xl border border-white/10 flex flex-col gap-2">
            <div className="w-full grid grid-cols-[1fr_40px]">
                <h1>{exercise.name}</h1>
                <button onClick={handleShowDetails}><Info /></button>
            </div>
            
            {showDetails ? <div className={`w-full flex flex-col`}>
                <div className="flex flex-col gap-2">
                    <div className="w-full flex flex-col">
                        <div className="w-full flex gap-2 overflow-hidden text-sm items-center">
                            <Tag size={12} />
                            {exercise.tags && exercise.tags?.length > 0 ? exercise.tags?.map(item=><p key={item} className="px-2 rounded bg-green-800">{item}</p>) : <p>No tags</p>}
                        </div>
                    </div>
                    <div className="w-full flex gap-2 overflow-hidden text-sm items-center">
                        <BicepsFlexed size={12} />
                        {exercise.muscles && exercise.muscles?.length > 0 ? exercise.muscles?.map(item=>
                            <div key={item._id} className="px-2 rounded bg-indigo-900">
                                <p>{item.name}</p>
                                <p className="text-xs opacity-50 pb-0.5">{item.region}</p>
                            </div>) 
                        : <p>No tags</p>}
                    </div>
                </div>
            </div> : null}
            <div className="flex flex-row gap-2 w-full overflow-hidden">
                <select>
                    {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
                        <option key={num} value={num} className="bg-zinc-900">
                            {num}
                        </option>
                    ))}
                </select>
                {exercise.trackingFields && exercise.trackingFields.length > 0 ? exercise.trackingFields.map((field, index)=> <div className="flex gap-2 items-center" key={field._id}>
                    {field.type === 'boolean' ? 
                    <p>{field.target === 0 ? "NO" : "YES"}</p>:
                    <input
                        placeholder={field.unit}
                        type={`${field.type}`}
                        className="border border-white/20 rounded px-1 max-w-[50px]"
                    />
                    }
                </div>) : <p>No fields</p>}
            </div>
        </div>
    )
}

export default SmartExerciseCard;