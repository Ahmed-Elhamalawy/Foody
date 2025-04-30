import React from "react";
import { View } from "react-native";
import { ClockIcon, UserIcon, FireIcon } from "react-native-heroicons/outline";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Badge from "../../Home/components/Badge";

const RecipeBadges = () => {
  const badgeData = [
    { icon: ClockIcon, title: "30 min", subTitle: "Prep Time" },
    { icon: UserIcon, title: "4-6", subTitle: "Servings" },
    { icon: FireIcon, title: "Medium", subTitle: "Difficulty" },
  ];

  return (
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
  );
};

export default RecipeBadges;
