import React, { ReactElement } from "react";
import { useRouter } from "next/router";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Checkbox,
  IconButton,
} from "@mui/material";
import { Delete } from "@mui/icons-material";

import remove from "../api_functions/remove";
import toggle from "../api_functions/toggle";

import styles from "../styles/components/Todo.module.css";

type Props = {
  todo: {
    id: number;
    name: string;
    created_at: string;
    completed_at: string;
    status: boolean;
  };
};

export default function Todo({ todo }: Props): ReactElement {
  const router = useRouter();
  return (
    <Card key={todo.id.toString()} className={styles.card}>
      <CardContent className={styles.nameDate}>
        <Typography variant="h6">{todo.name}</Typography>
        <Typography className={styles.italic}>
          Created on {todo.created_at}
        </Typography>
      </CardContent>
      <CardActions>
        {todo.completed_at !== null && (
          <Typography className={styles.italic}>
            Completed on {todo.completed_at}
          </Typography>
        )}
        <Checkbox
          size="medium"
          checked={todo.status}
          onChange={async () => {
            await toggle(todo.id, !todo.status);
            router.replace(router.asPath);
          }}
        />
        <IconButton
          onClick={async () => {
            await remove(todo.id);
            router.replace(router.asPath);
          }}
        >
          <Delete />
        </IconButton>
      </CardActions>
    </Card>
  );
}
