import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { SkeletonHome } from './components/skeleton.jsx'

const App = () => {
    const [isLoaded, setLoad] = useState(false);
    const [recent, setRecent] = useState([]);
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
        <main className="bg-indigo-400 py-5 text-white min-h-screen">
            <div className="flex items-center justify-between px-1 mt-5">
                <p className="font-bold text-2xl">Anime Terbaru</p>
                <p>
                    <Link to='/release'>Jadwal Rilis ›</Link>
                </p>
            </div>
            <div className="flex flex-wrap items-center gap-y-5 gap-x-0.5 justify-around bg-blue-950/10 min-h-screen">
                {!isLoaded && !isError && (
                    repeatment(<SkeletonHome />, 9)
                )}
                        
                {recent.map((item) => (
                    <Link to={`/anime/${item.animeId}`} state={{ title: item.title, poster: item.poster, id: item.animeId }} className="flex flex-col bg-blue-500 w-[31.5lvw] rounded-lg p-3">
                        <div className="relative">
                            <img src={item.poster} className="object-cover w-full rounded" />
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
    )
}
export default App