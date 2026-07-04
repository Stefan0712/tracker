import { Calendar, Home, List, Settings } from "lucide-react";
import { Link } from "react-router-dom"

const Nav = () => {

    const buttonText = 'text-sm text-white/50';
    const btnStyle = 'w-full h-full items-center justify-center flex flex-col gap-1 text-black/50';

    return (
        <nav className="h-nav w-full bg-main text-white flex justify-around border-t border-white/10">
            <Link to="/" className={btnStyle}>
                <Home className='text-white/50' />
                <span className={buttonText}>Home</span>
            </Link>
            <Link to="/library" className={btnStyle}>
                <List className='text-white/50' />
                <span className={buttonText}>Library</span>
            </Link>
            <Link to="/plan" className={btnStyle}>
                <Calendar className='text-white/50' />
                <span className={buttonText}>Plan</span>
            </Link>
            <Link to="/settings" className={btnStyle}>
                <Settings className='text-white/50' />
                <span className={buttonText}>Settings</span>
            </Link>
        </nav>
    )
}

export default Nav;