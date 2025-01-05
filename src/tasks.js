let reminders = [];

export function addReminder(reminder) {
  reminders.push({
    text: reminder,
    time: Date.now() + 60000, // Через 1 минуту
  });
  checkReminders();
}

export function checkReminders() {
  setInterval(() => {
    const now = Date.now();
    reminders = reminders.filter((reminder) => {
      if (reminder.time <= now) {
        alert(`Напоминание: ${reminder.text}`);
        return false;
      }
      return true;
    });
  }, 1000); // Проверяем каждую секунду
}
