import type { Exercise } from "../../../types/types"


const DetailsPage = ({exercise}: {exercise: Exercise | undefined}) => {
    //console.log(exercise)
    if (exercise === undefined || exercise === null) {
        return (
            <p>Could not load exercise data</p>
        )
    } else {
        return (
            <div>
                {exercise?.description}
            </div>
        )
    }
}


export default DetailsPage;


