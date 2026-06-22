const MinimumBox = ({children}) => {
    return (
        <div className="flex flex-row justify-between items-center w-full border border-indigo-300 p-1.5 px-3 rounded-lg">
            {children}
        </div>
    )
}
export default MinimumBox