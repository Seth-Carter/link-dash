import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  capitalize,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  TableFooter,
  TablePagination
} from "@material-ui/core";
import axios from "axios";
import dayjs from "dayjs";
import currencyMap from "../utils/currency_map";
import AddBacklink from "../components/add_backlink";
import EditBacklink from "../components/edit_backlink";
import DeleteBacklink from "../components/delete_backlink";

const useStyles = makeStyles((theme) => ({
  table: {
    marginBottom: "8px",
    "& th, td": {
      textAlign: "center",
    },
  },
  tableHead: {
    "& th": {
      fontSize: "1rem",
    },
  },
}));

const Home = () => {
  const classes = useStyles();

  const [data, setData] = useState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const loadData = () => {
    //Change this later to some kind of configuration file
    axios
      .post("http://localhost:3050/api/backlink/fetch")
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <TableContainer className={classes.table} component={Paper}>
        <Table>
          <TableHead className={classes.tableHead}>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox />
              </TableCell>
              <TableCell>Target URL</TableCell>
              <TableCell>Backlink URL</TableCell>
              <TableCell>Anchor</TableCell>
              <TableCell>Vendor</TableCell>
              <TableCell>Date Ordered</TableCell>
              <TableCell>Order Status</TableCell>
              <TableCell>Language</TableCell>
              <TableCell>Price</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.map((row) => (
                <TableRow key={row._id} scope="row">
                  <TableCell padding="checkbox">
                    <Checkbox />
                  </TableCell>
                  <TableCell>{row.targetUrl}</TableCell>
                  <TableCell>{row.backlinkUrl}</TableCell>
                  <TableCell>{row.anchor}</TableCell>
                  <TableCell>{row.vendor}</TableCell>
                  <TableCell>
                    {dayjs(row.dateOrdered).format("MMMM D, YYYY")}
                  </TableCell>
                  <TableCell>{capitalize(row.orderStatus)}</TableCell>
                  <TableCell>{row.contentLanguage}</TableCell>
                  <TableCell>
                    {currencyMap[row.currency] ?? currencyMap[row.currency]}
                    {row.price.$numberDecimal}
                  </TableCell>
                  <TableCell>
                    <EditBacklink loadData={loadData} data={row} />
                    <DeleteBacklink loadData={loadData} _id={row._id} />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
          <TableFooter>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
            />
          </TableFooter>
        </Table>
      </TableContainer>
      <AddBacklink loadData={loadData} tableState={data} />
    </>
  );
};

export default Home;
