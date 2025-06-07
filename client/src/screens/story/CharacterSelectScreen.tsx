import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "../../utils/supabase";
import Animated, { FadeInUp } from "react-native-reanimated";

interface Character {
  id: number;
  name: string;
  image_url: string;
  rating: number;
  price: number;
  isLocked: boolean;
  isFavorite: boolean;
  isPopular: boolean;
}

interface CharacterSelectScreenProps {
  navigation: any;
  route?: any;
}

const TABS = ["Hepsi", "Popüler", "Kilitli", "Favoriler"];

export default function CharacterSelectScreen({
  navigation,
}: CharacterSelectScreenProps) {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [selectedTab, setSelectedTab] = useState<string>("Hepsi");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCharacters();
  }, [selectedTab]);

  const fetchCharacters = async () => {
    setLoading(true);
    try {
      let query = supabase.from("characters").select("*");

      if (selectedTab === "Popüler") {
        query = query.eq("isPopular", true);
      } else if (selectedTab === "Kilitli") {
        query = query.eq("isLocked", true);
      } else if (selectedTab === "Favoriler") {
        query = query.eq("isFavorite", true);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching characters:", error.message);
        return;
      }

      if (data) {
        setCharacters(data);
      }
    } catch (error) {
      console.error("Error fetching characters:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectCharacter = (character: Character) => {
    console.log("Seçilen karakter:", character);

    navigation.navigate("LocationSelectScreen", { selectedCharacter: character });
  };

  const numColumns = 2;
  const cardWidth = Dimensions.get("window").width / numColumns - 30;

  const renderCharacterCard = ({ item }: { item: Character }) => {
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
            style={{
              width: 100,
              height: 100,
              borderRadius: 12,
              marginBottom: 10,
            }}
          />
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: "#444",
              marginBottom: 5,
            }}
          >
            {item.name}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <Ionicons name="star" size={16} color="#FFC107" />
            <Text style={{ marginLeft: 5, fontSize: 16, color: "#444" }}>
              {item.rating ? item.rating.toFixed(1) : "0.0"}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => handleSelectCharacter(item)}
            style={{
              backgroundColor: "#FF69B4",
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 20,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            {item.isLocked && item.price > 0 ? (
              <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>
                {item.price} 🪙
              </Text>
            ) : (
              <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>
                Seç
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#FFF7F0",
        paddingTop: 60,
        paddingHorizontal: 20,
      }}
    >
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#444" />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 28,
            fontWeight: "bold",
            color: "#444",
            marginLeft: 16,
          }}
        >
          Karakterini Seç
        </Text>
      </View>

      <Text style={{ fontSize: 16, color: "#666", marginBottom: 16 }}>
        Hangi karakterle maceraya başlayacaksın?
      </Text>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        {TABS.map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setSelectedTab(tab)}
            style={{
              backgroundColor: selectedTab === tab ? "#5E60CE" : "#eee",
              paddingVertical: 8,
              paddingHorizontal: 16,
              borderRadius: 20,
            }}
          >
            <Text
              style={{
                color: selectedTab === tab ? "#fff" : "#444",
                fontWeight: "bold",
                fontSize: 14,
              }}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={characters}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderCharacterCard}
        numColumns={numColumns}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}
