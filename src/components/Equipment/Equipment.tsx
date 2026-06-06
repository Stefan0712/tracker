const NewEquipment = ({addEquipment}: {addEquipment: (eq: Equipment) => void}) => {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
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
            if(description) newEq.description = description;
            if(measurements?.length > 0) newEq.measurements = measurements;
            addEquipment(newEq);

            //Reset inputs
            setName('')
            setDescription('')
            setMeasurements([])
        }
    }

    return (
        <div className="w-full flex flex-col gap-2">
            <fieldset className="fieldset">
                <label className="label">Name</label>
                <input type="text" className="text-input" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Name..." />
            </fieldset>
            <fieldset className="fieldset">
                <label className="label">Description</label>
                <input type="text" className="text-input" value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="Description..." />
            </fieldset>
            <NewMeasurement addMeasurement={(m)=>setMeasurements(prev=>[...prev, m])} />
            <div className="flex flex-col gap-2 h-full overflow-y-auto">
                {measurements?.length > 0 ? measurements.map(m=>
                    <div key={m._id}>
                        <b>{m.name}</b>
                        <p>{m.description ?? 'No description'}</p>
                        <p>{m.value ?? 'No value'}</p>
                        <p>{m.unit ?? 'No unit'}</p>
                    </div>
                ) : null}
            </div>
            <button className="primary-button" onClick={handleAddEquipment}>Add Equipment</button>
        </div>
    )
}

const NewMeasurement = ({addMeasurement}: {addMeasurement: (measurement: EquipmentMeasurement) => void}) => {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState(0);
    const [unit, setUnit] = useState('');

    const handleAdd = () => {
        if(name.length > 0 && value > 0){
            let measurement: EquipmentMeasurement = {
                _id: ObjectID().toHexString(),
                name,
                value,
            };
            if(description){ measurement.description = description}
            if(description){ measurement.unit = unit}
            addMeasurement(measurement);

            // Reset inputs
            setName('');
            setDescription('');
            setValue(0);
            setUnit('');
        }
    }

    return (
        <div className="grid grid-cols-[2fr_2fr_1fr_1fr_30px] gap-2">
            <input className="text-input" type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder={'Name'} />
            <input className="text-input" type="text" value={description} onChange={(e)=>setDescription(e.target.value)} placeholder={'Description'} />
            <input className="text-input" type="number" value={value} onChange={(e)=>setValue(parseInt(e.target.value))} placeholder={'Value'} />
            <input className="text-input" type="text" value={unit} onChange={(e)=>setUnit(e.target.value)} placeholder={'Unit'} />
            <button onClick={handleAdd}>
                <Plus />
            </button>
        </div>
    )
}