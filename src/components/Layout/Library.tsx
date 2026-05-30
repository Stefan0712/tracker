import { Plus } from "lucide-react"
import { Link } from "react-router-dom";


const Library = () => {



    return (
        <div>
            <div className="w-full h-[60px] flex px-4 items-center justify-between">
                <h1 className="font-bold text-lg">Library</h1>
                <Link to={'/exercise/new'}>
                    <Plus />
                </Link>
            </div>
        </div>
    )
}


export default Library;