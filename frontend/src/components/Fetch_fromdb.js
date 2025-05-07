import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getMedias,
  deleteMedia,
  reset,
} from "../features/medias/mediaSlice.js";
import { toast, ToastContainer } from "react-toastify";

function FetchDBResource() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const {
    medias = [],
    isLoading,
    isError,
    message,
  } = useSelector((state) => state.medias || {});

  useEffect(() => {
    if (isError) {
      toast.info("You have not save again media file");
    }

    if (!user) {
      navigate("/login");
    }

    dispatch(getMedias());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-2">Search Media</h2>

      {isLoading ? (
        <p>Loading...</p>
      ) : medias.length === 0 ? (
        <p className="text-gray-500">No media found.</p>
      ) : (
        <ul>
          {medias.map((media) => (
            <li key={media.id} className="p-2 border mb-2 flex flex-col gap-2">
              <p className="font-semibold">
                {media.title} by {media.creator}
              </p>

              <a
                href={media.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                View Media
              </a>

              <button
                className="bg-red-500 text-white p-2 rounded w-full"
                onClick={() => dispatch(deleteMedia(media._id))}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FetchDBResource;
