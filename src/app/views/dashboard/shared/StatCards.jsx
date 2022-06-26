import React, { useEffect, useState } from 'react'
import { Grid, Card, Icon, Container, } from '@mui/material'
import { Box, styled } from '@mui/system'
import { H1, Small } from 'app/components/Typography'
import { getSurveys } from 'app/services/surveys'
import { SimpleCard } from 'app/components'

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '24px !important',
  background: theme.palette.background.paper,
  [theme.breakpoints.down('sm')]: {
    padding: '16px !important',
  },
}))

const ContentBox = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  '& small': {
    color: theme.palette.text.secondary,
  },
  '& .icon': {
    fontSize: '44px',
    color: theme.palette.primary.main,
  },
}))

const StatCards = () => {
  const [surveys, setSurveys] = useState([])
  const [satisfaction, setSatisfaction] = useState(0)

  useEffect(() => {
    let mounted = true

    getSurveys()
      .then(data => {
        if (mounted) {
          setSurveys(data)
          let satisfy = data.reduce((a, data) => a + data.satisfaction, 0) / data.length
          setSatisfaction(satisfy)
        }
      })

    return () => mounted = false
  }, [])

  return (
    <Container>
      <SimpleCard title='Link Survey' elevation={6}>
        golapasbwi.herokuapp.com/survey
      </SimpleCard>
    <Grid style={{marginTop: "1%"}} container spacing={3} sx={{ mb: '24px' }}>
      <Grid item xs={12} md={6}>
        <StyledCard elevation={6}>
          <ContentBox>
            <Icon className="icon">group</Icon>
            <Box ml="12px">
              <Small>Total Survey</Small>
              <H1>{surveys.length}</H1>
            </Box>
          </ContentBox>
        </StyledCard>
      </Grid>

      <Grid item xs={12} md={6}>
        <StyledCard elevation={6}>
          <ContentBox>
            <Icon className="icon">percent</Icon>
            <Box ml="12px">
              <Small>Rata-Rata Persentase Kepuasan</Small>
              <H1>{satisfaction}</H1>
            </Box>
          </ContentBox>
        </StyledCard>
      </Grid>
    </Grid>
    </Container>
  )
}

export default StatCards
