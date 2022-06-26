const baseUrl = 'https://api-golapasbwi.herokuapp.com/api/v1'

const endpoint = {
    auth: {
        register: baseUrl + '/auth/register',
        login: baseUrl + '/auth/login',
    },
    surveys: {
        root: baseUrl + '/surveys',
        questions: baseUrl + '/surveys/questions',
    }
}

export default endpoint