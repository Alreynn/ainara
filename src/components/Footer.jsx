import { useLocation, Link } from 'react-router'

const Footer = () => {
    const hideFooter = useLocation().pathname.includes('/anime/') && !useLocation().pathname.includes('/watch/');
    if (hideFooter) return null;
    
    const getYear = new Date().getFullYear();
    
    return (
        <footer className="flex flex-col gap-y-5 bg-gradient-to-b from-indigo-500 to-blue-700 text-white p-3 pt-24 pb-5">
            <div className="-space-y-1">
                <h2 className="text-4xl font-bold">Ainara</h2>
                <p className="text-sm">Initial Release • {getYear}</p>
            </div>
            
            <table>
                <tbody>
                    <tr>
                        <Link to="https://github.com/Alreynn">Kunjungi Github</Link>
                    </tr>
                    <tr>
                        <Link to="https://www.sankavollerei.com/anime/">Sumber API</Link>
                    </tr>
                </tbody>
            </table>
        </footer>
    )
}
export default Footer