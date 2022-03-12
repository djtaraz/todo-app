import React, { ReactElement } from "react";
import { useRouter } from "next/router";
import type { GetServerSidePropsContext } from "next";
import Head from "next/head";
import axios from "axios";
import { Container, Divider, Button } from "@mui/material";

import Top from "../components/Top";
import Filters from "../components/Filters";
import NewTodo from "../components/NewTodo";
import Todo from "../components/Todo";

import styles from "../styles/pages/Home.module.css";

interface Todos {
  todos: {
    id: number;
    name: string;
    created_at: string;
    completed_at: string;
    status: boolean;
  }[];
}

const Home = ({ todos }: Todos): ReactElement => {
  const router = useRouter();
  const [showAdd, setShowAdd] = React.useState<boolean>(false);
  const [newTodo, setNewTodo] = React.useState<string>("");
  const [fromDate, setFromDate] = React.useState<string | null>(null);
  const [toDate, setToDate] = React.useState<string | null>(null);
  const [showComplete, setShowComplete] = React.useState<boolean>(false);
  const today = new Date();
  const todayFinal = `${today.toLocaleString("default", {
    month: "short",
  })} ${today.getDate()} ${today.getFullYear()}`;
  return (
    <div className={styles.container}>
      <Head>
        <title>Todo App</title>
        <meta name="description" content="todo app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxWidth="md">
        <Top showAdd={showAdd} setShowAdd={setShowAdd} />
        <Filters
          fromDate={fromDate}
          setFromDate={setFromDate}
          toDate={toDate}
          setToDate={setToDate}
          showComplete={showComplete}
          setShowComplete={setShowComplete}
        />
        <Divider className={styles.divider} />
        {showAdd && (
          <NewTodo
            newTodo={newTodo}
            setNewTodo={setNewTodo}
            setShowAdd={setShowAdd}
          />
        )}
        {todos.map((todo) => (
          <Todo key={todo.id} todo={todo} />
        ))}
        <div className={styles.link}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => {
              router.push({
                pathname: "/reporting",
                query: {
                  status: false,
                  from: todayFinal,
                  to: todayFinal,
                },
              });
            }}
          >
            See Reports
          </Button>
        </div>
      </Container>
    </div>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  if (Object.keys(context.query).length === 0) {
    const initalTodos = await axios
      .get(`http://localhost:8000/todos`)
      .then((res) => {
        return res.data;
      });
    return {
      props: {
        todos: initalTodos,
      },
    };
  } else {
    const filteredTodos = await axios
      .get(
        `http://localhost:8000/todos?status=${context.query.status}&from=${context.query.from}&to=${context.query.to}`
      )
      .then((res) => {
        return res.data;
      });
    return {
      props: {
        todos: filteredTodos,
      },
    };
  }
}

export default Home;
