const SidebarLetter = ({ isLoaded, arrayToMap }) => {
    const jumpLetter = (letter) => {
        const element = document.getElementById(letter);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }
    
    return (
        <sidebar className={`
        fixed flex top-0 min-h-screen items-center
        transition-all duration-500 delay-700
        ${isLoaded ? "right-2 visible" : "-right-6 invisible"}
        `}>
            <div className="flex flex-col text-center gap-y-3 h-96 overflow-auto p-2 px-3 rounded-xl bg-gradient-to-t from-blue-700/10 to-blue-500/10 backdrop-blur-sm shadow shadow-inner shadow-white/25 text-white">
                {arrayToMap.map((item) => (
                    <button onClick={() => jumpLetter(item.startWith)}>{item.startWith}</button>
                ))}
            </div>
        </sidebar>
    )
}
export default SidebarLetter