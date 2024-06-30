import axios from 'axios';

const REACT_APP_UNSPLASH_ACCESS_KEY = `${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`;
const IMAGE_WIDTH = 400; 
const IMAGE_HEIGHT = 300; 

const fetchRandomRestaurantImage = async () => {
  try {
    const response = await axios.get('https://api.unsplash.com/photos/random', {
      params: {
        query: 'restaurant interior, canteen,restaurant',
        client_id: REACT_APP_UNSPLASH_ACCESS_KEY,
        w: IMAGE_WIDTH,
        h: IMAGE_HEIGHT,
      },
    });
    return response.data.urls.regular;
  } catch (error) {
    console.error('Error fetching image from Unsplash', error);
    return 'default-image-url';
  }
};

export default fetchRandomRestaurantImage;
