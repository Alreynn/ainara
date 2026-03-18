import { useParams, useLocation, Link } from 'react-router'
import { useState, useEffect } from 'react'
import { EpisodeSkeleton } from './components/skeleton.jsx'
import Tags from './components/Tags.jsx'

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
    
    const repeatment = (item, amount) => {
        let components = [];
        
        for (let i = 0; i < amount; i++) {
            components.push(<>{item}</>)
        }
        return components;
    }
    
    const removeEmptyArray = (arr) => {
        if (arr.length > 0 && arr[arr.length - 1].trim() === "") {
            arr.pop();
        }
        return arr;
    }
    
    return (
        <>
            <img src={details.poster || poster} className="w-screen min-h-[80lvh] object-cover bg-gray-500" />
            <main className="absolute top-32 w-screen bg-gradient-to-b from-gray-950/0 to-slate-950 to-35% p-3 pt-32 min-h-screen text-white">
                <div className="flex flex-row justify-between items-center basis-1/4">
                    {!isLoaded && title === undefined && (
                        <div className="bg-gray-500 h-8 w-[22rem] rounded-md my-1 animate-pulse"></div>
                    )}
                    <h1 className="text-4xl font-bold w-80">{details.title || title}</h1>
                    <span className="w-[62px] text-center border border-white rounded-lg p-1 px-2">{isLoaded && details.score !== "" ? `${details.score}` : "?"}</span>
                </div>
                {!isLoaded ? (
                    <>
                        <div className="bg-gray-500 h-4 w-full rounded-md mt-1 animate-pulse"></div>
                        <div className="flex mt-2 gap-x-5">
                            {repeatment(
                                <div className="bg-gray-500 border-white rounded-md py-0.5 px-1.5 w-16 h-7 animate-pulse"></div>
                            , 4)}
                        </div>
                        
                        <div className="flex flex-col gap-y-5 mt-10">
                            <div className="h-8 w-32 bg-gray-500 animate-pulse rounded"></div>
                            {repeatment(<EpisodeSkeleton />, 6)}
                        </div>
                    </>
                ) : (
                    <>
                        <p>{details.japanese}</p>
                        <div className="flex flex-wrap mt-1 gap-y-2 gap-x-5">
                            <Tags>{details.status}</Tags>
                            <Tags>{details.type}</Tags>
                            <Tags>{details.aired}</Tags>
                            <Tags>{details.studios}</Tags>
                        </div>
                        
                        <div className="flex flex-col gap-y-5 mt-5">
                            <article>
                                {synopsis.length > 0 && (
                                    <>
                                        <h2 className="text-xl font-bold">Sinopsis</h2>
                                        <button onClick={() => setSynopsisOpen(!isSynopsisOpen)} className={`
                                        overflow-hidden
                                        ${isSynopsisOpen ? "h-full" : "h-24"}
                                        `}>
                                            {synopsis.map((p) => (
                                                <p className="indent-8 text-justify">{p}</p>
                                            ))}
                                        </button>
                                    </>
                                )}
                            </article>
                            
                            <h2 className="text-xl font-bold">Daftar Episode</h2>
                            {details.episodeList.map((item) => (
                                <Link to={`/anime/watch/${item.episodeId}`} state={{ title }} key={item.episodeId} className="border p-1.5 px-2.5 rounded-xl -space-y-0.5">
                                    <p className="text-lg">Episode {item.eps}</p>
                                    <p className="text-sm text-gray-400">{dateFix(item.date)}</p>
                                </Link>
                            ))}
                        </div>
                    </>
                )}
            </main>
        </>
    )
}
export default Details