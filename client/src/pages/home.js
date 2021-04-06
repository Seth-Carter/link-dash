import React, { useState, useEffect } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core'
import axios from 'axios'

const Home = () => {
  const [data, setData] = useState() 
  
  useEffect(() => {
    axios.post('http://localhost:3000/api/backlink/fetch')
      .then(response => {
        console.log(response.data)
        setData(response.data)
      })
      .catch(err => console.error(err) )
  }, [])

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
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
            <TableRow component="th" scope="row">
              <TableCell>{row.targetUrl}</TableCell>
              <TableCell>{row.backlinkUrl}</TableCell>
              <TableCell>{row.vendor}</TableCell>
              <TableCell>{row.dateOrdered}</TableCell>
              <TableCell>{row.orderStatus}</TableCell>
              <TableCell>{row.contentLanguage}</TableCell>
              <TableCell>{row.price.$numberDecimal}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default Home