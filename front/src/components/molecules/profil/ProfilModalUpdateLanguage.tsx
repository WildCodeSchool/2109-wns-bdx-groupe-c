import { useState, useCallback, useEffect } from 'react';
import {makeStyles} from "@mui/styles"
import { Theme, TextField, Button, Box, Typography, Rating, Stack } from '@mui/material'
import { useMutation, ApolloError } from "@apollo/client";

import { MY_LANGUAGES_LIGHT, UPDATE_USER_LANGUAGE_RATING } from '../../../queries/language';
import { Languages } from '../../../entities/language';
import useToast from '../../../contexts/useToast';

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        minWidth: '250px',
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
        display: 'none'
    },
    rating: {
        margin: '0 auto 2rem',
    },
}))

interface Props {
  openUpdateLanguage: boolean,
  toggleUpdateLanguageModal: () => void,
  userLanguage: Languages | null
}

export default function ProfilModalUpdateLanguage({openUpdateLanguage, toggleUpdateLanguageModal, userLanguage}: Props) {

  const classes = useStyles();
  const { showToast } = useToast();
  const [rating, setRating] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [updateRating] = useMutation<Languages>(UPDATE_USER_LANGUAGE_RATING);
  const [error, setError] = useState<ApolloError | null>(null)

  useEffect(() => {
    if (openUpdateLanguage && userLanguage) {
        setName(userLanguage.language.name)
        setRating(userLanguage.rating)
    }
  }, [openUpdateLanguage, userLanguage]);

  const handleCreation = useCallback(async (e: React.MouseEvent<HTMLButtonElement, MouseEvent> ) => {
    e.preventDefault();
    if (userLanguage && rating) {
        try {
            updateRating({
                variables: {
                    userLanguageId: parseInt(String(userLanguage.id), 10),
                    rating: parseFloat(rating),
                },
                refetchQueries: [{
                  query: MY_LANGUAGES_LIGHT,
                }]
            })
            showToast('success', 'Language updated with success !');
            toggleUpdateLanguageModal();
        } catch {
            setError(error as ApolloError)
        }
    }

  }, [userLanguage, rating]);

  if ( !userLanguage ) return null;

  return (
    <Box className={classes.container}>
        <Typography className={classes.title} variant="h6" component="h2">{userLanguage.language.name}</Typography>
        <Box className={classes.form}>
            {rating && name && (
                <>
                    <TextField
                        id="Rating"
                        className={classes.input}
                        type="number"
                        label="Rating"
                        value={parseFloat(rating)}
                    />
                    <Stack spacing={1}>
                        <Rating
                            name="language-update-rating"
                            className={classes.rating}
                            defaultValue={parseFloat(rating)}
                            precision={1}
                            size="large"
                            onChange={(event: any) => setRating(event.target.value)}
                        />
                    </Stack>
                </>

            )}
            <Button onClick={(e) => handleCreation(e)}>Update</Button>
        </Box>
    </Box>
  );
}