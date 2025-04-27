import React from "react";
import { ActivityIndicator, View } from "react-native";

const Progress = ({ size }: any) => {
  return (
    <View className="flex-1 justify-center items-center mt-[50%]">
      <ActivityIndicator size={size} animating={true} />
    </View>
  );
};

export default Progress;
