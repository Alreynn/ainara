import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useSearchParams, Link } from 'react-router'
import { SkeletonTitleOnly } from './components/skeleton.jsx'
import { AnimeBox } from './components/AnimeBox.jsx'
import Navigation from './components/Navigation.jsx'
import repeatment from './functions/repeatment.jsx'

const Search = () => {
    const [searchedAnime, setSearchedAnime] = useState([]);
    const [isLoaded, setLoad] = useState(false);
    const [isNotFound, setNotFound] = useState(false);
    const [ searchParams ] = useSearchParams();
    const query = searchParams.get("q");
    
    useEffect(() => {
        fetchSearching();
    }, [query])
    
    const fetchSearching = async () => {
        window.scrollTo(0, 0);
        setSearchedAnime([]);
        setLoad(false);
        setNotFound(false);
        try {
            const searchFor = await fetch(`https://www.sankavollerei.com/anime/search/${query}`);
            const response = await searchFor.json();
            setSearchedAnime(response.data.animeList);
            setLoad(true);
        } catch(e) {
            setNotFound(true);
            setLoad(true);
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
            <Helmet>
                <title>{query ? `${query} - Ainara` : "Memuat... - Ainara"}</title>
            </Helmet>
            
            <main className="background-color py-5 px-2 min-h-screen text-white">
                <h2 className="text-2xl font-bold mt-5 mb-3">Kamu mencari "{searchParams.get("q")}"</h2>
                <div className="flex flex-wrap items-center gap-y-5 gap-x-0.5 justify-around">
                    {!isLoaded && !isNotFound && (
                        repeatment(<SkeletonTitleOnly />, 9)
                    )}
                    
                    {searchedAnime.map((item) => (
                        <AnimeBox linkTo={item.animeId} title={item.title} poster={item.poster} score={item.score} />
                    ))}
                    
                    {isNotFound && (
                        <div className="flex flex-col justify-center items-center min-h-[70lvh]">
                            <p className="text-center text-xl font-semibold">Anime tidak ditemukan!</p>
                            <p>Cari anime lain.</p>
                        </div>
                    )}
                </div>
            </main>
            
            <Navigation isLoaded={isLoaded} />
        </>
    )
}
export default Search