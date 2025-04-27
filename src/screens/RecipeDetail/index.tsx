// @ts-nocheck
import React, { useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import CachedImage from "../../helpers/Image";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import {
  BellIcon,
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  HeartIcon,
  ClockIcon,
  UserIcon,
  FireIcon,
} from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { useGetRecipeDetails } from "../../hooks/GetAllRecipes";
import Badge from "../Home/components/Badge";

const RecipeDetail = ({ route }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState("ingredients");
  const navigation = useNavigation();
  const { recipe } = route?.params;
  const { data, isLoading } = useGetRecipeDetails(recipe.idMeal);

  // Extract ingredients and measurements from data
  const getIngredients = () => {
    if (!data) return [];

    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = data[`strIngredient${i}`];
      const measure = data[`strMeasure${i}`];

      if (ingredient && ingredient.trim() !== "") {
        ingredients.push({
          ingredient,
          measure: measure || "",
        });
      }
    }
    return ingredients;
  };

  // Split instructions into steps
  const getInstructionSteps = () => {
    if (!data?.strInstructions) return [];
    return data.strInstructions
      .split(/\r\n|\r|\n/)
      .filter((step) => step.trim() !== "");
  };

  const badgeData = [
    { icon: ClockIcon, title: "30 min", subTitle: "Prep Time" },
    { icon: UserIcon, title: "4-6", subTitle: "Servings" },
    { icon: FireIcon, title: "Medium", subTitle: "Difficulty" },
  ];

  return (
    <ScrollView className="bg-white flex-1 relative">
      {/* Back button */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ top: hp(5), left: hp(2.5) }}
        className="absolute top-15 left-15 z-20 bg-white rounded-full p-2 shadow-md"
      >
        <ChevronLeftIcon size={hp(3.5)} color={"#fbbf24"} />
      </TouchableOpacity>

      {/* Favorite button */}
      <TouchableOpacity
        onPress={() => setIsFavorite(!isFavorite)}
        style={{ top: hp(5), right: hp(2.5) }}
        className="absolute top-15 left-15 z-20 bg-white rounded-full p-2 shadow-md"
      >
        <HeartIcon
          size={hp(3.5)}
          color={"#fbbf24"}
          fill={isFavorite ? "#fbbf24" : "transparent"}
        />
      </TouchableOpacity>

      {/* Hero image */}
      <View className="items-center">
        <Image
          style={{
            height: hp(45),
            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 40,
          }}
          className="w-full"
          source={{ uri: data?.strMealThumb || recipe?.strMealThumb }}
        />
      </View>

      {/* Title and region */}
      <View className="px-5 pt-6">
        <Text className="text-3xl font-bold text-gray-800">
          {data?.strMeal || recipe?.strMeal}
        </Text>
        <Text className="text-lg text-gray-500 mt-1">
          {data?.strArea || recipe?.strArea} Cuisine
        </Text>
      </View>

      {/* Tags */}
      {data?.strTags && (
        <View className="flex-row flex-wrap gap-2 px-5 mt-3">
          {data.strTags.split(",").map((tag, index) => (
            <View key={index} className="bg-amber-100 rounded-full px-3 py-1">
              <Text className="text-amber-700 font-medium">{tag.trim()}</Text>
            </View>
          ))}
        </View>
      )}
      {/* Quick info */}
      <View className="flex-row justify-center gap-x-12 px-5 py-6">
        {badgeData.map(({ icon: Icon, title, subTitle }, index) => (
          <Badge
            key={index}
            icon={<Icon size={hp(4)} color="#fbbf24" />}
            title={title}
            subTitle={subTitle}
          />
        ))}
      </View>

      {/* Tab navigation */}
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

      {/* Content based on active tab */}
      <View className="px-5 py-4">
        {activeTab === "ingredients" ? (
          <View>
            <Text className="text-xl font-bold mb-4">What You'll Need</Text>
            {getIngredients().map((item, index) => (
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
        ) : (
          <View>
            <Text className="text-xl font-bold mb-4">How To Cook</Text>
            {getInstructionSteps().map((step, index) => (
              <View key={index} className="mb-5">
                <View className="flex-row items-start mb-2">
                  <View className="bg-amber-100 h-8 w-8 rounded-full items-center justify-center mr-3 mt-1">
                    <Text className="text-amber-700 font-bold">
                      {index + 1}
                    </Text>
                  </View>
                  <Text className="flex-1 text-base leading-6 text-gray-700">
                    {step}
                  </Text>
                </View>
              </View>
            ))}

            {/* Youtube link if available */}
            {data?.strYoutube && (
              <View className="mt-4 mb-8">
                <TouchableOpacity className="bg-red-500 py-3 rounded-lg items-center flex-row justify-center">
                  <Text className="text-white font-bold mr-2">
                    Watch Video Tutorial
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default RecipeDetail;
