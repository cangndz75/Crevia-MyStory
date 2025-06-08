import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, Image, Dimensions, ActivityIndicator, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "../../utils/supabase";
import Animated, { FadeInUp } from "react-native-reanimated";

interface Venue {
  id: number;
  name: string;
  image_url: string;
  rating: number;
  description?: string;
  ai_style_hint?: string;
  ai_negative_prompt?: string;
  default_story_opening?: string;
}

interface Character {
  id: number;
  name: string;
  image_url: string;
  description?: string;
  ai_style_hint?: string;
  ai_negative_prompt?: string;
  default_story_opening?: string;
}

interface LocationSelectScreenProps {
  navigation: any;
  route?: any;
}

export default function LocationSelectScreen({ navigation, route }: LocationSelectScreenProps) {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const [generatingStory, setGeneratingStory] = useState(false);

  const selectedCharacter: Character = route?.params?.selectedCharacter;

  useEffect(() => {
    fetchVenues();
  }, []);

  const fetchVenues = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from("venue").select("*");

      if (error) {
        console.error("Error fetching venue:", error.message);
        return;
      }

      if (data) {
        setVenues(data);
      }
    } catch (error) {
      console.error("Error fetching venue:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectVenue = (venue: Venue) => {
    console.log("Seçilen mekan:", venue);
    setSelectedVenue(venue);
  };

  const handleGenerateStory = async () => {
    if (!selectedVenue) {
      Alert.alert("Lütfen bir mekan seçin!");
      return;
    }

    setGeneratingStory(true);

    try {
      const API_BASE_URL = process.env.API_BASE_URL;

      const response = await fetch(`${API_BASE_URL}/ai/generate-story`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          character: selectedCharacter,
          venue: selectedVenue,
          ageRange: "3-5",
        }),
      });

      const data = await response.json();

      console.log("AI MASAL:", data.story);

      navigation.navigate("StorySummaryScreen", {
        story: data.story,
        selectedCharacter,
        selectedVenue,
      });

    } catch (error) {
      console.error("Hikaye oluşturma hatası:", error);
      Alert.alert("Hikaye oluşturulurken bir hata oluştu.");
    } finally {
      setGeneratingStory(false);
    }
  };

  const numColumns = 2;
  const cardWidth = Dimensions.get("window").width / numColumns - 30;

  const renderVenueCard = ({ item }: { item: Venue }) => {
    const isSelected = selectedVenue?.id === item.id;

    return (
      <Animated.View entering={FadeInUp.duration(500)}>
        <TouchableOpacity
          onPress={() => handleSelectVenue(item)}
          style={{
            backgroundColor: isSelected ? "#D1C4E9" : "#fff",
            borderRadius: 16,
            padding: 12,
            margin: 10,
            width: cardWidth,
            alignItems: "center",
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowRadius: 10,
            elevation: 5,
          }}
        >
          <Image
            source={{ uri: item.image_url }}
            style={{ width: 120, height: 120, borderRadius: 16, marginBottom: 10 }}
          />
          <Text style={{ fontSize: 18, fontWeight: "bold", color: "#444", marginBottom: 5 }}>{item.name}</Text>
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
            <Ionicons name="star" size={16} color="#FFC107" />
            <Text style={{ marginLeft: 5, fontSize: 16, color: "#444" }}>
              {(item.rating ?? 0).toFixed(1)}
            </Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FDF0F7", paddingTop: 60, paddingHorizontal: 20 }}>
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#444" />
        </TouchableOpacity>
        <Text style={{ fontSize: 28, fontWeight: "bold", color: "#444", marginLeft: 16 }}>
          Bir Mekan Seç 🎈
        </Text>
      </View>

      <Text style={{ fontSize: 16, color: "#666", marginBottom: 16 }}>
        Hikayenin geçeceği mekanı seç ve maceran başlasın!
      </Text>

      <FlatList
        data={venues}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderVenueCard}
        numColumns={numColumns}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      <TouchableOpacity
        onPress={handleGenerateStory}
        disabled={generatingStory}
        style={{
          backgroundColor: "#FF69B4",
          paddingVertical: 16,
          borderRadius: 20,
          alignItems: "center",
          marginVertical: 20,
          opacity: generatingStory ? 0.6 : 1,
        }}
      >
        {generatingStory ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
            Hikaye Oluştur
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
