import React from "react";
import { View, Text } from "react-native";

const RecipeHeader = ({ data, recipe }: any) => {
  return (
    <View className="px-5 pt-6">
      {/* Title and region */}
      <Text className="text-3xl font-bold text-gray-800">
        {data?.strMeal || recipe?.strMeal}
      </Text>
      <Text className="text-lg text-gray-500 mt-1">
        {data?.strArea || recipe?.strArea} Cuisine
      </Text>

      {/* Tags */}
      {data?.strTags && (
        <View className="flex-row flex-wrap gap-2 mt-3">
          {data.strTags.split(",").map((tag: any, index: any) => (
            <View key={index} className="bg-amber-100 rounded-full px-3 py-1">
              <Text className="text-amber-700 font-medium">{tag.trim()}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default RecipeHeader;
