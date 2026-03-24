import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router'
import { SkeletonTitleOnly } from './components/skeleton.jsx'
import Navigation from './components/Navigation.jsx'
import SidebarLetter from './components/SidebarLetter.jsx'
import repeatment from './functions/repeatment.jsx'

const AllAnime = () => {
    const [animes, setAnimes] = useState([]);
    const [isLoaded, setLoad] = useState(false);
    
    useEffect(() => {
        fetchAllAnime();
    }, [])
    
    const fetchAllAnime = async () => {
        window.scrollTo(0, 0);
        try {
            const getAll = await fetch("https://www.sankavollerei.com/anime/unlimited");
            const response = await getAll.json();
            setAnimes(response.data.list);
            setLoad(true);
        } catch(e) {
            alert(e)
        }
    }
    
    const getTitle = (title) => {
        if (!title) return "";
        
        return title
        .replaceAll(/[()]/gi, "")
        .replace(/Episode \d+ – \d+/gi, "")
        .replace(/Sub Indo/gi, "")
        .replace(/Subtitle Indonesia/gi, "")
        .replace(/On-Going/gi, "")
        .trim();
    }
    
    const SkeletonLoad = () => {
        return (
            <div className="flex flex-col gap-y-1.5">
                <div className="bg-gray-400 rounded h-6 w-4 animate-pulse"></div>
                <div className="flex flex-col bg-slate-700 grow-0 shrink-0 w-full rounded-xl p-3 py-4">
                    <div className="bg-gray-400 rounded-lg h-5 w-full animate-pulse"></div>
                </div>
            </div>
        )
    }
    
    return (
        <>
            <Helmet>
                <title>Semua Anime - Ainara</title>
                <meta name="description" content="Cari tahu anime yang tersedia di Ainara" />
            </Helmet>
            
            <main className="background-color py-5 px-2 min-h-screen text-white">
                <div className="flex flex-col gap-y-5">
                    <h1 className="text-2xl font-bold">Semua Anime</h1>
                    {!isLoaded && (
                        repeatment(<SkeletonLoad />, 10)
                    )}
                    {animes.map((item) => (
                        <div className="flex flex-col gap-y-1">
                            <h2 id={item.startWith} className="text-xl font-bold">{item.startWith}</h2>
                            <div className="flex flex-col gap-y-3 md:w-2/3">
                                {item.animeList.map((lists) => (
                                    <>
                                        <Link to={`/anime/${lists.animeId}`} state={{ title: getTitle(lists.title) }} className="flex flex-col grow-0 shrink-0 border border-indigo-300 w-full rounded-xl p-3">
                                            <p className="truncate text-md">{getTitle(lists.title)}</p>
                                        </Link>
                                    </>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </main>
            
            <SidebarLetter isLoaded={isLoaded} arrayToMap={animes} />
            
            <Navigation isLoaded={isLoaded} />
        </>
    )
}
export default AllAnime