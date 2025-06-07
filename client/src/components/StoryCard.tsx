import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

export default function StoryCard({ title, image, duration = '7 dk' }: { title: string; image: string; duration?: string }) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={{
        width: 200,
        marginRight: 16,
        alignItems: 'center',
      }}
    >
      <ImageBackground
        source={{ uri: image }}
        style={{
          width: 200,
          height: 160,
          borderRadius: 24,
          overflow: 'hidden',
          justifyContent: 'flex-start',
        }}
      >
        <View style={{
          backgroundColor: 'rgba(0,0,0,0.4)',
          padding: 8,
          borderBottomLeftRadius: 16,
          borderBottomRightRadius: 16,
        }}>
          <Text style={{
            color: '#FFF',
            fontSize: 16,
            fontWeight: 'bold',
            marginBottom: 4,
          }}>
            {title}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="time-outline" size={14} color="#FFF" style={{ marginRight: 4 }} />
            <Text style={{ color: '#FFF', fontSize: 12 }}>{duration}</Text>
          </View>
        </View>
      </ImageBackground>

      <Animated.View style={[{
        position: 'absolute',
        bottom: -20,
        backgroundColor: '#FF914D',
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 5,
      }, animatedStyle]}>
        <Ionicons name="play" size={28} color="#FFF" />
      </Animated.View>
    </TouchableOpacity>
  );
}
