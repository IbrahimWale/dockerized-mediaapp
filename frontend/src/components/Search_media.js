import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveMediaToDB } from "../features/medias/mediaSlice.js";

function SearchMedia() {
  const [query, _] = useState("music");
  const [mediaType, setMediaType] = useState("audio");
  const [category, setCategory] = useState("");
  const [__, setMediaFiles] = useState([]);
  const [filteredMedia, setFilteredMedia] = useState([]);
  const [localMedia, setLocalMedia] = useState([]);
  const [showLocalMedia, setShowLocalMedia] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [recentSearches, setRecentSearches] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const audioCategories = [
    "audiobook",
    "sound_effect",
    "podcast",
    "music",
    "news",
    "pronunciation",
  ];
  const imageCategories = ["illustration", "digitized_artwork", "photograph"];

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }

    const savedSearches =
      JSON.parse(localStorage.getItem("recentSearches")) || [];
    setRecentSearches(savedSearches);

    const savedMedia = JSON.parse(localStorage.getItem("localMedia")) || [];
    setLocalMedia(savedMedia);
  }, [user, navigate]);

  const saveSearch = (searchTerm) => {
    const updatedSearches = [
      searchTerm,
      ...recentSearches.filter((s) => s !== searchTerm),
    ].slice(0, 5);
    setRecentSearches(updatedSearches);
    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
  };

  const fetchMedia = async () => {
    setLoading(true);
    setError(null);
    setShowLocalMedia(false);

    try {
      const baseUrl = "https://api.openverse.org/v1";
      const endpoint = mediaType === "audio" ? "audio" : "images";
      const categoryQuery = category ? `&category=${category}` : "";
      const response = await fetch(
        `${baseUrl}/${endpoint}/?q=${query}${categoryQuery}&format=json`
      );

      if (!response.ok) throw new Error("Failed to fetch media");

      const data = await response.json();
      setMediaFiles(data.results || []);
      setFilteredMedia(data.results || []);
      saveSearch(query);
    } catch (error) {
      setError("Error fetching media. Please try again.");
      console.error(error);
    }
    setLoading(false);
  };

  const saveMedia = async (media) => {
    dispatch(saveMediaToDB(media));
  };

  const saveToLocal = (media) => {
    const updatedLocalMedia = [
      media,
      ...localMedia.filter((m) => m.id !== media.id),
    ];
    setLocalMedia(updatedLocalMedia);
    localStorage.setItem("localMedia", JSON.stringify(updatedLocalMedia));
    setMessage("Media saved locally!");
  };

  const removeFromLocal = (mediaId) => {
    const updatedLocalMedia = localMedia.filter((m) => m.id !== mediaId);
    setLocalMedia(updatedLocalMedia);
    localStorage.setItem("localMedia", JSON.stringify(updatedLocalMedia));
    setMessage("Media removed from local storage.");
  };

  const showLocalStorageMedia = () => {
    setShowLocalMedia(true);
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-2">Search Media</h2>

      {/* Filters */}
      <select
        className="block w-full p-2 border mb-2"
        value={mediaType}
        onChange={(e) => setMediaType(e.target.value)}
      >
        <option value="images">Images</option>
        <option value="audio">Audio</option>
      </select>

      {mediaType === "audio" ? (
        <select
          className="block w-full p-2 border mb-2"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {audioCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      ) : (
        <select
          className="block w-full p-2 border mb-2"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {imageCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      )}

      <button
        className="bg-green-500 text-white p-2 rounded w-full mb-2"
        onClick={fetchMedia}
        disabled={loading}
      >
        {loading ? "Loading..." : "Search"}
      </button>

      <button
        className="bg-gray-500 text-white p-2 rounded w-full mb-2"
        onClick={showLocalStorageMedia}
      >
        Show Saved Media
      </button>

      {error && <p className="text-red-500">{error}</p>}
      {message && <p className="text-blue-500">{message}</p>}

      {loading ? (
        <p>Loading...</p>
      ) : (showLocalMedia ? localMedia : filteredMedia).length === 0 ? (
        <p className="text-gray-500">No results found.</p>
      ) : (
        <ul>
          {(showLocalMedia ? localMedia : filteredMedia).map((media, index) => (
            <li key={index} className="p-2 border mb-2 flex flex-col gap-2">
              <p>
                {media.title} by {media.creator}
              </p>

              {mediaType === "audio" ? (
                <audio controls className="mt-1">
                  <source
                    src={media.audio_url || media.url}
                    type="audio/mpeg"
                  />
                  Your browser does not support the audio element.
                </audio>
              ) : (
                <img
                  src={media.image_url || media.url}
                  alt="Media"
                  className="mt-1 h-60 object-cover rounded-lg"
                />
              )}

              <div className="flex gap-2">
                <button
                  className="bg-blue-500 text-white p-2 rounded flex-1"
                  onClick={() => saveToLocal(media)}
                >
                  Save Locally
                </button>
                <button
                  className="bg-red-500 text-white p-2 rounded flex-1"
                  onClick={() => removeFromLocal(media.id)}
                >
                  Remove from Local
                </button>
                <button
                  className="bg-green-500 text-white p-2 rounded flex-1"
                  onClick={() => saveMedia(media)}
                >
                  Save to DB
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchMedia;
