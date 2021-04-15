import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox } from '@material-ui/core'
import axios from 'axios'
import dayjs from 'dayjs'
import currencyMap from '../utils/currency_map'
import AddBacklinks from '../components/add_backlink'

const useStyles = makeStyles(theme => ({
  table: {
    marginBottom: '8px'
  }
}))  

const Home = () => {
  const classes = useStyles()

  const [data, setData] = useState() 
  
  useEffect(() => {
    //Change this later to some kind of configuration file
    axios.post('http://localhost:3050/api/backlink/fetch')
      .then(response => {
        setData(response.data)
      })
      .catch(err => console.error(err) )
  }, [data])

  return (
    <>
    <TableContainer className={classes.table} component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox/>
            </TableCell>
            <TableCell>Target URL</TableCell>
            <TableCell>Backlink URL</TableCell>
            <TableCell>Vendor</TableCell>
            <TableCell>Date Ordered</TableCell>
            <TableCell>Order Status</TableCell>
            <TableCell>Language</TableCell>
            <TableCell>Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data && data.map((row) => (
            <TableRow key={row._id} scope="row">
              <TableCell padding="checkbox">
                <Checkbox/>
              </TableCell>
              <TableCell>{row.targetUrl}</TableCell>
              <TableCell>{row.backlinkUrl}</TableCell>
              <TableCell>{row.vendor}</TableCell>
              <TableCell>{dayjs(row.dateOrdered).format('MMMM D, YYYY')}</TableCell>
              <TableCell>{row.orderStatus}</TableCell>
              <TableCell>{row.contentLanguage}</TableCell>
              <TableCell>{currencyMap[row.currency]??currencyMap[row.currency]}{row.price.$numberDecimal}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <AddBacklinks tableState={data}/>
    </>
  )
}

export default Home