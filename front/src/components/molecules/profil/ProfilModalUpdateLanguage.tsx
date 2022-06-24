import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {makeStyles} from "@mui/styles"
import { Theme } from '@mui/material/styles'

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        maxWidth: '800px',
        padding: '1rem',
        backgroundColor: '#0c355b',
        borderRadius: '6px',
        boxShadow: '2px 4px 8px rgba(0,0,0,.4)',
    },
    title: {
        marginBottom: '1rem',
        fontWeight: 'bold',
        color: '#fff',
    }
}))

export default function ProfilModalUpdateLanguage() {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
        <Typography className={classes.title} variant="h6" component="h2">
        Update languages
        </Typography>
        <Typography className={classes.title} component="p">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas nemo totam consequatur modi unde autem, velit dolorem culpa, quo, iusto perspiciatis minima doloremque ex adipisci aliquid alias mollitia accusamus dolore.em
        </Typography>
    </Box>
  );
}