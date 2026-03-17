export const SkeletonHome = () => {
    return (
        <div className="flex flex-col bg-slate-700 w-[31.5lvw] rounded-lg p-3">
            <div className="object-cover w-full h-40 bg-zinc-400 rounded animate-pulse" />
            <div className="flex flex-col space-y-1.5 mt-1.5">
                <div className="h-3.5 bg-zinc-400 rounded animate-pulse"></div>
                <div className="h-3 bg-zinc-400 rounded animate-pulse"></div>
                <div className="h-3 bg-zinc-400 rounded animate-pulse"></div>
            </div>
        </div>
    )
}

export const SkeletonTitleOnly = () => {
    return (
        <div className="flex flex-col bg-slate-700 w-[31.5lvw] rounded-lg p-3">
            <div className="object-cover w-full h-40 bg-zinc-400 rounded animate-pulse" />
            <div className="flex flex-col space-y-1.5 mt-1.5">
                <div className="h-3.5 bg-zinc-400 rounded animate-pulse"></div>
            </div>
        </div>
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