import React from "react";
import { Text } from "react-native";
import Animated from "react-native-reanimated";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import StoryCategoryChip from "../components/StoryCategoryChip";
import StoryCard from "../components/StoryCard";
import PuzzleGameCard from "../components/PuzzleGameCard";
import MoreStoryCard from "../components/MoreStoryCard";
import { SafeAreaView } from "react-native-safe-area-context";

const categories = [
  {
    id: "1",
    label: "Hayvanlar",
    icon: "https://toppng.com/uploads/preview/and-blank-effect-transparent-11546868080xgtiz6hxid.png",
  },
  {
    id: "2",
    label: "Macera",
    icon: "https://toppng.com/uploads/preview/and-blank-effect-transparent-11546868080xgtiz6hxid.png",
  },
  {
    id: "3",
    label: "Büyü",
    icon: "https://toppng.com/uploads/preview/and-blank-effect-transparent-11546868080xgtiz6hxid.png",
  },
  {
    id: "4",
    label: "Sakinleştirici",
    icon: "https://toppng.com/uploads/preview/and-blank-effect-transparent-11546868080xgtiz6hxid.png",
  },
];

const recommendedStories = [
  {
    id: "1",
    title: "Ay Tavşanı",
    image:
      "https://toppng.com/uploads/preview/and-blank-effect-transparent-11546868080xgtiz6hxid.png",
  },
  {
    id: "2",
    title: "Küçük Yıldız",
    image:
      "https://toppng.com/uploads/preview/and-blank-effect-transparent-11546868080xgtiz6hxid.png",
  },
  {
    id: "3",
    title: "Orman Dostları",
    image:
      "https://toppng.com/uploads/preview/and-blank-effect-transparent-11546868080xgtiz6hxid.png",
  },
];

const moreStories = [
  {
    id: "1",
    title: "Mutlu Aslan",
    duration: "14 dk",
    image:
      "https://toppng.com/uploads/preview/and-blank-effect-transparent-11546868080xgtiz6hxid.png",
  },
  {
    id: "2",
    title: "Cesur Fil",
    duration: "10 dk",
    image:
      "https://toppng.com/uploads/preview/and-blank-effect-transparent-11546868080xgtiz6hxid.png",
  },
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF9F0" }}>
      <Animated.ScrollView
        style={{
          flex: 1,
          backgroundColor: "#FFF9F0",
          paddingHorizontal: 16,
          paddingTop: 16,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <Header />
        <SearchBar />

        <Animated.View style={{ marginTop: 24 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "#333",
              marginBottom: 12,
            }}
          >
            Hikaye Kategorileri
          </Text>
          <Animated.FlatList
            data={categories}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 4 }}
            renderItem={({ item }) => (
              <StoryCategoryChip label={item.label} icon={item.icon} />
            )}
          />
        </Animated.View>

        <Animated.View style={{ marginTop: 32 }}>
          <Animated.View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 12,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold", color: "#333" }}>
              Önerilen
            </Text>
            <Text style={{ fontSize: 14, color: "#FF914D" }}>Tümünü Gör</Text>
          </Animated.View>

          <Animated.FlatList
            data={recommendedStories}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingTop: 12 }}
            renderItem={({ item }) => (
              <StoryCard title={item.title} image={item.image} />
            )}
          />
        </Animated.View>

        <Animated.View style={{ marginTop: 32 }}>
          <PuzzleGameCard />
        </Animated.View>

        <Animated.View style={{ marginTop: 32, marginBottom: 32 }}>
          <Animated.View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 12,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold", color: "#333" }}>
              Diğer Hikayeler
            </Text>
            <Text style={{ fontSize: 14, color: "#FF914D" }}>Tümünü Gör</Text>
          </Animated.View>

          <Animated.FlatList
            data={moreStories}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingTop: 12 }}
            renderItem={({ item }) => (
              <MoreStoryCard
                title={item.title}
                duration={item.duration}
                image={item.image}
              />
            )}
          />
        </Animated.View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
}
