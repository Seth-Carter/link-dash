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
  
  const [backlink, setBacklink] = useState('')
  const [data, setData] = useState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const triggerLoadData = () => {
      //Change this later to some kind of configuration file
      console.log(`http://localhost:3050/api/backlink/fetch?page=${page}&limit=${rowsPerPage}`);
      axios
        .post(`http://localhost:3050/api/backlink/fetch?page=${page}&limit=${rowsPerPage}`)
        .then((response) => {
          alert('Data refreshed!')
          console.log(response.data)
          setData(response.data);
        })
        .catch((err) => console.error(err));
    };
    triggerLoadData();
  }, [page, rowsPerPage, backlink]);

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

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
              data.backlinks.map((row) => (
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
                    <EditBacklink setBacklink={setBacklink} data={row} />
                    <DeleteBacklink setBacklink={setBacklink} _id={row._id} />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
          <TableFooter>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              count={data && data.totalDocuments}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </TableFooter>
        </Table>
      </TableContainer>
      <AddBacklink setBacklink={setBacklink} tableState={data} />
    </>
  );
};

export default Home;
