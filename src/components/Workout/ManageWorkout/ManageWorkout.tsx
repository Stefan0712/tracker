import { useState } from "react"
import type { Equipment, MuscleDefinition, WorkoutExercise } from "../../../types/types";
import { Link } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import { DetailsTab } from "./DetailsTab";
import { ExercisesTab } from "./ExercisesTab";
import { useToast } from "../../../context/ToastContext";


const ManageWorkout = () => {

    const { addToast } = useToast();

    const [currentTab, setCurrentTab] = useState('details')

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    const [estimatedDuration, setEstimatedDuration] = useState(0);
    const [imageUrl, setImageUrl] = useState('')
    const [videoUrl, setVideoUrl] = useState('')
    
    const [exercises, setExercises] = useState<WorkoutExercise[]>([]);
    
    const [muscles, setMuscles] = useState<MuscleDefinition[]>([])

    const [tags, setTags] = useState<string[]>([]);
    
    const [equipment, setEquipment] = useState<Equipment[]>([]);
    
    const [notes, setNotes] = useState<string[]>([]);







    return (
        <div className="w-screen h-screen grid grid-rows-[var(--header-height)_50px_50px_1fr] gap-2 bg-main text-white overflow-hidden">
            <div className="h-(--header-height) w-full grid grid-cols-[50px_1fr_50px] items-center justify-center px-2">
                <Link to={'/library'} className="flex items-center justify-center"><ArrowLeft /></Link>
                <h1 className="w-full text-center">New Workout</h1>
                <button className="flex items-center justify-center"><Save /></button>
            </div>
            <fieldset className="px-4 h-12.5">
                <input className='text-input' placeholder="Workout Name" value={name} onChange={(e)=>setName(e.target.value)}/>
            </fieldset>
            <div className="w-full h-12.5 flex items-center gap-2 px-4">
                <button className={`py-1 px-2 rounded ${currentTab === 'details' ? 'bg-zinc-700' : ''}`} onClick={()=>setCurrentTab('details')}>Details</button>
                <button className={`py-1 px-2 rounded ${currentTab === 'exercises' ? 'bg-zinc-700' : ''}`} onClick={()=>setCurrentTab('exercises')}>Exercises</button>
            </div>
            <div className="w-full h-full overflow-hidden">
                {currentTab === 'details' ? 
                    <DetailsTab 
                        imageUrl={imageUrl}
                        videoUrl={videoUrl}
                        muscles={muscles}
                        tags={tags}
                        equipment={equipment}
                        notes={notes}
                        estimatedDuration={estimatedDuration}
                        description={description}

                        setVideoUrl={setVideoUrl}
                        setImageUrl={setImageUrl}
                        setMuscles={setMuscles}
                        setTags={setTags}
                        setEquipment={setEquipment}
                        setNotes={setNotes}
                        setEstimatedDuration={setEstimatedDuration}
                        setDescription={setDescription}
                    /> : 
                    <ExercisesTab 

                    />
                }
            </div>
        </div>
    )


}



export default ManageWorkout;