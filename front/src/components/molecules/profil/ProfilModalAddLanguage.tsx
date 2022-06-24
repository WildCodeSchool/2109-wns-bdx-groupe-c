import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import {makeStyles} from "@mui/styles"
import { Theme } from '@mui/material/styles'
import { TextField, Button, Modal, Box, Typography } from '@mui/material'
import { useMutation, ApolloError } from "@apollo/client";

import { emptyLanguage } from '../../../helpers/LanguageHelper';
import { ADD_LANGUAGE, MY_LANGUAGES } from '../../../queries/user';

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        maxWidth: '800px',
        padding: '1rem',
        backgroundColor: '#0c355b',
        borderRadius: '6px',
        boxShadow: '2px 4px 8px rgba(0,0,0,.4)',
    },
    title: {
        marginBottom: '2rem',
        fontWeight: 'bold',
        color: '#fff',
    },
    form: {
        display: 'flex',
        flexDirection: 'column'
    },
    input: {
        marginBottom: '2rem'
    },
}))

interface Props {
    openAddLanguage: boolean,
    toggleAddLanguageModal: () => void,
}

interface UseParamProps {
    id: string | undefined,
  };

export default function ProfilModalAddLanguage({openAddLanguage, toggleAddLanguageModal}: Props) {
  const classes = useStyles();

  const [name, setName] = useState<string>(emptyLanguage.language.name);
  const [rating, setRating] = useState<number|null>(emptyLanguage.rating);
  const [languageId, setLanguageId] = useState<number>(emptyLanguage.languageId);


  useEffect(() => {
    setName(emptyLanguage.language.name)
    setRating(emptyLanguage.rating)
  }, [openAddLanguage])

  const [error, setError] = useState<ApolloError | null>(null)
  const [addLanguage] = useMutation(ADD_LANGUAGE);

  const { id } = useParams<UseParamProps>();

  const handleCreation = useCallback(async (e: React.MouseEvent<HTMLButtonElement, MouseEvent> ) => {
    e.preventDefault()
    console.log('e :', name)
    try {
        console.log('try to add !!!!!!')
        await addLanguage({
          variables: {
            rating,
            language: {
                name
            },
            languageId: 0,
          },
          refetchQueries: [{
            query: MY_LANGUAGES,
          }]
        });
        toggleAddLanguageModal();
    } catch (error) {
        console.log('XXXXXX ERRORS XXXXXX')
        setError(error as ApolloError)
    }
  }, [rating, name]);

  return (
    <Box className={classes.container}>
        <Typography className={classes.title} variant="h6" component="h2">
        Add language
        </Typography>
        <Box className={classes.form}>
            <TextField
                id="languageName"
                className={classes.input}
                type="text"
                label="Language"
                value={name}
                onChange={(event) => setName(event.target.value)}
                />
            <TextField
                id="Rating"
                className={classes.input}
                type="number"
                label="Rating"
                value={rating}
                onChange={(event: any) => setRating(event.target.value)}
            />
            <Button onClick={(e) => handleCreation(e)}>Add</Button>
        </Box>
    </Box>
  );
}