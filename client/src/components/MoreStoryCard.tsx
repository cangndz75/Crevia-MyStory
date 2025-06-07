import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function MoreStoryCard({ title, duration, image }: { title: string; duration: string; image: string }) {
  return (
    <TouchableOpacity style={{
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#FFF',
      borderRadius: 16,
      padding: 12,
      marginRight: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
      width: 300,
    }}>
      <Image
        source={{ uri: image }}
        style={{
          width: 80,
          height: 80,
          borderRadius: 12,
          marginRight: 12,
        }}
      />
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 14, color: '#888' }}>Mystical Stories</Text>
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#333', marginVertical: 4 }}>{title}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity style={{
            backgroundColor: '#567DF4',
            borderRadius: 20,
            paddingHorizontal: 12,
            paddingVertical: 6,
            marginRight: 8,
          }}>
            <Text style={{ color: '#FFF', fontSize: 14 }}>Oynat</Text>
          </TouchableOpacity>
          <Ionicons name="time-outline" size={16} color="#888" style={{ marginRight: 4 }} />
          <Text style={{ fontSize: 14, color: '#888' }}>{duration}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
