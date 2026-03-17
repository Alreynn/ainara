import { Link } from 'react-router'
import { useEffect, useState } from 'react'
import { SkeletonTitleOnly } from './components/skeleton.jsx'

const releases = () => {
    const [isLoaded, setLoad] = useState(false);
    const [releases, setReleases] = useState({});
    const [monday, setMondayRelease] = useState([]);
    const [tuesday, setTuesdayRelease] = useState([]);
    const [wednesday, setWednesdayRelease] = useState([]);
    const [thursday, setThursdayRelease] = useState([]);
    const [friday, setFridayRelease] = useState([]);
    const [saturday, setSaturdayRelease] = useState([]);
    const [sunday, setSundayRelease] = useState([]);

    useEffect(() => {
        fetchAnime();
    }, [])

    const fetchAnime = async () => {
        try {
            const releases = await fetch("https://www.sankavollerei.com/anime/schedule");
            const response = await releases.json();
            setReleases(response.data);
            
            setMondayRelease(response.data[0].anime_list);
            setTuesdayRelease(response.data[1].anime_list);
            setWednesdayRelease(response.data[2].anime_list);
            setThursdayRelease(response.data[3].anime_list);
            setFridayRelease(response.data[4].anime_list);
            setSaturdayRelease(response.data[5].anime_list);
            setSundayRelease(response.data[6].anime_list);
            
            setLoad(true);
        } catch(e) {
            alert(e)
        }
    }

    return (
        <div className="text-white">
            <main className="bg-indigo-400 py-5">
                <div className="flex items-center justify-between px-1">
                    <p className="font-bold text-2xl">Jadwal Rilis</p>
                </div>
                
                <div className="flex flex-col bg-blue-950/10 p-2 gap-y-3">
                    <p className="font-bold text-xl">Senin</p>
                    <div className="flex flex-row gap-x-5 overflow-auto">
                        {!isLoaded && (
                            <>
                                <SkeletonTitleOnly />
                                <SkeletonTitleOnly />
                                <SkeletonTitleOnly />
                            </>
                        )}
                        {monday.map((item) => (
                            <div className="flex flex-col bg-blue-500 w-[31.5lvw] rounded-lg p-3 grow-0 shrink-0">
                                <img src={item.poster} className="object-cover w-full rounded" />
                                <div className="flex flex-col -space-y-1">
                                    <p className="truncate text-lg font-semibold">{item.title}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <p className="font-bold text-xl">Selasa</p>
                    <div className="flex flex-row gap-x-5 overflow-auto">
                        {!isLoaded && (
                            <>
                                <SkeletonTitleOnly />
                                <SkeletonTitleOnly />
                                <SkeletonTitleOnly />
                            </>
                        )}
                        {tuesday.map((item) => (
                            <div className="flex flex-col bg-blue-500 w-[31.5lvw] rounded-lg p-3 grow-0 shrink-0">
                                <img src={item.poster} className="object-cover w-full rounded" />
                                <div className="flex flex-col -space-y-1">
                                    <p className="truncate text-lg font-semibold">{item.title}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <p className="font-bold text-xl">Rabu</p>
                    <div className="flex flex-row gap-x-5 overflow-auto">
                        {!isLoaded && (
                            <>
                                <SkeletonTitleOnly />
                                <SkeletonTitleOnly />
                                <SkeletonTitleOnly />
                            </>
                        )}
                        {wednesday.map((item) => (
                            <div className="flex flex-col bg-blue-500 w-[31.5lvw] rounded-lg p-3 grow-0 shrink-0">
                                <img src={item.poster} className="object-cover w-full rounded" />
                                <div className="flex flex-col -space-y-1">
                                    <p className="truncate text-lg font-semibold">{item.title}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <p className="font-bold text-xl">Kamis</p>
                    <div className="flex flex-row gap-x-5 overflow-auto">
                        {!isLoaded && (
                            <>
                                <SkeletonTitleOnly />
                                <SkeletonTitleOnly />
                                <SkeletonTitleOnly />
                            </>
                        )}
                        {thursday.map((item) => (
                            <div className="flex flex-col bg-blue-500 w-[31.5lvw] rounded-lg p-3 grow-0 shrink-0">
                                <img src={item.poster} className="object-cover w-full rounded" />
                                <div className="flex flex-col -space-y-1">
                                    <p className="truncate text-lg font-semibold">{item.title}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <p className="font-bold text-xl">Jumat</p>
                    <div className="flex flex-row gap-x-5 overflow-auto">
                        {!isLoaded && (
                            <>
                                <SkeletonTitleOnly />
                                <SkeletonTitleOnly />
                                <SkeletonTitleOnly />
                            </>
                        )}
                        {friday.map((item) => (
                            <div className="flex flex-col bg-blue-500 w-[31.5lvw] rounded-lg p-3 grow-0 shrink-0">
                                <img src={item.poster} className="object-cover w-full rounded" />
                                <div className="flex flex-col -space-y-1">
                                    <p className="truncate text-lg font-semibold">{item.title}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <p className="font-bold text-xl">Sabtu</p>
                    <div className="flex flex-row gap-x-5 overflow-auto">
                        {!isLoaded && (
                            <>
                                <SkeletonTitleOnly />
                                <SkeletonTitleOnly />
                                <SkeletonTitleOnly />
                            </>
                        )}
                        {saturday.map((item) => (
                            <div className="flex flex-col bg-blue-500 w-[31.5lvw] rounded-lg p-3 grow-0 shrink-0">
                                <img src={item.poster} className="object-cover w-full rounded" />
                                <div className="flex flex-col -space-y-1">
                                    <p className="truncate text-lg font-semibold">{item.title}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <p className="font-bold text-xl">Minggu</p>
                    <div className="flex flex-row gap-x-5 overflow-auto">
                        {!isLoaded && (
                            <>
                                <SkeletonTitleOnly />
                                <SkeletonTitleOnly />
                                <SkeletonTitleOnly />
                            </>
                        )}
                        {sunday.map((item) => (
                            <div className="flex flex-col bg-blue-500 w-[31.5lvw] rounded-lg p-3 grow-0 shrink-0">
                                <img src={item.poster} className="object-cover w-full rounded" />
                                <div className="flex flex-col -space-y-1">
                                    <p className="truncate text-lg font-semibold">{item.title}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    )
}
export default releases