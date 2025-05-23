import { View, Text, TouchableOpacity } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import YoutubePlayer from "react-native-youtube-iframe";

const InstructionsTab = ({ instructions, youtubeLink }: any) => {
  const getYoutubeVideoId = (url: any) => {
    const regex = /[?&]v=([^&#]*)/;
    const match = url.match(regex);
    if (match && match[1]) {
      return match[1];
    }
    return null;
  };

  return (
    <View>
      <Text className="text-xl font-bold mb-4">How To Cook</Text>
      {instructions.map((step: any, index: any) => (
        <View key={index} className="mb-5">
          <View className="flex-row items-start mb-2">
            <View className="bg-amber-100 h-8 w-8 rounded-full items-center justify-center mr-3 mt-1">
              <Text className="text-amber-700 font-bold">{index + 1}</Text>
            </View>
            <Text className="flex-1 text-base leading-6 text-gray-700">
              {step}
            </Text>
          </View>
        </View>
      ))}

      {/* Youtube link if available */}
      {youtubeLink && (
        <View className="mt-4 mb-8">
          {/* <TouchableOpacity className="bg-red-500 py-3 rounded-lg items-center flex-row justify-center">
            <Text className="text-white font-bold mr-2">
              Watch Video Tutorial
            </Text>
          </TouchableOpacity> */}

          <YoutubePlayer
            height={hp(30)}
            videoId={getYoutubeVideoId(youtubeLink)}
          />
        </View>
      )}
    </View>
  );
};

export default InstructionsTab;
