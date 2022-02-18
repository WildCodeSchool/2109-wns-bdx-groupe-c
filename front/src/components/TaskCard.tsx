import CardContent from '@mui/material/CardContent'
import Card from '@mui/material/Card'
import { makeStyles } from '@mui/styles'
import { gql, useQuery } from '@apollo/client'

const useStyles = makeStyles({})

const GET_TASKS = gql`
  query Tasks {
    tasks {
      id
      subject
      shortText
      description
      createdAt
      updatedAt
      dueDate
      expectedDuration
      spentTime
      status {
        name
      }
      assignee {
        firstName
      }
      project {
        name
      }
    }
  }
`

const TaskCard = () => {
  const { loading, data } = useQuery(GET_TASKS)
  const classes = useStyles()

  console.log({ loading })
  console.log({ data })
  return (
    <Card>
      <CardContent></CardContent>
    </Card>
  )
}

export default TaskCard
