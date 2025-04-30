import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useContext } from "react";
import { AuthContext } from "../store/auth-context";

import WelcomeScreen from "../screens/Welcome";
import HomeScreen from "../screens/Home";
import RecipeDetail from "../screens/RecipeDetail";
import LoginScreen from "../screens/Login";
import SignupScreen from "../screens/Signup";

const Stack = createStackNavigator();

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Signup" component={SignupScreen} />
  </Stack.Navigator>
);

const AppStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Welcome" component={WelcomeScreen} />
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="RecipeDetail" component={RecipeDetail} />
  </Stack.Navigator>
);

const Navigation = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <NavigationContainer>
      {isLoggedIn ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Navigation;
