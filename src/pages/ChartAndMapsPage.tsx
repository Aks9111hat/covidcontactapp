import React, { useState } from 'react';
import LineGraph from '../components/LineGraph';
import Map from '../components/Map';
import { useFetchWorldData } from '../api/worldwideData';
const ChartsAndMapsPage: React.FC = () => {
    const [showLineGraph, setShowLineGraph] = useState(false);
    const [showMap, setShowMap] = useState(false);
    const [showWorldDetails, setWorldDetails] = useState(true);
    const { data, error, isLoading } = useFetchWorldData();
    console.log(data)
    const worldData = data;
    if (isLoading) {
        return (
            <div className='h-screen w-full flex justify-center items-center bg-slate-300 bg-opacity-50'>
                <div role="status">
                    <svg aria-hidden="true" className="w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        )
    }
    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const handleLineGraphButtonClick = () => {
        setShowLineGraph(true);
        setShowMap(false);
        setWorldDetails(false);
    };

    const handleMapButtonClick = () => {
        setShowMap(true);
        setShowLineGraph(false);
        setWorldDetails(false);
    };


    return (
        <div className='w-full h-screen overflow-scroll xl:overflow-x-scroll lg:overflow-x-hidden md:overflow-x-scroll sm:overflow-x-scroll'>
            <div className='flex justify-around m-5'>
                <button className='transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 hover:bg-emerald-600 duration-300 p-2 rounded-lg bg-emerald-400' onClick={handleLineGraphButtonClick}>Show Line Graph</button>
                <button className='transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 hover:bg-rose-700 duration-300 p-2 rounded-lg bg-rose-500' onClick={handleMapButtonClick}>Show Map</button>
            </div>
            {showWorldDetails && <div className='flex justify-center items-center p-5 my-20'>
                {showWorldDetails &&
                    <div className='flex flex-col justify-center items-center rounded-lg p-10 border-solid border-2 gap-4 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none'>
                        <h1 className='p-2 bg-stone-400 text-lg sm:text-lg md:text-xl lg:text-2xl xl:text-3xl bg-gradient-to-r from-sky-400 to-blue-400 rounded'>World Wide Covid Data</h1>
                        <p>World Population : {worldData.population}</p>
                        <p>Active Cases : {worldData.active}</p>
                        <p>Countries Affected : {worldData.affectedCountries}</p>
                        <p>World Wide Death : {worldData.deaths}</p>
                        <p>Today's Cases : {worldData.todayCases}</p>
                        <p>Today's Death : {worldData.todayDeaths}</p>
                        <p>Today's Recovered : {worldData.todayRecovered}</p>
                    </div>
                }
            </div>}
            <div className='p-5'>
                {showLineGraph && <LineGraph />}
                {showMap && <Map />}
            </div>
        </div>
    );
};

export default ChartsAndMapsPage;
