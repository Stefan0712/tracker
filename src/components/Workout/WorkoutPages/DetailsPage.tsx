import type { Exercise } from "../../../types/types"


const DetailsPage = ({exercise}: {exercise: Exercise}) => {

    return (
        <div>
            {exercise?.description}
        </div>
    )
}


export default DetailsPage;


