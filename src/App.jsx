import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { SkeletonHome } from './components/skeleton.jsx'
import { ArrowRight, Home, Search } from 'lucide-react'

const App = () => {
    const [isLoaded, setLoad] = useState(false);
    const [recent, setRecent] = useState([]);
    const [completed, setCompleted] = useState([]);
    const [isError, setError] = useState(false);
    const [isSearchOpen, setSearchOpen] = useState(false);

    useEffect(() => {
        fetchAnime();
    }, [])

    const fetchAnime = async () => {
        setError(false);
        try {
            const recent = await fetch("https://www.sankavollerei.com/anime/home");
            const response = await recent.json();
            setRecent(response.data.ongoing.animeList);
            setCompleted(response.data.completed.animeList);
            
            setError(false);
            setLoad(true);
        } catch(e) {
            setError(true);
        }
    }
    
    const repeatment = (item, amount) => {
        let components = [];
        
        for (let i = 0; i < amount; i++) {
            components.push(<>{item}</>)
        }
        return components;
    }

    return (
        <>
            <main className="background-color py-5 text-white min-h-screen">
                <div className="flex items-center justify-between px-1 mt-5">
                    <p className="font-bold text-2xl">Anime Terbaru</p>
                    <Link to='/release' className="flex items-center gap-x-1">
                        Jadwal Rilis <ArrowRight className="size-4" />
                    </Link>
                </div>
                <div className="flex flex-wrap items-center gap-y-5 gap-x-0.5 justify-around min-h-screen">
                    {!isLoaded && !isError && (
                        repeatment(<SkeletonHome />, 12)
                    )}
                            
                    {recent.map((item) => (
                        <Link to={`/anime/${item.animeId}`} state={{ title: item.title, poster: item.poster }} key={item.title} className="flex flex-col grow-0 shrink-0 border border-indigo-300 w-[31.5lvw] rounded-lg p-3">
                            <div className="relative">
                                <img src={item.poster} alt={item.title} className="object-cover aspect-[3/4] rounded" />
                                <p>{item.score}</p>
                            </div>
                            <div className="flex flex-col -space-y-1">
                                <p className="truncate text-lg font-semibold">{item.title}</p>
                                <p className="truncate text-sm">Ep {item.episodes}</p>
                                <p className="truncate text-sm">{item.latestReleaseDate}</p>
                            </div>
                        </Link>
                    ))}
                    
                    {isError && (
                        <div className="flex flex-col items-center">
                            <p className="text-center text-xl font-semibold">Tidak dapat memuat!</p>
                            <p>Pastikan kamu punya koneksi internet.</p>
                        </div>
                    )}
                </div>
            </main>
            
            {/* <nav className="fixed flex justify-center w-screen text-white">
                <input type="search" placeholder="Cari anime..." className={`
                fixed rounded-lg py-1.5 px-2 w-32 outline-none bg-white/75 backdrop-blur text-black
                transition-all duration-300
                ${isSearchOpen ? "w-96 bottom-20 opacity-100 visible" : "w-0 bottom-6 opacity-0 invisible"}
                `} />
                <div className="fixed flex justify-center items-center gap-10 bottom-4 p-3.5 px-5 bg-gradient-to-t from-blue-800/10 to-blue-600/10 backdrop-blur-sm shadow-inner shadow-white/25 shadow rounded-2xl w-fit">
                    <Home className="transition-all duration-75 hover:size-7" />
                    <Search onClick={() => setSearchOpen(!isSearchOpen)} className="transition-all duration-75 hover:size-7" />
                </div>
            </nav> */}
        </>
    )
}
export default App