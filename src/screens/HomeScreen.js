import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Alert,
  ToastAndroid,
  Linking,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {AppContext} from '../context/AppContext';
import {
  fetchWeather,
  fetchFiveDayForecast,
  fetchNewsFromCategory,
  filterNewsByWeather,
} from '../utils/Api';
import WeatherCard from '../components/WeatherCard';
import NewsCard from '../components/NewsCard';
import {useNavigation} from '@react-navigation/native';

export default function HomeScreen() {
  const {unit, categories} = useContext(AppContext);
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const getLocationAndData = async () => {
    setLoading(true);
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          Geolocation.getCurrentPosition(
            async pos => {
              const {latitude, longitude} = pos.coords;
              const weatherRes = await fetchWeather(latitude, longitude, unit);
              const forecastRes = await fetchFiveDayForecast(
                latitude,
                longitude,
                unit,
              );
              setWeather(weatherRes);
              setForecast(forecastRes);
              setLoading(false);
            },
            error => {
              console.error(error);
              setLoading(false);
            },
            {enableHighAccuracy: true},
          );
        } else if (granted === PermissionsAndroid.RESULTS.DENIED) {
          Alert.alert(
            'Permission Required',
            'Location permission is needed to show weather and news based on your location.',
            [
              {
                text: 'Try Again',
                onPress: () => getLocationAndData(),
              },
              {
                text: 'Cancel',
                style: 'cancel',
                onPress: () => setLoading(false),
              },
            ],
            {cancelable: false},
          );
        } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
          Alert.alert(
            'Permission Permanently Denied',
            'You have permanently denied location access. Please enable it manually in settings.',
            [
              {
                text: 'Open Settings',
                onPress: () => Linking.openSettings(),
              },
              {
                text: 'Cancel',
                style: 'cancel',
                onPress: () => setLoading(false),
              },
            ],
            {cancelable: false},
          );
        }
      }
    } catch (error) {
      console.error('Error requesting location permission:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getLocationAndData();
  }, [unit]);

  useEffect(() => {
    const getNews = async () => {
      if (!weather || !weather.weather || !weather.weather[0]) return;

      const currentCondition = weather.weather[0].main;
      const selectedCategory = categories[0];

      if (selectedCategory === 'general') {
        const generalNews = await fetchNewsFromCategory('general', 'in');
        const filtered = filterNewsByWeather(currentCondition, generalNews);

        if (filtered.length > 0) {
          console.log(
            `Filtered ${filtered.length} articles based on weather condition: ${currentCondition}`,
          );
          setNews(filtered);
        } else {
          ToastAndroid.show(
            'No weather-matching news found. Showing all general news.',
            ToastAndroid.SHORT,
          );
          setNews(generalNews);
        }
      } else {
        const categoryNews = await fetchNewsFromCategory(
          selectedCategory,
          'in',
        );
        setNews(categoryNews);
      }
    };

    getNews();
  }, [weather, categories]);

  if (loading) return <ActivityIndicator size="large" color="#000" />;

  return (
    <View style={styles.container}>
      {weather ? (
        <View style={styles.weatherWrapper}>
          <WeatherCard weather={weather} forecast={forecast} unit={unit} />
        </View>
      ) : (
        <Text style={{textAlign: 'center', marginBottom: 10}}>
          Location not available. Allow location to see weather info.
        </Text>
      )}

      <FlatList
        contentContainerStyle={styles.newsListContent}
        data={news}
        keyExtractor={item => item.url}
        renderItem={({item}) => (
          <NewsCard
            article={item}
            onPress={() => navigation.navigate('NewsDetail', {article: item})}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f8f8f8',
  },
  weatherWrapper: {
    marginBottom: 16,
  },
  newsListContent: {
    paddingBottom: 20,
  },
});
