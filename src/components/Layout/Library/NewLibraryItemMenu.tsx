import { Link } from "react-router-dom";


const NewLibraryItemMenu = ({close}: {close: ()=>void}) => {


    return (
        <div className="w-full p-4 rounded-top-xl flex flex-col absolute bottom-(--absolute-bottom) left-0 z-50 bg-zinc-900">
            <Link to={'/exercise/new'} className="h-12 border-b border-white/20 flex flex-col items-center justify-center">New Exercise</Link>
            <Link to={'/workout/new'} className="h-12 border-b border-white/20 flex flex-col items-center justify-center">New Workout</Link>
            <button className="h-12" onClick={close}>Cancel</button>
        </div>
    )
}

export default NewLibraryItemMenu;