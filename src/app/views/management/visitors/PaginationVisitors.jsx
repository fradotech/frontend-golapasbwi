import {
  IconButton,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  Icon,
  Paper,
  InputBase,
} from '@mui/material'
import React from 'react'
import { useEffect, useState } from 'react';
import { Box, styled } from '@mui/system'
import { delVisitor, getVisitors } from 'app/services/visitors'

const StyledTable = styled(Table)(({ theme }) => ({
  whiteSpace: 'pre',
  '& thead': {
    '& tr': {
      '& th': {
        paddingLeft: 0,
        paddingRight: 0,
      },
    },
  },
  '& tbody': {
    '& tr': {
      '& td': {
        paddingLeft: 0,
        textTransform: 'capitalize',
      },
    },
  },
}))

const PaginationVisitors = () => {
  const [visitors, setVisitors] = useState([])
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const [page, setPage] = React.useState(0)
  const [search, setSearch] = React.useState('')

  useEffect(() => {
    let mounted = true

    getVisitors()
      .then(data => {
        if (mounted) {
          setVisitors(data)
        }
      })

    return () => mounted = false
  }, [])

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Anda yakin ingin menghapus?'))
    try {
      await delVisitor(id)
      window.location.reload();
    } catch (e) {
      console.log(e)
      alert(e.message)
    }
  }

  return (
    <Box width="100%" overflow="auto">
      <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Cari berdasarkan nama"
          inputProps={{ 'aria-label': 'Cari berdasarkan nama' }}
          onChange={e => setSearch(e.target.value)}
        />
        <IconButton sx={{ p: '10px' }} aria-label="search" fullWidth>
          <Icon >search</Icon>
        </IconButton>
      </Paper>
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell>Nama</TableCell>
            <TableCell>Sakit</TableCell>
            <TableCell>Deskripsi</TableCell>
            <TableCell>Tgl. Pendaftaran</TableCell>
            <TableCell>Aksi</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {visitors
          .filter(
            visitor => visitor.name.toLowerCase().includes(search.toLowerCase()))
          .slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage
          )
          .map((visitor, index) => (
            <TableRow key={index}>
              <TableCell align="left">{visitor.name}</TableCell>
              <TableCell align="left">{visitor.ilness}</TableCell>
              <TableCell align="left">{visitor.description}</TableCell>
              <TableCell>{visitor.createdAt.slice(0, 10)}</TableCell>
              <TableCell>
                <IconButton onClick={() =>  handleDelete(visitor.id)}>
                  <Icon color='error'>delete</Icon>
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>

      <TablePagination
        sx={{ px: 2 }}
        rowsPerPageOptions={[5, 10, 25, visitors.length]}
        component="div"
        count={visitors.length}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          'aria-label': 'Previous Page',
        }}
        nextIconButtonProps={{
          'aria-label': 'Next Page',
        }}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  )
}

export default PaginationVisitors
