import { Link, useLocation, useNavigate } from 'react-router'
import { ChevronLeft } from 'lucide-react'

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    const isExcludedPage = location.pathname.includes('/anime/') || location.pathname.includes('/settings');
    const isIncludedPage = location.pathname.startsWith('/anime/watch');
    
    return (
        <header className={`
        flex justify-between items-center p-3 px-3.5 z-40 w-screen text-white
        ${isExcludedPage ? "absolute top-0 bg-gradient-to-b from-black/70 to-black/0 pt-4 pb-8" : "bg-blue-700"}
        ${isIncludedPage && "bg-none pb-3"}
        `}>
            {isExcludedPage ? (
                <ChevronLeft onClick={() => navigate(-1)} className="size-6" />
            ) : (
                <h1 className="text-2xl font-bold">
                    <Link to="/">Ainara</Link>
                </h1>
            )}
        </header>
    )
}
export default Header