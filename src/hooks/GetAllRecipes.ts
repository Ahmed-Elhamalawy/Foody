// @ts-nocheck
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
// ---------------------------
//           Api's
// --------------------------
const getCategories = async () => {
  const response = await axios.get(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );
  return response?.data;
};

const getRecipes = async (activeCategory: string) => {
  const response = await axios(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${activeCategory}`
  );
  return response.data?.meals || []; // Return empty array if no meals
};

const getRecipeDetails = async (id: string) => {
  const response = await axios(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  return response?.data?.meals[0] || {};
};
// ---------------------------
//           Hooks
// --------------------------

const useGetAllCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: 1000 * 60 * 60,
    cacheTime: 1000 * 60 * 60, // 1 hour
  });
};
const useGetAllRecipes = (activeCategory: string) => {
  return useQuery({
    queryKey: ["recipes", activeCategory],
    queryFn: () => getRecipes(activeCategory),
    staleTime: 1000 * 60 * 60,
    cacheTime: 1000 * 60 * 60, // 1 hour
  });
};
const useGetRecipeDetails = (id: string) => {
  return useQuery({
    queryKey: ["recipe", id],
    queryFn: () => getRecipeDetails(id),
    staleTime: 1000 * 60 * 60,
    cacheTime: 1000 * 60 * 60, // 1 hour
  });
};
export { useGetAllCategories, useGetAllRecipes, useGetRecipeDetails };
