import { client } from "./client";
const getAllProducts= async () => {
    const endpoint = "/Products";
    try {
      const response = await client.get(endpoint);
      console.log("Products fetched:", response.data);
        return response.data;
    } catch (error) {
    console.error("Error fetching products", error);
    throw error;
  }
  };
  const getAllOrders= async () => {
    const endpoint = "/Orders";
    try {
      const response = await client.get(endpoint);
        return response.data;
    } catch (error) {
    console.error("Error fetching orders", error);
    throw error;
  }
  };
  const createOrder = async (order) => {
    const endpoint = "/Orders";
  try {
    console.log("Creating order with payload:", order);
    const response = await client.post(endpoint, order);
    console.log("aaa")
    return response.data; // { orderId, message }
  } catch (error) {
    console.error("Error creating order", error);
    throw error;
  }
};
  export default {
    getAllProducts, getAllOrders, createOrder
}