import { useQuery } from "@apollo/client"

import  Box  from "@mui/material/Box"
import  Card  from "@mui/material/Card"
import  CardActionArea from "@mui/material/CardActionArea"
import  CardContent  from "@mui/material/CardContent"
import  Paper  from "@mui/material/Paper"
import  Typography  from "@mui/material/Typography"

import  LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import  PersonIcon from '@mui/icons-material/Person';

import { makeStyles } from "@mui/styles"

import MoreMenu from "../atoms/MoreMenu"

import { GET_MY_PROJECTS }  from "../../queries/project"
import { Language } from "../../entities/language"
import { MyProject } from "../../entities/project"

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
    projectUserElements: {
      display: 'flex',
      alignItems: 'center',
    },
    projectLanguagesElement: {
      display: 'flex',
      alignItems: 'center',
    }
})

interface Props {
    userId: number
  }


const DashboardMyProjectsCard = ({ userId = 3 }: Props) => {
    const { loading, data, error } = useQuery(GET_MY_PROJECTS, { variables: { userId } })
    const classes = useStyles()

    console.log('error', error)
    console.log('loading', loading)
    console.log('data', data)

    return (
        <Card className={classes.card} sx={{borderRadius: '20px'}}>
            <CardContent sx={{ backgroundColor: '#0F4473'}}>
              <Box className={classes.boxTitle}>
                <Typography variant="h2" sx={{ fontSize: '28px', color: 'white', fontWeight: 'bold'}}>
                Projects
                </Typography>
                <MoreMenu options={['Ajouter une tâche']}/>
              </Box>
                {data?.myProjects.map((myProject: MyProject) => {
                  return (
                      <Paper key={myProject.id} className={classes.projectPaper}>
                        <CardActionArea sx={{ borderRadius: '5px' }} className={classes.projectActionArea}>
                          <Box padding="15px">
                            <Typography fontWeight="bold" className={classes.projectCardName}>
                              {myProject.project.name}
                            </Typography>
                            <Typography>{myProject.project.shortText}</Typography>
                            <Box className={classes.projectUserElements}>
                              <PersonIcon />
                              <Typography>{myProject.project.countAssignee <= 1 ? myProject.project.countAssignee + ' utilisateur' : myProject.project.countAssignee + ' utilisateurs'}</Typography>
                            </Box>
                            <Box className={classes.projectLanguagesElement}>
                              <LibraryBooksIcon />
                              {myProject.project.languages.map((language: Language) => {
                                return (
                                  <>
                                    <Typography sx={{marginRight: '5px'}} key={language.id} component='p'>{language.name}</Typography>
                                  </>
                                )
                              })}
                            </Box>
                          </Box>
                        </CardActionArea>
                      </Paper>
                  )
                })}
            </CardContent>
        </Card>
    )
}

export default DashboardMyProjectsCard
