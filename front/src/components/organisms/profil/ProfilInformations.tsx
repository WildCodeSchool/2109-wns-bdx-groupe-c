import Box from "@mui/material/Box"
import {makeStyles} from "@mui/styles"
import { Theme } from '@mui/material/styles'
import { useQuery, useMutation } from "@apollo/client"

import { MY_PROFILE } from "../../../queries/user"

import BasicBox from "../../atoms/all/BasicBox"
import ProfilLanguages from "../../molecules/profil/ProfilLanguages";

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        display: 'grid',
        gridTemplateColumns: 'repeat(6, 1fr)',
        gridGap: '2rem',
        border: '1px solid #1F84E1',
        borderRadius: '18px',
        padding: '2rem',
        marginBottom: '4rem',
        '@media screen and (max-width: 1024px)': {
            gridTemplateColumns: 'repeat(4, 1fr)',
        },
        '@media screen and (max-width: 840px)': {
            gridTemplateColumns: 'repeat(3, 1fr)',
        },
        '@media screen and (max-width: 580px)': {
            gridTemplateColumns: 'repeat(2, 1fr)',
        },
    },
    profilTitle: {
        gridColumn: 1,
        gridRow: 1,
        margin: 0,
    },
    firstname: {
        gridRow: 2,
    },
    lastname: {
        gridRow: 2,
    },
    email: {
        gridRow: 2,
    },
    inscription: {
        gridRow: 2,
    },
    languages: {
        gridColumn: '1 / 4',
    },
}))

const ProfilInformations = () => {
    const classes = useStyles()

    const { data: dataProfil, loading: loadingProfil } = useQuery(MY_PROFILE)

    const createdAt = new Date(dataProfil.myProfile.createdAt);
    const inscriptionDate = createdAt.toLocaleDateString();

    return (
        <Box className={classes.container}>
            <h1 className={classes.profilTitle}>Profil</h1>
            {loadingProfil}
            {dataProfil &&
                <Box className={classes.firstname}>
                    <BasicBox label={'Firstname :'} value={dataProfil.myProfile.firstName}/>
                </Box>
            }
            {loadingProfil}
            {dataProfil &&
                <Box className={classes.lastname}>
                    <BasicBox label={'Lastname :'} value={dataProfil.myProfile.lastName}/>
                </Box>
            }
            {loadingProfil}
            {dataProfil &&
                <Box className={classes.email}>
                    <BasicBox label={'Mail :'} value={dataProfil.myProfile.email}/>
                </Box>
            }
            {loadingProfil}
            {dataProfil &&
                <Box className={classes.inscription}>
                    <BasicBox label={'Registered since :'} value={inscriptionDate}/>
                </Box>
            }
            <Box className={classes.languages}>
                <ProfilLanguages />
            </Box>
        </Box>
    )
}

export default ProfilInformations