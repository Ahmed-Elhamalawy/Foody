// @ts-nocheck
import React, { useEffect } from "react";
import { Image, Text, View } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/types";
import { StackNavigationProp } from "@react-navigation/stack";

const WelcomeScreen = () => {
  const navigation = useNavigation();
  const ring1padding = useSharedValue(0);
  const ring2padding = useSharedValue(0);

  setTimeout(() => {
    navigation.navigate("Home");
  }, 2000);

  useEffect(() => {
    setTimeout(() => {
      ring1padding.value = withSpring(hp(5));
    }, 100);

    setTimeout(() => {
      ring2padding.value = withSpring(hp(5.5));
    }, 300);
  }, []);

  // Create animated styles using useAnimatedStyle
  const animatedRing1Style = useAnimatedStyle(() => {
    return {
      padding: ring1padding.value,
    };
  });

  const animatedRing2Style = useAnimatedStyle(() => {
    return {
      padding: ring2padding.value,
    };
  });

  return (
    <View className="flex-1 justify-center items-center bg-amber-500">
      {/* Logo Image with rings */}
      <Animated.View
        style={[{ padding: wp(5) }, animatedRing1Style]}
        className="justify-center items-center bg-white/20 rounded-full"
      >
        <Animated.View
          style={[{ padding: wp(4) }, animatedRing2Style]}
          className="justify-center items-center bg-white/20 rounded-full"
        >
          <Image
            style={{ width: hp(20), height: hp(20) }}
            source={require("../../../assets/welcome.png")}
          />
        </Animated.View>
      </Animated.View>
      {/* Title part */}
      <View className="justify-center items-center">
        <Text
          style={{ fontSize: hp(7) }}
          className="font-bold text-white mt-10"
        >
          Foody
        </Text>
        <Text style={{ fontSize: hp(3) }} className="text-white mt-2">
          Discover Delicious Food
        </Text>
      </View>
    </View>
  );
};

export default WelcomeScreen;
