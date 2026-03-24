import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useParams, useLocation, Link } from 'react-router'
import { GenreSkeleton, EpisodeSkeleton } from './components/skeleton.jsx'
import Tags from './components/Tags.jsx'
import repeatment from './functions/repeatment.jsx'

const Details = () => {
    const [details, setDetails] = useState([]);
    const [synopsis, setSynopsis] = useState([]);
    const [isLoaded, setLoad] = useState(false);
    const [isSynopsisOpen, setSynopsisOpen] = useState(false);
    
    const { slug } = useParams();
    const { title, poster } = useLocation().state || {};
    
    useEffect(() => {
        fetchDetails();
    }, [])
    
    const fetchDetails = async () => {
        window.scrollTo(0, 0);
        try {
            const getDetails = await fetch(`https://www.sankavollerei.com/anime/anime/${slug}`);
            const response = await getDetails.json();
            setDetails(response.data);
            
            const check = removeEmptyArray(response.data.synopsis.paragraphs);
            setSynopsis(check);
            setLoad(true);
        } catch(e) {
            alert(e);
        }
    }
    
    const dateFix = (date) => {
        return date.replace(",", " ");
    }
    
    const removeEmptyArray = (arr) => {
        if (arr.length > 0 && arr[arr.length - 1].trim() === "") {
            arr.pop();
        }
        return arr;
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
                <title>{title ? `${title} - Ainara` : "Memuat... - Ainara"}</title>
                <meta name="description" content={`Detail tentang ${title} di Ainara`} />
            </Helmet>
            
            <img src={details?.poster || poster || ""} className="w-full min-h-[80lvh] max-h-full object-cover bg-gray-500 md:hidden" />
            <main className="absolute top-36 w-screen bg-gradient-to-b from-gray-950/0 to-slate-950 to-40% p-3 pt-32 min-h-screen text-white md:bg-black/70 md:top-0 md:flex md:flex-col md:items-center md:pt-16">
                <div className="flex flex-row justify-between items-center basis-1/4">
                    {!isLoaded && title === undefined && (
                        <div className="bg-gray-500 h-8 w-[22rem] rounded-md my-1 animate-pulse"></div>
                    )}
                    <h1 className="text-3xl font-bold w-80 max-h-40 overflow-y-auto md:hidden">{details?.title || title}</h1>
                    <span className="w-[62px] text-center border border-white rounded-lg p-1 px-2 md:hidden">{isLoaded && details?.score !== "" ? getScore(details?.score) || "?" : "?"}</span>
                </div>
                
                {/* FOR MEDIUM and upper SIZED SCREENS */}
                <div className="hidden items-center gap-5 md:flex md:w-3/4 lg:w-2/3">
                    <img src={details?.poster || poster || ""} className="w-[25lvw] lg:w-[16lvw]" />
                    <div className="flex flex-col">
                        <span className="w-[62px] text-center border border-white rounded-lg p-1 px-2">{isLoaded && details?.score !== "" ? getScore(details?.score) || "?" : "?"}</span>
                        
                        <div className="grid gap-y-1">
                            <h1 className="text-3xl font-bold w-80 max-h-40 overflow-y-auto w-full">{details?.title || title}</h1>
                            {!isLoaded ? (
                                <>
                                    <div className="bg-gray-500 h-4 w-64 rounded-md mt-1 animate-pulse"></div>
                                    <div className="flex mt-2 gap-x-5">
                                        {repeatment(
                                            <GenreSkeleton width="16" />
                                        , 4)}
                                    </div>
                                    <div className="flex mt-2 gap-x-5">
                                        {repeatment(
                                            <GenreSkeleton width="12" />
                                        , 4)}
                                    </div>
                                </>
                            ) : (
                                <>
                                    <p>{details?.japanese}</p>
                                    
                                    <div className="flex-wrap mt-1 gap-y-2 gap-x-4">
                                        <Tags>{details?.status}</Tags>
                                        <Tags>{details?.type}</Tags>
                                        <Tags>{details?.aired}</Tags>
                                        <Tags>{details?.studios}</Tags>
                                    </div>
                                    
                                    <div className="flex-wrap mt-2 gap-y-2 gap-x-4">
                                        {details?.genreList?.map((item) => (
                                            <Tags>
                                                <Link to={`/genre/${item.genreId}`} state={{ genre: item.title }}>
                                                    {item.title}
                                                </Link>
                                            </Tags>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                
                {/* ALL SIZED SCREENS */}
                {!isLoaded ? (
                    <div className="md:hidden">
                        <div className="bg-gray-500 h-4 w-64 rounded-md mt-1 animate-pulse"></div>
                        <div className="flex mt-2 gap-x-5">
                            {repeatment(
                                <GenreSkeleton width="16" />
                            , 4)}
                        </div>
                        <hr className="mt-2" />
                        <div className="flex mt-2 gap-x-5">
                            {repeatment(
                                <GenreSkeleton width="12" />
                            , 4)}
                        </div>
                        
                        <div className="flex flex-col gap-y-3 mt-5">
                            <div className="h-5 w-24 bg-gray-500 animate-pulse rounded"></div>
                            <div className="h-4 w-96 bg-gray-500 animate-pulse rounded"></div>
                            
                            <div className="flex flex-col gap-y-5 mt-5">
                                <div className="h-5 w-32 bg-gray-500 animate-pulse rounded"></div>
                                <div className="flex flex-col gap-3 h-96 overflow-y-scroll">
                                    {repeatment(<EpisodeSkeleton />, 6)}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="md:hidden">
                            <p>{details?.japanese}</p>
                            <div className="flex flex-wrap mt-1 gap-y-2 gap-x-4 md:hidden">
                                <Tags>{details?.status}</Tags>
                                <Tags>{details?.type}</Tags>
                                <Tags>{details?.aired}</Tags>
                                <Tags>{details?.studios}</Tags>
                            </div>
                            <hr className="mt-2 md:hidden" />
                            <div className="flex flex-wrap mt-2 gap-y-2 gap-x-4 md:hidden">
                                {details?.genreList?.map((item) => (
                                    <Tags>
                                        <Link to={`/genre/${item.genreId}`} state={{ genre: item.title }}>
                                            {item.title}
                                        </Link>
                                    </Tags>
                                ))}
                            </div>
                        </div>
                            
                        <div className="flex flex-col gap-y-5 mt-5 w-full items-center">
                            <article className="flex flex-col md:w-3/4 md:cursor-pointer lg:w-2/3">
                                {synopsis?.length > 0 && (
                                    <>
                                        <h2 className="text-xl font-bold">Sinopsis</h2>
                                        <button onClick={() => setSynopsisOpen(!isSynopsisOpen)} className={`
                                        overflow-hidden
                                        ${isSynopsisOpen ? "h-full" : "max-h-32"}
                                        `}>
                                            {synopsis?.map((p) => (
                                                <p className="text-justify">{p}</p>
                                            ))}
                                        </button>
                                    </>
                                )}
                            </article>
                            
                            <section className="flex flex-col gap-y-2 w-full md:w-3/4 lg:w-2/3">
                                <h2 className="text-xl font-bold">Daftar Episode</h2>
                                <div className="flex flex-col gap-3 h-96 overflow-y-scroll md:h-full">
                                    {details?.episodeList?.map((item) => (
                                        <div className="w-full border p-1.5 px-2.5 rounded-xl -space-y-0.5 md:cursor-pointer">
                                            <Link to={`/anime/watch/${item.episodeId}`} state={{ title }} key={item.episodeId}>
                                                <p className="text-lg">Episode {item.eps}</p>
                                                <p className="text-sm text-gray-400">{dateFix(item.date)}</p>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>
                    </>
                )}
            </main>
        </>
    )
}
export default Details