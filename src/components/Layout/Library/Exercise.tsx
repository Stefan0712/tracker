import type { Exercise } from "../../../types/types";

interface IProps {
    exercise: Exercise;
}

const Exercise: React.FC<IProps> = ({exercise}) => {

    return (
        <div className="w-full p-4">
            <h1>{exercise.name}</h1>
            
        </div>
    )
}

export default Exercise;