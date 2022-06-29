import Box from "@mui/material/Box"
import {makeStyles} from "@mui/styles"
import { Theme } from '@mui/material/styles'
import { useQuery, useMutation } from "@apollo/client"

import { MY_PROFILE } from "../../../queries/user"

import BasicBox from "../../atoms/all/BasicBox"
import ProfilLanguages from "../../molecules/profil/ProfilLanguages";

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid #1F84E1',
        borderRadius: '18px',
        padding: '2rem',
        marginBottom: '3rem',
        '@media screen and (max-width: 640px)': {
            padding: '1rem',
        },
    },
    profilTitle: {
        margin: 0,
    },
    informationsContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gridGap: '2rem',
        marginTop: '1rem',
        '@media screen and (max-width: 1440px)': {
            gridTemplateColumns: 'repeat(4, 1fr)',
        },
        '@media screen and (max-width: 1024px)': {
            gridTemplateColumns: 'repeat(3, 1fr)',
        },
        '@media screen and (max-width: 960px)': {
            gridTemplateColumns: 'repeat(2, 1fr)',
        },
        '@media screen and (max-width: 640px)': {
            gridTemplateColumns: '1fr',
        },
    },

    languages: {
        gridColumn: '1 / 4',
        '@media screen and (max-width: 960px)': {
            gridColumn: '1 / 3',
        },
        '@media screen and (max-width: 640px)': {
            gridColumn: '1',
        },
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
            <Box className={classes.informationsContainer}>
                {loadingProfil}
                {dataProfil &&
                    <Box>
                        <BasicBox label={'Firstname :'} value={dataProfil.myProfile.firstName}/>
                    </Box>
                }
                {loadingProfil}
                {dataProfil &&
                    <Box>
                        <BasicBox label={'Lastname :'} value={dataProfil.myProfile.lastName}/>
                    </Box>
                }
                {loadingProfil}
                {dataProfil &&
                    <Box>
                        <BasicBox label={'Mail :'} value={dataProfil.myProfile.email}/>
                    </Box>
                }
                {loadingProfil}
                {dataProfil &&
                    <Box>
                        <BasicBox label={'Registered since :'} value={inscriptionDate}/>
                    </Box>
                }
                <Box className={classes.languages}>
                    <ProfilLanguages />
                </Box>
            </Box>
        </Box>
    )
}

export default ProfilInformations