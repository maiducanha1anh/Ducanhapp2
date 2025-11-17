import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface WeatherData {
  temperature: number;
  windSpeed: number;
}

export default function WeatherApp() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    if (!city.trim()) {
      setError('Vui lòng nhập tên thành phố');
      return;
    }

    setLoading(true);
    setError('');
    setWeather(null);

    try {
      // Using Open-Meteo API - doesn't require key
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
      );
      const geoData = await response.json();

      if (!geoData.results || geoData.results.length === 0) {
        setError('Không tìm thấy thành phố: ' + city);
        setLoading(false);
        return;
      }

      const { latitude, longitude } = geoData.results[0];

      // Get weather data
      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m&timezone=auto`
      );
      const weatherData = await weatherResponse.json();

      setWeather({
        temperature: weatherData.current.temperature_2m,
        windSpeed: weatherData.current.wind_speed_10m,
      });
    } catch (err) {
      setError('Lỗi khi lấy dữ liệu thời tiết');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>App Thời Tiết</Text>

      <TextInput
        style={styles.input}
        placeholder="Nhập tên thành phố…"
        placeholderTextColor="#999"
        value={city}
        onChangeText={setCity}
        onSubmitEditing={fetchWeather}
      />

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={fetchWeather}
        disabled={loading}
        activeOpacity={0.7}
      >
        <Text style={styles.buttonText}>Xem thời tiết</Text>
      </TouchableOpacity>

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Đang tải…</Text>
        </View>
      )}

      {error ? (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}

      {weather && !loading && (
        <View style={styles.weatherBox}>
          <View style={styles.weatherItem}>
            <Text style={styles.weatherLabel}>Nhiệt độ hiện tại:</Text>
            <Text style={styles.weatherValue}>{weather.temperature}°C</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.weatherItem}>
            <Text style={styles.weatherLabel}>Tốc độ gió:</Text>
            <Text style={styles.weatherValue}>{weather.windSpeed} km/h</Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 15,
    color: '#333',
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '500',
  },
  errorBox: {
    backgroundColor: '#ffebee',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#ff3b30',
    padding: 15,
    marginBottom: 20,
  },
  errorText: {
    color: '#c33',
    fontSize: 14,
    fontWeight: '500',
  },
  weatherBox: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#34C759',
  },
  weatherItem: {
    alignItems: 'center',
    paddingVertical: 15,
  },
  weatherLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  weatherValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#34C759',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
  },
});
