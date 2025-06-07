import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';

export default function PuzzleGameCard({ title = 'Puzzle Oyunu', image }: { title?: string; image?: string }) {
  const defaultImage = 'https://toppng.com/uploads/preview/and-blank-effect-transparent-11546868080xgtiz6hxid.png';

  return (
    <ImageBackground
      source={{ uri: image ? image : defaultImage }}
      style={{
        height: 180,
        borderRadius: 20,
        overflow: 'hidden',
        justifyContent: 'flex-end',
        padding: 16,
        marginRight: 16,
        backgroundColor: '#ddd',
      }}
    >
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <Text style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: '#FFF',
          maxWidth: '70%',
        }}>
          {title}
        </Text>
        <TouchableOpacity style={{
          backgroundColor: '#FF914D',
          paddingHorizontal: 16,
          paddingVertical: 8,
          borderRadius: 20,
        }}>
          <Text style={{
            color: '#FFF',
            fontSize: 14,
            fontWeight: 'bold',
          }}>
            Başla
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
