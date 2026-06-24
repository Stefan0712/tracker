import { useEffect, useState } from "react";
import { db } from "../../db";
import type { Exercise } from "../../types/types";

interface ExerciseProps {
    id: string;
}

const ViewExercise: React.FC<ExerciseProps> = ({ id }) => {
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

    return (
        <div className="w-full h-full absolute top-0 left-0 bg-zinc-950 p-4 z-50 text-white flex flex-col gap-2">
            <h1>{exercise.name}</h1>
            <div className={`${section}`}>
                <label>Exercise ID</label>
                <b className="text-zinc-500 text-sm">{id}</b>
            </div>
            <div className={`${section}`}>
                <label>Description</label>
                <p>{exercise._id}</p>
            </div>
            <div className={`${section}`}>
                <label>Category</label>
                <p>{exercise.category}</p>
            </div>
            <div className={`${section}`}>
                <label>Muscles</label>
                <p>{exercise.muscles?.length > 0 ? }</p>
            </div>
        </div>
    );
};

export default ViewExercise;