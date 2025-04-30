import React from "react";
import { View, Text, Image } from "react-native";
import FastImage from "react-native-fast-image";

import MasonryList from "@react-native-seoul/masonry-list";
import { Pressable } from "react-native-gesture-handler";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Animated, { FadeInDown } from "react-native-reanimated";
import Progress from "./Progress";
import { useNavigation } from "@react-navigation/native";

const Recipes = ({ filteredRecipes = [], isLoading }: any) => {
  const navigation = useNavigation();
  const indexedData = filteredRecipes?.map((item: any, index: number): any => ({
    ...item,
    index: index,
  }));

  return (
    <Animated.View
      entering={FadeInDown.delay(1000).duration(600).springify().damping(12)}
      className="mx-4 mt-7 flex-1 "
    >
      <Text className="text-3xl font-bold">Recipes</Text>
      {isLoading ? (
        <Progress size="large" />
      ) : (
        <View className="flex-1">
          <MasonryList
            data={indexedData}
            keyExtractor={(item) => item.idMeal}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }: any) => (
              <RecipeCard
                item={item}
                index={item.index}
                navigation={navigation}
              />
            )}
          />
        </View>
      )}
    </Animated.View>
  );
};

export default Recipes;

const RecipeCard = ({ item, index, navigation }: any) => {
  if (!item) return null;

  const evenIndexNumber = index % 2 === 0;
  const isTallerImage = index % 3 === 0;

  return (
    <Animated.View
      entering={FadeInDown.delay(index * 200)
        .duration(600)
        .springify()
        .damping(12)}
      style={{
        margin: 4,
        paddingRight: evenIndexNumber ? 8 : 0,
      }}
    >
      <Pressable
        onPress={() =>
          navigation.navigate("RecipeDetail", {
            recipe: item,
          })
        }
      >
        <Image
          source={{ uri: item.strMealThumb }}
          style={{
            width: "100%",
            height: isTallerImage ? hp(25) : hp(35),
            borderRadius: 35,
          }}
        />
        <Text
          style={{ fontSize: hp(1.5) }}
          className="font-semibold ml-2 text-neutral-600"
        >
          {item.strMeal?.length > 15
            ? item.strMeal.slice(0, 20) + "..."
            : item.strMeal}
        </Text>
      </Pressable>
    </Animated.View>
  );
};
