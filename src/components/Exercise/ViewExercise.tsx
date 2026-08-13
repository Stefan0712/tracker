import { useEffect, useState } from "react";
import { db } from "../../db";
import type { Exercise } from "../../types/types";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

interface ExerciseProps {
    id: string;
    close: ()=>void;
}

const ViewExercise: React.FC<ExerciseProps> = ({ id, close }) => {
    const [exercise, setExercise] = useState<Exercise | null>(null);
    const [loading, setLoading] = useState(true);

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

    const section = 'rounded-lg bg-zinc-900 p-4 flex flex-col gap-1';
    const listItem = 'px-2 text-sm text-white/50';
    const list = 'flex gap-1 flex-wrap';

    return (
        <div className="w-full h-full absolute top-0 left-0 bg-zinc-950 p-4 z-50 text-white flex flex-col gap-2 overflow-y-auto">
            <div className="w-full h-[50px] grid grid-cols-[50px_1fr]">
                <button onClick={close}>
                    <ChevronLeft />
                </button>
                <h1>{exercise.name}</h1>
                <Link to={`/exercise/${exercise._id}/start`}>Start</Link>
            </div>
            <div className={`${section}`}>
                <label>Exercise ID</label>
                <b className="text-zinc-500 text-sm">{id}</b>
            </div>
            <div className="w-full flex justify-between items-center gap-3">
                <button className="border border-white/10 bg-red-500/90 px-2 text-white rounded">Delete</button>
                <Link to={id ? `/exercise/${id}/edit` : '#'} className="border border-white/10 bg-zinc-500/90 px-2 text-white rounded">Edit</Link>
            </div>
            <div className={`${section}`}>
                <label>Description</label>
                <p>{exercise._id}</p>
            </div>
            <div className={`${section}`}>
                <label>Description</label>
                <p>Created at {exercise.createdAt}</p>
                <p>Updated at {exercise.updatedAt}</p>
            </div>
            <div className={`${section}`}>
                <div className="flex flex-col gap-1">
                    <label>Duration</label>
                    <p>{exercise.estimatedDuration} s</p>
                </div>
                <div className="flex flex-col gap-1">
                    <label>Private</label>
                    <p>{exercise.isPrivate ? "True" : "False"}</p>
                </div>
                <div className="flex flex-col gap-1">
                    <label>Shared</label>
                    <p>{exercise.isShared ? "Shared" : "Not Shared"}</p>
                </div>
                <div className="flex flex-col gap-1">
                    <label>Curated</label>
                    <p>{exercise.isCurated ? "Curated" : "Not Curated"}</p>
                </div>
                <div className="flex flex-col gap-1">
                    <label>Unilateral</label>
                    <p>{exercise.isUnilateral ? "Unilateral" : "Not Unilateral"}</p>
                </div>
            </div>
            <div className={`${section}`}>
                <label>Category</label>
                <p>{exercise.category}</p>
            </div>
            <div className={`${section}`}>
                <label>Muscles</label>
                <div className={list}>{exercise.muscles && exercise.muscles?.length > 0 ? exercise.muscles?.map(item=><p key={item._id} className={listItem}>{item.name}</p>): <p>No muscles </p>}</div>
            </div>
            <div className={`${section}`}>
                <label>Tags</label>
                <div className={list}>{exercise.tags && exercise.tags?.length > 0 ? exercise.tags?.map(item=><p key={item} className={listItem}>{item}</p>): <p>No tags </p>}</div>
            </div>
            <div className={`${section}`}>
                <label>Equipment</label>
                <div className={list}>{exercise.equipment && exercise.equipment?.length > 0 ? exercise.equipment?.map(item=><p key={item._id} className={listItem}>{item.name}</p>): <p>No equipment </p>}</div>
            </div>
            <div className={`${section}`}>
                <label>Fields</label>
                <div className={list}>{exercise.trackingFields && exercise.trackingFields?.length > 0 ? exercise.trackingFields?.map(item=><p key={item._id} className={listItem}>{item.target} {item.unit ?? ''}</p>): <p>No fields </p>}</div>
            </div>
            <div className={`flex flex-col gap-2 ${section}`}>
                <label>Instructions</label>
                <div className={list}>{exercise.instructions && exercise.instructions?.length > 0 ? exercise.instructions?.map(item=><p key={item} className={`${listItem} border-transparent pb-1 border-b-white/10 border`}>{item}</p>): <p>No instructions </p>}</div>
            </div>
            <div className={`flex flex-col gap-2 ${section}`}>
                <label>Notes</label>
                <div className={list}>{exercise.notes && exercise.notes?.length > 0 ? exercise.notes?.map(item=><p key={item} className={`${listItem} border-transparent pb-1 border-b-white/10 border`}>{item}</p>): <p>No notes </p>}</div>
            </div>
        </div>
    );
};

export default ViewExercise;