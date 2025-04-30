import { Image, StatusBar, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BellIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Categories from "./components/Categories";
import { useEffect, useState } from "react";
import Recipes from "./components/Recipes";
import { ScrollView } from "react-native-gesture-handler";
import { useGetAllCategories, useGetAllRecipes } from "../../hooks/Https";
import Progress from "./components/Progress";
import { useContext } from "react";
import { AuthContext } from "../../store/auth-context";

const HomeScreen = () => {
  const [activeCategory, setActiveCategory] = useState("Beef");
  const { data: categoriesData, isLoading: isCategoriesLoading } =
    useGetAllCategories();
  const { data: recipesData, isLoading: isRecipesLoading } =
    useGetAllRecipes(activeCategory);
  const { isLoggedIn } = useContext(AuthContext);
  console.log("isLoggedin", isLoggedIn);
  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <StatusBar barStyle="dark-content" />
        {/* avatar and bell icon */}
        <View className="flex-row items-center justify-between mx-4 ">
          <Image
            style={{ width: wp(14), height: hp(7) }}
            source={require("../../../assets/avatar.png")}
          />
          <BellIcon size={hp(4)} />
        </View>
        {/* title */}
        <View>
          <Text
            style={{ fontSize: hp(1.7) }}
            className="font-bold text-black mx-4 mt-4"
          >
            Good Morning, No name
          </Text>
          <Text
            style={{ fontSize: hp(3.8) }}
            className=" font-bold text-black mx-4 mt-2"
          >
            Order your own food,{"\n"}
            stay at <Text className="text-amber-400">Home</Text>
          </Text>
        </View>
        {/* searchBar */}
        <View
          style={{ height: hp(5) }}
          className="flex-row items-center justify-between  bg-gray-200 mx-4 mt-4 px-4 rounded-full"
        >
          <TextInput
            style={{ fontSize: hp(2) }}
            placeholder="Search any recipe"
          />
          <View className="bg-white rounded-full p-2">
            <MagnifyingGlassIcon color={"#000000"} size={hp(2.5)} />
          </View>
        </View>
        {/* Categories Section  */}

        <View className="mt-4">
          {!isCategoriesLoading && (
            <Categories
              categoryList={categoriesData?.categories || []}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />
          )}
        </View>
        {/* recipes */}

        <Recipes isLoading={isRecipesLoading} filteredRecipes={recipesData} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
