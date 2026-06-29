import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useParams, useLocation, Link } from 'react-router'
import { StepBack, StepForward } from 'lucide-react'

const Watch = () => {
    const [fetchedData, setData] = useState(null);
    const [getStreamLink, setStreamLink] = useState("");
    const [getStreamQuality, setStreamQuality] = useState([]);
    const [isLoaded, setLoad] = useState(false);
    
    const { slug } = useParams();
    const { title } = useLocation().state || {};
    
    useEffect(() => {
        fetchStream();
    }, [slug])
    
    const fetchStream = async () => {
        window.scrollTo(0, 0);
        setData(null);
        try {
            const getStream = await fetch(`https://www.sankavollerei.web.id/anime/episode/${slug}`);
            const response = await getStream.json();
            setData(response.data);
            setStreamLink(response.data.defaultStreamingUrl);
            
            const qualities = response.data.server.qualities.splice(0, 1)
            setStreamQuality(response.data.server.qualities)
            setLoad(true);
        } catch(e) {
            alert("Error!");
        }
    }
    
    const handleQuality = async (e) => {
        const target = e.target.value
        if (target === "360p") {
            setStreamLink(fetchedData.defaultStreamingUrl)
        } else {
            const getStream = await fetch(`https://www.sankavollerei.web.id/anime/server/${target}`)
            const response = await getStream.json()
            setStreamLink(response.data.url)
        }
    }
    
    const getTitle = (title) => {
        if (!title) return "";
        
        return title
        .replace(/Episode \d+/gi, "")
        .replace(/Subtitle Indonesia/gi, "")
        .trim();
    }
    
    const getEpisodeNumber = (id) => {
        const match = id?.match(/episode-(\d+)/);
        return match ? match[1] : "?";
    }
    
    return (
        <>
            <Helmet>
                <title>{slug ? `${getTitle(fetchedData?.title)} Ep ${getEpisodeNumber(slug)} - Ainara` : "Memuat... - Ainara"}</title>
                <meta name="description" content={`Nonton ${getTitle(fetchedData?.title)} Ep ${getEpisodeNumber(slug)} di Ainara`} />
            </Helmet>
            
            <main className="background-color text-white min-h-[100lvh]">
                {!isLoaded ? (
                    <div className="w-full aspect-video bg-gray-500 animate-pulse"></div>
                ) : (
                    <div className="w-full aspect-video">
                        <iframe src={getStreamLink} width="100%" height="100%" allowFullScreen></iframe>
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
                                <Link to={`/anime/watch/${fetchedData?.prevEpisode?.episodeId}`} state={{ title }} className="flex items-center gap-1.5 border border-white py-1 px-2 rounded-lg">
                                    <StepBack className="size-3" /> Ep Sebelumnya
                                </Link>
                            ) : (
                                <button></button>
                            )}
                            {fetchedData?.hasNextEpisode && (
                                <Link to={`/anime/watch/${fetchedData?.nextEpisode?.episodeId}`} state={{ title }} className="flex items-center gap-1.5 border border-white py-1 px-2 rounded-lg">
                                    Ep Selanjutnya <StepForward className="size-3" />
                                </Link>
                            )}
                        </>
                    )}
                </div>
                    
                <article className="flex flex-col justify-between p-2">
                    <div>
                        <h1 className="text-xl font-bold">{title || getTitle(fetchedData?.title)}</h1>
                        <p>Episode {getEpisodeNumber(slug)}</p>
                        <select onChange={handleQuality} className="bg-transparent rounded-lg border border-white p-1 mt-2 outline-none">
                            <option value="360p">360p</option>
                            {getStreamQuality.map((item) => (
                                <option value={item.serverList[0].serverId}>{item.title}</option>
                            ))}
                        </select>
                    </div>
                </article>
            </main>
        </>
    )
}
export default Watch