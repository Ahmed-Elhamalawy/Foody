// @ts-nocheck
import React from "react";
import { Text, View } from "react-native";
import { ClockIcon } from "react-native-heroicons/outline";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const Badge = ({ icon, title, subTitle }) => {
  return (
    <View
      style={{ height: hp(16), width: hp(10) }}
      className="items-center gap-2 bg-amber-400 rounded-t-full rounded-b-full p-2 mb-1"
    >
      <View className="bg-amber-100 rounded-full p-2 mb-1">{icon}</View>
      <View className="text-center">
        <Text style={{ fontSize: hp(2) }} className="text-gray-500 text-center">
          {title}
        </Text>
        <Text
          style={{ fontSize: hp(1.8) }}
          className="font-medium text-center text-black "
        >
          {subTitle}
        </Text>
      </View>
    </View>
  );
};

export default Badge;
