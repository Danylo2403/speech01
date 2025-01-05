export async function getNews() {
//
//
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.status === 'ok') {
      return data.articles.slice(0, 5).map((article) => ({
        title: article.title,
        description: article.description,
      }));
    } else {
      console.error(data.message);
      return null;
    }
  } catch (error) {
    console.error('Ошибка получения новостей:', error);
    return null;
  }
}
