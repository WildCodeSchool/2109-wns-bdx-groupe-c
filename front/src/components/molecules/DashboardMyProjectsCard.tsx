import { useQuery } from "@apollo/client"
import { useHistory } from 'react-router-dom';

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
  cardContainer: {
    backgroundColor: '#0F4473',
    display: 'flex',
    flexWrap: 'wrap',
  },
  card: {
    marginTop: '25px',
  },
  projectPaper: {
    borderRadius: '30px',
    maxWidth: '430px',
    marginRight: '2rem',
    marginBottom: '2rem',
  },
  projectActionArea: {
    maxWidth: '430px',
    minWidth: '430px',
    minHeight: '175px',
    borderRadius: '30px',
    padding: '1rem 1rem 1rem 2rem',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
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


const DashboardMyProjectsCard = () => {
    const { loading, data, error } = useQuery(GET_MY_PROJECTS)
    const history = useHistory();
    const classes = useStyles()

    return (
        <Card className={classes.card} sx={{borderRadius: '20px'}}>
            <CardContent className={classes.cardContainer}>
              <Box className={classes.boxTitle} >
                <Typography variant="h2" sx={{ fontSize: '28px', color: 'white', fontWeight: 'bold'}}>
                  My Projects
                </Typography>
                <MoreMenu options={['Add a Task']} onClick={()=>console.log("click")}/>
              </Box>
                {data?.myProjects.map((myProject: MyProject) => {
                  const{ id, project } = myProject
                  const {name, shortText, countAssignee, languages} = project
                  return (
                      <Paper key={id} className={classes.projectPaper}>
                        <CardActionArea sx={{ borderRadius: '30px' }} className={classes.projectActionArea} onClick={() => history.push(`/project/${id}/tasks`)}>
                          <Box padding="15px">
                            <Typography fontWeight="bold" className={classes.projectCardName}>
                              {name}
                            </Typography>
                            <Typography>{shortText}</Typography>
                            <Box className={classes.projectUserElements}>
                              <PersonIcon />
                              <Typography>{countAssignee <= 1 ? countAssignee + ' utilisateur' : countAssignee + ' utilisateurs'}</Typography>
                            </Box>
                            <Box className={classes.projectLanguagesElement}>
                              <LibraryBooksIcon />
                              {languages.map((language: Language) => {
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
