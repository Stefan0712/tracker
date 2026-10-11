import type { WorkoutExercise } from "../../../types/types"


export const InstructionPage = ({exercise}: {exercise: WorkoutExercise}) => {


    return (
        <div>
            {exercise?.instructions?.length && exercise?.instructions?.length > 0 ? exercise.instructions.map((i, index)=> <p key={index}>{i}</p>) : <p>No instructions</p>}
            {exercise.notes ?? 'No notes provided'}
        </div>
    )
}