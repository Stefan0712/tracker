import { Calendar, Home, List, Menu } from "lucide-react";
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
            <Link to="/menu" className={btnStyle}>
                <Menu className='text-white/50' />
                <span className={buttonText}>Menu</span>
            </Link>
        </nav>
    )
}

export default Nav;