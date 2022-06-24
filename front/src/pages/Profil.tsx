import Box from "@mui/material/Box"
import {makeStyles} from "@mui/styles"
import { Theme } from '@mui/material/styles'

import ProfilStatistiques from "../components/organisms/profil/ProfilStatistiques"
import ProfilInformations from "../components/organisms/profil/ProfilInformations"

const useStyles = makeStyles((theme: Theme) => ({
    masterContainer: {
        backgroundColor: '#061B2E',
        margin: '0',
        minHeight: '100vh',
        padding: '25px',
        marginLeft: '3rem',
        marginRight: '3rem',
        color: '#fff',
        marginTop: '64px',
        '@media screen and (max-width: 600px)': {
          marginTop: '54px',
        },
    },
}))

const Profil = () => {
    const classes = useStyles()

    return (
        <Box className={classes.masterContainer}>
            <ProfilInformations/>
            <ProfilStatistiques/>
        </Box>
    )
}

export default Profil