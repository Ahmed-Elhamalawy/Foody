// @ts-nocheck
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { AuthContext } from "../store/auth-context";

// ---------------------------
//           Api's
// --------------------------
const getCategoriesApi = async () => {
  const response = await axios.get(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );
  return response?.data;
};

const getRecipesApi = async (activeCategory: string) => {
  const response = await axios(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${activeCategory}`
  );
  return response.data?.meals || []; // Return empty array if no meals
};

const getRecipeDetailsApi = async (id: string) => {
  const response = await axios(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  return response?.data?.meals[0] || {};
};

const signUpApi = async ({ fullName, email, password }) => {
  const response = await axios.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${"AIzaSyA_DImqX33lgggRBUzhLtRKLfDOnK5k8G8"}`,
    {
      email,
      password,
      displayName: fullName,
      returnSecureToken: true,
    }
  );
  return response.data;
};
const LoginApi = async ({ email, password }) => {
  const response = await axios.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${"AIzaSyA_DImqX33lgggRBUzhLtRKLfDOnK5k8G8"}`,
    {
      email,
      password,
      returnSecureToken: true,
    }
  );
  console.log(response);

  return response.data;
};

// ---------------------------
//         Hooks (Queries)
// --------------------------

const useGetAllCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategoriesApi,
    staleTime: 1000 * 60 * 60,
    cacheTime: 1000 * 60 * 60, // 1 hour
  });
};
const useGetAllRecipes = (activeCategory: string) => {
  return useQuery({
    queryKey: ["recipes", activeCategory],
    queryFn: () => getRecipesApi(activeCategory),
    staleTime: 1000 * 60 * 60,
    cacheTime: 1000 * 60 * 60, // 1 hour
  });
};
const useGetRecipeDetails = (id: string) => {
  return useQuery({
    queryKey: ["recipe", id],
    queryFn: () => getRecipeDetailsApi(id),
    staleTime: 1000 * 60 * 60,
    cacheTime: 1000 * 60 * 60, // 1 hour
  });
};

// ---------------------------
//       Hooks (Mutations)
// --------------------------
const useSignup = () => {
  return useMutation({
    mutationFn: ({ fullName, email, password }) =>
      signUpApi({ fullName, email, password }),
    staleTime: 1000 * 60 * 60,
    cacheTime: 1000 * 60 * 60,
  });
};

const useLogin = () => {
  return useMutation({
    mutationFn: ({ email, password }) => LoginApi({ email, password }),
    staleTime: 1000 * 60 * 60,
    cacheTime: 1000 * 60 * 60,
  });
};

export {
  useGetAllCategories,
  useGetAllRecipes,
  useGetRecipeDetails,
  useSignup,
  useLogin,
};
