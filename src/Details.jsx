import { useLocation, Link } from 'react-router'
import { useState, useEffect } from 'react'
import { EpisodeSkeleton } from './components/skeleton.jsx'

const Details = () => {
    const [details, setDetails] = useState([]);
    const [isLoaded, setLoad] = useState(false);
    
    const location = useLocation();
    const { title, poster, id } = location.state || {}
    
    useEffect(() => {
        fetchDetails();
    }, [])
    
    const fetchDetails = async () => {
        try {
            const getDetails = await fetch(`https://www.sankavollerei.com/anime/anime/${id}`);
            const response = await getDetails.json();
            setDetails(response.data);
            setLoad(true);
        } catch(e) {
            alert("Error!");
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
    
    return (
        <div className="text-white">
            <img src={poster} className="w-screen min-h-[0lvh] object-cover" />
            <div className="absolute top-32 w-screen bg-gradient-to-b from-gray-950/0 to-slate-950 to-35% p-3 pt-32 min-h-screen">
                <div className="flex flex-row justify-between items-center basis-1/4">
                    <h1 className="text-4xl font-bold">{title}</h1>
                    <span className="border border-white rounded-lg p-1 px-2">{!isLoaded && !(details.score === undefined) ? `${details.score}` : "?"}</span>
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
                    <div className="flex mt-1 gap-x-5">
                        <span className="border border-white rounded-md py-0.5 px-1.5 text-sm">{details.status}</span>
                        <span className="border border-white rounded-md py-0.5 px-1.5 text-sm">{details.type}</span>
                        <span className="border border-white rounded-md py-0.5 px-1.5 text-sm">{details.aired}</span>
                        <span className="border border-white rounded-md py-0.5 px-1.5 text-sm">{details.studios}</span>
                    </div>
                    
                    <div className="flex flex-col gap-y-5 mt-10">
                        <h2 className="text-xl font-bold">Daftar Episode</h2>
                        {details.episodeList.map((item) => (
                            <Link to={`/anime/watch/${item.episodeId}`} state={{ epId: item.episodeId, title, episode: item.eps }} className="border p-1.5 px-2.5 rounded-xl -space-y-0.5">
                                <p className="text-lg">Episode {item.eps}</p>
                                <p className="text-sm text-gray-400">{dateFix(item.date)}</p>
                            </Link>
                        ))}
                    </div>
                </>
                )}
            </div>
        </div>
    )
}
export default Details