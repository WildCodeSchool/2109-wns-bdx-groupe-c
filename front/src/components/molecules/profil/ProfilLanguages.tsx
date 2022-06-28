import { useState, useEffect, useCallback } from 'react'
import Box from "@mui/material/Box"
import {makeStyles} from "@mui/styles"
import { Theme } from '@mui/material/styles'
import { useQuery } from "@apollo/client"
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

import { MY_LANGUAGES } from '../../../queries/language';
import { MyLanguages } from "../../../entities/language"
import ProfilModalAddLanguage from './ProfilModalAddLanguage';
import ProfilModalUpdateLanguage from './ProfilModalUpdateLanguage';

const useStyles = makeStyles((theme: Theme) => ({
    languagesBox: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: '1rem',
        backgroundColor: '#0c355b',
        borderRadius: '6px',
        boxShadow: '2px 4px 8px rgba(0,0,0,.4)',
    },
    languagesTitle: {
        fontWeight: 'bold',
        color: '#fff',
    },
    languagesList: {
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: 0,
        marginTop: '2rem',
        marginBottom: 0,
        listStyleType: 'none',
    },
    languagesListItem: {
        display: 'inline-flex',
        alignItems: 'center',
        marginBottom: '1rem',
        cursor: 'pointer',
    },
    languagesListName: {
        position: 'relative',
        top: '3px',
        marginRight: '1rem',
    },
    languagesMenu: {
        width: 'fit-content',
        alignSelf: 'flex-end',
        fontSize: '34px',
        color: '#fff'
    },
    modal: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
}))

const ProfilLanguages = () => {

    const classes = useStyles();

    // update language modal
    const [openUpdate, setOpenUpdate] = useState(false);
    const handleOpenUpdate = () => setOpenUpdate(true);
    const handleCloseUpdate = () => setOpenUpdate(false);

    // add language modal
    const [openAdd, setOpenAdd] = useState(false);
    const handleOpenAdd = () => setOpenAdd(true);
    const handleCloseAdd = () => setOpenAdd(false);

    const { loading, data } = useQuery(MY_LANGUAGES);

    return (
        <Box className={classes.languagesBox}>
            <Typography className={classes.languagesTitle}>Languages :</Typography>
            <ul className={classes.languagesList}>
                {loading}
                {data?.myLanguages.map((myLanguages: MyLanguages) => {
                    const { id, language, rating } = myLanguages;
                    return (
                        <li key={id} className={classes.languagesListItem} onClick={handleOpenUpdate}>
                            <span className={classes.languagesListName}>{language.name}</span>
                            <Stack spacing={1}>
                                <Rating name="half-rating" defaultValue={0} value={rating} />
                            </Stack>
                        </li>
                    )
                })}
                <Modal
                    open={openUpdate}
                    onClose={handleCloseUpdate}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    className={classes.modal}
                >
                    <ProfilModalUpdateLanguage
                        openUpdateLanguage={openUpdate}
                        toggleUpdateLanguageModal={handleCloseUpdate}
                    />
                </Modal>
            </ul>
            <Button className={classes.languagesMenu}>
                <AddIcon  onClick={handleOpenAdd} className={classes.languagesMenu} />
                <Modal
                    open={openAdd}
                    onClose={handleCloseAdd}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    className={classes.modal}
                    >
                        <ProfilModalAddLanguage
                            openAddLanguage={openAdd}
                            toggleAddLanguageModal={handleCloseAdd}
                        />
                </Modal>
            </Button>
        </Box>
    )
}

export default ProfilLanguages