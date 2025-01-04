import { fetchWeather } from './weather.js';
import { speak } from './utils.js';

// Проверка поддержки Web Speech API
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
  const recognition = new SpeechRecognition();
  recognition.lang = 'ru-RU';
  recognition.interimResults = false;

  const startBtn = document.getElementById('start-btn');
  const output = document.getElementById('output');

  startBtn.addEventListener('click', () => {
    recognition.start();
    output.textContent = 'Слушаю вас...';
  });

  recognition.addEventListener('result', async (event) => {
    const speech = event.results[0][0].transcript.toLowerCase();
    output.textContent = `Вы сказали: "${speech}"`;

    if (speech.includes('привет')) {
      speak('Привет! Как я могу помочь?');
    } else if (speech.includes('как тебя зовут')) {
      speak('Меня зовут Джарвис, ваш голосовой помощник.');
    } else if (speech.includes('сколько время')) {
      const now = new Date();
      const time = now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
      speak(`Сейчас ${time}`);
    } else if (speech.includes('погода')) {
      const city = speech.split('погода в ')[1] || 'Москва';
      const weatherData = await fetchWeather(city);
      if (weatherData) {
        const { name, description, temp } = weatherData;
        speak(`В городе ${name} сейчас ${description}, температура ${temp} градусов.`);
      } else {
        speak('Не удалось получить данные о погоде.');
      }
    } else {
      speak('Извините, я не знаю такой команды.');
    }
  });

  recognition.addEventListener('end', () => {
    output.textContent += ' (Готово)';
  });
} else {
  alert('Ваш браузер не поддерживает Web Speech API.');
}
