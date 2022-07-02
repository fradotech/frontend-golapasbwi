import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Container,
  Typography,
  Autocomplete,
  CircularProgress
} from '@mui/material'
import { useEffect, useState } from 'react'
import { SimpleCard } from 'app/components'
import List from '@mui/material/List';
import { getQuestions, postSurveys } from 'app/services/surveys';
import { styled } from '@mui/system';
import { Send } from '@mui/icons-material';
import { ValidatorForm } from 'react-material-ui-form-validator';

const disuruh = 'Sebelum menjawab survei ini, apakah ada pegawai/pejabat pada unit layanan ini yang mengarahkan Bapak/Ibu untuk memberikan jawaban yang bagus-bagus/baik-baik saja? (Ya/Tidak)'

const IMG = styled('img')(() => ({
  width: '100%',
}))

const StyledProgress = styled(CircularProgress)(() => ({
  position: 'absolute',
  top: '6px',
  left: '25px',
}))

const ages = [
  { label: '20-' },
  { label: '21-40' },
  { label: '41-60' },
  { label: '60+' },
]

const jobs = [
  { label: "Pelajar/Mahasiswa" },
  { label: "Pegawai Negeri" },
  { label: "Pegawai Swasta" },
  { label: "TNI/Polri" },
  { label: "Wiraswasta" },
  { label: "Lainnya" },
]

const CreateSurveys = () => {
  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState([])
  const [message, setMessage] = useState('')
  const [age, setAge] = useState('')
  const [job, setJob] = useState('')
  const [survey, setSurvey] = useState({
    name: '',
    suggestion: '',
    address: '',
    age,
    job,
    disuruh: '',
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
    setLoading(true)
    try {
      survey.age = age.label
      survey.job = job.label
      await postSurveys(survey)
      alert('Berhasil membuat survey', message)
      window.location.reload();
    } catch (e) {
      console.log(e)
      setMessage(e.message)
      setLoading(false)
    }
  }

  return (
    <Container onError={() => null} style={{ padding: "3%" }}>
      <IMG
        src="/assets/images/banner/survey.jpg"
        alt=""
      />
      <ValidatorForm>
        <FormControl>

          <TextField style={{ margin: "1%" }} id="outlined-required" color='error' required label="Nama" name='name' onChange={handleChange} value={survey.name} />
          <TextField style={{ margin: "1%" }} id="outlined-required" color='error' required label="Alamat" name='address' onChange={handleChange} value={survey.address} multiline rows={4} />
          <Autocomplete
            value={age}
            onChange={(event, newValue) => {
              setAge(newValue);
            }}
            color='error'
            disablePortal
            style={{ margin: "1%" }}
            id="combo-box-demo"
            options={ages}
            renderInput={(params) => <TextField {...params} label="Usia" />}
          />
          <Autocomplete
            value={job}
            onChange={(event, newValue) => {
              setJob(newValue);
            }}
            color='error'
            disablePortal
            style={{ margin: "1%" }}
            id="combo-box-demo"
            options={jobs}
            renderInput={(params) => <TextField {...params} label="Pekerjaan" />}
          />

          {questions
            .map((question, index) => (
              <List margin="normal">
                <div>
                  <SimpleCard title={`${index + 1}. ${question.question}`}>
                    <div style={{ padding: "1%", paddingLeft: "2%" }}>
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

          <SimpleCard title={disuruh}>
            <div style={{ padding: "1%", paddingLeft: "2%" }}>
              <FormLabel id="demo-row-radio-buttons-group-label"></FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                required='true'
              >
                <FormControlLabel name='disuruh' onChange={handleChange} value='Ya' control={<Radio required={true} color='error' />} label="Ya" />
                <FormControlLabel name='disuruh' onChange={handleChange} value='Tidak' control={<Radio required={true} color='error' />} label="Tidak" />
              </RadioGroup>
            </div>
          </SimpleCard>

          <TextField style={{ margin: "1%" }} id="outlined-required" color='error' required label="Masukan" multiline rows={4} name='suggestion' onChange={handleChange} value={survey.suggestion} />

          <Button
            style={{ margin: "1%", padding: "1%", marginTop: "1%" }}
            startIcon={<Send />}
            onClick={handleSubmit}
            color="error"
            variant="contained"
            type="submit"
            disabled={loading}
          >
            <Typography>KIRIM</Typography>
          </Button>
          {loading && (
            <StyledProgress
              size={24}
              className="buttonProgress"
            />
          )}
        </FormControl>
      </ValidatorForm>
    </Container>
  )
}

export default CreateSurveys
