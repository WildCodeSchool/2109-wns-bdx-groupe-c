import { useCallback, useEffect, useMemo, useState } from "react"
import { useParams } from "react-router-dom";
import { useMutation, ApolloError, useQuery } from "@apollo/client";

import AddCircleIcon from '@mui/icons-material/AddCircle';
import { TextField, Box, Button, Card, CardContent, CircularProgress, Chip, Stack, TextareaAutosize } from '@mui/material'
import makeStyles from "@mui/styles/makeStyles";
import { Typography, InputLabel } from "@mui/material";

import { GET_ONE_PROJECT, MUTATION_UPDATE_PROJECT_INFORMATIONS } from "../../queries/project"
import { Project } from "../../entities/project";
import { ExceptionGraphQL } from '../../entities/error';
import useToast from '../../contexts/useToast';
import ModalUpdateProjectLanguages from './Project/ModalUpdateLanguages';

const useStyles = makeStyles({
    mainContainer: {
        backgroundColor: '#061B2E',
        margin: '0',
        minHeight: '100vh',
        padding: '25px',
      },
    card: {
        minHeight: '275px',
        backgroundColor: '#0f4473',
        marginTop: '25px',
        marginLeft: '100px',
        height: 'auto',
        maxWidth: '40%',
    },
    containerField: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '1rem',
        "& .MuiInput-root": {
            color: 'white',
        },
        "& .MuiInput-root::before": {
            borderColor: 'white',
        },
        "& .MuiInput-root:hover::before": {
            borderColor: '#1F84E1',
        },
        "& .MuiFormLabel-root": {
            color: "white",
            fontWeight: '700',
        },
        "& .MuiTextField-root": {
            marginBottom: '1rem',
        }
    },
    boxTitle: {
        width: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '2rem',
    },
    boxsubTitle: {
        width: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '2rem',
        marginTop: '2rem',
    },
    taskPaper: {
        maxWidth: '100%',
        minHeight: '70px',
        padding: '0',
        margin: '10px 0',
    },
    textField: {
      paddingBottom: '1rem',
    },
    texFieldError: {
      "& .MuiInput-root::before": {
        borderColor: 'red',
      },
    },
    fieldError: {
      color: 'red',
      fontSize: '0.8rem',
    },
    buttonValidation: {
      backgroundColor: '#1F84E1',
      color: 'white',
      '&:hover': {
        backgroundColor: '#145591',
      },
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'center',
    },
    chipLanguage: {
        color: 'white',
        fontWeight: '700',
        borderColor: 'white',
    },
    addLanguage: {
        color: 'green',
        borderColor: 'green',

    },
    textareaLabel: {
        marginBottom: '.5rem',
        fontWeight: '700',
        fontSize: '.8rem',
        lineHeight: '1.4375em'
    },
    textarea: {
        width: '100%',
        marginBottom: '2rem',
        borderRadius: '8px',
        borderColor: '#fff',
        padding: '.5rem',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        color: '#fff',
        lineHeight: '1.4'
    }
})

interface UseParamProps {
    id: string,
  }

