import { Image, Plus, Search, Video, X } from "lucide-react";
import { useState, type Dispatch, type SetStateAction } from "react";
import MusclePicker from "../../modals/MusclePicker";
import EquipmentPicker from "../../modals/EquipmentPicker";
import type { Equipment, MuscleDefinition } from "../../../types/types";



interface IProps {
    imageUrl: string;
    videoUrl: string;
    muscles: MuscleDefinition[];
    tags: string[];
    equipment: Equipment[];
    notes: string[];
    estimatedDuration: number;
    description: string;

    setMuscles: Dispatch<SetStateAction<MuscleDefinition[]>>;
    setTags: Dispatch<SetStateAction<string[]>>;
    setEquipment: Dispatch<SetStateAction<Equipment[]>>;
    setNotes: Dispatch<SetStateAction<string[]>>;
    setImageUrl: Dispatch<SetStateAction<string>>;
    setVideoUrl: Dispatch<SetStateAction<string>>;
    setEstimatedDuration: Dispatch<SetStateAction<number>>;
    setDescription: Dispatch<SetStateAction<string>>;
}



export const DetailsTab: React.FC<IProps> = ({
        imageUrl, videoUrl, muscles, tags, equipment, notes, estimatedDuration, description,
        setImageUrl, setVideoUrl, setMuscles, setTags, setEquipment, setNotes, setEstimatedDuration, setDescription
    }) => {



    const [showMusclePicker, setShowMusclePicker] = useState(false);
    const [showNewTag, setShowNewTag] = useState(false);
    const [tagInput, setTagInput] = useState<string>('');
    const [equipmentName, setEquipmentName] = useState('');
    const [showEquipmentInput, setShowEquipmentInput] = useState(false);
    const [showEquipmentPicker, setShowEquipmentPicker] = useState(false);
    const [noteInput, setNoteInput] = useState('')
    const [showNewNote, setShowNewNote] = useState(false);    


    const handleAddTag = () => {
        if(tagInput.length > 3) {
            setTags(prev=>[...prev, tagInput]);
            setTagInput('');
        }
    }
    const handleTagKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if(event.key === "Enter") {
            event.preventDefault();
            handleAddTag();
        }
    }
    const handleAddNote = () => {
        if(noteInput.length > 0) {
            setNotes(prev=>[...prev, noteInput])
            setNoteInput('')
        }
    }



    return (
        <div className="w-full h-full p-4 flex flex-col overflow-y-auto overflow-x-hidden gap-4 pb-6">
            <fieldset className={'fieldset'}>
                <label className={'label'}>Description</label>
                <input className='text-input' placeholder="Exercise description..." value={description} onChange={(e)=>setDescription(e.target.value)}/>
            </fieldset>
            <fieldset className="fieldset">
                <label>Duration (s)</label>
                <input type="number" className="option-input" min={0} max={9999} value={estimatedDuration} onChange={(e)=>setEstimatedDuration(parseInt(e.target.value))}/>
            </fieldset>
             <div className="form-section">
                <label>References</label>
                <fieldset className={'fieldset'}>
                    <label className={'label w-full flex gap-2'}><Video /> <p>Video URL</p></label>
                    <input className='text-input' placeholder="Exercise name..." value={videoUrl} onChange={(e)=>setVideoUrl(e.target.value)}/>
                </fieldset>
                <fieldset className={'fieldset'}>
                    <label className={'label w-full flex gap-2'}><Image/> <p>Image URL</p></label>
                    <input className='text-input' placeholder="Exercise name..." value={imageUrl} onChange={(e)=>setImageUrl(e.target.value)}/>
                </fieldset>
             </div>

            <fieldset className="form-section">
                <div className="w-full mb-2 flex justify-between items-center">
                    <label>Tags</label>
                    <button onClick={()=>setShowNewTag(prev=>!prev)}>
                        {showNewTag ? <X /> : <Plus />}
                    </button>
                </div>
                {tags?.length > 0 ? <div className="flex flex-wrap gap-2 items-center">
                    {tags.map(tag=>
                    <div key={tag} className="tag-item">
                        <p>{tag}</p>
                        <button onClick={()=>setTags(prev=>prev.filter(item=>item!==tag))}>
                            <X />
                        </button>
                    </div>
                )}
                </div> : <p>No tags added</p>}
                {showNewTag ? <div className="w-full h-12.5 gap-4 grid grid-cols-[1fr_50px]">
                    <input 
                        type="text" 
                        className="text-input" 
                        placeholder="Tag name..." 
                        onChange={(e)=>setTagInput(e.target.value)} 
                        value={tagInput}
                        onKeyDown={handleTagKeyDown}
                    />
                    <button className="w-full h-full flex items-center justify-center" onClick={handleAddTag}>
                        <Plus />
                    </button>
                </div> : null}

            </fieldset>
            <fieldset className="form-section">
                <div className="w-full flex items-center justify-between h-12">
                    <label>Muscles</label>
                    <button onClick={()=>setShowMusclePicker(true)}>
                        <Plus />
                    </button>
                </div>
                <div className="flex flex-wrap gap-2 items-center">
                    {muscles?.length > 0 ? muscles.map(muscle=><p key={muscle._id}>{muscle.name}</p>) : <p>No muscles selected.</p>}
                </div>
                {showMusclePicker ? 
                    <MusclePicker
                        close={()=>setShowMusclePicker(false)}
                        muscles={muscles}
                        addMuscle={(muscle)=>setMuscles(prev=>[...prev, muscle])}
                        removeMuscle={(muscle)=>setMuscles(prev=>[...prev.filter(item=>item._id !== muscle._id)])}
                    /> 
                : null }
            </fieldset>
            <fieldset  className="form-section">
                <div className="w-full h-12 flex justify-between items-center">
                    <label>Equipment</label>
                    <button onClick={()=>setShowEquipmentInput(prev=>!prev)}>
                        {showEquipmentPicker ? <X /> : <Plus />}
                    </button>
                </div>
                {equipment?.length > 0 ? <div className="flex flex-wrap gap-2 items-center">
                    {equipment.map(item=>
                    <div key={item._id} className="tag-item">
                        <p>{item.name}</p>
                        <button onClick={()=>setEquipment(prev=>prev.filter(eq=>item._id!==eq._id))}>
                            <X />
                        </button>
                    </div>
                )}
                </div> : <p>No equipment selected</p>}
                {showEquipmentInput ? <div className="w-full h-12.5 gap-3 items-center grid grid-cols-[50px_1fr_30px]">
                    <button className="secondary-button" onClick={()=>setShowEquipmentPicker(true)}>
                        <Search />
                    </button>
                    <input 
                        type="text" 
                        className="text-input" 
                        placeholder="Equipment name..." 
                        onChange={(e)=>setEquipmentName(e.target.value)} 
                        value={equipmentName}
                    />
                    <button className="w-full h-full flex items-center justify-center" onClick={()=>console.log('Eq added')}>
                        <Plus />
                    </button>
                </div> : null}
                {showEquipmentPicker ? 
                    <EquipmentPicker
                        close={()=>setShowEquipmentPicker(false)}
                        equipment={equipment}
                        addEquipment={(eq)=>setEquipment(prev=>[...prev, eq])}
                        removeEquippment={(eq)=>setEquipment(prev=>[...prev.filter(item=>item._id !== eq._id)])}
                    /> 
                : null }

            </fieldset>
            {/* Notes */}
            <fieldset className="form-section">
                <div className="w-full h-12 flex justify-between items-center">
                    <label>Notes</label>
                    <button onClick={()=>setShowNewNote(prev=>!prev)}>
                        {showNewNote ? <X /> : <Plus />}
                    </button>
                </div>
                {notes?.length > 0 ? <div className="flex flex-wrap gap-2 items-center">
                    {notes.map(i=>
                    <div key={i} className="w-full grid grid-cols-[1fr_30px] gap-2">
                        <p>{i}</p>
                        <button onClick={()=>setNotes(prev=>prev.filter(item=>item!==i))}>
                            <X />
                        </button>
                    </div>
                )}
                </div> : <p>No notes</p>}
                {showNewNote ? <div className="w-full h-12.5 gap-4 grid grid-cols-[1fr_50px]">
                    <input 
                        type="text" 
                        className="text-input" 
                        placeholder="Note..." 
                        onChange={(e)=>setNoteInput(e.target.value)} 
                        value={noteInput}
                    />
                    <button className="w-full h-full flex items-center justify-center" onClick={handleAddNote}>
                        <Plus />
                    </button>
                </div> : null}

            </fieldset>
        </div>
    )
}