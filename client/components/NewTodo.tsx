import React, { ReactElement } from "react";
import { useRouter } from "next/router";
import {
  Card,
  CardContent,
  CardActions,
  TextField,
  Button,
} from "@mui/material";

import add from "../api_functions/add";

import styles from "../styles/components/NewTodo.module.css";

type Props = {
  newTodo: string;
  setNewTodo: (newTodo: string) => void;
  setShowAdd: (showAdd: boolean) => void;
};

export default function NewTodo({
  newTodo,
  setNewTodo,
  setShowAdd,
}: Props): ReactElement {
  const router = useRouter();
  return (
    <Card className={styles.card}>
      <CardContent className={styles.nameDate}>
        <TextField
          label="What to do?"
          variant="outlined"
          onChange={(e) => setNewTodo(e.target.value)}
          className={styles.input}
        />
      </CardContent>
      <CardActions>
        <Button
          variant="outlined"
          onClick={async () => {
            await add(newTodo);
            setShowAdd(false);
            router.replace(router.asPath);
          }}
        >
          Save
        </Button>
      </CardActions>
    </Card>
  );
}
