import React from "react";
import { Card, CardContent, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import ListAltIcon from "@mui/icons-material/ListAlt";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Slider({ setView }) {
  const menuItems = [
    { key: "add", label: "Add Task", icon: <AddCircleIcon /> },
    { key: "all", label: "All Tasks", icon: <ListAltIcon /> },
    { key: "completed", label: "Completed", icon: <CheckCircleIcon /> },
    { key: "pending", label: "Pending", icon: <HourglassEmptyIcon /> },
    { key: "deleted", label: "Deleted", icon: <DeleteIcon /> },
  ];

  return (
    <Card
      sx={{
        width: 200,
        height: "46%",
        borderRadius: 3,
        boxShadow: 6,
        backgroundColor: "#1e1e1e",
        color: "#fff",
      }}
    >
      <CardContent>
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.key} disablePadding>
              <ListItemButton
                onClick={() => setView(item.key)}
                sx={{
                  borderRadius: 2,
                  "&:hover": { backgroundColor: "#333" },
                  color: "#fff",
                }}
              >
                <ListItemIcon sx={{ color: "#fff" }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}
