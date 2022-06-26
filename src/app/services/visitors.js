import axios from 'axios.js'
import endpoint from "app/api/endpoint"


export const postVisitors = async (survey) => {
  const response = await axios.post(endpoint.surveys.root, {
    name: survey.firstName,
    description: survey.description,
    birthPlace: '',
    birth: survey.date,
    age: 0,
    address: survey.address,
    phone: survey.phone,
  })
  
  return response.data.data
}

export const getVisitors = async () => {
  const response = await axios.get(endpoint.surveys.root)

  return response.data.data
}

export const getVisitor = async (id) => {
  const response = await axios.get(endpoint.surveys.root + '/' + id)

  return response.data.data
}

export const putVisitor = async (survey) => {
  const response = await axios.put(endpoint.surveys.root + '/' + survey.id, {
    name: survey.firstName,
    description: survey.description,
    birthPlace: survey.birthPlace,
    birth: survey.date,
    age: survey.age,
    address: survey.address,
    phone: survey.phone,
  })

  return response.data.data
}

export const delVisitor = async (id) => {
  const response = await axios.delete(endpoint.surveys.root + '/' + id)

  return response.data.data
}