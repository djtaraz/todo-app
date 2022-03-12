import React, { ReactElement } from "react";
import { Typography, IconButton } from "@mui/material";
import { AddBox, RemoveCircle } from "@mui/icons-material";

import styles from "../styles/components/Top.module.css";

type Props = {
  showAdd: boolean;
  setShowAdd: (showAdd: boolean) => void;
};

export default function Top({ showAdd, setShowAdd }: Props): ReactElement {
  return (
    <div className={styles.top}>
      <Typography variant="h1">Todo List</Typography>
      <IconButton onClick={() => setShowAdd(!showAdd)}>
        {!showAdd && <AddBox fontSize="large" />}
        {showAdd && <RemoveCircle fontSize="large" />}
      </IconButton>
    </div>
  );
}
