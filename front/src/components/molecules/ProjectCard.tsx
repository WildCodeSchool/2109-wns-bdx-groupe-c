import { gql, useQuery } from "@apollo/client"
import  Paper  from "@mui/material/Paper"

import  Box  from "@mui/material/Box"
import  Card  from "@mui/material/Card"
import  CardActionArea from "@mui/material/CardActionArea"
import  CardContent  from "@mui/material/CardContent"
import  Typography  from "@mui/material/Typography"

import { makeStyles } from "@mui/styles"

import MoreMenu from "../atoms/MoreMenu"

const useStyles = makeStyles({
    card: {
        maxHeight: '275px',
        backgroundColor: '#7273FF',
        marginTop: '25px',
    },
    projectPaper: {
      maxWidth: '400px',
      minHeight: '175px',
      padding: '0',
      margin: '10px 0',
      backgroundColor: '#7273FF',
    },
    projectActionArea: {
      maxWidth: '400px',
      minHeight: '175px',
    },
    projectCardName: {
      fontSize: '17px !important',
    },
    boxTitle: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
})

const GET_PROJECTS = gql`
query Query($userId: Int!) {
    myProjects(userId: $userId) {
      id
      user {
        firstName
        lastName
      }
      project {
        name
        shortText
      }
      projectRole {
        name
      }
    }
  }
`

interface Props {
    userId: number
  }

interface MyProject {
  id: number,
  user: User,
  project: Project, 
  projectRole: ProjectRole
}

interface User {
  firstName: string
  lastName: string
}

interface Project {
  name: string
  shortText: string
}

interface ProjectRole {
  name: string
}

const ProjectCard = ({ userId = 3 }: Props) => {
    const { loading, data, error } = useQuery(GET_PROJECTS, { variables: { userId } })
    const classes = useStyles()

    console.log('error', error)
    console.log('loading', loading)
    console.log('data', data)

    return (
        <Card className={classes.card} sx={{borderRadius: '20px'}}>
            <CardContent sx={{ backgroundColor: '#0F4473'}}>
              <Box className={classes.boxTitle}>
                <Typography variant="h2" sx={{ fontSize: '28px' }}>
                Projects
                </Typography>
                <MoreMenu options={['Ajouter une tâche']}/>
              </Box>
                {data?.myProjects.map((project: MyProject) => {
                  return (
                      <Paper key={project.id} className={classes.projectPaper}>
                        <CardActionArea sx={{ borderRadius: '5px' }} className={classes.projectActionArea}>
                          <Box padding="15px">
                            <Typography fontWeight="bold" className={classes.projectCardName}>
                              {project.project.name}
                            </Typography>
                            <Typography>{project.project.shortText}</Typography>
                            <Typography variant="h4">{project.user.firstName}</Typography>
                          </Box>
                        </CardActionArea>
                      </Paper>
                  )
                })}
            </CardContent>
        </Card>
    )
}

export default ProjectCard
