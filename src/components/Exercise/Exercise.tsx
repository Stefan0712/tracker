import { Check, Flag, Info, List, Pause, Play, Plus, RotateCcw, Save, StickyNote } from "lucide-react"
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { type RunningSet, type Exercise as IExercise, type Log } from "../../types/types";
import { db } from "../../db";
import ObjectID from "bson-objectid";
import { useCountdown } from "../../hooks/useCountdown";
import { useTimer } from "../../hooks/useTimer";
import { useToast } from "../../context/ToastContext";


const Exercise = () => {

    const {id} = useParams();
    const {addToast} = useToast();
    const navigate = useNavigate();

    const {toggle, isRunning, formattedTime, seconds} = useTimer();

    const [exercise, setExercise] = useState<IExercise | null>(null);

    const [sets, setSets] = useState<RunningSet[]>([]);
    
    const startedAt = new Date();

    useEffect(()=>{
        if(id) {
            getExerciseData(id);
        }
    },[id])

    const getExerciseData = async (id: string) => {
        if(id){
            try{
                const exerciseData = await db.exercises.get(id);
                if(exerciseData) {
                    setExercise(exerciseData);
                    setSets([{_id: ObjectID().toHexString(), order: 1, fields: exerciseData?.trackingFields || []}])
                }
            } catch (error) {
                console.error(error)
            }
        }
    }

    const handleAddSet = () => {
        setSets(prev=>[...prev, {_id: ObjectID().toHexString(), order: sets.length + 1, fields: exercise?.trackingFields || []}])
    }

    const handleUpdateValue = (setId: string, fieldId: string, newValue: number) => {
        setSets(prev=>{
            return [...prev.map(s=>s._id === setId ? 
                {...s, fields: s.fields.map(f=> f._id === fieldId ? {...f, value: newValue} : f)} : s
            )]
        })
    }

    const handleFinishExercise = async () => {
        if(exercise) {
            try {
                const exerciseLog: Log = {
                    _id: ObjectID().toHexString(),
                    createdAt: new Date(),
                    type: 'exercise',
                    data: {
                        sourceId: exercise?._id,
                        sets,
                        startedAt,
                        finishedAt: new Date(),
                        duration: seconds,
                        name: exercise?.name,
                        muscles: exercise?.muscles || [],
                        tags: exercise?.tags || [],
                        rest: 90,
                    }
                }
                await db.logs.add(exerciseLog);
                navigate('/library');
                addToast("Exercise finished!", "success");
            } catch (error) {
                console.error(error)
                addToast("Failed to finish exercise", "error")
            }
            
        }

    }

    if (!exercise) return <h1>Loading exercise...</h1>
    return (
        <div className="w-screen h-screen grid grid-rows-[50px_1fr_50px_50px] bg-zinc-900 text-white">
            <div className="h-12.5 grid grid-cols-[1fr_50px] p-2 gap-2">
                <h1>{exercise.name}</h1>
                <button onClick={handleFinishExercise}>
                    <Flag />
                </button>
            </div>
            <div className="w-full h-full flex flex-col overflow-y-auto p-3 gap-4">
                {sets.length > 0 ? sets.map(set=><Set key={set._id} set={set} handleUpdateValue={handleUpdateValue} />) : null}
                
                <div className="w-full p-2 grid grid-cols-2 items-center justify-center rounded-lg bg-zinc-800">
                    <button className="flex gap-1 items-center justify-center border border-transparent border-r-white/10" ><Plus size={12} /> <p>Break</p> </button> 
                    <button className="flex gap-1 items-center justify-center" onClick={handleAddSet}><Plus size={12} /> <p>Set</p> </button>
                </div>
            </div>
            <div className="w-full h-12.5 flex gap-1 items-center bg-zinc-800">
                <button className="px-2 py-1"><Info /></button>
                <button className="px-2 py-1"><List /></button>
                <button className="px-2 py-1 mr-auto"><StickyNote /></button>
                <div className="flex items-center justify-center gap-2">
                    <p>{formattedTime}</p>
                    <button className="px-2 py-1" onClick={toggle}>
                        {isRunning ? <Pause /> : <Play />}
                    </button>
                </div>
            </div>
        </div>
    )
}


export default Exercise;


const Set = ({set, handleUpdateValue}: {set: RunningSet, handleUpdateValue: (setId: string, fieldId: string, newValue: number) => void}) => {

    const {timeLeft, isRunning, isCompleted, toggle, reset } = useCountdown(90)

    return (
        <div className="w-full flex flex-col items-center gap-2 border border-white/10 rounded-xl" onClick={()=>console.log(set)}>
            <div className="w-full flex justify-between items-center px-2 py-1">
                <b>Set {set.order}</b>
                <button>
                    <Save />
                </button>
            </div>
            <div className="w-full flex-col gap-2 bg-zinc-800 rounded p-2">
                <label className="text-sm text-white/50">Fields</label>
                <div className="w-full flex gap-2">
                    {set.fields.map(field=>
                        <div key={field._id} className="flex flex-col gap-1 items-center justify-center">
                            <label className="text-sm text-white/50">{field.name}</label>
                            <input 
                                type="number" 
                                value={field.value} 
                                onChange={(e)=>handleUpdateValue(set._id, field._id, parseInt(e.target.value))}
                                className="border border-white/10 rounded w-12.5 text-center" 
                                placeholder={`${field.value || field.target || 0}`}
                            />
                        </div>
                    )}
                </div>
            </div>
            <div className="flex flex-col w-full bg-zinc-800 rounded p-2 gap-2">
                <div className="w-full flex items-center justify-between">
                    <label className="text-sm text-white/50">Rest</label>
                </div>
                <div className={`w-full h-2 flex items-center justify-start bg-gray-400/10 rounded`}>
                    <div 
                        style={{ width: `${(1 - timeLeft / 90) * 100}%` }}
                        className="h-full bg-orange-500 rounded">

                    </div>
                </div>
                <div className="w-full flex items-center justify-between">
                    <button onClick={()=>reset()}>
                        <RotateCcw />
                    </button>
                    {isCompleted ? <Check /> : <b>{timeLeft} / 90 s</b>}
                    <button onClick={toggle}>
                        {isRunning ? <Pause /> : <Play />}
                    </button>
                </div>
            </div>
        </div>
    )
}