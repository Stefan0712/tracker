import type { Exercise } from "../../../types/types"


const ExercisesList = ({exercises, exercise}: {exercises: Exercise[], exercise: Exercise}) => {


    return (
        <div className="w-full h-full flex flex-col">
            {exercises?.length > 0 ? exercises.map(ex=><div key={ex._id}>
                {ex.name}
                </div>) : <p>No exercises in this list</p>}
        </div>
    )
}


export default ExercisesList;