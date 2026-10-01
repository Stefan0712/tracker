import type { Exercise } from "../../../types/types"


export const Fields = ({exercise}: {exercise: Exercise}) => {

    return (
        <div>
            <label>Fields</label>
            <div>{exercise.trackingFields && exercise.trackingFields?.length > 0 ? exercise.trackingFields?.map(item=><p key={item._id}>{item.target} {item.unit ?? ''}</p>): <p>No fields </p>}</div>
        </div>
    )
}