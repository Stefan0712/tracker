import type { Exercise } from "../../types/types"
import type { WorkoutItem } from "../Workout/ManageWorkout/ExercisesTab";


interface IProps {
    existingExercises?: Exercise[];
    addExercise: (exercise: WorkoutItem) => void;
    close: ()=>void;
}


export const ExerciseDrawer: React.FC<IProps> = ({existingExercises, addExercise, close}) => {



    return (
        <div className="w-full h-50dvh absolute bottom-(--absolute-bottom) left-0 bg-zinc-900 rounded-t-xl z-30">
            Exercises
            <button onClick={close}>Close</button>
        </div>
    )
}