import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SearchBar() {
  return (
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#F5F5F5',
      borderRadius: 12,
      paddingHorizontal: 12,
      paddingVertical: 8,
    }}>
      <TextInput
        placeholder="Bir şeyler ara..."
        style={{
          flex: 1,
          fontSize: 16,
        }}
      />
      <TouchableOpacity>
        <Ionicons name="search" size={20} color="#FF914D" />
      </TouchableOpacity>
    </View>
  );
}
