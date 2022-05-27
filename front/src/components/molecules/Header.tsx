import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useMutation } from '@apollo/client';
import { MY_PROFILE, LOG_OUT } from '../../queries/user'
import {makeStyles} from "@mui/styles"
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import { ListItem } from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import Divider from '@mui/material/Divider';
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles({ 
    navBar: {
        display: 'inline-flex',
        justifyContent: 'space-between',
        backgroundColor: '#061B2E',
        transition: 'color .3s ease',
    },
    img: {
        maxWidth: '150px',
        position: 'fixed',
        left: '2rem',
        '@media screen and (max-width: 840px)': {
            position: 'relative',
            left: 'unset',
        }
    },
    menuButton: {
        display:'none',
        '@media screen and (max-width: 840px)': {
            display: 'flex',
        }
    },
    profilItem: {
        '&:hover': {
            color: '#1F84E1'
        }
    },
    listItem: {
        display: 'inline-flex',
        alignItems: 'center',
        cursor: 'pointer',
        transition: 'color .3s ease',
        '&:hover': {
            color: '#1F84E1',
        }
    },
})

export default function MenuAppBar() {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [logOut] = useMutation(LOG_OUT, {refetchQueries: [{query: MY_PROFILE}]});

  const handleChange = (event: any) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logOut();
  };

  const [isOpen, setIsOpen] = React.useState(false);

  const openMenu = () => {
      setIsOpen(true);
  };

  const closeMenu = () => {
    setIsOpen(false);
  }; 

  const history = useHistory();

  const classes = useStyles();

    const list = () => (
        <Box
            role="presentation"
            onClick={closeMenu}
            onKeyDown={closeMenu}
        >
            <List>
                <ListItem className={classes.listItem}>
                    <span onClick={() => history.push('/')}>Dashboard</span>
                </ListItem>
                <ListItem className={classes.listItem}>
                    <span onClick={() => history.push('/')}>Home</span>
                </ListItem>
            </List>

            <Divider />

            <List>
                <ListItem className={classes.listItem}>
                    <span onClick={() => history.push('/')}>Contact</span>
                </ListItem>
            </List>
        </Box>
    );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar className={classes.navBar}>
          <IconButton
            size="large"
            edge="start"
            color="primary"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon onClick={openMenu} className={classes.menuButton}/>
            <Drawer
                open={isOpen}
                onClose={closeMenu}
            >
                {list()}
            </Drawer>
            </IconButton>
            <img src={'./logo.svg'} className={classes.img} />
            {auth && (
                <div>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="primary"
                >
                    <AccountCircle />
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleClose} className={classes.profilItem}>Profile</MenuItem>
                    <MenuItem onClick={handleClose} className={classes.profilItem}>My account</MenuItem>
                    <MenuItem onClick={handleLogout} className={classes.profilItem}>Logout</MenuItem>
                </Menu>
                </div>
            )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}