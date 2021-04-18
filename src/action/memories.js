import {instance} from './interceptors'
export const getMemories = () => {
  return instance.get('/memory/posts')
    .then((resp) => resp)
    .catch((error) => error);
};

export const createMemory = (data) => {
  return instance
    .post(`memory/post`, data)
    .then((resp) => resp)
    .catch((error) => error);
};
