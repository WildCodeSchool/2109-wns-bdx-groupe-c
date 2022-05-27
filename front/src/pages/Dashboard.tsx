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
import DashboardProjectsCard from '../components/molecules/DashboardProjectsCard';
import MenuAppBar from '../components/molecules/Header';

const useStyles = makeStyles({
  mainContainer: {
    backgroundColor: '#061B2E',
    minHeight: '150vh',
    padding: '25px',
    margin: '64px 0 0',
    '@media screen and (max-width: 600px)': {
      margin: '54px 0 0',
    },
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
      {/* <MenuAppBar /> */}
      <Box className={classes.mainContainer}>
          <DashboardMyTasksCard projectId={1} />
          <DashboardMyProjectsCard />
          <DashboardProjectsCard />
      </Box>
      {!myProfile && (
          <Redirect  to={{ pathname: "/" }} />
      )}
    </>
  )
}

export default Dashboard
