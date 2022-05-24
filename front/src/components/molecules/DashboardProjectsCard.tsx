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

import { GET_ALL_PROJECTS }  from "../../queries/project"
import { Language } from "../../entities/language"
import { Project } from "../../entities/project"

const useStyles = makeStyles({
    card: {
        minHeight: '275px',
        backgroundColor: '#7273FF',
        marginTop: '25px',
        height: 'auto',
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


const DashboardProjectsCard = () => {
    const { loading, data, error } = useQuery(GET_ALL_PROJECTS)
    const history = useHistory();
    const classes = useStyles()

    return (
        <Card className={classes.card} sx={{borderRadius: '20px'}}>
            <CardContent sx={{ backgroundColor: '#0F4473'}}>
              <Box className={classes.boxTitle} >
                <Typography variant="h2" sx={{ fontSize: '28px', color: 'white', fontWeight: 'bold'}}>
                All Projects
                </Typography>
                <MoreMenu options={['Ajouter une tâche']} onClick={()=>console.log("click")}/>
              </Box>
                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: 1
                    }}>
                    {data?.projects.map((project: Project) => {
                    const {id, name, shortText, languages, countAssignee} = project
                    return (
                        <Paper key={id} className={classes.projectPaper} onClick={() => history.push(`/project/${id}/infos`)}>
                            <CardActionArea sx={{ borderRadius: '5px' }} className={classes.projectActionArea}>
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
                </Box>
            </CardContent>
        </Card>
    )
}

export default DashboardProjectsCard
