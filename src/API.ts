import { createApi } from 'unsplash-js';

const instance = createApi({
  accessKey: process.env.REACT_APP_UNSPLASH_ACCESS_KEY
});

export const getPhotos = async ( page: number, perPage: number ) => {
  const response = await instance.photos.list({ page, perPage });

  return response.response;
};

export const getPhotoStats = async ( id: string ) => {
  const response = await instance.photos.getStats({ photoId: id });

  return response.response;
}

export default instance;
