import { fetchWeather } from './weather.js';
import { getNews } from './news.js';
import { addReminder, checkReminders } from './tasks.js';
import { speak, setLanguage } from './utils.js';
import { logCommand, getCommandHistory } from './storage.js';

// Проверка поддержки Web Speech API
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
  const recognition = new SpeechRecognition();
  recognition.lang = 'ru-RU';
  recognition.interimResults = false;

  const startBtn = document.getElementById('start-btn');
  const output = document.getElementById('output');
  const infoContainer = document.getElementById('info-container');

  startBtn.addEventListener('click', () => {
    recognition.start();
    startBtn.classList.add('listening');
    output.textContent = 'Слушаю вас...';
  });

  recognition.addEventListener('result', async (event) => {
    const speech = event.results[0][0].transcript.toLowerCase();
    output.textContent = `Вы сказали: "${speech}"`;
    startBtn.classList.remove('listening');
    logCommand(speech); // Логируем команду

    if (speech.includes('привет')) {
      speak('Привет! Как я могу помочь?');
    } else if (speech.includes('как тебя зовут')) {
      speak('Меня зовут Джарвис, ваш голосовой помощник.');
    } else if (speech.includes('сколько время')) {
      const now = new Date();
      const time = now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
      speak(`Сейчас ${time}`);
    } else if (speech.includes('погода')) {
      const city = speech.split('погода в ')[1] || 'Киев';
      const weatherData = await fetchWeather(city);
      if (weatherData) {
        const { name, description, temp } = weatherData;
        speak(`В городе ${name} сейчас ${description}, температура ${temp} градусов.`);
        infoContainer.innerHTML = `<div class="card">
          <h3>Погода в ${name}</h3>
          <p>${description}, ${temp} °C</p>
        </div>`;
      } else {
        speak('Не удалось получить данные о погоде.');
      }
    } else if (speech.includes('напомни')) {
      const reminder = speech.replace('напомни', '').trim();
      addReminder(reminder);
      speak(`Я напомню вам: ${reminder}`);
    } else if (speech.includes('новости')) {
  const news = await getNews();
  if (news && news.length > 0) {
    speak('Вот последние новости.');
    for (let i = 0; i < Math.min(news.length, 3); i++) {
      const { title, description } = news[i];
      speak(`Новость ${i + 1}: ${title}. ${description}`);
    }
    infoContainer.innerHTML = news.map(
      (item) => `<div class="card"><h3>${item.title}</h3><p>${item.description}</p></div>`
    ).join('');
  } else {
    speak('Не удалось загрузить новости.');
  }
} else if (speech.includes('измени язык на английский')) {
      setLanguage(recognition, 'en-US');
    } else {
      speak('Извините, я не знаю такой команды.');
    }
  });

  recognition.addEventListener('end', () => {
    startBtn.classList.remove('listening');
  });
} else {
  alert('Ваш браузер не поддерживает Web Speech API.');
}
