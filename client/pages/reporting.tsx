import React, { ReactElement } from "react";
import { useRouter } from "next/router";
import type { GetServerSidePropsContext } from "next";
import Head from "next/head";
import axios from "axios";
import { Button, Container, Divider, Typography } from "@mui/material";

import Filters from "../components/Filters";
import ReportingTable from "../components/ReportingTable";

import styles from "../styles/pages/Reporting.module.css";

interface Todos {
  todos: {
    id: number;
    name: string;
    created_at: string;
    completed_at: string;
    status: boolean;
  }[];
  status: boolean;
  from: string;
  to: string;
}

const Reporting = ({ todos, status, from, to }: Todos): ReactElement => {
  const router = useRouter();
  const [fromDate, setFromDate] = React.useState<string | null>(from);
  const [toDate, setToDate] = React.useState<string | null>(to);
  const [showComplete, setShowComplete] = React.useState<boolean>(status);
  return (
    <div className={styles.container}>
      <Head>
        <title>Reporting | Todo App</title>
        <meta name="description" content="reporting for todo app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxWidth="md">
        <Typography variant="h1">Todo Reports</Typography>
        <Filters
          fromDate={fromDate}
          setFromDate={setFromDate}
          toDate={toDate}
          setToDate={setToDate}
          showComplete={showComplete}
          setShowComplete={setShowComplete}
        />
        <Divider className={styles.divider} />
        <ReportingTable todos={todos} />
      </Container>
      <div className={styles.link}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => {
            router.push({ pathname: "/" });
          }}
        >
          Back to Todos Page
        </Button>
      </div>
    </div>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const reportingTodos = await axios
    .get(
      `http://localhost:8000/reporting?status=${context.query.status}&from=${context.query.from}&to=${context.query.to}`
    )
    .then((res) => {
      return res.data;
    });
  return {
    props: {
      todos: reportingTodos,
      status: context.query.status === "true" ? true : false,
      from: context.query.from,
      to: context.query.to,
    },
  };
}

export default Reporting;
