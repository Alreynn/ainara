import { Link } from 'react-router'

export const AnimeBox = ({ linkTo, title, poster, score, episode, lastRelease }) => {
    const getScore = (score) => {
        if (!score) return "";
        
        return score
        .replace(/Fall 2025/gi, "")
        .trim();
    }
    
    const getTitle = (title) => {
        if (!title) return "";
        
        return title
        .replaceAll(/[()]/gi, "")
        .replace(/Episode \d+ – \d+/gi, "")
        .replace(/Sub Indo/gi, "")
        .replace(/Subtitle Indonesia/gi, "")
        .trim();
    }
    
    return (
        <Link to={`/anime/${linkTo}`} state={{ title: getTitle(title), poster: poster }} key={title} className="flex flex-col grow-0 shrink-0 border border-indigo-300 w-[31.5lvw] rounded-lg p-3 md:w-[15lvw]">
            <div className="relative">
                <img src={poster} alt={title} className="object-cover aspect-[3/4] w-full rounded" />
                {score && (
                    <p className="absolute top-0 bg-blue-700 rounded-br-lg p-0.5 px-2 text-sm">{getScore(score) !== "" ? getScore(score) : "?"}</p>
                )}
            </div>
            <div className="flex flex-col -space-y-1">
                <p className="truncate text-lg font-semibold">{title}</p>
                {episode && (
                    <p className="truncate text-sm">Ep {episode}</p>
                )}
                <p className="truncate text-sm">{lastRelease}</p>
            </div>
        </Link>
    )
}