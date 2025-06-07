import React from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInUp } from "react-native-reanimated";

interface StorySummaryScreenProps {
  navigation: any;
  route: any;
}

export default function StorySummaryScreen({ navigation, route }: StorySummaryScreenProps) {
  const { story, selectedCharacter, selectedVenue } = route.params;

  const renderStoryParagraphs = () => {
    return story
      .split("\n")
      .filter((paragraph: string) => paragraph.trim() !== "")
      .map((paragraph: string, index: number) => (
        <Animated.View key={index} entering={FadeInUp.duration(500 + index * 50)}>
          <Text
            style={{
              fontSize: 18,
              color: "#444",
              lineHeight: 26,
              marginBottom: 16,
              textAlign: "left",
            }}
          >
            {paragraph}
          </Text>
        </Animated.View>
      ));
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FFF7F0", paddingTop: 60, paddingHorizontal: 20 }}>
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#444" />
        </TouchableOpacity>
        <Text style={{ fontSize: 28, fontWeight: "bold", color: "#444", marginLeft: 16 }}>
          Masal Özeti 📖
        </Text>
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 20 }}>
        <View style={{ alignItems: "center", flex: 1 }}>
          <Image
            source={{ uri: selectedCharacter.image_url }}
            style={{ width: 80, height: 80, borderRadius: 40, marginBottom: 8 }}
          />
          <Text style={{ fontSize: 16, fontWeight: "bold", color: "#444" }}>
            {selectedCharacter.name}
          </Text>
        </View>

        <View style={{ alignItems: "center", flex: 1 }}>
          <Image
            source={{ uri: selectedVenue.image_url }}
            style={{ width: 80, height: 80, borderRadius: 40, marginBottom: 8 }}
          />
          <Text style={{ fontSize: 16, fontWeight: "bold", color: "#444" }}>
            {selectedVenue.name}
          </Text>
        </View>
      </View>

      {/* Masal */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          backgroundColor: "#fff",
          padding: 20,
          borderRadius: 16,
          shadowColor: "#000",
          shadowOpacity: 0.05,
          shadowRadius: 10,
          elevation: 5,
          marginBottom: 20,
        }}
      >
        {renderStoryParagraphs()}
      </ScrollView>

      <TouchableOpacity
        onPress={() => navigation.popToTop()}
        style={{
          backgroundColor: "#5E60CE",
          paddingVertical: 16,
          borderRadius: 20,
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>Ana Sayfaya Dön</Text>
      </TouchableOpacity>
    </View>
  );
}
