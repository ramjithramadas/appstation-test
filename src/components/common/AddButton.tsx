import React from "react";
import { Button, Grid, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";

interface AddButtonProps {
  onClick: (param?: any) => void;
}
const AddButtonRoot = styled("button")(({ theme }) => ({
  paddingTop: theme.spacing(3),
}));
export default function AddButton({ onClick }: AddButtonProps) {
  return (
    <AddButtonRoot
      sx={{
        pt: 0,
        borderRadius: "50%",
        border: 0,
        width: 40,
        height: 40,
        background: "#0095DA",
        position: "absolute",
        right: 30,
        top: 45,
        cursor: "pointer",
        transition: "0.5s ease-in-out",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        "&:hover": {
          opacity: 0.5,
        },
        svg: {
          fill: "#fff",
        },
      }}
      onClick={onClick}
    >
      <AddIcon />
    </AddButtonRoot>
  );
}
