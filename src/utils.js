export function speak(text) {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'ru-RU';
  synth.speak(utterance);
}

export function setLanguage(recognition, lang) {
  recognition.lang = lang;
  speak(`Язык изменён на ${lang === 'en-US' ? 'английский' : 'русский'}.`);
}
