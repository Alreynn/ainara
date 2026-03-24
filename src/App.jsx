import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router'
import { SkeletonHome, GenreSkeleton } from './components/skeleton.jsx'
import Navigation from './components/Navigation.jsx'
import { ArrowRight, Home, Search } from 'lucide-react'
import { AnimeBox } from './components/AnimeBox.jsx'
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
            console.clear();
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
            console.clear();
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
            console.clear();
        }
    }

    return (
        <>
            <Helmet>
                <title>Home - Ainara</title>
            </Helmet>
            
            <main className="background-color py-5 px-2 text-white min-h-screen">
                <div className="flex items-center justify-between px-1 mt-5 mb-1">
                    <h1 className="font-bold text-2xl">Anime Terbaru</h1>
                    <Link to='/release' className="flex items-center gap-x-1 md:cursor-pointer">
                        Jadwal Rilis <ArrowRight className="size-4" />
                    </Link>
                </div>
                <div className="flex flex-wrap items-center gap-y-5 gap-x-0.5 justify-around mb-8">
                    {!isLoaded && !isError && (
                        repeatment(<SkeletonHome />, 12)
                    )}
                            
                    {recent.map((item) => (
                        <AnimeBox linkTo={item.animeId} title={item.title} poster={item.poster} episode={item.episodes} lastRelease={item.latestReleaseDate} />
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
                                <GenreSkeleton width="14" />
                            , 30)}
                        </>
                    ) : (
                        <>
                            {genres.map((item) => (
                                <Tags>
                                    <Link to={`/genre/${item.genreId}`}>
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
                        <AnimeBox linkTo={item.animeId} title={item.title} poster={item.poster} score={item.score} episode={item.episodes} lastRelease={item.lastReleaseDate} />
                    ))}
                </div>
            </main>
            
            <Navigation isLoaded={isLoaded} />
        </>
    )
}
export default App