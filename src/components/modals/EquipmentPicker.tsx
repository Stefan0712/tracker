import { Check, Plane, Plus, X } from "lucide-react"
import { useState } from "react";
import { type EquipmentMeasurement, type Equipment } from "../../types/types";
import ObjectID from 'bson-objectid';


interface IProps {
    equipment: Equipment[];
    addEquipment: (equipment: Equipment) => void;
    removeEquippment: (equipment: Equipment) => void;
    close: ()=>void;
}

const ALL_EQUIPMENT: Equipment[] = [];

const EquipmentPicker: React.FC<IProps> = ({equipment, addEquipment, removeEquippment, close}) => {

    const [query, setQuery] = useState('');

    const toggleEquipment = (equipmentItem: Equipment) => {
        if(equipment.some(item => equipmentItem._id === item._id)){
            removeEquippment(equipmentItem);
        } else {
            addEquipment(equipmentItem);
        }
    }
    const getOrdered = ( equipment: Equipment[]): Equipment[] => {
        return [...ALL_EQUIPMENT].sort((a, b) => {
            const aExists = equipment.some(item => item._id === a._id);
            const bExists = equipment.some(item => item._id === b._id);

            return (bExists ? 1 : 0) - (aExists ? 1 : 0);
        });
    };
    return (
        <div className="modal h-full grid grid-rows-[50px_1fr_auto_50px] gap-3">
            <div className="w-full h-[50px] flex items-center justify-between">
                <h1>Equipment</h1>
                <button onClick={close}>
                    <X />
                </button>
            </div>
            <div className="bg-zinc-800 flex flex-col overflow-y-auto p-2 rounded">
                {ALL_EQUIPMENT?.length > 0 ? getOrdered(ALL_EQUIPMENT).map((item: Equipment)=><div key={item._id} className="w-full h-12 shrink-0 grid grid-cols-[1fr_40px]">
                    <b>{item.name}</b>
                    <button onClick={()=>toggleEquipment(item)}>
                        {equipment.some(eq => eq._id === item._id) ? <Check /> : <Plus />}
                    </button>
                </div>) : <p>No equipment to show</p>}
            </div>
            <NewEquipment addEquipment={(eq)=>console.log(eq)} />
            <button className="secondary-button" onClick={close}>Close</button>
        </div>
    )
}


export default EquipmentPicker;


const NewEquipment = ({addEquipment}: {addEquipment: (eq: Equipment) => void}) => {

    const [name, setName] = useState('');
    const [unit, setUnit] = useState('')
    const [value, setValue] = useState(0)


    const [measurements, setMeasurements] = useState<EquipmentMeasurement[]>([]);

    const handleAddEquipment = () => {
        if(name.length > 0) {
            let newEq: Equipment = {
                _id: ObjectID().toHexString(),
                name,
                isCustom: true,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }
            if(measurements?.length > 0) newEq.measurements = measurements;
            addEquipment(newEq);

            //Reset inputs
            setName('')
            setMeasurements([])
        }
    }

    return (
        <div className="w-full flex flex-col gap-2">
            <div className="w-full grid grid-cols-[3fr_1fr_1fr_50px] gap-2">
                <input type="text" className="text-input" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Name" />
                <input type="number" className="text-input" value={value} onChange={(e)=>setValue(parseInt(e.target.value))} placeholder="Value" />
                <input type="text" className="text-input" value={unit} onChange={(e)=>setUnit(e.target.value)} placeholder="Unit" />
                <button className="primary-button" onClick={handleAddEquipment}><Plus /></button>
            </div>
        </div>
    )
}
