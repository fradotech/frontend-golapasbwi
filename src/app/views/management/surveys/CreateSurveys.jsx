import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Container,
  Typography
} from '@mui/material'
import { useEffect, useState } from 'react'
import { SimpleCard } from 'app/components'
import List from '@mui/material/List';
import { getQuestions, postSurveys } from 'app/services/surveys';
import { styled } from '@mui/system';
import { Send } from '@mui/icons-material';
import { ValidatorForm } from 'react-material-ui-form-validator';

const IMG = styled('img')(() => ({
  width: '100%',
}))

const CreateSurveys = () => {
  const [questions, setQuestions] = useState([])
  const [message, setMessage] = useState('')
  const [survey, setSurvey] = useState({
    name: '',
    suggestion: '',
    answers: [],
  })

  useEffect(() => {
    let mounted = true

    getQuestions()
      .then(data => {
        if (mounted) {
          setQuestions(data)
        }
      })

    return () => mounted = false
  }, [])

  const handleChange = ({ target: { name, value } }) => {
    let temp = { ...survey }
    temp[name] = value
    setSurvey(temp)
  }

  const handleSubmit = async () => {
    try {
      await postSurveys(survey)
      alert('Berhasil membuat survey', message)
      window.location.reload();
    } catch (e) {
      console.log(e)
      setMessage(e.message)
    }
  }

  return (
    <Container onError={() => null} style={{padding: "3%"}} onSubmit={handleSubmit}>
      <IMG
        src="/assets/images/banner/survey.jpg"
        alt=""
      />
      <ValidatorForm>
      <FormControl>
      <TextField style={{margin: "1%"}} id="outlined-required" color='error' required label="Nama" name='name' onChange={handleChange} value={survey.name} />
      {questions
        .map((question, index) => (
          <List margin="normal">
            <div>
              <SimpleCard title={`${index + 1}. ${question.question}`}>
                <div style={{padding: "1%", paddingLeft: "2%"}}>
                <FormLabel id="demo-row-radio-buttons-group-label"></FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    required='true'
                  >
                      <FormControlLabel name={`answers${index}`} onChange={handleChange} value={parseInt(1)} control={<Radio required={true} color='error' />} label="Tidak Setuju" />
                      <FormControlLabel name={`answers${index}`} onChange={handleChange} value={parseInt(2)} control={<Radio required={true} color='error' />} label="Kurang Setuju" />
                      <FormControlLabel name={`answers${index}`} onChange={handleChange} value={parseInt(3)} control={<Radio required={true} color='error' />} label="Cukup Setuju" />
                      <FormControlLabel name={`answers${index}`} onChange={handleChange} value={parseInt(4)} control={<Radio required={true} color='error' />} label="Setuju" />
                      <FormControlLabel name={`answers${index}`} onChange={handleChange} value={parseInt(5)} control={<Radio required={true} color='error' />} label="Sangat Setuju" />
                    </RadioGroup>
                  </div>
              </SimpleCard>
            </div>
          </List>
        ))}
        <TextField style={{margin: "1%"}} id="outlined-required" color='error' required label="Masukan" multiline rows={4} name='suggestion' onChange={handleChange} value={survey.suggestion} />
        <Button 
          style={{margin: "1%", padding: "1%"}}
          startIcon={<Send />}
          onClick={handleSubmit} 
          color="error" 
          variant="contained" 
          type="submit"
        >
          <Typography>KIRIM</Typography>
        </Button>
      </FormControl>
      </ValidatorForm>
    </Container>
  )
}

export default CreateSurveys
