import express, { Application, Request, Response } from "express";
import cors from "cors";
import pool from "./db";

const app: Application = express();

app.use(cors());
app.use(express.json());

app.post("/todo", async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const newTodo = await pool.query(
      `INSERT INTO todo (name, created_at, status) 
      VALUES ($1, current_timestamp, FALSE) 
      RETURNING *`,
      [name]
    );
    res.json(newTodo.rows[0]);
  } catch (err: any) {
    console.error(err.message);
  }
});

app.get("/todos", async (req: Request, res: Response) => {
  try {
    if (Object.keys(req.query).length === 0) {
      const allTodos = await pool.query(
        `SELECT
          id, 
          name, 
          to_char(created_at, 'hh24:mi dd/mm/yyyy') created_at,
          to_char(completed_at, 'hh24:mi dd/mm/yyyy') completed_at,
          status 
        FROM todo 
        ORDER BY DATE(created_at) DESC, created_at DESC`
      );
      res.json(allTodos.rows);
    } else {
      const { status, from, to } = req.query;
      const filteredTodos = await pool.query(
        `SELECT
          id,
          name,
          to_char(created_at, 'hh24:mi dd/mm/yyyy') created_at,
          to_char(completed_at, 'hh24:mi dd/mm/yyyy') completed_at,
          status
        FROM todo
        WHERE
          status = $1 AND
          DATE(created_at) >= to_timestamp($2, 'mon dd yyyy') AND
          DATE(created_at) <= to_timestamp($3, 'mon dd yyyy')
          ORDER BY DATE(created_at) DESC, created_at DESC`,
        [status, from, to]
      );
      res.json(filteredTodos.rows);
    }
  } catch (err: any) {
    console.error(err.message);
  }
});

app.get("/todos/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const todo = await pool.query(
      `SELECT 
        id, 
        name, 
        to_char(created_at, 'hh24:mi dd/mm/yyyy') created_at, 
        to_char(completed_at, 'hh24:mi dd/mm/yyyy') completed_at, 
        status 
        FROM todo 
        WHERE id = $1`,
      [id]
    );

    res.json(todo.rows[0]);
  } catch (err: any) {
    console.error(err.message);
  }
});

app.put("/toggle/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (status === true) {
      const completeTodo = await pool.query(
        `UPDATE todo 
        SET 
          status = $1, 
          completed_at = current_timestamp 
        WHERE id = $2 
        RETURNING 
          id,
          name,
          to_char(created_at, 'hh24:mi dd/mm/yyyy') created_at,
          to_char(completed_at,'hh24:mi dd/mm/yyyy') completed_at,
          status`,
        [status, id]
      );
      res.json(completeTodo.rows);
    } else {
      const uncompleteTodo = await pool.query(
        `UPDATE todo 
        SET 
          status = $1,
          completed_at = null
        WHERE id = $2
        RETURNING
          id,
          name,
          to_char(created_at, 'hh24:mi dd/mm/yyyy') created_at,
          to_char(completed_at, 'hh24:mi dd/mm/yyyy') completed_at,
          status`,
        [status, id]
      );
      res.json(uncompleteTodo.rows);
    }
  } catch (err: any) {
    console.error(err.message);
  }
});

app.delete("/todos/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM todo WHERE id = $1", [id]).then(() => {
      res.json();
    });
  } catch (err: any) {
    console.log(err.message);
  }
});

app.get("/reporting", async (req: Request, res: Response) => {
  try {
    const { status, from, to } = req.query;
    const reportingTodos = await pool.query(
      `SELECT
          id,
          name,
          to_char(created_at, 'hh24:mi dd/mm/yyyy') created_at,
          to_char(completed_at, 'hh24:mi dd/mm/yyyy') completed_at,
          status
        FROM todo
        WHERE
          status = $1 OR 
          status = true AND
          DATE(created_at) >= to_timestamp($2, 'mon dd yyyy') AND
          DATE(created_at) <= to_timestamp($3, 'mon dd yyyy')
          ORDER BY DATE(created_at) DESC, created_at DESC`,
      [status, from, to]
    );
    res.json(reportingTodos.rows);
  } catch (err: any) {
    console.error(err.message);
  }
});

app.listen(8000, function () {
  console.log("Server running");
});
