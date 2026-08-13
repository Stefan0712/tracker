import { ArrowLeft, Plus, Save, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { type MuscleDefinition, type ExerciseCategory, type Equipment, type TrackingField, type NumberUnit, type TimeUnit, type Unit, ALL_UNITS, type Exercise, type ExerciseDifficulty } from "../../types/types";
import MusclePicker from "../modals/MusclePicker";
import EquipmentPicker from "../modals/EquipmentPicker";
import ObjectID from "bson-objectid";
import { db } from "../../db";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "../../context/ToastContext";


const ManageExercise = () => {

    const {id} = useParams();

    const navigate = useNavigate();
    const { addToast } = useToast();

    const [existingItem, setExistingItem] = useState<null | Exercise>(null)


    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [difficulty, setDifficulty] = useState<ExerciseDifficulty>('Beginner');
    const [estimatedDuration, setEstimatedDuration] = useState(0);

    const [category, setCategory] = useState<ExerciseCategory>('strength');
    const [muscles, setMuscles] = useState<MuscleDefinition[]>([])

    const [showNewTag, setShowNewTag] = useState(false);
    const [tags, setTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState<string>('')

    const [showMusclePicker, setShowMusclePicker] = useState(false);


    const [equipment, setEquipment] = useState<Equipment[]>([]);
    const [equipmentName, setEquipmentName] = useState('');
    const [showEquipmentInput, setShowEquipmentInput] = useState(false);
    const [showEquipmentPicker, setShowEquipmentPicker] = useState(false);


    const [fields, setFields] = useState<TrackingField[]>([]);
    const [showNewField, setShowNewField] = useState(false);
    const [fieldName, setFieldName] = useState('')
    const [fieldTarget, setFieldTarget] = useState<number>(0)
    const [fieldUnit, setFieldUnit] = useState<NumberUnit | TimeUnit>('kg');
    const [showTargetInput, setShowTargetInput] = useState(false);


    const [instructions, setInstructions] = useState<string[]>([]);
    const [showNewInstruction, setShowNewInstruction] = useState(false);
    const [instructionInput, setInstructionInput] = useState('');
    

    const [notes, setNotes] = useState<string[]>([]);
    const [noteInput, setNoteInput] = useState('')
    const [showNewNote, setShowNewNote] = useState(false);


    const populateFields = async (itemId: string) => {
        try {
            const exerciseData = await db.exercises.get(itemId);
            if(exerciseData){
                setExistingItem(exerciseData);

                // Populate individual states

                setName(exerciseData.name);
                setDescription(exerciseData.description ?? '');
                setDifficulty(exerciseData.difficulty);
                setEstimatedDuration(exerciseData.estimatedDuration ?? 0);
                setCategory(exerciseData.category);
                setMuscles(exerciseData.muscles ?? []);
                setTags(exerciseData.tags ?? []);
                setEquipment(exerciseData.equipment ?? []);
                setFields(exerciseData.trackingFields ?? []);
                setInstructions(exerciseData.instructions ?? []);
                setNotes(exerciseData.notes ?? []);
            } else {
                addToast("Exercise is invalid.", "error");
            }
        } catch (error) {
            console.error(error)
            addToast("There has been an error fetching the exercise", "error");
        }
    }


    useEffect(()=>{
        if(id){
            populateFields(id);
        }
    }, [id])

    const handleAddInstruction = () => {
        if(instructionInput.length > 0) {
            setInstructions(prev=>[...prev, instructionInput])
            setInstructionInput('')
        }
    }

    const handleAddNote = () => {
        if(noteInput.length > 0) {
            setNotes(prev=>[...prev, noteInput])
            setNoteInput('')
        }
    }


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

    const handleAddField = () => {
        if(fieldName.length > 0 ){
            let newField: TrackingField = {
                _id: ObjectID().toHexString(),
                name: fieldName,
                target: fieldTarget,
                unit: fieldUnit,
                isRequired: true
            }
            setFields(prev=>[...prev, newField]);

            //Reset inputs
            setFieldName('');
            setFieldUnit('kg');
            setFieldTarget(0);
        };


    }
    const handleCreateExercise = async () => {
        if(name.length > 0 && category && difficulty) {
            const dateNow = new Date().toISOString();
            const newExercise: Exercise = {
                _id: existingItem && existingItem._id ? existingItem._id : ObjectID().toHexString(),
                name,
                description,
                category,
                muscles,
                tags,
                difficulty,
                equipment,
                trackingFields: fields,
                instructions, 
                estimatedDuration,
                notes,
                authorId: 'local',
                isCurated: false,
                isPrivate: true,
                isShared: false,
                createdAt: dateNow,
                updatedAt: dateNow
            }
            console.log(newExercise)
            await db.exercises.put(newExercise);
            navigate('/library')
        } else {
            addToast('Name, category, or difficulty is invalid.', "error");
        }
    }
    return (
        <div className="w-screen h-dvh grid grid-rows-[60px_1fr] bg-zinc-950 text-white/80 overflow-hidden">
                <div className="w-full h-15 flex px-4 items-center justify-between">
                    <button onClick={()=>navigate('/library')}>
                        <ArrowLeft />
                    </button>
                    <h1 className="font-bold text-lg">New Exercise</h1>
                    <button onClick={handleCreateExercise}>
                        <Save />
                    </button>
                </div>
                <div className="w-full h-full p-4 flex flex-col overflow-y-auto overflow-x-hidden gap-4 pb-6">
                    <fieldset className={'fieldset'}>
                        <label className={'label'}>Name</label>
                        <input className='text-input' placeholder="Exercise name..." value={name} onChange={(e)=>setName(e.target.value)}/>
                    </fieldset>
                    <fieldset className={'fieldset'}>
                        <label className={'label'}>Description</label>
                        <input className='text-input' placeholder="Exercise description..." value={description} onChange={(e)=>setDescription(e.target.value)}/>
                    </fieldset>
                    <div className="w-full grid grid-cols-[1fr_1fr_1fr] gap-2">
                        <fieldset className={'fieldset'}>
                            <label className={'label'}>Category</label>
                            <select 
                                className="option-input" 
                                onChange={(e)=>setCategory(e.target.value as ExerciseCategory)}
                                value={category}
                            >
                                <option value={'strength'} className="bg-zinc-900">Strength</option>
                                <option value={'cardio'} className="bg-zinc-900">Cardio</option>
                                <option value={'mobility'} className="bg-zinc-900">Mobility</option>
                                <option value={'isometric'} className="bg-zinc-900">Isometric</option>
                                <option value={'plyometric'} className="bg-zinc-900">Plyometric</option>
                                <option value={'other'} className="bg-zinc-900">Other</option>
                            </select>
                        </fieldset>
                        <fieldset className={'fieldset'}>
                            <label className={'label'}>
                                Difficulty
                            </label>
                            <select className="option-input" value={difficulty} onChange={(e)=>setDifficulty(e.target.value as ExerciseDifficulty)}>
                                <option value={'Beginner'}>Beginner</option>
                                <option value={'Intermediate'}>Intermediate</option>
                                <option value={'Advanced'}>Advanced</option>
                            </select>
                        </fieldset>
                        <fieldset className="fieldset">
                            <label>Duration (s)</label>
                            <input type="number" className="option-input" min={0} max={9999} value={estimatedDuration} onChange={(e)=>setEstimatedDuration(parseInt(e.target.value))}/>
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


                    {/* Tracking fields */}
                    <fieldset className="form-section">
                        <div className="w-full h-12 flex justify-between items-center">
                            <label>Fields</label>
                            <button onClick={()=>setShowNewField(prev=>!prev)}>
                                {showNewField ? <X /> : <Plus />}
                            </button>
                        </div>
                        <div className="w-full flex flex-col gap-2">
                            {fields?.length > 0 ? fields.map(field=><div key={field._id} className="w-full grid grid-cols-[2fr_1fr_1fr_30px] h-12 items-center bg-zinc-900 rounded pl-2 gap-2">
                                <b>{field.name}</b>
                                <p>{field.target ?? 'No target'}</p>
                                <p>{field.unit ?? 'No unit'}</p>
                                <button onClick={()=>setFields(prev=>[...prev.filter(i=>i._id !== field._id)])}>
                                    <X />
                                </button>
                            </div>) : <p>No fields added.</p>}
                        </div>
                        {showNewField ? <div className="w-full h-18 gap-2 flex flex-col">
                            <div className="items-center grid grid-cols-[2fr_1fr_1fr_40px] gap-2">
                                <input 
                                    type="text" 
                                    className="text-input" 
                                    placeholder="Name" 
                                    onChange={(e)=>setFieldName(e.target.value)} 
                                    value={fieldName}
                                />
                                {showTargetInput ? <input 
                                    type="number" 
                                    className="text-input" 
                                    placeholder="Target" 
                                    onChange={(e)=>setFieldTarget(parseInt(e.target.value))} 
                                    value={fieldTarget}
                                    
                                /> : null}
                                <div className="flex flex-col gap-1.5">
                                    <select 
                                        value={fieldUnit}
                                        onChange={(e) => setFieldUnit(e.target.value as Unit)}
                                        className="option-input"
                                    >
                                        {ALL_UNITS.map((unit) => (<option key={unit} value={unit}>{unit}</option>))}
                                    </select>
                                </div>
                                <button className="w-full h-full flex items-center justify-center" onClick={handleAddField}>
                                    <Plus />
                                </button>
                            </div>

                            <fieldset className="flex gap-2 items-center">
                                <input type="checkbox" checked={showTargetInput} onChange={(e)=>setShowTargetInput(e.target.checked)} />
                                <label>Show target input</label>
                            </fieldset>
                        </div> : null}
                    </fieldset>

                    {/* Instructions */}
                    <fieldset className="form-section">
                        <div className="w-full h-12 flex justify-between items-center">
                            <label>Instructions</label>
                            <button onClick={()=>setShowNewInstruction(prev=>!prev)}>
                                {showNewInstruction ? <X /> : <Plus />}
                            </button>
                        </div>
                        {instructions?.length > 0 ? <div className="flex flex-wrap gap-2 items-center">
                            {instructions.map(i=>
                            <div key={i} className="w-full grid grid-cols-[1fr_30px] gap-2">
                                <p>{i}</p>
                                <button onClick={()=>setInstructions(prev=>prev.filter(item=>item!==i))}>
                                    <X />
                                </button>
                            </div>
                        )}
                        </div> : <p>No instructions</p>}
                        {showNewInstruction ? <div className="w-full h-12.5 gap-4 grid grid-cols-[1fr_50px]">
                            <input 
                                type="text" 
                                className="text-input" 
                                placeholder="Instruction..." 
                                onChange={(e)=>setInstructionInput(e.target.value)} 
                                value={instructionInput}
                            />
                            <button className="w-full h-full flex items-center justify-center" onClick={handleAddInstruction}>
                                <Plus />
                            </button>
                        </div> : null}
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
        </div>
    )
}


export default ManageExercise;