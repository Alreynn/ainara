import { Link } from 'react-router'
import { useEffect, useState } from 'react'
import { SkeletonTitleOnly } from './components/skeleton.jsx'

const releases = () => {
    const [isLoaded, setLoad] = useState(false);
    const [releases, setReleases] = useState({});

    useEffect(() => {
        fetchAnime();
    }, [])

    const fetchAnime = async () => {
        try {
            const releases = await fetch("https://www.sankavollerei.com/anime/schedule");
            const response = await releases.json();
            
            const schedule = {};
            response.data.forEach((item) => {
                schedule[item.day] = item.anime_list;
            })
            setReleases(schedule);
            setLoad(true);
        } catch(e) {
            alert(e)
        }
    }
    
    const repeatment = (item, amount) => {
        let components = [];
        
        for (let i = 0; i < amount; i++) {
            components.push(<>{item}</>)
        }
        return components;
    }
    
    const SkeletonLoad = () => {
        return (
            <>
                <div className="h-5 w-14 bg-zinc-400 mt-3 rounded animate-pulse"></div>
                <div className="flex flex-row gap-x-5 mt-3 overflow-scroll">
                    {repeatment(<SkeletonTitleOnly />, 3)}
                </div> 
            </>
        )
    }

    return (
        <div className="text-white">
            <main className="background-color py-5">
                <div className="flex items-center justify-between px-1 mt-5">
                    <p className="font-bold text-2xl">Jadwal Rilis</p>
                </div>
                
                <div className="flex flex-col p-2 gap-y-3">
                    {!isLoaded && (
                        repeatment(<SkeletonLoad />, 8)
                    )}
                    {Object.entries(releases).map(([day, list]) => (
                        <>
                            <h2 className="font-bold text-xl">{day}</h2>
                            <div className="flex flex-row gap-x-5 overflow-auto">
                                {list.map((item) => (
                                    <Link to={`/anime/${item.slug}`} state={{ title: item.title, poster: item.poster }} className="flex flex-col grow-0 shrink-0 border border-indigo-300 w-[31.5lvw] rounded-lg p-3">
                                        <img src={item.poster} alt={item.title} className="object-cover aspect-[3/4] rounded" />
                                        <div className="flex flex-col -space-y-1">
                                            <p className="truncate text-lg font-semibold">{item.title}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </>
                    ))}
                </div>
            </main>
        </div>
    )
}
export default releases