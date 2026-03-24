import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router'
import { SkeletonTitleOnly } from './components/skeleton.jsx'
import { AnimeBox } from './components/AnimeBox.jsx'
import Navigation from './components/Navigation.jsx'

const releases = () => {
    const [isLoaded, setLoad] = useState(false);
    const [releases, setReleases] = useState({});

    useEffect(() => {
        fetchAnime();
    }, [])

    const fetchAnime = async () => {
        window.scrollTo(0, 0);
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
            <div className="flex flex-col gap-y-3">
                <div className="h-5 w-14 bg-zinc-400 mt-3 rounded animate-pulse"></div>
                <div className="flex flex-row gap-x-5 overflow-auto">
                    {repeatment(<SkeletonTitleOnly />, 3)}
                </div> 
            </div>
        )
    }

    return (
        <>
            <Helmet>
                <title>Jadwal Rilis - Ainara</title>
                <meta name="description" content="Cari tahu Jadwal Rilis Anime di Ainara" />
            </Helmet>
            
            <main className="background-color py-5 px-2 text-white">
                <div className="flex items-center justify-between px-1 mt-5">
                    <p className="font-bold text-2xl">Jadwal Rilis</p>
                </div>
                
                <div className="flex flex-col gap-y-3">
                    {!isLoaded && (
                        repeatment(<SkeletonLoad />, 8)
                    )}
                    {Object.entries(releases).map(([day, list]) => (
                        <div className="flex flex-col gap-y-1">
                            <h2 className="font-bold text-xl">{day}</h2>
                            <div className="flex flex-row gap-x-5 overflow-auto">
                                {list.map((item) => (
                                    <AnimeBox linkTo={item.slug} title={item.title} poster={item.poster} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </main>
            
            <Navigation isLoaded={isLoaded} />
        </>
    )
}
export default releases