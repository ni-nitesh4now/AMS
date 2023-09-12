import axios from 'axios';

const apiUrl = 'http://localhost:5000'; // Replace with your API URL

export const getTotalUsers = () => {
    return axios.get(`${apiUrl}/get_all_platform/users`)
      .then((response) => {
        return response.data; // Return the response data
      })
      .catch((error) => {
        throw error; // Handle errors
      });
  };
  
export const getAllCoupons = () => {
  return axios.get(`${apiUrl}/get_all_coupon`);
};
