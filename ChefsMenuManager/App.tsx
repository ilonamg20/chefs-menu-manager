import React, { useState } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';

// Define the structure of a menu item for TypeScript
interface MenuItem {
  id: string;
  name: string;
  desc: string;
  course: string;
  price: string;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<string>('home');
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [dishName, setDishName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [course, setCourse] = useState<string>('Starter');
  const [price, setPrice] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSaveItem = () => {
    if (!dishName || !description || !price) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    const newItem: MenuItem = {
      id: Date.now().toString(),
      name: dishName,
      desc: description,
      course: course,
      price: price,
    };

    setMenuItems([...menuItems, newItem]);
    setDishName('');
    setDescription('');
    setCourse('Starter');
    setPrice('');
    setErrorMessage('');
    setCurrentScreen('home');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f9f9f9' }}>
      {/* App Header */}
      <View style={{ backgroundColor: '#2c3e50', padding: 15, alignItems: 'center' }}>
        <Text style={{ color: '#ffffff', fontSize: 18, fontWeight: 'bold' }}>
          Chef's Menu Manager
        </Text>
      </View>

      {/* --- HOME SCREEN --- */}
      {currentScreen === 'home' && (
        <View style={{ flex: 1, padding: 20 }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#007BFF',
              padding: 12,
              borderRadius: 6,
              alignItems: 'center',
              marginVertical: 10,
            }}
            onPress={() => setCurrentScreen('add')}
          >
            <Text style={{ color: '#fff', fontSize: 15, fontWeight: 'bold' }}>
              + Add New Menu Item
            </Text>
          </TouchableOpacity>

          <Text style={{ fontSize: 16, fontWeight: 'bold', marginVertical: 10, color: '#333' }}>
            Menu Overview
          </Text>

          {menuItems.length === 0 ? (
            <Text style={{ color: '#777', fontStyle: 'italic', marginTop: 10 }}>
              No menu items have been added yet.
            </Text>
          ) : (
            <FlatList
              data={menuItems}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View
                  style={{
                    backgroundColor: '#fff',
                    borderWidth: 1,
                    borderColor: '#e0e0e0',
                    borderRadius: 6,
                    padding: 12,
                    marginBottom: 10,
                  }}
                >
                  <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#2c3e50' }}>
                    {item.name} - ${item.price}
                  </Text>
                  <Text style={{ fontSize: 13, color: '#666', marginVertical: 3 }}>
                    {item.desc}
                  </Text>
                  <Text style={{ fontSize: 12, color: '#007BFF', fontWeight: '600' }}>
                    Course: {item.course}
                  </Text>
                </View>
              )}
            />
          )}
        </View>
      )}

      {/* --- ADD ITEM SCREEN --- */}
      {currentScreen === 'add' && (
        <View style={{ flex: 1, padding: 20 }}>
          <TouchableOpacity
            style={{ marginBottom: 5 }}
            onPress={() => {
              setCurrentScreen('home');
              setErrorMessage('');
            }}
          >
            <Text style={{ color: '#007BFF', fontSize: 14, fontWeight: '600' }}>
              ← Back to Menu
            </Text>
          </TouchableOpacity>

          <Text style={{ fontSize: 16, fontWeight: 'bold', marginVertical: 10, color: '#333' }}>
            Add Menu Item
          </Text>

          {errorMessage !== '' && (
            <Text style={{ color: '#d9534f', marginBottom: 10, fontWeight: 'bold', fontSize: 13 }}>
              {errorMessage}
            </Text>
          )}

          <Text style={{ fontSize: 14, fontWeight: '600', color: '#555', marginTop: 10, marginBottom: 5 }}>
            Dish Name
          </Text>
          <TextInput
            style={{
              backgroundColor: '#fff',
              borderWidth: 1,
              borderColor: '#ddd',
              borderRadius: 6,
              padding: 10,
              fontSize: 14,
            }}
            placeholder="e.g., Grilled Chicken"
            value={dishName}
            onChangeText={setDishName}
          />

          <Text style={{ fontSize: 14, fontWeight: '600', color: '#555', marginTop: 10, marginBottom: 5 }}>
            Description
          </Text>
          <TextInput
            style={{
              backgroundColor: '#fff',
              borderWidth: 1,
              borderColor: '#ddd',
              borderRadius: 6,
              padding: 10,
              fontSize: 14,
              height: 70,
              textAlignVertical: 'top',
            }}
            placeholder="Enter dish description"
            multiline={true}
            value={description}
            onChangeText={setDescription}
          />

          <Text style={{ fontSize: 14, fontWeight: '600', color: '#555', marginTop: 10, marginBottom: 5 }}>
            Course
          </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 }}>
            {['Starter', 'Main', 'Dessert'].map((c) => (
              <TouchableOpacity
                key={c}
                style={{
                  flex: 1,
                  padding: 8,
                  borderWidth: 1,
                  borderColor: course === c ? '#007BFF' : '#ccc',
                  borderRadius: 5,
                  alignItems: 'center',
                  marginHorizontal: 2,
                  backgroundColor: course === c ? '#007BFF' : '#fff',
                }}
                onPress={() => setCourse(c)}
              >
                <Text
                  style={{
                    color: course === c ? '#fff' : '#333',
                    fontSize: 12,
                    fontWeight: course === c ? 'bold' : 'normal',
                  }}
                >
                  {c}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={{ fontSize: 14, fontWeight: '600', color: '#555', marginTop: 10, marginBottom: 5 }}>
            Price ($)
          </Text>
          <TextInput
            style={{
              backgroundColor: '#fff',
              borderWidth: 1,
              borderColor: '#ddd',
              borderRadius: 6,
              padding: 10,
              fontSize: 14,
            }}
            placeholder="e.g., 12.99"
            keyboardType="numeric"
            value={price}
            onChangeText={setPrice}
          />

          <TouchableOpacity
            style={{
              backgroundColor: '#007BFF',
              padding: 12,
              borderRadius: 6,
              alignItems: 'center',
              marginVertical: 10,
            }}
            onPress={handleSaveItem}
          >
            <Text style={{ color: '#fff', fontSize: 15, fontWeight: 'bold' }}>
              Save Item
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}