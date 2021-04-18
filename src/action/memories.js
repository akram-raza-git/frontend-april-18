import { instance } from "./interceptors";
export const getMemories = () => {
  return instance
    .get("/memory/posts")
    .then((resp) => {
      if (resp && resp.data) {
        return resp.data;
      } else {
        return resp;
      }
    })
    .catch((error) => error);
};

export const createMemory = (data) => {
  return instance
    .post(`memory/post`, data)
    .then((resp) => {
      if (resp && resp.data) {
        return resp.data;
      } else {
        return resp;
      }
    })
    .catch((error) => error);
};

export const deleteMemory = (id) => {
  return instance
    .delete(`memory/post/${id}`)
    .then((resp) => {
      if (resp && resp.data) {
        return resp.data;
      } else {
        return resp;
      }
    })
    .catch((error) => error);
};

export const updateMemory = (id, data) => {
  return instance
    .put(`memory/post/${id}`, data)
    .then((resp) => {
      if (resp && resp.data) {
        return resp.data;
      } else {
        return resp;
      }
    })
    .catch((error) => error);
};
