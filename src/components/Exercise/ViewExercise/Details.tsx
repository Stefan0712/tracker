import { formatDate } from "../../../helpers/utils"
import type { Exercise } from "../../../types/types"



export const Details = ({exercise}: {exercise: Exercise}) => {

    return (
        <div className='rounded-lg bg-zinc-900 p-4 flex flex-col gap-1'>
            <p className="opacity-50 text-sm">Updated on {formatDate(exercise.updatedAt)}</p>
            <div className="text-zinc-500 text-sm">
                <label className="text-white/50">Description</label>
                <p>{exercise.description ?? "No descripton provided. You can add one."}</p>
            </div>
            <div>
                <label>Tags</label>
                <div>{exercise.tags && exercise.tags?.length > 0 ? exercise.tags?.map(item=><p key={item}>{item}</p>): <p>No tags </p>}</div>
            </div>

            <div>
                <label>Category</label>
                <p>{exercise.category}</p>
            </div>
            <div>
                <label>Instructions</label>
                {exercise.instructions && exercise.instructions?.length > 0 ? exercise.instructions?.map(i=><p key={i}>{i}</p>) : <p>No instructions provided</p>}
            </div>
            <div>
                <label>Notes</label>
                {exercise.notes && exercise.notes?.length > 0 ? exercise.notes?.map(i=><p key={i}>{i}</p>) : <p>No notes provided</p>}
            </div>
        </div>
    )
}