import axios from "axios";

const API_URL = "/api/media";

const saveMediaToDB = async (mediaData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, mediaData, config);
  return response.data;
};

const getMedias = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return Array.isArray(response.data.data) ? response.data.data : [];
};

const deleteMedia = async (mediaId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(`${API_URL}/delete/${mediaId}`, config);

  return response.data;
};

const mediaService = {
  saveMediaToDB,
  deleteMedia,
  getMedias,
};

export default mediaService;
