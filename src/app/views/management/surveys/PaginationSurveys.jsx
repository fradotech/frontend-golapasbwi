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
import { getSurveys } from 'app/services/surveys'
import DetailSurvey from './DetailSurveys';

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

const PaginationSurveys = () => {
  const [surveys, setSurveys] = useState([])
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const [page, setPage] = React.useState(0)
  const [search, setSearch] = React.useState('')

  useEffect(() => {
    let mounted = true

    getSurveys()
      .then(data => {
        if (mounted) {
          setSurveys(data)
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
            <TableCell>Masukan</TableCell>
            <TableCell>Tanggal Survey</TableCell>
            <TableCell>Persentase Kepuasan</TableCell>
            <TableCell>Aksi</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {surveys
          .filter(
            survey => survey.name.toLowerCase().includes(search.toLowerCase()))
          .slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage
          )
          .map((survey, index) => (
            <TableRow key={index}>
              <TableCell align="left">{survey.name}</TableCell>
              <TableCell align="left">{survey.suggestion}</TableCell>
              <TableCell align="left">{survey.createdAt.slice(0, 10)}</TableCell>
              <TableCell align="left">{survey.satisfaction} %</TableCell>
              <TableCell align="left">
                <DetailSurvey survey={survey} />
              </TableCell>            
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>

      <TablePagination
        sx={{ px: 2 }}
        rowsPerPageOptions={[5, 10, 25, surveys.length]}
        component="div"
        count={surveys.length}
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

export default PaginationSurveys
