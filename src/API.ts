import { createApi } from 'unsplash-js';

const instance = createApi({
  accessKey: process.env.REACT_APP_UNSPLASH_ACCESS_KEY
});

export const getPhotos = async ( page: number, perPage: number ) => {
  const response = await instance.photos.list({
    page,
    perPage
  });

  return response.response;
};

export type { Basic as IPhoto } from 'unsplash-js/dist/methods/photos/types';
export default instance;
