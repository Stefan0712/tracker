import { Link } from "react-router-dom";



const Menu = () => {


    return (
        <div className="w-full h-full flex flex-col gap-2 bg-zinc-900 text-white">
            <div className="w-full h-13 flex items-center justify-between px-2">
                <h1>Menu</h1>
            </div>
            <div className="flex flex-col gap-2 p-3 ">
                <Link className="bg-zinc-950 rounded p-2" to={'/logs'}>Logs</Link>
            </div>
        </div>
    )
}

export default Menu;