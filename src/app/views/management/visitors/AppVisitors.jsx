import React from 'react'
import { Breadcrumb, SimpleCard } from 'app/components'
import { Box, styled } from '@mui/system'
// import PaginationVisitors from './PaginationVisitors'

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: {
    margin: '16px',
  },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: {
      marginBottom: '16px',
    },
  },
}))

const AppVisitors = () => {
  return (
    <Container>
      <div className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: 'Manajemen', path: '/manajemen' },
            { name: 'Pengunjung' },
          ]}
        />
      </div>
      <Box py="12px" />
      <SimpleCard title="Pengunjung">
        {/* <PaginationVisitors /> */}
      </SimpleCard>
    </Container>
  )
}

export default AppVisitors
