import React from 'react';
import MinimumBox from './components/MinimumBox.jsx'
import Navigation from './components/Navigation.jsx'
import favicon from '../public/favicon.png'

const Settings = () => {
    return (
        <main className="background-color py-5 px-2 text-white min-h-screen">
            <div className="flex flex-col w-full items-center">
                <img src={favicon} className="w-48" />
                <h1 className="text-xl font-bold">Ainara</h1>
            </div>
            
            <MinimumBox>
                <p>Tema</p>
                <select className="bg-transparent outline-none text-right">
                    <option>Ainara Purple</option>
                </select>
            </MinimumBox>
            
            <Navigation isLoaded={true} />
        </main>
    )
}
export default Settings