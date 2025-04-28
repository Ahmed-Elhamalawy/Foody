// @ts-nocheck


/**
 * Extract ingredients and measurements from recipe data
 * @param {Object} data - Recipe data object
 * @returns {Array} Array of ingredient objects with ingredient and measure properties
 */
export const getIngredients = (data) => {
    if (!data) return [];
  
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = data[`strIngredient${i}`];
      const measure = data[`strMeasure${i}`];
  
      if (ingredient && ingredient.trim() !== "") {
        ingredients.push({
          ingredient,
          measure: measure || "",
        });
      }
    }
    return ingredients;
  };
  
  /**
   * Split instructions into steps
   * @param {Object} data - Recipe data object
   * @returns {Array} Array of instruction steps
   */
  export const getInstructionSteps = (data) => {
    if (!data?.strInstructions) return [];
    return data.strInstructions
      .split(/\r\n|\r|\n/)
      .filter((step) => step.trim() !== "");
  };