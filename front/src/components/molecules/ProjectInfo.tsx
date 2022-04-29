import { useMemo } from "react"
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client"

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import makeStyles from "@mui/styles/makeStyles";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import { GET_ONE_PROJECT } from "../../queries/project"
import { Language } from "../../entities/language";
import { Project } from "../../entities/project";

const useStyles = makeStyles({
    mainContainer: {
        backgroundColor: '#061B2E',
        margin: '0',
        minHeight: '100vh',
        padding: '25px',
      },
    card: {
        minHeight: '275px',
        backgroundColor: '#7273FF',
        marginTop: '25px',
        height: 'auto',
    },
    boxTitle: {
        width: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    taskPaper: {
        maxWidth: '100%',
        minHeight: '70px',
        padding: '0',
        margin: '10px 0',
    }
})

interface UseParamProps {
    id: string,
  }

const ProjectInfo = () => {
    const { id } = useParams<UseParamProps>();
    const { data, loading } = useQuery(GET_ONE_PROJECT, {
        variables: {
            projectId: parseInt(id, 10)
        }
    })
    const classes = useStyles()

    const project: Project | undefined = useMemo(() => {
        if (data) return data.project;
    }, [data])

    return (
        <>
            { loading && (
                 <p>Loading...</p> 
            )} 
            { !loading && project && (
                <Card className={classes.card} sx={{
                    borderRadius: '20px'
                    }}>
                    <CardContent sx={{ backgroundColor: '#0F4473'}}>
                        <Box className={classes.boxTitle} >
                            <Typography variant="h2" sx={{ fontSize: '28px', color: 'white', fontWeight: 'bold'}}>
                                Informations
                            </Typography>
                        </Box>
                        <Box sx={{ 
                            display: 'grid', 
                            gridTemplateColumns: 'repeat(4, 1fr)',
                            gap: 1
                            }}>
                            <Paper className={classes.taskPaper}>
                                <Box padding="15px">
                                    <Typography fontWeight="bold">Nom du projet :</Typography>
                                    <Typography>{ project.name }</Typography>
                                </Box>
                            </Paper>
                            <Paper className={classes.taskPaper}>
                                <Box padding="15px">
                                    <Typography fontWeight="bold">Date de début :</Typography>
                                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                                        <AccessTimeIcon sx={{marginRight: '5px'}} />
                                        <Typography> { project.createdAt }</Typography>
                                    </Box>
                                </Box>
                            </Paper>
                            <Paper className={classes.taskPaper}>
                                <Box padding="15px">
                                    <Typography fontWeight="bold">Progression :</Typography>
                                    <Typography>{ project.initialTimeSpent }</Typography>
                                </Box>
                            </Paper>
                        </Box>
                        <Box sx={{ 
                            display: 'grid', 
                            gridTemplateColumns: 'repeat(2, 1fr)',
                            gap: 1
                            }}>
                            <Box>
                                <Paper className={classes.taskPaper}>
                                    <Box padding="15px">
                                        <Typography fontWeight="bold">Description :</Typography>
                                        <Typography>{ project.shortText }</Typography>
                                    </Box>
                                </Paper>
                                <Paper className={classes.taskPaper}>
                                    <Box padding="15px">
                                        <LibraryBooksIcon />
                                        <Box padding="15px" sx={{display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)'}}>
                                            {project.languages.map((language: Language) => {
                                                return (
                                                    <Typography key={language.id}>{language.name}</Typography>
                                                    )
                                                })}
                                        </Box>
                                    </Box>
                                </Paper>
                            </Box>
                            <Paper className={classes.taskPaper}>
                                <Box padding="15px">
                                    <Typography fontWeight="bold">Description longue :</Typography>
                                    <Typography>{ project.description } Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt autem, laudantium repellat quibusdam quo perferendis consequuntur maiores architecto inventore aperiam deserunt reprehenderit, ea, voluptatibus quia velit vel fugit culpa doloremque.
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit enim rem illo dicta aperiam, ea reiciendis officiis est nostrum molestiae corrupti magnam possimus tempore id totam ad facere dolor? Deleniti!
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni labore ipsum nisi nobis corrupti incidunt dolore, unde fugit, sequi, dolor nulla? Exercitationem maiores quo culpa sapiente perspiciatis error quisquam dolor.  </Typography>
                                </Box>
                            </Paper>
                        </Box>
                    </CardContent>
                </Card>
                )
            }
        </>
    )

}

export default ProjectInfo