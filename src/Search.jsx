import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router'
import { SkeletonTitleOnly } from './components/skeleton.jsx'
import Navigation from './components/Navigation.jsx'
import repeatment from './functions/repeatment.jsx'

const Search = () => {
    const [searchedAnime, setSearchedAnime] = useState([]);
    const [isLoaded, setLoad] = useState(false);
    const [ searchParams ] = useSearchParams();
    const query = searchParams.get("q");
    
    useEffect(() => {
        fetchSearching();
    }, [query])
    
    const fetchSearching = async () => {
        window.scrollTo(0, 0);
        setLoad(false);
        try {
            const searchFor = await fetch(`https://www.sankavollerei.com/anime/search/${query}`);
            const response = await searchFor.json();
            setSearchedAnime(response.data.animeList);
            setLoad(true);
        } catch(e) {
            alert(e);
        }
    }
    
    const getTitle = (title) => {
        if (!title) return "";
        
        return title
        .replaceAll(/[()]/gi, "")
        .replace(/Episode \d+ – \d+/gi, "")
        .replace(/Sub Indo/gi, "")
        .replace(/Subtitle Indonesia/gi, "")
        .trim();
    }
    
    return (
        <>
            <main className="background-color py-5 px-2 min-h-screen text-white">
                <h2 className="text-2xl font-bold mt-5 mb-3">Kamu mencari "{searchParams.get("q")}"</h2>
                <div className="flex flex-wrap items-center gap-y-5 gap-x-0.5 justify-around">
                    {!isLoaded && (
                        repeatment(<SkeletonTitleOnly />, 9)
                    )}
                    
                    {searchedAnime.map((item) => (
                        <Link to={`/anime/${item.animeId}`} state={{ title: getTitle(item.title), poster: item.poster }} className="flex flex-col grow-0 shrink-0 border border-indigo-300 w-[31.5lvw] rounded-lg p-3 md:w-[15lvw]">
                            <div className="relative">
                                <img src={item.poster} alt={item.title} className="object-cover aspect-[3/4] w-full rounded" />
                                {item.score !== "" && (
                                    <p className="absolute top-0 bg-blue-700 py-1 px-1.5 rounded rounded-tr-none rounded-bl-none">{item.score}</p>
                                )}
                            </div>
                                
                            <div className="flex flex-col -space-y-1">
                                <p className="truncate text-lg font-semibold">{getTitle(item.title)}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>
            
            <Navigation isLoaded={isLoaded} />
        </>
    )
}
export default Search