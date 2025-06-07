import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

export default function Header() {
  return (
    <View style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 24,
    }}>
      <View>
        <Text style={{ fontSize: 14, color: '#888' }}>Hoşgeldin</Text>
        <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#333' }}>Kullanıcı!</Text>
      </View>
      <TouchableOpacity>
        <Image
          source={{ uri: 'https://via.placeholder.com/40' }}
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: '#ddd',
          }}
        />
      </TouchableOpacity>
    </View>
  );
}
