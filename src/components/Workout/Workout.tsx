import { Check, ChevronLeft, ChevronRight, Flag, Info, List, Pause, Play, Plus, RotateCcw, Save, StickyNote } from "lucide-react"
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { type RunningSet, type Log, type Workout as IWorkout, type WorkoutExercise } from "../../types/types";
import { db } from "../../db";
import ObjectID from "bson-objectid";
import { useCountdown } from "../../hooks/useCountdown";
import { useTimer } from "../../hooks/useTimer";
import { useToast } from "../../context/ToastContext";


const Workout = () => {

    const {id} = useParams();
    const {addToast} = useToast();
    const navigate = useNavigate();

    const {toggle, isRunning, formattedTime, seconds} = useTimer();

    const [workout, setWorkout] = useState<IWorkout | null>(null);
    const [exercises, setExercises] = useState<WorkoutExercise[]>([]);
    const [selectedExerciseId, setSelectedExerciseId] = useState<string>('')
    
    const startedAt = new Date();

    useEffect(()=>{
        if(id) {
            getWorkoutData(id);
        }
    },[id])

    const getWorkoutData = async (id: string) => {
        if (!id) return;

        try {
            const workoutData: IWorkout | undefined = await db.workouts.get(id);

            if (workoutData) {

                setWorkout(workoutData); 
                setExercises(workoutData.exercises.map((ex) => ({...ex,
                    sets: [
                            {
                            _id: ObjectID().toHexString(),
                            order: 1,
                            fields: ex.trackingFields || [],
                            },
                        ],
                    }
                )))
                setSelectedExerciseId(workoutData.exercises[0]._id)
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleAddSet = (exerciseId: string) => {
        setExercises(prev=>[...prev.map(e=>e._id === exerciseId ? 
            {
                ...e, 
                sets: [
                    ...e.sets,
                    {_id: ObjectID().toHexString(), order: currentExercise ? currentExercise.sets.length + 1 : 1, fields: e?.trackingFields || []}
                ]
            } : e
        )])
    }
    // Set template: {_id: ObjectID().toHexString(), order: sets.length + 1, fields: exercise?.trackingFields || []}


   const handleUpdateValue = ( exerciseId: string, setId: string, fieldId: string, newValue: number ) => {
        setExercises((prev) =>
            prev.map((exercise) =>
            exercise._id === exerciseId
                ? {
                    ...exercise,
                    sets: exercise.sets.map((set) =>
                    set._id === setId
                        ? {
                            ...set,
                            fields: set.fields.map((field) =>
                            field._id === fieldId
                                ? { ...field, value: newValue }
                                : field
                            ),
                        }
                        : set
                    ),
                }
                : exercise
            )
        );
    };

    const handleFinishWorkout = async () => {
        if(workout) {
            try {
                const workoutLog: Log = {
                    _id: ObjectID().toHexString(),
                    createdAt: new Date(),
                    type: 'workout',
                    data: {
                        sourceId: workout?._id,
                        content: exercises,
                        startedAt,
                        finishedAt: new Date(),
                        duration: seconds,
                        name: workout?.name,
                        muscles: workout?.muscles || [],
                        tags: workout?.tags || [],
                    }
                }
                await db.logs.add(workoutLog);
                navigate('/library');
                addToast("Workout finished!", "success");
            } catch (error) {
                console.error(error)
                addToast("Failed to finish workout", "error")
            }
            
        }

    }

    const currentExercise = useMemo(()=>{
        return exercises.find(item=>item._id === selectedExerciseId);
    },[exercises, selectedExerciseId])


    const { prevExercise, nextExercise } = useMemo(() => {
        const currentIndex = exercises.findIndex((ex) => ex._id === selectedExerciseId);

        if (currentIndex === -1) {
            return { prevExercise: null, nextExercise: null };
        }

        return {
            prevExercise: exercises[currentIndex - 1] ?? null,
            nextExercise: exercises[currentIndex + 1] ?? null,
        };
    }, [exercises, selectedExerciseId]);


    if (!workout) return <h1>Loading exercise...</h1>
    return (
        <div className="w-screen h-screen grid grid-rows-[50px_50px_1fr_50px_50px] bg-zinc-900 text-white">
            <div className="h-12.5 grid grid-cols-[1fr_50px] p-2 gap-2">
                <h1>{workout.name}</h1>
                <button onClick={handleFinishWorkout}>
                    <Flag />
                </button>
            </div>
            <div className="w-full h-12.5 grid grid-cols-[100px_1fr_100px] items-center justify-center">
                <button className="flex flex-col items-center justify-center" onClick={()=>prevExercise ? setSelectedExerciseId(prevExercise._id) : null}>
                    <ChevronLeft />
                    <p className="text-sm opacity-50 truncate max-w-25">{prevExercise?.name || 'Start'}</p>
                </button>
                <h1 className="flex items-center justify-center" onClick={()=>console.log(currentExercise)}>{currentExercise?.name || "Unnamed Exercise"}</h1>
                <button className="flex flex-col items-center justify-center" onClick={()=>nextExercise ? setSelectedExerciseId(nextExercise._id) : null}>
                    <ChevronRight />
                    <p className="text-sm opacity-50 truncate max-w-25">{nextExercise?.name || 'End'}</p>
                </button>
            </div>
            <div className="w-full h-full flex flex-col overflow-y-auto p-3 gap-4">
                {currentExercise?.sets && currentExercise.sets.length > 0
                ? currentExercise.sets.map((set) => (
                    <Set key={set._id} set={set} exerciseId={currentExercise._id} handleUpdateValue={handleUpdateValue} />
                    ))
                : null}                
                <div className="w-full p-2 grid grid-cols-2 items-center justify-center rounded-lg bg-zinc-800">
                    <button className="flex gap-1 items-center justify-center border border-transparent border-r-white/10" ><Plus size={12} /> <p>Break</p> </button> 
                    <button className="flex gap-1 items-center justify-center" onClick={()=>handleAddSet(selectedExerciseId)}><Plus size={12} /> <p>Set</p> </button>
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


export default Workout;


const Set = ({set, handleUpdateValue, exerciseId}: {set: RunningSet, handleUpdateValue: (exerciseId: string, setId: string, fieldId: string, newValue: number) => void, exerciseId: string}) => {

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
                                onChange={(e)=>handleUpdateValue(exerciseId, set._id, field._id, parseInt(e.target.value))}
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