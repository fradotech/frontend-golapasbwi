import React from 'react'
import PaginationSurveys from './PaginationSurveys'
import { Breadcrumb, SimpleCard } from 'app/components'
import { Box, styled } from '@mui/system'

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

const AppSurveys = () => {
  return (
    <Container>
      <div className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: 'Manajemen', path: '/manajemen' },
            { name: 'Survey' },
          ]}
        />
      </div>
      <Box py="12px" />
      <SimpleCard title="Survey">
        <PaginationSurveys />
      </SimpleCard>
    </Container>
  )
}

export default AppSurveys
