import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

export default function TextInputDisplay() {
  const [text, setText] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hiển Thị Nội Dung Nhập</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Nhập nội dung…"
        placeholderTextColor="#999"
        value={text}
        onChangeText={setText}
      />
      
      <View style={styles.displayBox}>
        <Text style={styles.displayText}>
          {text.trim() ? text : 'Chưa có nội dung'}
        </Text>
      </View>
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
    marginBottom: 20,
    color: '#333',
  },
  displayBox: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    minHeight: 100,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  displayText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
});
