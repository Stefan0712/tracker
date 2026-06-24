import { Check, Plus, X } from "lucide-react"
import { useMemo, useState } from "react";
import { type BodyRegion, type MuscleDefinition } from "../../types/types";
import { MUSCLES } from "../../constants/muscles";
import { useToast } from "../../context/ToastContext";
import ObjectID from "bson-objectid";


interface IProps {
    muscles: MuscleDefinition[];
    addMuscle: (muscle: MuscleDefinition) => void;
    removeMuscle: (muscle: MuscleDefinition) => void;
    close: ()=>void;
}

const MusclePicker: React.FC<IProps> = ({muscles, addMuscle, removeMuscle, close}) => {

    const { addToast } = useToast();

    const [query, setQuery] = useState('');
    const [region, setRegion] = useState<BodyRegion>('Upper Body')

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
    },[query]);

    const handleCreateMuscle = () => {
        if( MUSCLES.some(i=>i.name.trim().toLocaleLowerCase() === query.trim().toLowerCase()) ){
            addToast("Muscle already exist.", "info");
        } else {
            const newMuscle: MuscleDefinition = {
                _id: ObjectID().toHexString(),
                name: query,
                region,
                group: query.toLowerCase(),
                isAnterior: false,
                isCustom: true,
            };
            addMuscle(newMuscle);
            setQuery('')
        }
    }
    return (
        <div className="modal h-full grid grid-rows-[50px_1fr_50px_50px] gap-3">
            <div className="w-full h-12.5 flex items-center justify-between">
                <h1>Muscles</h1>
                <button onClick={close}>
                    <X />
                </button>
            </div>
            <div className="bg-zinc-800 flex flex-col overflow-y-auto p-2 rounded">
                {results?.length > 0 ? results.map((item: MuscleDefinition)=><div key={item._id} className="w-full h-12 shrink-0 grid grid-cols-[1fr_30px] items-center pl-2">
                    <div className="flex flex-col">
                        <b>{item.name}</b>
                        <p className="text-sm text-white/30">{item.region}</p>
                    </div>
                    <button onClick={()=>toggleMuscle(item)} className=" flex items-center justify-end">
                        {muscles.some(muscle => muscle._id === item._id) ? <Check /> : <Plus />}
                    </button>
                </div>) : <p>No muscles to show. Try creating one.</p>}
            </div>
            <div className="w-full h-12.5 grid grid-cols-[2fr_1fr_50px] gap-2">
                <input type="text" className="text-input" value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Muscle name"/>
                <select className="option-input" value={region} onChange={(e)=>setRegion(e.target.value as BodyRegion)}>
                    <option value={'Upper Body'}>Upper Body</option>
                    <option value={'Lower Body'}>Lower Body</option>
                    <option value={'Core'}>Core</option>
                </select>
                <button className="primary-button" onClick={handleCreateMuscle}>
                    <Plus />
                </button>
            </div>
            <button className="secondary-button" onClick={close}>Close</button>
        </div>
    )
}


export default MusclePicker;