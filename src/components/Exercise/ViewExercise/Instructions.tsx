import type { Exercise } from "../../../types/types"


export const Instructions = ({exercise}: {exercise: Exercise}) => {

    return (
        <div>
            <div>
                <label>Instructions</label>
                <div>{exercise.instructions && exercise.instructions?.length > 0 ? exercise.instructions?.map(item=><p key={item} className={`border-transparent pb-1 border-b-white/10 border`}>{item}</p>): <p>No instructions </p>}</div>
            </div>
            <div>
                <label>Notes</label>
                <div>{exercise.notes && exercise.notes?.length > 0 ? exercise.notes?.map(item=><p key={item} className={` border-transparent pb-1 border-b-white/10 border`}>{item}</p>): <p>No notes </p>}</div>
            </div>
        </div>
    )
}



            