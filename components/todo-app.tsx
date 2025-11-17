import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface Todo {
  id: string;
  text: string;
}

export default function TodoApp() {
  const [todoText, setTodoText] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState('');

  const addTodo = () => {
    if (!todoText.trim()) {
      setError('Vui lòng nhập công việc');
      return;
    }

    setTodos([
      ...todos,
      {
        id: Date.now().toString(),
        text: todoText,
      },
    ]);
    setTodoText('');
    setError('');
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const renderTodo = ({ item }: { item: Todo }) => (
    <TouchableOpacity
      style={styles.todoItem}
      onPress={() => deleteTodo(item.id)}
      activeOpacity={0.7}
    >
      <Text style={styles.todoText}>{item.text}</Text>
      <AntDesign name="delete" size={20} color="#ff3b30" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>App To-Do</Text>

      <View style={styles.inputSection}>
        <TextInput
          style={styles.input}
          placeholder="Nhập công việc…"
          placeholderTextColor="#999"
          value={todoText}
          onChangeText={(text) => {
            setTodoText(text);
            setError('');
          }}
          onSubmitEditing={addTodo}
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={addTodo}
          activeOpacity={0.7}
        >
          <Text style={styles.addButtonText}>Thêm việc</Text>
        </TouchableOpacity>
      </View>

      {error ? (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}

      {todos.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Không có công việc nào</Text>
          <Text style={styles.emptySubText}>Thêm một công việc để bắt đầu</Text>
        </View>
      ) : (
        <>
          <Text style={styles.listTitle}>
            Danh sách công việc ({todos.length})
          </Text>
          <FlatList
            data={todos}
            renderItem={renderTodo}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        </>
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
  inputSection: {
    flexDirection: 'row',
    marginBottom: 15,
    gap: 10,
  },
  input: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
  },
  addButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorBox: {
    backgroundColor: '#ffebee',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#ff3b30',
    padding: 12,
    marginBottom: 15,
  },
  errorText: {
    color: '#c33',
    fontSize: 14,
    fontWeight: '500',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#999',
    fontWeight: '500',
  },
  emptySubText: {
    fontSize: 14,
    color: '#bbb',
    marginTop: 8,
  },
  listTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  todoItem: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  todoText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
});
