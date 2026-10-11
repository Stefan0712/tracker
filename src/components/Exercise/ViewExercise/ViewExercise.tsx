import { useEffect, useState } from "react";
import { db } from "../../../db";
import type { Exercise } from "../../../types/types";
import { Link } from "react-router-dom";
import { BicepsFlexed, ChevronLeft, Dumbbell, Edit, Info, List, Trash2 } from "lucide-react";
import { Details } from "./Details";
import { Fields } from "./Fields";
import { Equipment } from "./Equipment";
import { Muscles } from "./Muscles";

interface ExerciseProps {
    id: string;
    close: ()=>void;
}

const ViewExercise: React.FC<ExerciseProps> = ({ id, close }) => {
    const [exercise, setExercise] = useState<Exercise | null>(null);
    const [loading, setLoading] = useState(true);
    const [tab, setTab] = useState<string>('details');

    useEffect(() => {
        setLoading(true);
        
        db.exercises.get(id)
            .then((data) => {
                setExercise(data ?? null);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Failed to fetch exercise:", err);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <div className="text-white p-4">Loading exercise...</div>;
    }

    if (!exercise) {
        return <div className="text-white p-4">Exercise not found (ID: {id})</div>;
    }
    const tabStyles = 'opacity-50 flex items-center gap-1'
    return (
        <div className="w-full h-full absolute top-0 left-0 bg-zinc-950 p-4 z-50 text-white grid grid-rows-[50px_50px_auto_50px] gap-2 overflow-y-auto">
            <div className="w-full h-12.5 grid grid-cols-[50px_1fr] items-center justify-center">
                <button onClick={close}>
                    <ChevronLeft />
                </button>
                <h1>{exercise.name}</h1>
            </div>
            <div className="w-full grid grid-cols-4">
                <button className={tabStyles} onClick={()=>setTab("details")}><Info size={12} /> Details</button>
                <button className={tabStyles} onClick={()=>setTab("fields")}><List size={12} /> Fields</button>
                <button className={tabStyles} onClick={()=>setTab("muscles")}><BicepsFlexed size={12} />  Muscles</button>
                <button className={tabStyles} onClick={()=>setTab("equipment")}><Dumbbell size={12} /> Equipment</button>
            </div>
           <div className="w-full h-full overflow-hidden">
            {
                tab === "details" ? <Details exercise={exercise} /> : 
                tab === 'fields' ? <Fields exercise={exercise} /> : 
                tab === 'muscles' ? <Muscles exercise={exercise} /> : 
                tab === 'equipment' ? <Equipment exercise={exercise} /> : 
                <Details exercise={exercise} /> 
            }
           </div>
            <div className="w-full h-12.5 flex items-center justify-between">
                <div className="w-full flex items-center gap-3">
                    <button className=" bg-red-500/90 w-10 h-10 flex items-center justify-center text-white rounded"><Trash2 /></button>
                    <Link to={id ? `/exercise/${id}/edit` : '#'} className="bg-zinc-500/90 w-10 h-10 flex items-center justify-center text-white rounded"><Edit /></Link>
                </div>
                <Link to={`/exercise/${exercise._id}/start`} className="bg-purple-700 rounded h-10 w-full flex items-center justify-center font-bold text-white">Start</Link>
            </div>
        </div>
    );
};

export default ViewExercise;