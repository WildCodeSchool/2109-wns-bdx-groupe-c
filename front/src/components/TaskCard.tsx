import CardContent from '@mui/material/CardContent'
import Card from '@mui/material/Card'
// import { makeStyles } from '@mui/styles'
import { gql, useQuery } from '@apollo/client'

// const useStyles = makeStyles({})

const GET_TASKS = gql`
  query Project {
    projects {
      id
      name
      shortText
      description
      initialTimeSpent
      createdAt
      updatedAt
    }
  }
`;

const TaskCard = () => {
  const { loading, data, error } = useQuery(GET_TASKS)
  // const classes = useStyles()
  console.log('error', error);
  console.log('loading', loading);
  console.log('data', data);
  return (
    <Card>
      <CardContent></CardContent>
    </Card>
  )
}

export default TaskCard