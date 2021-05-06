import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
  TablePagination,
  LinearProgress,
} from '@material-ui/core';
import axios from 'axios';
import dayjs from 'dayjs';
import currencyMap from '../utils/currency_map';
import AddBacklink from '../components/add_backlink';
import EditBacklink from '../components/edit_backlink';
import DeleteBacklink from '../components/delete_backlink';
import BulkActions from '../components/bulk_actions';
import FilterBacklinks from '../components/filter_backlinks';

const useStyles = makeStyles(() => ({
  table: {
    marginBottom: '8px',
    '& th, td': {
      textAlign: 'center',
    },
  },
  tableHead: {
    '& th': {
      fontSize: '1rem',
    },
  },
  tableHeadCheckbox: {
    whiteSpace: 'nowrap',
  },
  spacer: {
    height: '4px',
  },
}));

const initialFilterValuesState = {
  startDate: null,
  endDate: null,
};

const Home = () => {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [backlink, setBacklink] = useState('');
  const [data, setData] = useState();
  const [filterValues, setFilterValues] = useState(initialFilterValuesState);
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const loadData = () => {
      const filterObject = {
        filters: { dateOrdered: { ...filterValues } },
      };

      axios
        .post(
          `/api/backlink/fetch?page=${page}&limit=${rowsPerPage}`,
          filterObject
        )
        .then((response) => {
          setData(response.data);
          setLoading(false);
        })
        .catch((err) => console.error(err));
    };
    setLoading(true);
    loadData();
  }, [page, rowsPerPage, backlink]);

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const handleSelectAllClick = (e) => {
    if (e.target.checked) {
      const newSelecteds = data.backlinks.map((row) => row._id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleSelectClick = (e, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (id) => selected.indexOf(id) > -1;

  return (
    <>
      <TableContainer className={classes.table} component={Paper}>
        {loading ? <LinearProgress /> : <div className={classes.spacer} />}
        <Table>
          <TableHead className={classes.tableHead}>
            <TableRow>
              <TableCell
                className={classes.tableHeadCheckbox}
                padding="checkbox"
              >
                <Checkbox
                  color="default"
                  checked={
                    data?.backlinks.length > 0 &&
                    selected.length === data.backlinks.length
                  }
                  onChange={handleSelectAllClick}
                />
                <BulkActions
                  selected={selected}
                  setSelected={setSelected}
                  setBacklink={setBacklink}
                />
              </TableCell>
              <TableCell>Target URL</TableCell>
              <TableCell>Backlink URL</TableCell>
              <TableCell>Vendor</TableCell>
              <TableCell>Date Ordered</TableCell>
              <TableCell>Order Status</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>
                <FilterBacklinks
                  setBacklink={setBacklink}
                  filterValues={filterValues}
                  setFilterValues={setFilterValues}
                />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.backlinks.map((row) => {
                const isItemSelected = isSelected(row._id);
                return (
                  <TableRow key={row._id} scope="row">
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="default"
                        checked={isItemSelected}
                        onChange={(e) => handleSelectClick(e, row._id)}
                      />
                    </TableCell>
                    <TableCell>{row.targetUrl}</TableCell>
                    <TableCell>{row.backlinkUrl}</TableCell>
                    <TableCell>{row.vendor}</TableCell>
                    <TableCell>
                      {dayjs(row.dateOrdered).format('MMMM D, YYYY')}
                    </TableCell>
                    <TableCell>{capitalize(row.orderStatus)}</TableCell>
                    <TableCell>
                      {currencyMap[row.currency]}
                      {row.price.$numberDecimal}
                    </TableCell>
                    <TableCell>
                      <EditBacklink setBacklink={setBacklink} data={row} />
                      <DeleteBacklink setBacklink={setBacklink} _id={row._id} />
                    </TableCell>
                  </TableRow>
                );
              })}
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                count={data?.totalDocuments || 0}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <AddBacklink setBacklink={setBacklink} tableState={data} />
    </>
  );
};

export default Home;
