import { BicepsFlexed, ChevronDown, ChevronRight, Info, Plus, Tag } from "lucide-react";
import { useState } from "react";
import type { PlannedSet, TrackingField, WorkoutExercise } from "../../../types/types";
import ObjectID from "bson-objectid";


interface IProps {
    exercise: WorkoutExercise;
    handleAddSet: (exerciseId: string, newSet: PlannedSet) => void;
    handleUpdateSet: (exerciseId: string, setId: string, fieldId: string, value: number) => void;
    handleResetSets: (exerciseId: string) => void;
    handleUpdateRest: (exerciseId: string, newRest: number) => void;
}


const SmartExerciseCard: React.FC<IProps> = ({exercise, handleAddSet, handleUpdateSet, handleResetSets, handleUpdateRest}) => {


    const [showDetails, setShowDetails] = useState(false);
    const [showAdvancedSets, setShowAdvancedSets] = useState(false);


    const handleShowDetails = () => {
        console.log(exercise);
        setShowDetails(prev=>!prev);
    }

    const addSet = () => {
        const newSet = {
            _id: ObjectID().toHexString(), 
            order: exercise.sets.length, 
            fields: [...exercise.trackingFields]
        }
        console.log(exercise._id, newSet)
        handleAddSet(exercise._id, newSet);
    }

    const handleUpdateSets = (noOfSets: number) => {
        handleResetSets(exercise._id);
        for(let i=0; i < noOfSets; i++) {
            const newSet = {
                _id: ObjectID().toHexString(), 
                order: exercise.sets.length, 
                fields: [...exercise.trackingFields]
            }
            handleAddSet(exercise._id, newSet)
        }
    }

    if (!exercise || exercise === null || exercise === undefined) return;
    return (
        <div className="w-full p-4 rounded-xl border border-white/10 flex flex-col gap-2">
            <div className="w-full grid grid-cols-[30px_1fr_40px]">
                <button onClick={()=>setShowAdvancedSets(prev=>!prev)}>
                    {showAdvancedSets ? <ChevronDown /> : <ChevronRight />}
                </button>
                <h1>{exercise.name}</h1>
                <select value={exercise.sets.length} onChange={(e)=>handleUpdateSets(parseInt(e.target.value) || 0) } >
                    {Array.from({ length: 10 }, (_, optionIndex) => {
                        const val = optionIndex + 1;
                        return (
                            <option key={val} value={val} className="bg-zinc-950">
                            {val}
                            </option>
                        );
                    })}
                </select>
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
            <div className="w-full flex flex-col gap-1">
                {showAdvancedSets ? 
                    <fieldset className="flex gap-2 items-center">
                        <label>Rest</label>
                        <input 
                            type="number" 
                            value={exercise.rest} 
                            onChange={(e)=>handleUpdateRest(exercise._id, parseInt(e.target.value))} 
                            className='border border-white/10 rounded px-2 py-1 w-[75px]'
                        /> seconds
                    </fieldset>
                : null}
                <b>Fields:</b>
                <div className="w-full flex gap-2 items-center">
                    {
                        exercise.trackingFields && exercise.trackingFields.length > 0 ? exercise.trackingFields.map(field=><p>{field.name} ({field.unit || ''})</p>)
                        : null
                    }
                </div>
                {showAdvancedSets ? 
                    exercise && exercise.sets && exercise?.sets?.length > 0 ? exercise.sets.map((set, index)=>
                        <div key={set._id} className="flex flex-row gap-2 w-full overflow-hidden items-end">
                            <b>{index+1}</b>
                            {set.fields && set.fields.length > 0 ? set.fields.map((field: TrackingField)=> 
                                <div className="flex gap-2 items-center" key={field._id}>
                                    {field.type === 'boolean' ? 
                                        <p>{field.target === 0 ? "NO" : "YES"}</p> :
                                        <fieldset className="flex flex-col text-sm items-center justify-center gap-1">
                                            <label className="opacity-40">{field.name}</label>
                                            <input
                                                placeholder={field.unit}
                                                type={`${field.type}`}
                                                value={field.value ?? 0}
                                                onChange={(e)=>handleUpdateSet(exercise._id, set._id, field._id, parseInt(e.target.value) || 0)}
                                                className="border border-white/20 rounded p-1 max-w-12.5"
                                            />
                                        </fieldset>
                                    }
                                </div>
                            ) : <p>No fields</p>}
                        </div>) 
                    : <p>No sets added</p> : null
                }
            </div>
                <button onClick={addSet} className="w-full flex gap-2 items-center">
                    <Plus />
                    <p>Add set</p>
                </button>
        </div>
    )
}

export default SmartExerciseCard;