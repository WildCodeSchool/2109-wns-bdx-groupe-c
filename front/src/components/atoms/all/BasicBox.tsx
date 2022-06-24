import React from 'react'
import Box from "@mui/material/Box"
import {makeStyles} from "@mui/styles"
import { Theme } from '@mui/material/styles'
import Typography from '@mui/material/Typography';

const useStyles = makeStyles((theme: Theme) => ({
    box: {
        backgroundColor: '#0c355b',
        borderRadius: '6px',
        boxShadow: '2px 4px 8px rgba(0,0,0,.4)',
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: '0 1rem',
    },
    label: {
        padding: '.5rem 0',
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#fff',
    },
    value: {
        padding: '.5rem 0',
        marginTop: 0,
        fontSize: '17px',
        color: '#fff',
    }
}))

interface Props {
    label?: string
    value?: string | Number
}

const BasicBox: React.FC<Props> = (props: Props) => {
    const classes = useStyles()

    return (
        <Box className={classes.box}>
            <Box className={classes.container}>
                <Typography className={classes.label}>{props.label}</Typography>
                <Typography className={classes.value}>{props.value}</Typography>
            </Box>
        </Box>
    )
}

export default BasicBox