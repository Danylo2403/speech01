export async function fetchWeather(city) {
//
//
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
