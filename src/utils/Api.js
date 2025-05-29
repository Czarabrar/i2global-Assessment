import {WEATHER_API_KEY, BASE_URL} from '../contants/Config';

const depressingKeywords = ['death', 'loss', 'dead', 'murder', 'tragedy'];
const fearKeywords = [
  'fear',
  'panic',
  'attack',
  'fire',
  'explosion',
  'crisis',
  'accident',
];
const happyKeywords = ['win', 'won', 'happy', 'celebrate', 'joy', 'success'];
export const fetchWeather = async (lat, lon, unit) => {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${WEATHER_API_KEY}`,
  );
  return await res.json();
};

export const fetchFiveDayForecast = async (lat, lon, unit) => {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${unit}&appid=${WEATHER_API_KEY}`,
  );
  const data = await res.json();

  const daily = {};
  data.list.forEach(item => {
    const date = item.dt_txt.split(' ')[0];
    if (!daily[date] && item.dt_txt.includes('12:00:00')) {
      daily[date] = item;
    }
  });

  return Object.values(daily).slice(0, 5);
};

export const fetchNewsFromCategory = async (
  category = 'general',
  country = 'in',
) => {
  try {
    const res = await fetch(
      `${BASE_URL}/top-headlines/category/${category}/${country}.json`,
    );
    const data = await res.json();
    console.log('Fetched news:', data, 'articles');
    return data.articles;
  } catch (err) {
    console.error('Error fetching news:', err);
    return [];
  }
};

export const filterNewsByWeather = (condition, articles) => {
  const conditionLower = condition.toLowerCase();
  console.log('Filtering news for condition:', conditionLower);
  let keywords = [];

  if (conditionLower.includes('cold') || conditionLower.includes('clouds')) {
    keywords = depressingKeywords;
  } else if (conditionLower.includes('hot')) {
    keywords = fearKeywords;
  } else if (
    conditionLower.includes('cool') ||
    conditionLower.includes('clear')
  ) {
    keywords = happyKeywords;
  } else {
    return articles;
  }

  return articles.filter(article =>
    keywords.some(
      keyword =>
        article.title?.toLowerCase().includes(keyword) ||
        article.description?.toLowerCase().includes(keyword) ||
        article.content?.toLowerCase().includes(keyword),
    ),
  );
};
