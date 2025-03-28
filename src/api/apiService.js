import {BaseApiUrl , ApiUrl} from "../utils/constants"
const BaseApi = BaseApiUrl // "https://api.satvikraas.com/api"


//--------------------------------------------------------------------------------
// Fetch all products from the API
export const fetchProductsAPI = async () => {
    try {
      
      
      const response = await fetch(`${BaseApi}/public/getAllProducts`);
      const data = await response.json();
      if (data.data && Array.isArray(data.data)) {
        console.log("fetched products");
        return data.data; // Return product array
      } else {
        console.error("Invalid API response format:", data);
        return [];
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  };

//--------------------------------------------------------------------------------
