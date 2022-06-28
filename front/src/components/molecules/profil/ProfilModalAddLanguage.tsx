import { useState, useCallback, useEffect } from 'react';
import {makeStyles} from "@mui/styles"
import { Theme } from '@mui/material/styles'
import { TextField, Button, Box, Typography } from '@mui/material'
import { useMutation, ApolloError, useQuery } from "@apollo/client";
import Select, {SingleValue, ActionMeta} from 'react-select'

import { ALL_LANGUAGES, MY_LANGUAGES, ADD_LANGUAGE_TO_ME  } from '../../../queries/language';
import { AddLanguageToMe, MyLanguages, Language, Languages, Languages_languages, MyLanguages_MyLanguages } from '../../../entities/language';

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
    formSelect: {

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

  const [name, setName] = useState<string>('');
  const [rating, setRating] = useState<string>('0');
  const [error, setError] = useState<ApolloError | null>(null)

  const [addLanguage] = useMutation(ADD_LANGUAGE_TO_ME);

  const { loading: allLanguagesLoading, data: allLanguagesData } = useQuery<Language[]>(ALL_LANGUAGES);
  const { loading: myLanguagesLoading, data: myLanguagesData } = useQuery(MY_LANGUAGES);

  const [ optionSelected, setOptionSelected ] = useState<Option | null>(null)
  const [ options, setOptions ] = useState<Option[]>([])

  const handleChange = (newValue: SingleValue<Option>, actionMeta: ActionMeta<Option>) : void => {
    setOptionSelected(newValue)
  }

  useEffect(() => {
    if (allLanguagesData && options.length === 0) {

      const filteredLanguages = Object.values<any>(allLanguagesData);
      const filteredMyLanguages = Object.values<any>(myLanguagesData);

      filteredLanguages[0].forEach((allLanguage: any) => {
        filteredMyLanguages[0].forEach((myLanguage: any) => {
          if (myLanguage.language.name == allLanguage.name ) {
            filteredLanguages.splice(allLanguage.id -1, 1);
          }
        })
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

    const languageId = 1; 

    try {
      console.log('==> TRY')
      addLanguage({
        variables: {languageId, rating },
        refetchQueries: [{
          query: MY_LANGUAGES,
        }]
      });
    } catch {
      console.log('==> CATCH ERROR !')
      setError(error as ApolloError)
    }
  }, [rating, name]);

  return (
    <Box className={classes.container}>
        <Typography className={classes.title} variant="h6" component="h2">
        Add language
        </Typography>
        <Box className={classes.form}>
          <Box className={classes.formSelect}>
            <Select options={options} onChange={handleChange} value={optionSelected}/>
          </Box>
            {/* <TextField
                id="Language"
                className={classes.input}
                type="text"
                label="Language"
                value={name}
                onChange={(event) => setName(event.target.value)}
                /> */}
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