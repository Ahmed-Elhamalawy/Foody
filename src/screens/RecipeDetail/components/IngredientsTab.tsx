// @ts-nocheck

import React from "react";
import { View, Text } from "react-native";

const IngredientsTab = ({ ingredients }) => {
  return (
    <View>
      <Text className="text-xl font-bold mb-4">What You'll Need</Text>
      {ingredients.map((item, index) => (
        <View
          key={index}
          className="flex-row items-center mb-3 pb-3 border-b border-gray-100"
        >
          <View className="bg-amber-100 h-12 w-12 rounded-full items-center justify-center mr-4">
            <Text className="text-amber-700 font-bold">{index + 1}</Text>
          </View>
          <View className="flex-1">
            <Text className="text-lg font-medium">{item.ingredient}</Text>
            <Text className="text-gray-500">{item.measure}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default IngredientsTab;
