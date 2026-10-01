import type { Exercise } from "../../../types/types"


export const Equipment = ({exercise}: {exercise: Exercise}) => {

    return (
        <div>
            <label>Equipment</label>
            <div>{exercise.equipment && exercise.equipment?.length > 0 ? exercise.equipment?.map(item=><p key={item._id}>{item.name}</p>): <p>No equipment </p>}</div>
        </div>
    )
}