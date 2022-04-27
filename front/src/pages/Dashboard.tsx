import {useState} from 'react'
import { Redirect } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client';
import { MY_PROFILE, LOG_OUT } from '../queries/user'

import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Logout from '@mui/icons-material/Logout';
import Settings from '@mui/icons-material/Settings';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { makeStyles } from '@mui/styles'

import DashboardMyProjectsCard from '../components/molecules/DashboardMyProjectsCard'
import DashboardMyTasksCard from '../components/molecules/DashboardMyTasksCard'

const useStyles = makeStyles({
  mainContainer: {
    backgroundColor: '#061B2E',
    margin: '0',
    minHeight: '100vh',
    padding: '25px',
  },
})

const Dashboard = ({}) => {
  const { loading, data, error } = useQuery(MY_PROFILE)
  const [logOut] = useMutation(LOG_OUT, {refetchQueries: [{query: MY_PROFILE}]});
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles()
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const {myProfile} = data;
  const {firstName, lastName, email} = myProfile;
  const {role} = myProfile;
  const {name} = role;

  const handleLogout = () => {
    logOut();
  }

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Typography sx={{ minWidth: 100 }}>Contact</Typography>
        <Typography sx={{ minWidth: 100 }}>Profile de {firstName} {lastName} qui a le role {name} </Typography>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon >
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      <Box className={classes.mainContainer}>
          <DashboardMyTasksCard projectId={1} />
          <DashboardMyProjectsCard />
      </Box>
      {!myProfile && (
          <Redirect  to={{ pathname: "/" }} />
      )}
    </>
  )
}

export default Dashboard
