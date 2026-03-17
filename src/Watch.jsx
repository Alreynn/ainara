import { useLocation, Link } from 'react-router'
import { useState, useEffect } from 'react'
import { StepBack, StepForward } from 'lucide-react'

const Watch = () => {
    const [fetchedData, setData] = useState(null);
    const [isLoaded, setLoad] = useState(false);
    
    const location = useLocation();
    const { epId, title, episode } = location.state || {}
    
    useEffect(() => {
        fetchStream();
    }, [epId])
    
    const fetchStream = async () => {
        setData(null);
        try {
            const getStream = await fetch(`https://www.sankavollerei.com/anime/episode/${epId}`);
            const response = await getStream.json();
            setData(response.data);
            setLoad(true);
        } catch(e) {
            alert("Error!");
        }
    }
    
    return (
        <main className="bg-indigo-400 text-white min-h-[100lvh]">
            {!isLoaded ? (
                <div className="w-full aspect-video bg-gray-500 animate-pulse"></div>
            ) : (
                <div className="w-full aspect-video">
                    <iframe src={fetchedData?.defaultStreamingUrl} width="100%" height="100%" allowFullScreen></iframe>
                </div>
            )}
            
            <div className="flex justify-between mt-3 mx-2">
                {!isLoaded ? (
                    <>
                        <button className="bg-gray-500 h-8 w-36 rounded-lg animate-pulse"></button>
                        <button className="bg-gray-500 h-8 w-36 rounded-lg animate-pulse"></button>
                    </>
                ) : (
                    <>
                        {fetchedData?.hasPrevEpisode ? (
                            <Link to={`/anime/watch/${fetchedData?.prevEpisode?.episodeId}`} state={{ epId: fetchedData?.prevEpisode?.episodeId, title, episode: Number(episode) - 1 }}  className="flex items-center gap-1 border border-white py-1 px-2 rounded-lg">
                                <StepBack className="size-3" /> Ep Sebelumnya
                            </Link>
                        ) : (
                            <button></button>
                        )}
                        {fetchedData?.hasNextEpisode && (
                            <Link to={`/anime/watch/${fetchedData?.nextEpisode?.episodeId}`} state={{ epId: fetchedData?.nextEpisode?.episodeId, title, episode: Number(episode) + 1 }}  className="flex items-center gap-1 border border-white py-1 px-2 rounded-lg">
                                Ep Selanjutnya <StepForward className="size-3" />
                            </Link>
                        )}
                    </>
                )}
            </div>
                
            <article className="flex flex-col p-2">
                <h1 className="text-xl font-bold">{title}</h1>
                <p>Episode {episode}</p>
            </article>
        </main>
    )
}
export default Watch