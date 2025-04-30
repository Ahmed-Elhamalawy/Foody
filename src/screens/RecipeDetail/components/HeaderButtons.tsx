import React from "react";
import { TouchableOpacity } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { ChevronLeftIcon, HeartIcon } from "react-native-heroicons/outline";

const HeaderButtons = ({ navigation, isFavorite, setIsFavorite }: any) => {
  return (
    <>
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
    </>
  );
};

export default HeaderButtons;
