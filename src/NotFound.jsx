import { Link } from 'react-router'

const NotFound = () => {
    return (
        <main className="flex justify-center items-center bg-indigo-400 h-[100lvh] text-white p-3">
            <article className="flex flex-col text-center">
                <h1 className="text-3xl font-bold">ERROR 404</h1>
                <button className="rounded-lg border border-white py-1 px-2 active:bg-indigo-300/20">
                    <Link to="/">Klik untuk kembali</Link>
                </button>
            </article>
        </main>
    )
}
export default NotFound