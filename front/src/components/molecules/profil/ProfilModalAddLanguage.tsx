import { useState, useCallback } from 'react';
import {makeStyles} from "@mui/styles"
import { Theme } from '@mui/material/styles'
import { TextField, Button, Box, Typography } from '@mui/material'
import { useMutation, ApolloError, useQuery } from "@apollo/client";

import { createLanguageHelper, addLanguageToMeHelper } from '../../../helpers/LanguageHelper';
import { CREATE_LANGUAGE, ADD_LANGUAGE_TO_ME, MY_LANGUAGES } from '../../../queries/user';
import { ALL_LANGUAGES } from '../../../queries/language';
import { AddLanguageToMe } from '../../../entities/language';

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

export default function ProfilModalAddLanguage({openAddLanguage, toggleAddLanguageModal}: Props) {
  const classes = useStyles();

  const [name, setName] = useState<string>(createLanguageHelper.name);
  const [rating, setRating] = useState<string>('0');
  const [languageId, setLanguageId] = useState<number>(1);

  const [error, setError] = useState<ApolloError | null>(null)
  const [createLanguage] = useMutation(CREATE_LANGUAGE);
  const [addLanguage] = useMutation(ADD_LANGUAGE_TO_ME);
  const {loading, data} = useQuery(ALL_LANGUAGES);

  const handleCreation = useCallback(async (e: React.MouseEvent<HTMLButtonElement, MouseEvent> ) => {
    e.preventDefault()
    
    createLanguage({
      variables: { name },
      refetchQueries: [{
        query: ALL_LANGUAGES,
      }]
    })
    .then((res: any) => {
      let allLanguages = Object.entries<any>(data);
      
      if (res) {
        allLanguages[0][1].forEach((item: AddLanguageToMe) => {
          console.log('item ==>', item)
          if (item.id == languageId) {
            console.log('==> try to add')
            console.log('languageId ==>', typeof languageId)
            console.log('rating ==>', typeof rating)
            return addLanguage({
              variables: {languageId, rating },
              refetchQueries: [{
                query: MY_LANGUAGES,
              }]
            });
          } else {
            return false
          }
        })
      }
    })
    .catch((error: any) => {
      console.log('==> ERROR !')
      setError(error as ApolloError)
    })

  }, [rating, name]);

  return (
    <Box className={classes.container}>
        <Typography className={classes.title} variant="h6" component="h2">
        Add language
        </Typography>
        <Box className={classes.form}>
            <TextField
                id="Language"
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