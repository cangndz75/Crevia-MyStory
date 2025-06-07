import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, Image, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "../../utils/supabase";
import Animated, { FadeInUp } from "react-native-reanimated";

interface Venue {
  id: number;
  name: string;
  image_url: string;
  rating: number;
}

interface LocationSelectScreenProps {
  navigation: any;
  route?: any;
}

export default function LocationSelectScreen({ navigation, route }: LocationSelectScreenProps) {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(false);

  const selectedCharacter = route?.params?.selectedCharacter;

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

    navigation.navigate("StorySummaryScreen", {
      selectedCharacter,
      selectedVenue: venue,
    });
  };

  const numColumns = 2;
  const cardWidth = Dimensions.get("window").width / numColumns - 30;

  const renderVenueCard = ({ item }: { item: Venue }) => {
    return (
      <Animated.View entering={FadeInUp.duration(500)}>
        <View
          style={{
            backgroundColor: "#fff",
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
          <TouchableOpacity
            onPress={() => handleSelectVenue(item)}
            style={{
              backgroundColor: "#FF69B4",
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 20,
            }}
          >
            <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>Seç</Text>
          </TouchableOpacity>
        </View>
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
    </View>
  );
}
