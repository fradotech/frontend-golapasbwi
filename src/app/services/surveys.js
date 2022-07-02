import axios from 'axios.js'
import endpoint from "app/api/endpoint"


export const postSurveys = async (survey) => {
  let answers = [
    parseInt(survey.answers0),
    parseInt(survey.answers1),
    parseInt(survey.answers2),
    parseInt(survey.answers3),
    parseInt(survey.answers4),
    parseInt(survey.answers5),
    parseInt(survey.answers6),
    parseInt(survey.answers7),
    parseInt(survey.answers8),
  ]

  console.log(survey)

  const response = await axios.post(endpoint.surveys.root, {
    name: survey.name,
    suggestion: survey.suggestion,
    address: survey.address,
    age: survey.age,
    job: survey.job,
    disuruh: survey.disuruh,
    answers
  })
  
  return response.data.data
}

export const getSurveys = async () => {
  const response = await axios.get(endpoint.surveys.root)

  return response.data.data
}

export const getSurvey = async (id) => {
  const response = await axios.get(endpoint.surveys.root + '/' + id)

  return response.data.data
}
export const getQuestions = async (id) => {
  const response = await axios.get(endpoint.surveys.questions)

  return response.data.data
}

export const getStatistics = async () => {
  const response = await axios.get(endpoint.surveys.statistics)

  return response.data.data
}