import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ClickCounter() {
  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đếm Số Lần Nhấn Nút</Text>
      
      <View style={styles.counterBox}>
        <Text style={styles.counterText}>Bạn đã nhấn: </Text>
        <Text style={styles.countNumber}>{count}</Text>
        <Text style={styles.counterText}> lần</Text>
      </View>
      
      <TouchableOpacity
        style={styles.button}
        onPress={() => setCount(count + 1)}
        activeOpacity={0.7}
      >
        <Text style={styles.buttonText}>Nhấn tôi</Text>
      </TouchableOpacity>
      
      {count > 0 && (
        <TouchableOpacity
          style={styles.resetButton}
          onPress={() => setCount(0)}
          activeOpacity={0.7}
        >
          <Text style={styles.resetButtonText}>Reset</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#333',
  },
  counterBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    backgroundColor: 'white',
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  counterText: {
    fontSize: 18,
    color: '#666',
    fontWeight: '500',
  },
  countNumber: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#007AFF',
    marginHorizontal: 8,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 18,
    paddingHorizontal: 50,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  resetButton: {
    backgroundColor: '#ff3b30',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
  },
});
