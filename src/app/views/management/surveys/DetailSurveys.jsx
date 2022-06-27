import {
  IconButton,
  Icon,
  Radio,
} from '@mui/material'
import React from 'react'
import { SimpleCard } from 'app/components'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';

const DetailSurvey = (survey) => {
  const [open, setOpen] = React.useState(false)
  const [satisfaction, setSatisfaction] = React.useState(0)

  function handleClose() {
    setOpen(false)
  }

  const handleOpen = (survey) => {
    let sumSatisfaction = 0

    survey.Answers.forEach(answer => {
      sumSatisfaction += parseInt(answer.answer)
    })

    setSatisfaction(parseInt(sumSatisfaction / 45 * 100))
    setOpen(true)
  }

  return (
    <div onError={() => null}>
      <IconButton onClick={() => handleOpen(survey.survey)}>
        <Icon color="error">info</Icon>
      </IconButton>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <AppBar color="error" sx={{ position: 'relative' }}>
          <Toolbar>
            <Typography sx={{ ml: 15, flex: 1 }} variant="h6" component="div">
              {survey.survey.name} - {satisfaction} %
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              <CloseIcon />
            </Button>
          </Toolbar>
        </AppBar>
        {survey.survey.Answers
          .map((answer, index) => (
            <List margin="normal">
              <div style={{padding: "1%", paddingLeft: "10%", paddingRight: "10%"}}>
                <SimpleCard title={`${index+1}. ${answer.Question.question}`}>
                  <div style={{paddingLeft: "5%"}}>
                    Tidak Setuju
                    <Radio
                      color="error"
                      checked={answer.answer === '1'}
                      value="1"
                      name="radio-button-demo"
                      inputProps={{ 'aria-label': '1' }}
                    />
                    <Radio
                      color="error"
                      checked={answer.answer === '2'}
                      value="2"
                      name="radio-button-demo"
                      inputProps={{ 'aria-label': '2' }}
                    />
                    <Radio
                      color="error"
                      checked={answer.answer === '3'}
                      value="3"
                      name="radio-button-demo"
                      inputProps={{ 'aria-label': '3' }}
                    />
                    <Radio
                      color="error"
                      checked={answer.answer === '4'}
                      value="4"
                      name="radio-button-demo"
                      inputProps={{ 'aria-label': '4' }}
                    />
                    <Radio
                      color="error"
                      checked={answer.answer === '5'}
                      value="5"
                      name="radio-button-demo"
                      inputProps={{ 'aria-label': '5' }}
                    />
                      Sangat Setuju
                    </div>
                  </SimpleCard>
                </div>
              </List>
          ))}
      </Dialog>
    </div>
  )
}

export default DetailSurvey
