import { useEffect, useState } from "react";
import { db } from "../../../db";
import type { Exercise } from "../../../types/types";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Details } from "./Details";
import { Fields } from "./Fields";
import { Equipment } from "./Equipment";
import { Muscles } from "./Muscles";
import { Instructions } from "./Instructions";

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

    return (
        <div className="w-full h-full absolute top-0 left-0 bg-zinc-950 p-4 z-50 text-white grid grid-rows-[50px_50px_auto_50px] gap-2 overflow-y-auto">
            <div className="w-full h-12.5 grid grid-cols-[50px_1fr] items-center">
                <button onClick={close}>
                    <ChevronLeft />
                </button>
                <h1>{exercise.name}</h1>
            </div>
            <div>
                <button onClick={()=>setTab("details")}>Details</button>
                <button onClick={()=>setTab("fields")}>Fields</button>
                <button onClick={()=>setTab("instructions")}>Instructions</button>
                <button onClick={()=>setTab("muscles")}>Muscles</button>
                <button onClick={()=>setTab("equipment")}>Equipment</button>
            </div>
           <div className="w-full h-full overflow-hidden">
            {
                tab === "details" ? <Details exercise={exercise} /> : 
                tab === 'fields' ? <Fields exercise={exercise} /> : 
                tab === 'instructions' ? <Instructions exercise={exercise} /> : 
                tab === 'muscles' ? <Muscles exercise={exercise} /> : 
                tab === 'equipment' ? <Equipment exercise={exercise} /> : 
                <Details exercise={exercise} /> 
            }
           </div>
            <div className="w-full h-12.5 border-t">
                <div className="w-full flex items-center gap-3">
                    <button className="border border-white/10 bg-red-500/90 px-2 text-white rounded">Delete</button>
                    <Link to={id ? `/exercise/${id}/edit` : '#'} className="border border-white/10 bg-zinc-500/90 px-2 text-white rounded">Edit</Link>
                </div>
                <Link to={`/exercise/${exercise._id}/start`} className="bg-orange-400 rounded px-2 py-1 font-bold text-black">Start</Link>
            </div>
        </div>
    );
};

export default ViewExercise;