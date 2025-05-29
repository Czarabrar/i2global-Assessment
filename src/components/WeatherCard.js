import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import moment from 'moment';
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const {width} = Dimensions.get('window');

const weatherAnimations = {
  Clear: require('../../Assets/gifs/clear.json.json'),
  Clouds: require('../../Assets/gifs/cloudy.json.json'),
  Rain: require('../../Assets/gifs/rainy.json.json'),
  Drizzle: require('../../Assets/gifs/rainy.json.json'),
  Thunderstorm: require('../../Assets/gifs/rainy.json.json'),
  Snow: require('../../Assets/gifs/cloudy.json.json'),
  Mist: require('../../Assets/gifs/cloudy.json.json'),
  Smoke: require('../../Assets/gifs/cloudy.json.json'),
  Haze: require('../../Assets/gifs/cloudy.json.json'),
  Dust: require('../../Assets/gifs/clear.json.json'),
  Fog: require('../../Assets/gifs/cloudy.json.json'),
  Sand: require('../../Assets/gifs/clear.json.json'),
  Ash: require('../../Assets/gifs/cloudy.json.json'),
  Squall: require('../../Assets/gifs/rainy.json.json'),
  Tornado: require('../../Assets/gifs/rainy.json.json'),
};

export default function WeatherCard({weather, forecast, unit}) {
  const groupedForecast = forecast.reduce((acc, item) => {
    const date = moment(item.dt_txt).format('YYYY-MM-DD');
    if (!acc[date]) acc[date] = [];
    acc[date].push(item);
    return acc;
  }, {});

  const dailyForecasts = Object.entries(groupedForecast).map(
    ([date, items]) => {
      const temps = items.map(i => i.main.temp);
      const avgTemp = (
        temps.reduce((sum, t) => sum + t, 0) / temps.length
      ).toFixed(1);
      const condition = items[0].weather[0].main;
      return {date, avgTemp, condition};
    },
  );

  // const currentCondition = weather.weather[0].main;
  const currentCondition = 'cool';
  const animationSource =
    weatherAnimations[currentCondition] || weatherAnimations.Clear;

  return (
    <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
      {/* Current Weather Card */}
      <View style={[styles.card, {width}]}>
        <View style={styles.cardHeader}>
          <Icon name="location" size={24} style={styles.icon} />
          <Text style={styles.sectionTitle}> {weather.name}</Text>
        </View>
        <LottieView
          source={animationSource}
          autoPlay
          loop
          style={styles.lottie}
        />
        <Text style={styles.weatherText}></Text>
        <Text style={styles.weatherText}>
          Weather Condition:{' '}
          <Text style={styles.weathertextimp}>{currentCondition}</Text>
        </Text>
        <Text style={styles.weatherText}>
          Temp: <Text style={styles.weathertextimp}>{weather.main.temp}°</Text>{' '}
          {unit === 'metric' ? 'C' : 'F'}
        </Text>
        <View style={styles.cardsliderinfo}>
          <MaterialIcons
            name="keyboard-double-arrow-right"
            size={24}
            style={styles.icon}
          />
          <Text> Slide to see 5 day forecast</Text>
        </View>
      </View>

      {/* Forecast Card */}
      <View style={[styles.forecastmaincard, {width}]}>
        <View style={styles.forecastContainer}>
          <Text style={[styles.sectionTitle, {marginBottom: 5}]}>
            5-Day Forecast
          </Text>
          <View style={styles.forecastGrid}>
            {dailyForecasts.slice(0, 5).map((item, index) => (
              <View key={item.date} style={styles.forecastCardFixed}>
                <View>
                  <LottieView
                    autoPlay
                    source={
                      weatherAnimations[item.condition] ||
                      weatherAnimations.Clear
                    }
                    style={styles.forecastIcon}
                  />
                </View>
                <View style={{alignItems: 'center'}}>
                  <Text style={styles.forecastDay}>
                    {moment(item.date).format('ddd')}
                  </Text>
                  <Text style={styles.forecastDate}>
                    {moment(item.date).format('MMM D')}
                  </Text>
                  <Text style={styles.forecastTemp}>
                    {item.avgTemp}° {unit === 'metric' ? 'C' : 'F'}
                  </Text>
                  <Text style={styles.forecastCondition}>{item.condition}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  card: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
    height: width * 0.7,
    marginRight: 10,
  },
  forecastmaincard: {
    padding: 10,
    backgroundColor: '#fff',
    paddingRight: 30,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
    height: width * 0.7,
    // height: width * 1,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    paddingBottom: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  weatherText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 4,
    textAlign: 'center',
  },
  weathertextimp: {
    fontSize: 18,
    color: '#555',
    fontWeight: 'bold',
  },
  lottie: {
    width: width * 0.3,
    height: width * 0.3,
    alignSelf: 'center',
  },

  forecastContainer: {
    marginTop: 16,
  },
  cardsliderinfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  forecastCard: {
    width: width * 0.9,
    flexDirection: 'column',
    backgroundColor: '#f0f4f8',
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginLeft: 10,
  },
  forecastIcon: {
    width: width * 0.1,
    height: width * 0.1,
    marginBottom: 6,
  },
  forecastDay: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  forecastDate: {
    fontSize: 14,
    color: '#666',
  },
  forecastTemp: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
    marginTop: 4,
  },
  forecastCondition: {
    fontSize: 13,
    color: '#555',
    textAlign: 'center',
    marginTop: 2,
  },
  forecastGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  forecastCardFixed: {
    width: '29%',
    flexDirection: 'row',
    height: width * 0.25,
    backgroundColor: '#f0f4f8',
    borderRadius: 10,
    // padding: 10,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    paddingRight: 10,
  },
});
