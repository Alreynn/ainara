export const SkeletonHome = () => {
    return (
        <div className="flex flex-col bg-slate-700 w-[31.5lvw] rounded-lg p-3 md:w-[15lvw]">
            <div className="object-cover w-full aspect-[3/4] bg-zinc-400 rounded animate-pulse" />
            <div className="flex flex-col space-y-1.5 mt-1.5">
                <div className="h-3.5 bg-zinc-400 rounded animate-pulse"></div>
                <div className="h-3 bg-zinc-400 rounded animate-pulse"></div>
                <div className="h-3 bg-zinc-400 rounded animate-pulse"></div>
            </div>
        </div>
    )
}

export const SkeletonTitleOnly = () => {
    // This needs width fixing
    return (
        <div className="flex flex-col bg-slate-700 w-[31.5lvw] rounded-lg p-3 md:w-[15lvw]">
            <div className="object-cover w-full aspect-[3/4] bg-zinc-400 rounded animate-pulse" />
            <div className="flex flex-col space-y-1.5 mt-1.5">
                <div className="h-3.5 bg-zinc-400 rounded animate-pulse"></div>
            </div>
        </div>
    )
}

export const GenreSkeleton = ({ width }) => {
    return (
        <div style={{ width: `${width * 4}px` }} className={`bg-gray-400 border-white rounded-md py-0.5 px-2 h-6 animate-pulse`}></div>
    )
}

export const EpisodeSkeleton = () => {
    return (
        <div className="border p-1.5 px-2.5 rounded-xl space-y-1.5">
            <div className="w-24 h-6 bg-gray-500 rounded animate-pulse"></div>
            <div className="w-28 h-4 bg-gray-500 rounded animate-pulse"></div>
        </div>
    )
}