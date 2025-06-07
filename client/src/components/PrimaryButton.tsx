import React from "react";
import { TouchableOpacity, Text } from "react-native";

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
}

export default function PrimaryButton({ title, onPress }: PrimaryButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: "#FF69B4",
        padding: 16,
        borderRadius: 14,
        alignItems: "center",
        marginVertical: 10,
      }}
    >
      <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}
