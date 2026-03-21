import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { SkeletonHome } from './components/skeleton.jsx'
import Navigation from './components/Navigation.jsx'
import { ArrowRight, Home, Search } from 'lucide-react'
import Tags from './components/Tags.jsx'
import repeatment from './functions/repeatment.jsx'

const App = () => {
    const [isLoaded, setLoad] = useState(false);
    const [recent, setRecent] = useState([]);
    const [genres, setGenres] = useState([]);
    const [completed, setCompleted] = useState([]);
    const [isError, setError] = useState(false);
    
    useEffect(() => {
        window.scrollTo(0, 0);
        fetchAnime();
        fetchGenres();
        fetchCompleted();
    }, [])

    const fetchAnime = async () => {
        setError(false);
        try {
            const recent = await fetch("https://www.sankavollerei.com/anime/home");
            const response = await recent.json();
            setRecent(response.data.ongoing.animeList);
            
            setError(false);
            setLoad(true);
        } catch(e) {
            setError(true);
        }
    }
    
    const fetchGenres = async () => {
        setError(false);
        try {
            const genres = await fetch("https://www.sankavollerei.com/anime/genre");
            const response = await genres.json();
            setGenres(response.data.genreList);
            
            setError(false);
            setLoad(true);
        } catch(e) {
            setError(true);
        }
    }
    
    const fetchCompleted = async () => {
        setError(false);
        try {
            const completed = await fetch("https://www.sankavollerei.com/anime/complete-anime?page=1");
            const response = await completed.json();
            setCompleted(response.data.animeList);
            
            setError(false);
            setLoad(true);
        } catch(e) {
            setError(true);
        }
    }
    
    const getScore = (score) => {
        if (!score) return "";
        
        return score
        .replace(/Fall 2025/gi, "")
        .trim();
    }

    return (
        <>
            <main className="background-color py-5 px-2 text-white min-h-screen">
                <div className="flex items-center justify-between px-1 mt-5 mb-1">
                    <h1 className="font-bold text-2xl">Anime Terbaru</h1>
                    <Link to='/release' className="flex items-center gap-x-1">
                        Jadwal Rilis <ArrowRight className="size-4" />
                    </Link>
                </div>
                <div className="flex flex-wrap items-center gap-y-5 gap-x-0.5 justify-around mb-8">
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
                
                <h1 className="font-bold text-2xl mb-1">Daftar Genre</h1>
                <div className="flex flex-wrap items-center gap-y-3 gap-x-1.5 justify-start mb-8">
                    {!isLoaded ? (
                        <>
                            {repeatment(
                                <div className="bg-gray-400 border-white rounded-md py-0.5 px-1.5 w-16 h-7 animate-pulse"></div>
                            , 20)}
                        </>
                    ) : (
                        <>
                            {genres.map((item) => (
                                <Tags>
                                    <Link to={`/genre/${item.genreId}`} state={{ genre: item.title }}>
                                        {item.title}
                                    </Link>
                                </Tags>
                            ))}
                        </>
                    )}
                </div>
                
                <h1 className="font-bold text-2xl mb-1">Anime Tamat</h1>
                <div className="flex flex-wrap items-center gap-y-5 gap-x-0.5 justify-around">
                    {!isLoaded && !isError && (
                        repeatment(<SkeletonHome />, 12)
                    )}
                            
                    {completed.map((item) => (
                        <Link to={`/anime/${item.animeId}`} state={{ title: item.title, poster: item.poster }} key={item.title} className="flex flex-col grow-0 shrink-0 border border-indigo-300 w-[31.5lvw] rounded-lg p-3 md:w-[15lvw]">
                            <div className="relative">
                                <img src={item.poster} alt={item.title} className="object-cover aspect-[3/4] rounded" />
                                <p className="absolute top-0 bg-blue-700 rounded-br-xl p-0.5 px-2 text-sm">{item.score !== "" ? getScore(item.score) : "?"}</p>
                            </div>
                            <div className="flex flex-col -space-y-1">
                                <p className="truncate text-lg font-semibold">{item.title}</p>
                                <p className="truncate text-sm">Ep {item.episodes}</p>
                                <p className="truncate text-sm">{item.lastReleaseDate}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>
            
            <Navigation isLoaded={isLoaded} />
        </>
    )
}
export default App