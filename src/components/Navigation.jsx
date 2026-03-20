import { useState, useEffect, useRef } from 'react'
import { useNavigate, Link } from 'react-router'
import { Home, TvMinimal, Calendar, Search } from 'lucide-react'

const Navigation = ({ isLoaded }) => {
    const inputRef = useRef(null);
    const [isSearchOpen, setSearchOpen] = useState(false);
    const [keyword, setKeyword] = useState("");
    const [isNavShown, setShowNav] = useState(false);
    const navigate = useNavigate();
    
    useEffect(() => {
        if (isLoaded === true) {
            setShowNav(true);
        } else {
            setTimeout(() => {
                setShowNav(true);
            }, 25000)
        }
    }, [isLoaded])
    
    const handleSearch = (e) => {
        e.preventDefault();
        if (keyword.trim() !== "") {
            navigate(`/search?q=${keyword}`);
        }
        inputRef.current.blur();
        inputRef.current.value = "";
        setSearchOpen(false);
    }
    
    return (
        <nav className={`
        fixed flex justify-center w-screen text-white
        transition-all duration-300 delay-300
        ${isNavShown ? "bottom-4 visible" : "-bottom-8 invisible"}
        `}>
            <form onSubmit={handleSearch} className={`
            flex justify-center w-screen absolute
            transition-all duration-300
            ${isSearchOpen ? "bottom-20 opacity-100 visible" : "bottom-6 opacity-0 invisible"}
            `}>
                <input type="search" ref={inputRef} placeholder="Cari anime..." onChange={(e) => setKeyword(e.target.value)} className={`
                rounded-2xl py-2 px-2.5 outline-none bg-white/75 backdrop-blur-[4px] text-black
                transition-all duration-300
                ${isSearchOpen ? "w-96 bottom-20 opacity-100 visible" : "w-0 bottom-6 opacity-0 invisible"}
                `} />
            </form>
            <div className="flex justify-center items-center gap-8 bottom-4 p-3.5 px-6 bg-gradient-to-t from-blue-800/10 to-blue-600/10 backdrop-blur-[3px] shadow-inner shadow-white/25 shadow rounded-2xl w-fit">
                <Link to="/">
                    <Home className="transition-all duration-75 active:size-5 md:hover:size-7" />
                </Link>
                <Link to="/release">
                    <Calendar className="transition-all duration-75 active:size-5 md:hover:size-7" />
                </Link>
                <Search onClick={() => setSearchOpen(!isSearchOpen)} className="transition-all duration-75 active:size-5 md:hover:size-7" />
                <Link to="/anime">
                    <TvMinimal className="transition-all duration-75 active:size-5 md:hover:size-7" />
                </Link>
            </div>
        </nav>
    )
}
export default Navigation