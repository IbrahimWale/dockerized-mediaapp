import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/auth.js";

function BarMenu() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center shadow-md">
      <h1 className="text-lg font-bold">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => navigate("/fetchfromdb")}
        >
          Database Media
        </button>
      </h1>

      <div className="flex gap-4">
        {!user ? (
          <>
            <button
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
              onClick={() => navigate("/login")}
            >
              Login
            </button>

            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              onClick={() => navigate("/signup")}
            >
              Signup
            </button>
          </>
        ) : (
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            onClick={onLogout}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default BarMenu;
