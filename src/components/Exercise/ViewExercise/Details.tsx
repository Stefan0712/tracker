import type { Exercise } from "../../../types/types"



export const Details = ({exercise}: {exercise: Exercise}) => {

    return (
        <div className='rounded-lg bg-zinc-900 p-4 flex flex-col gap-1'>
             <b className="text-zinc-500 text-sm">{exercise._id}</b>
            <p>Created at {exercise.createdAt}</p>
            <p>Updated at {exercise.updatedAt}</p>
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
            
            <div className="text-zinc-500 text-sm">
                <div className="flex flex-col gap-1">
                    <label>Duration</label>
                    <p>{exercise.estimatedDuration} s</p>
                </div>
                <div className="flex flex-col gap-1">
                    <label>Private</label>
                    <p>{exercise.isPrivate ? "True" : "False"}</p>
                </div>
                <div className="flex flex-col gap-1">
                    <label>Shared</label>
                    <p>{exercise.isShared ? "Shared" : "Not Shared"}</p>
                </div>
                <div className="flex flex-col gap-1">
                    <label>Curated</label>
                    <p>{exercise.isCurated ? "Curated" : "Not Curated"}</p>
                </div>
                <div className="flex flex-col gap-1">
                    <label>Unilateral</label>
                    <p>{exercise.isUnilateral ? "Unilateral" : "Not Unilateral"}</p>
                </div>
            </div>
        </div>
    )
}