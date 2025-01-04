export async function fetchWeather(city) {
  const apiKey = '94f87b5642d293df0fe0ec7fd68ef3f4'; // Замени на свой API-ключ
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=ru&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.cod === 200) {
      return {
        name: data.name,
        description: data.weather[0].description,
        temp: data.main.temp,
      };
    } else {
      console.error(data.message);
      return null;
    }
  } catch (error) {
    console.error('Ошибка получения данных:', error);
    return null;
  }
}
