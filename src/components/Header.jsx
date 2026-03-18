import { Link } from 'react-router'

const Header = () => {
    return (
        <header className="flex justify-between items-center bg-blue-700 p-3 px-3.5 z-40 text-white">
            <h1 className="text-2xl font-bold">
                <Link to="/">Ainara</Link>
            </h1>
        </header>
    )
}
export default Header