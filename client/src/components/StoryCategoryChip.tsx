import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

export default function StoryCategoryChip({ label, icon }: { label: string; icon: string }) {
  return (
    <TouchableOpacity style={{
      alignItems: 'center',
      marginRight: 16,
    }}>
      <Image
        source={{ uri: icon }}
        style={{
          width: 50,
          height: 50,
          marginBottom: 8,
        }}
      />
      <View style={{
        backgroundColor: '#FDE7D8',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
      }}>
        <Text style={{
          fontSize: 14,
          fontWeight: '500',
          color: '#333',
          textAlign: 'center',
        }}>
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
