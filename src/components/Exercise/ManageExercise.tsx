import { ArrowLeft, Save } from "lucide-react";
import { useState } from "react";
import type { ExerciseCategory } from "../../types/types";


const ManageExercise = () => {


    const [name, setName] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [notes, setNotes] = useState<string[]>([])
    const [category, setCategory] = useState<ExerciseCategory>('other')



















    const fieldSetStyles = 'flex flex-col gap-2';
    const inputStyles = 'w-full h-[46px] rounded-lg bg-white/80 px-2 text-zinc-900 border-none';
    const labelStyles = 'text-white/60 font-bold';


    return (
        <div className="w-screen h-screen bg-zinc-950 text-white/80">
            <div className="w-full h-[60px] flex px-4 items-center justify-between">
                <button>
                    <ArrowLeft />
                </button>
                <h1 className="font-bold text-lg">New Exercise</h1>
                <button>
                    <Save />
                </button>
            </div>
            <div className="w-full h-full p-4 flex flex-col overflow-y-auto overflow-x-hidden gap-2">
                <fieldset className={fieldSetStyles}>
                    <label className={labelStyles}>Name</label>
                    <input className={inputStyles} placeholder="Exercise name..." />
                </fieldset>
                <fieldset className={fieldSetStyles}>
                    <label className={labelStyles}>Description</label>
                    <input className={inputStyles} placeholder="Exercise name..." />
                </fieldset>
                <fieldset className={fieldSetStyles}>
                    <label className={labelStyles}>Category</label>
                    <select onChange={(e)=>setCategory(e.target.value as ExerciseCategory)}>
                        <option value={'strength'}>Strength</option>
                        <option value={'cardio'}>Cardio</option>
                        <option value={'mobility'}>Mobility</option>
                        <option value={'isometric'}>Isometric</option>
                        <option value={'plyometric'}>Plyometric</option>
                        <option value={'other'}>Other</option>
                    </select>
                </fieldset>
            </div>
        </div>
    )
}


export default ManageExercise;