import React, { act } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { TouchableOpacity } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

const Categories = ({
  activeCategory,
  setActiveCategory,
  categoryList,
}: any) => {
  return (
    <>
      <Animated.View entering={FadeInDown.duration(500).springify()}>
        <ScrollView
          className="space-x-4"
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 15,
          }}
        >
          {categoryList?.map((category: any, idCategory: any) => {
            let isActive = activeCategory === category.strCategory;
            let activeBgColor = isActive ? "bg-amber-400" : "bg-gray-200";
            return (
              <TouchableOpacity
                onPress={() => setActiveCategory(category.strCategory)}
                className="items-center justify-center mx-2"
                key={idCategory}
              >
                <View
                  className={
                    "w-16 h-16 rounded-full  items-center justify-center" +
                    ` ${activeBgColor}`
                  }
                >
                  <Image
                    source={{ uri: category?.strCategoryThumb }}
                    className="w-12 p-1 h-12 rounded-full"
                    style={{ width: hp(6), height: hp(6) }}
                  />
                </View>
                <View>
                  <Text
                    className=" text-center color-neutral-600 font-semibold"
                    style={{ marginTop: hp(0.2), fontSize: hp(1) }}
                  >
                    {category?.strCategory}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </Animated.View>
    </>
  );
};

export default Categories;
