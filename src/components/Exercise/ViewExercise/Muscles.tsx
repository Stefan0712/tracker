import type { Exercise } from "../../../types/types"


export const Muscles = ({exercise}: {exercise: Exercise}) => {

    return (
        <div>
                <label>Muscles</label>
                <div>{exercise.muscles && exercise.muscles?.length > 0 ? exercise.muscles?.map(item=><p key={item._id}>{item.name}</p>): <p>No muscles </p>}</div>
            </div>
    )
}