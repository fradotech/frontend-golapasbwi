import React, { Fragment, useEffect, useState } from 'react'
// import RowCards from './shared/RowCards'
import StatCards from './shared/StatCards'
// import Campaigns from './shared/Campaigns'
import { Card, Grid, useTheme } from '@mui/material'
// import StatCards2 from './shared/StatCards2'
import { styled } from '@mui/system'
import AgeChart from './shared/AgeChart'
import JobChart from './shared/JobChart'
import { getStatistics } from 'app/services/surveys'
// import TopSellingTable from './shared/TopSellingTable'

const ContentBox = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: {
    margin: '16px',
  },
}))

const Title = styled('span')(() => ({
  fontSize: '1rem',
  fontWeight: '500',
  textTransform: 'capitalize',
}))

const Analytics = () => {
  const { palette } = useTheme()

  const [statistic, setStatistic] = useState({
    age: [],
    job: []
  })

  useEffect(() => {
    let mounted = true

    getStatistics()
      .then(data => {
        if (mounted) {
          setStatistic(data)
        }
      })

    return () => mounted = false
  }, [])

  return (
    <Fragment>
      <ContentBox className="analytics">
        <Grid container spacing={3}>
          <Grid item lg={12} md={12} sm={16} xs={16}>
            <StatCards />
            {/* <TopSellingTable />
            <StatCards2 />
            <H4>Ongoing Projects</H4>
            <RowCards /> */}
          </Grid>

          <Grid item lg={4} md={4} sm={12} xs={12}>
            <Card sx={{ px: 3, py: 2, mb: 3 }}>
              <Title>Usia</Title>
              <AgeChart
                height="300px"
                color={[
                  palette.primary.dark,
                  palette.primary.main,
                  palette.primary.light,
                ]}
                data={statistic}
              />
            </Card>
          </Grid>
          <Grid item lg={4} md={4} sm={12} xs={12}>
            <Card sx={{ px: 3, py: 2, mb: 3 }}>
              <Title>Pekerjaan</Title>
              <JobChart
                height="300px"
                color={[
                  palette.primary.dark,
                  palette.primary.main,
                  palette.primary.light,
                ]}
                data={statistic}
              />
            </Card>
          </Grid>
          {/* <Grid item lg={4} md={4} sm={12} xs={12}>
            <Campaigns />
          </Grid> */}
        </Grid>
      </ContentBox>
    </Fragment>
  )
}

export default Analytics
