import axios from 'axios';

const apiKey =
  'live_I3SaeiGSW3xu6Xb8WEFP5zZWGD0UHxrVhTB1p92KY3nLAzTs0diDVo6TV5pxwWVd';
axios.defaults.headers.common['x-api-key'] = apiKey;

export async function fetchBreeds() {
  try {
    const response = await axios.get('https://api.thecatapi.com/v1/breeds');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch cat breeds');
  }
}

export async function fetchCatByBreed(breedId) {
  try {
    const response = await axios.get(
      `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch cat info');
  }
}
