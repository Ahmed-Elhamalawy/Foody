// @ts-nocheck
import React from "react";
import { View, TouchableOpacity, Text } from "react-native";

const RecipeTabs = ({ activeTab, setActiveTab }) => {
  return (
    <View className="flex-row justify-around border-b border-gray-200 px-5">
      <TouchableOpacity
        onPress={() => setActiveTab("ingredients")}
        className={`pb-3 px-4 ${
          activeTab === "ingredients" ? "border-b-2 border-amber-500" : ""
        }`}
      >
        <Text
          className={`font-medium text-lg ${
            activeTab === "ingredients" ? "text-amber-500" : "text-gray-500"
          }`}
        >
          Ingredients
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setActiveTab("instructions")}
        className={`pb-3 px-4 ${
          activeTab === "instructions" ? "border-b-2 border-amber-500" : ""
        }`}
      >
        <Text
          className={`font-medium text-lg ${
            activeTab === "instructions" ? "text-amber-500" : "text-gray-500"
          }`}
        >
          Instructions
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default RecipeTabs;