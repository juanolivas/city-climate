import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CityCard from './components/CityCard';
import ForecastDetail from './components/ForecastDetail';

function App() {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://127.0.0.1:3000/api/v1/popular_cities_data`);

        if (!response.ok) {
          throw new Error(`No se pudieron cargar los datos`);
        }
        const results = await response.json();
        
        const formattedData = results["data"].map(data => ({
          city: data.city_name,
          lat: data.lat,
          lon: data.long,
          temp: data.main.temp,
          condition: data.weather[0].description,
          icon: data.weather[0].icon
        }));
        setWeatherData(formattedData);
        setError(null);
      } catch (err) {
        console.error('No se pudieron cargar los datos:', err);
        setError('No se pudieron cargar los datos del clima. Por favor, inténtalo de nuevo más tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  const Index = () =>  (
    <div className="min-h-screen bg-gray-100">
      
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Principales Ciudades usando Places API</h2>
        
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        )}
        
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
            <p>{error}</p>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {weatherData.map(cityData => (
            <CityCard key={cityData.city} data={cityData} />
          ))}
        </div>
      </main>
    </div>
  );

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/forecast/:cityName" element={<ForecastDetail />} />
      </Routes>
    </Router>
  );
}

export default App;