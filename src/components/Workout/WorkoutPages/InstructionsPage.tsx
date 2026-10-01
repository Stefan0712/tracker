import type { Exercise } from "../../../types/types"


export const InstructionPage = ({exercise}: {exercise: Exercise}) => {


    return (
        <div>
            {exercise?.instructions?.length && exercise?.instructions?.length > 0 ? exercise.instructions.map((i, index)=> <p key={index}>{i}</p>) : <p>No instructions</p>}
            {exercise?.notes?.length && exercise?.notes?.length > 0 ? exercise.notes.map((n, index)=> <p key={index}>{n}</p>) : <p>No notes</p>}
        </div>
    )
}