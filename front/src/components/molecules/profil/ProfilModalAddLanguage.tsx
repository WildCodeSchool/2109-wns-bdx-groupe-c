import { useState, useCallback, useEffect } from 'react';
import {makeStyles} from "@mui/styles"
import { Theme, TextField, Button, Box, Typography, Rating, Stack } from '@mui/material'
import { useMutation, ApolloError, useQuery } from "@apollo/client";
import Select, {SingleValue, ActionMeta} from 'react-select'

import { ALL_LANGUAGES, MY_LANGUAGES, ADD_LANGUAGE_TO_ME  } from '../../../queries/language';
import { Language, Languages } from '../../../entities/language';
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
      display: 'none',
      marginBottom: '2rem'
    },
    rating: {
      margin: '0 auto 2rem',
    },
    formSelect: {
      marginBottom: '2rem',
      zIndex: '10',
      position: 'relative'
    },
}))

interface Props {
  openAddLanguage: boolean,
  toggleAddLanguageModal: () => void,
}

interface Option {
  label: string,
  value: string,
}

export default function ProfilModalAddLanguage({openAddLanguage, toggleAddLanguageModal}: Props) {

  const classes = useStyles();
  const { showToast } = useToast();

  const [name] = useState<string>('');
  const [rating, setRating] = useState<string | null>('0');
  const [error, setError] = useState<ApolloError | null>(null)

  const [addLanguage] = useMutation<Languages>(ADD_LANGUAGE_TO_ME);

  const { data: allLanguagesData } = useQuery<Language[]>(ALL_LANGUAGES);
  const { data: myLanguagesData } = useQuery(MY_LANGUAGES);

  const [ optionSelected, setOptionSelected ] = useState<Option | null>(null)
  const [ options, setOptions ] = useState<Option[]>([])

  const handleChange = (newValue: SingleValue<Option>, actionMeta: ActionMeta<Option>) : void => {
    setOptionSelected(newValue)
  }
  
  useEffect(() => {

    if (allLanguagesData && myLanguagesData && options.length === 0) {
      
      let filteredLanguages = Object.values<any>(allLanguagesData);
      let filteredMyLanguages = Object.values<any>(myLanguagesData);

      let yFilter = filteredMyLanguages[0].map((itemY: any) => { return itemY.language.name; });
      filteredLanguages = filteredLanguages[0].filter((itemX: any) => !yFilter.includes(itemX.name));

      filteredLanguages.map((allLanguage: any) => {
        options.push({
          value: String(allLanguage.id),
          label: allLanguage.name,
        })
      });
      setOptions(options);
    }

  }, [openAddLanguage, allLanguagesData, options, setOptions])

  const handleCreation = useCallback(async (e: React.MouseEvent<HTMLButtonElement, MouseEvent> ) => {
    e.preventDefault()

    if (rating && optionSelected) {
      try {
        addLanguage({
          variables: {
            languageId: parseInt(optionSelected.value),
            rating: parseFloat(rating),
          },
          refetchQueries: [{
            query: MY_LANGUAGES,
          }]
        });
        toggleAddLanguageModal();
        showToast('success', 'Language updated with success !');
      } catch {
        setError(error as ApolloError)
      }
    }

  }, [rating, name]);

  if ( !rating ) return null;

  return (
    <Box className={classes.container}>
        <Typography className={classes.title} variant="h6" component="h2">Add language</Typography>
        <Box className={classes.form}>
          <Box className={classes.formSelect}>
            <Select options={options} onChange={handleChange} value={optionSelected}/>
          </Box>
          <TextField
            id="Rating"
            className={classes.input}
            type="number"
            label="Rating"
            value={parseFloat(rating)}
          />
          <Stack spacing={1}>
            <Rating
              name="add-language-rating"
              className={classes.rating}
              defaultValue={parseFloat(rating)}
              precision={1}
              size="large"
              onChange={(event: any) => setRating(event.target.value)}
            />
          </Stack>
          <Button onClick={(e) => handleCreation(e)}>Add</Button>
        </Box>
    </Box>
  );
}