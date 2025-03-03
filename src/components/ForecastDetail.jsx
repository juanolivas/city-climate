import { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';

function ForecastDetail() {
  const { cityName } = useParams();
  const location = useLocation();
  const { lat, lon } = location.state || {};
  
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchForecastData = async () => {
      try {
        setLoading(true);
        // TODO: Implementar un nuevo endpoint (de cobro) para ver más de 5 días de pronosticos
        const response = await fetch(`http://127.0.0.1:3000/api/v1/forecast?&lat=${lat}&lon=${lon}`);
        
        if (!response.ok) {
          throw new Error(`No se pudieron cargar los datos de ${cityName}`);
        }
        
        const result = await response.json();
        
        setForecastData(result.data || []);
        console.log(result.data)
        setError(null);
      } catch (err) {
        console.error('No se pudieron cargar los datos:', err);
        setError('No se pudo cargar el pronóstico.');
      } finally {
        setLoading(false);
      }
    };

    if (lat && lon) {
      fetchForecastData();
    } else {
      setError('Información de ubicación no disponible');
      setLoading(false);
    }
  }, [cityName, lat, lon]);

  const getWeatherIcon = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Pronóstico de clima para {cityName}
        </h2>
        
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
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="divide-y">
            {forecastData.map((day, index) => (
              <div key={index} className="p-6 hover:bg-gray-50">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="mb-4 md:mb-0">
                    <h4 className="text-lg font-semibold">{day.date}</h4>
                    <p className="text-gray-600">Condición:</p>
                    <p className="font-semibold">{day.condition}</p>
                  </div>
                  
                  <div className="flex items-center">
                    <img 
                      src={getWeatherIcon(day.icon)} 
                      alt={day.condition} 
                      className="h-12 w-12"
                    />
                    <div className="ml-4">
                      <div className="flex items-center">
                        <span className="text-red-500 font-medium">Max: {Math.round(day.temp_max)}°C</span>
                        <span className="mx-2 text-gray-300">|</span>
                        <span className="text-blue-500 font-medium">Min: {Math.round(day.temp_min)}°C</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default ForecastDetail;