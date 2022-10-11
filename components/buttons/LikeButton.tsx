import React, { useState } from "react";

import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { IconButton } from "@mui/material";
import { useAuth } from "../../context/AuthContext";

function LikeButton({ gameId }: Game) {
  console.log("props", gameId);
  const { dbUsers, handleLike } = useAuth();
  console.log("dbUsers", dbUsers?.liked);

  const handleOnClick = () => {
    handleLike(gameId);
  };

  return (
    <div>
      <IconButton onClick={handleOnClick}>
        {dbUsers.liked.includes(gameId) ? (
          <FavoriteOutlinedIcon color="error" />
        ) : (
          <FavoriteBorderOutlinedIcon />
        )}
      </IconButton>
    </div>
  );
}

export default LikeButton;
