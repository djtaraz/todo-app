import React, { ReactElement } from "react";
import { useRouter } from "next/router";
import { Typography, TextField, Button, Switch, Paper } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";

import styles from "../styles/components/Filters.module.css";

type Props = {
  fromDate: string | null;
  setFromDate: (fromDate: string | null) => void;
  toDate: string | null;
  setToDate: (toDate: string | null) => void;
  showComplete: boolean;
  setShowComplete: (showComplete: boolean) => void;
};

export default function Filters({
  fromDate,
  setFromDate,
  toDate,
  setToDate,
  showComplete,
  setShowComplete,
}: Props): ReactElement {
  const router = useRouter();
  return (
    <Paper>
      <div className={styles.filters}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="From"
            value={fromDate}
            onChange={(newValue) => {
              if (newValue !== null) {
                setFromDate(newValue.toString().slice(4, 15));
              }
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="To"
            value={toDate}
            onChange={(newValue) => {
              if (newValue !== null) {
                setToDate(newValue.toString().slice(4, 15));
              }
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <div className={styles.switch}>
          <Typography>Only complete</Typography>
          <Switch
            checked={showComplete}
            onChange={() => setShowComplete(!showComplete)}
          />
        </div>
        <div>
          <Button
            variant="outlined"
            disabled={fromDate === null || toDate === null}
            onClick={async () => {
              if (fromDate !== null && toDate !== null) {
                await router.push({
                  pathname: router.pathname,
                  query: {
                    status: showComplete,
                    from: fromDate,
                    to: toDate,
                  },
                });
              }
            }}
          >
            Apply
          </Button>
          {router.pathname === "/" && (
            <Button
              variant="outlined"
              style={{ marginLeft: "10px" }}
              disabled={Object.keys(router.query).length === 0}
              onClick={async () => {
                await router.push(router.pathname, undefined, {
                  shallow: false,
                });
                setShowComplete(false);
                setFromDate(null);
                setToDate(null);
              }}
            >
              Reset
            </Button>
          )}
        </div>
      </div>
    </Paper>
  );
}
