import React from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import { Done, Close } from "@mui/icons-material";

type Props = {
  todos: {
    id: number;
    name: string;
    created_at: string;
    completed_at: string;
    status: boolean;
  }[];
};

export default function ReportingTable({ todos }: Props) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="left">Task</TableCell>
            <TableCell align="center">Created at</TableCell>
            <TableCell align="center">Completed at</TableCell>
            <TableCell align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {todos.map((todo) => (
            <TableRow key={todo.name}>
              <TableCell component="th" scope="row">
                {todo.name}
              </TableCell>
              <TableCell align="center">{todo.created_at}</TableCell>
              <TableCell align="center">
                {todo.completed_at === null ? <Close /> : todo.completed_at}
              </TableCell>
              <TableCell align="right">
                {todo.status ? <Done color="primary" /> : <Close />}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
