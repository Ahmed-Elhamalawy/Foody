// @ts-nocheck
import React, { useState } from "react";
import { ScrollView, Image, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { useGetRecipeDetails } from "../../hooks/Https";
import { getIngredients, getInstructionSteps } from "../../helpers/recipeUtils";
import RecipeHeader from "./components/RecipeHeader";
import RecipeBadges from "./components/RecipeBadges";
import RecipeTabs from "./components/RecipeTabs";
import IngredientsTab from "./components/IngredientsTab";
import InstructionsTab from "./components/InstructionsTab";
import HeaderButtons from "./components/HeaderButtons";

const RecipeDetail = ({ route }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState("ingredients");
  const navigation = useNavigation();
  const { recipe } = route?.params;
  const { data, isLoading } = useGetRecipeDetails(recipe.idMeal);

  return (
    <ScrollView className="bg-white flex-1 relative">
      {/* Header Navigation Buttons */}
      <HeaderButtons
        navigation={navigation}
        isFavorite={isFavorite}
        setIsFavorite={setIsFavorite}
      />

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

      {/* Recipe Header (Title, Region, Tags) */}
      <RecipeHeader data={data} recipe={recipe} />

      {/* Quick info badges */}
      <RecipeBadges />

      {/* Tab navigation */}
      <RecipeTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Content based on active tab */}
      <View className="px-5 py-4">
        {activeTab === "ingredients" ? (
          <IngredientsTab ingredients={getIngredients(data)} />
        ) : (
          <InstructionsTab
            instructions={getInstructionSteps(data)}
            youtubeLink={data?.strYoutube}
          />
        )}
      </View>
    </ScrollView>
  );
};

export default RecipeDetail;
