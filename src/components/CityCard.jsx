import { Link } from 'react-router-dom';

function CityCard({ data }) {
  const getWeatherIcon = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  return (
    <Link 
      to={`/forecast/${data.city}`} 
      state={{ lat: data.lat, lon: data.lon }}
      className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className={`bg-gradient-to-r from-green-300 to-green-400 text-white p-4`}>
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold">{data.city}</h3>
            </div>
          </div>
          
          <div className="flex items-center mt-2">
            <img
              src={getWeatherIcon(data.icon)}
              className="h-16 w-16 mr-2"
            />
            <div>
              <p className="font-medium capitalize">{data.condition}</p>
            </div>
          </div>
        </div>
        
        <div className="p-4">
          <div className="grid gap-4 text-sm">
            <div>
              <p className="text-gray-500">Temperatura Actual</p>
              <p className="font-medium">{Math.round(data.temp)}°C</p>
            </div>
          </div>
        </div>
        <div className="p-4 text-center">
          <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
            Ver pronóstico para otros días →
          </span>
        </div>
      </div>
    </Link>
  );
}

export default CityCard;