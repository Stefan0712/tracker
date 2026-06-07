import { Check, Plus, X } from "lucide-react"
import { useMemo, useState } from "react";
import { type MuscleDefinition } from "../../types/types";
import { MUSCLES } from "../../constants/muscles";


interface IProps {
    muscles: MuscleDefinition[];
    addMuscle: (muscle: MuscleDefinition) => void;
    removeMuscle: (muscle: MuscleDefinition) => void;
    close: ()=>void;
}

const MusclePicker: React.FC<IProps> = ({muscles, addMuscle, removeMuscle, close}) => {

    const [query, setQuery] = useState('');

    const toggleMuscle = (muscle: MuscleDefinition) => {
        if(muscles.some(item => muscle._id === item._id)){
            removeMuscle(muscle);
        } else {
            addMuscle(muscle);
        }
    }
    const getOrderedMuscles = ( allMuscles: MuscleDefinition[]): MuscleDefinition[] => {
        return [...allMuscles].sort((a, b) => {
            const aExists = muscles.some(item => item._id === a._id);
            const bExists = muscles.some(item => item._id === b._id);

            return (bExists ? 1 : 0) - (aExists ? 1 : 0);
        });
    };

    const results = useMemo(()=>{
        return getOrderedMuscles(MUSCLES.filter(i=>i.name.toLowerCase().includes(query.trim().toLowerCase())));
    },[query])
    return (
        <div className="modal h-full grid grid-rows-[50px_1fr_50px_50px] gap-3">
            <div className="w-full h-12.5 flex items-center justify-between">
                <h1>Muscles</h1>
                <button onClick={close}>
                    <X />
                </button>
            </div>
            <div className="bg-zinc-800 flex flex-col overflow-y-auto p-2 rounded">
                {results?.length > 0 ? results.map((item: MuscleDefinition)=><div key={item._id} className="w-full h-12 shrink-0 grid grid-cols-[1fr_40px]">
                    <b>{item.name}</b>
                    <button onClick={()=>toggleMuscle(item)}>
                        {muscles.some(muscle => muscle._id === item._id) ? <Check /> : <Plus />}
                    </button>
                </div>) : <p>No muscles to show</p>}
            </div>
            <div className="w-full h-12.5 grid grid-cols-[1fr_50px] gap-2">
                <input type="text" className="text-input" value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Muscle name"/>
                <button className="primary-button">
                    <Plus />
                </button>
            </div>
            <button className="secondary-button" onClick={close}>Close</button>
        </div>
    )
}


export default MusclePicker;