// @ts-nocheck
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { useLogin, useSignup } from "../../hooks/Https";
import { AuthContext } from "../../store/auth-context";
import { useContext } from "react";

const LoginScreen = () => {
  const navigation = useNavigation();
  const { mutate } = useLogin();
  const { isLoggedIn, login, logout, token } = useContext(AuthContext);
  console.log("Is logged in:", isLoggedIn);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    mutate(
      {
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: (response) => {
          console.log("User signed in:", response);
          if (response.idToken) {
            login(response.idToken);
          }

          navigation.navigate("Home");
        },
        onError: (error) => {
          console.error("login error:", error.response?.data?.error?.message);
        },
      }
    );
  };

  return (
    <>
      <StatusBar barStyle={"dark-content"} />
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View
            style={{ paddingTop: hp(5) }}
            className="flex-1 items-center bg-orange-300"
          >
            {/* Image Section*/}
            <View
              style={{ width: hp(40), height: hp(35) }}
              className="relative items-center justify-center mb-4"
            >
              <Image
                resizeMode="stretch"
                source={require("../../../assets/loginPhoto.png")}
                className="w-32 h-32"
                style={{ width: hp(40), height: hp(40) }}
              />
            </View>

            {/* Form Section */}
            <View className="w-full bg-white rounded-t-[10%] flex-1 px-7">
              <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
              >
                {/* Title screen */}
                <View className="items-center justify-center mt-[7%]">
                  <Text
                    style={{
                      fontSize: hp(4),
                      marginBottom: hp(5),
                    }}
                    className="text-slate-600 font-bold"
                  >
                    Login
                  </Text>
                </View>

                {/* Form Fields */}
                <View style={{ gap: hp(3) }}>
                  {/* Email Label and Input */}
                  <View className="relative">
                    <Text
                      style={{ fontSize: hp(2.5) }}
                      className="text-slate-600 mb-2 font-medium"
                    >
                      Email
                    </Text>
                    <Controller
                      control={control}
                      rules={{
                        required: true,
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "invalid email address",
                        },
                      }}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                          style={{ fontSize: hp(1.8), height: hp(5) }}
                          placeholder="Enter your Email"
                          className="rounded-lg p-3 bg-gray-100"
                          keyboardType="email-address"
                          autoCapitalize="none"
                          onBlur={onBlur}
                          onChangeText={onChange}
                          value={value}
                        />
                      )}
                      name="email"
                    />
                    {errors.email && (
                      <Text className="absolute bottom-0 translate-y-[20px] text-red-500">
                        {errors.email.message || "This is required."}
                      </Text>
                    )}
                  </View>

                  {/* Password Label and Input */}
                  <View className="relative">
                    <Text
                      style={{ fontSize: hp(2.5) }}
                      className="text-slate-600 mb-2 font-medium"
                    >
                      Password
                    </Text>
                    <Controller
                      control={control}
                      rules={{
                        maxLength: 100,
                        required: true,
                      }}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                          style={{ fontSize: hp(1.8), height: hp(5) }}
                          className="rounded-lg p-3 mb-1 bg-gray-100"
                          placeholder="Enter your Password"
                          secureTextEntry
                          onBlur={onBlur}
                          onChangeText={onChange}
                          value={value}
                        />
                      )}
                      name="password"
                    />
                    {errors.password && (
                      <Text className="absolute bottom-0 translate-y-[20px] text-red-500">
                        This is required.
                      </Text>
                    )}
                  </View>

                  <View>
                    {/* button submit */}

                    <TouchableOpacity
                      onPress={handleSubmit(onSubmit)}
                      className="bg-amber-500 rounded-full p-4 items-center mt-5"
                    >
                      <Text
                        style={{ fontSize: hp(2) }}
                        className="text-white font-bold text-base"
                      >
                        Login
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </ScrollView>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
};

export default LoginScreen;