const ProjectInfo = () => {
    const { id } = useParams<UseParamProps>();
    const { showToast } = useToast();
    const [name, setName] = useState<string>('');
    const [shortText, setShortText] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [initialTimeSpent, setInitialTimeSpent] = useState<number>(0);
    const [error, setError] = useState<ApolloError | null>(null)

    const [showModalLanguage, setShowModalLanguage] = useState<boolean>(false);
    const toggleModalLanguage = useCallback(() => {
        setShowModalLanguage(!showModalLanguage)
    }, [showModalLanguage, setShowModalLanguage])

    const [updateProjectInformations] = useMutation(MUTATION_UPDATE_PROJECT_INFORMATIONS);

    const { data, loading } = useQuery(GET_ONE_PROJECT, {
        variables: {
            projectId: parseInt(id, 10)
        }
    })
    const classes = useStyles()

    const project: Project | null = useMemo(() => {
        if (data) return data.project;
        return null
    }, [data])

    useEffect(() => {
        if (project) {
            setName(project.name)
            setShortText(project.shortText)
            setDescription(project.description)
            setInitialTimeSpent(project.initialTimeSpent)
        }
    }, [
        project,
        setName,
        setShortText,
        setDescription,
        setInitialTimeSpent,
    ]);

    const handleUpdateInformation = useCallback(async (e: React.MouseEvent<HTMLButtonElement, MouseEvent> ) => {
        e.preventDefault()
        if (project) {
            try {
              await updateProjectInformations({
                variables: {
                  updateProjectId: parseInt(id, 10),
                  name,
                  shortText,
                  description,
                  initialTimeSpent,
                },
                refetchQueries: [{
                  query: GET_ONE_PROJECT,
                  variables: {
                      projectId: parseInt(id, 10)
                  }
                }]
              });
              showToast('success', 'Informations of the project updated !');
            } catch (error) {
              setError(error as ApolloError)
            }
        }
        }, [shortText, name, description, initialTimeSpent, updateProjectInformations, setError]);
    const errorProps = useMemo(() => {
        const errorFormatted: {[key:string]: string} = {};
        if (error) {
          if (error.graphQLErrors && error.graphQLErrors.length > 0) {
            const graphQLErrors = error.graphQLErrors;
            const extentions = graphQLErrors[0].extensions;
            const exceptions = extentions.exception as ExceptionGraphQL;
            const validationErrors = exceptions.validationErrors;
            validationErrors.forEach((validationError) => {
              const property: string = validationError.property;
              const message: string = validationError.constraints[Object.keys(validationError.constraints)[0]];
              errorFormatted[property] = message;
            });
            return errorFormatted;
          }
          return errorFormatted
        } else {
          return errorFormatted
        }
      }, [error])

    return (
        <>
            { loading && (
                 <CircularProgress />
            )}
            { !loading && project && (
                <>
                    <Card className={classes.card} sx={{
                        borderRadius: '20px'
                        }}>
                        <CardContent sx={{ backgroundColor: '#0f4473'}}>
                            <Box className={classes.boxTitle} >
                                <Typography variant="h2" sx={{ fontSize: '28px', color: 'white', fontWeight: 'bold'}}>
                                    Update the project
                                </Typography>
                            </Box>
                            <Box className={classes.boxTitle} >
                                <Typography variant="h3" sx={{ fontSize: '20px', color: 'white', fontWeight: 'bold'}}>
                                    Update the information of the project
                                </Typography>
                            </Box>
                            <Box className={classes.containerField}>
                                <TextField
                                    id="name"
                                    type="text"
                                    label="Name of the project"
                                    variant="standard"
                                    value={name}
                                    className={errorProps?.name ? classes.texFieldError : classes.textField}
                                    onChange={(event) => setName(event.target.value)}
                                    sx={{ width: 'fit-content' }}
                                />
                                {errorProps?.name && <Box className={classes.fieldError}>{errorProps.name}</Box>}
                                <TextField
                                    id="shortText"
                                    type="text"
                                    label="Short Text"
                                    variant="standard"
                                    value={shortText}
                                    className={errorProps?.shortText ? classes.texFieldError : classes.textField}
                                    onChange={(event) => setShortText(event.target.value)}
                                    sx={{ width: 'fit-content' }}
                                />
                                {errorProps?.shortText && <Box className={classes.fieldError}>{errorProps.shortText}</Box>}
                                <Typography className={classes.textareaLabel}>Description</Typography>
                                <TextareaAutosize
                                    id="description"
                                    aria-label="empty textarea"
                                    placeholder="Empty"
                                    minRows={5}
                                    value={description}
                                    className={classes.textarea}
                                    onChange={(event) => setDescription(event.target.value)}
                                />
                                {errorProps?.description && <Box className={classes.fieldError}>{errorProps.description}</Box>}
                                <TextField
                                    id="initialTimeSpent"
                                    type="number"
                                    label="Expected Duration in hours"
                                    variant="standard"
                                    value={initialTimeSpent}
                                    className={errorProps?.initialTimeSpent ? classes.texFieldError : classes.textField}
                                    onChange={(event) => setInitialTimeSpent(parseFloat(event.target.value))}
                                    sx={{ width: 'fit-content',}}
                                />
                                {errorProps?.initialTimeSpent && <Box className={classes.fieldError}>{errorProps.initialTimeSpent}</Box>}
                            </Box>
                            <Box className={classes.buttonContainer}>
                                <Button
                                    onClick={(e) => handleUpdateInformation(e)}
                                    className={classes.buttonValidation}
                                >
                                    Save the modifications
                                </Button>
                            </Box>
                            <Box className={classes.boxsubTitle} >
                                <Typography variant="h3" sx={{ fontSize: '20px', color: 'white', fontWeight: 'bold'}}>
                                    Update Languages associated to the project
                                </Typography>
                            </Box>
                            <Box>
                                <Stack direction="row" spacing={1}>
                                {project.languages.map((language) => {
                                    const {name} = language;
                                    return (
                                        <Chip label={name} color="primary" variant="outlined" className={classes.chipLanguage}/>
                                    )
                                })}
                                <Chip
                                    onClick={toggleModalLanguage}
                                    icon={<AddCircleIcon/>}
                                    label="Update languages"
                                    color="primary"
                                    variant="outlined"
                                    className={classes.chipLanguage}
                                />
                                </Stack>
                            </Box>
                        </CardContent>
                    </Card>
                    <ModalUpdateProjectLanguages
                        project={project}
                        showModal={showModalLanguage}
                        toggleModal={toggleModalLanguage}
                    />
                </>
                )
            }
        </>
    )

}

export default ProjectInfo