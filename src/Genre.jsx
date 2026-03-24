import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useParams, Link } from 'react-router'
import { SkeletonTitleOnly } from './components/skeleton.jsx'
import Navigation from './components/Navigation.jsx'
import repeatment from './functions/repeatment.jsx'

const Genre = () => {
    const [animes, setAnimes] = useState([]);
    const [isLoaded, setLoad] = useState(false);
    const { slug } = useParams();
    
    useEffect(() => {
        window.scrollTo(0, 0);
        fetchAnimes();
    }, [])
    
    const fetchAnimes = async () => {
        try {
            const animes = await fetch(`https://www.sankavollerei.com/anime/genre/${slug}?page=1`);
            const response = await animes.json();
            setAnimes(response.data.animeList);
            setLoad(true);
        } catch(e) {
            alert(e);
        }
    }
    
    const getGenreTitle = (title) => {
        return title.charAt(0).toUpperCase() + title.slice(1);
    }
    
    const getScore = (score) => {
        if (!score) return "";
        
        return score
        .replace(/Fall 2025/gi, "")
        .trim();
    }
    
    return (
        <>
            <Helmet>
                <title>{slug ? `${getGenreTitle(slug)} - Ainara` : "Memuat... - Ainara"}</title>
                <meta name="description" content={`Anime dengan genre ${getGenreTitle(slug)} di Ainara`} />
            </Helmet>
            
            <main className="background-color py-5 px-2 min-h-screen text-white">
                <h2 className="text-2xl font-bold mt-5 mb-3">{getGenreTitle(slug)}</h2>
                <div className="flex flex-wrap items-center gap-y-5 gap-x-0.5 justify-around">
                    {!isLoaded && (
                        repeatment(<SkeletonTitleOnly />, 12)
                    )}
                    
                    {animes.map((item) => (
                        <Link to={`/anime/${item.animeId}`} state={{ title: item.title, poster: item.poster }} key={item.title} className="flex flex-col grow-0 shrink-0 border border-indigo-300 w-[31.5lvw] rounded-lg p-3 md:w-[15lvw]">
                            <div className="relative">
                                <img src={item.poster} alt={item.title} className="object-cover aspect-[3/4] rounded" />
                                <p className="absolute top-0 bg-blue-700 rounded-br-lg p-1 px-2 text-sm">{getScore(item.score) !== "" ? getScore(item.score) : "?"}</p>
                            </div>
                            <div className="flex flex-col -space-y-1">
                                <p className="truncate text-lg font-semibold">{item.title}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>
            
            <Navigation isLoaded={isLoaded} />
        </>
    )
}
export default Genre