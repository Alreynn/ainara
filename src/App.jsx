import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { SkeletonHome } from './components/skeleton.jsx'
import Navigation from './components/Navigation.jsx'
import { ArrowRight, Home, Search } from 'lucide-react'
import repeatment from './functions/repeatment.jsx'

const App = () => {
    const [isLoaded, setLoad] = useState(false);
    const [recent, setRecent] = useState([]);
    const [completed, setCompleted] = useState([]);
    const [isError, setError] = useState(false);
    
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

    return (
        <>
            <main className="background-color py-5 px-2 text-white min-h-screen">
                <div className="flex items-center justify-between px-1 mt-5">
                    <p className="font-bold text-2xl">Anime Terbaru</p>
                    <Link to='/release' className="flex items-center gap-x-1">
                        Jadwal Rilis <ArrowRight className="size-4" />
                    </Link>
                </div>
                <div className="flex flex-wrap items-center gap-y-5 gap-x-0.5 justify-around">
                    {!isLoaded && !isError && (
                        repeatment(<SkeletonHome />, 12)
                    )}
                            
                    {recent.map((item) => (
                        <Link to={`/anime/${item.animeId}`} state={{ title: item.title, poster: item.poster }} key={item.title} className="flex flex-col grow-0 shrink-0 border border-indigo-300 w-[31.5lvw] rounded-lg p-3 md:w-[15lvw]">
                            <div className="relative">
                                <img src={item.poster} alt={item.title} className="object-cover aspect-[3/4] rounded" />
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
            
            <Navigation isLoaded={isLoaded} />
        </>
    )
}
export default App