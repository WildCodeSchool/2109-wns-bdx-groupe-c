import { useMemo, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import {makeStyles} from "@mui/styles"

import {
  Box,
  List,
  CssBaseline,
  Divider,
  IconButton,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  CircularProgress,
} from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import InfoIcon from '@mui/icons-material/Info';
import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from '@mui/icons-material/Home';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { GET_ONE_PROJECT } from '../../queries/project';
import { MY_PROFILE } from '../../queries/user';
import { Project } from '../../entities/project';
import { ROLE_ADMIN } from '../constants';

const drawerWidth = 145;

const iconLabel = [
    {icon: <HomeIcon />, label: 'Home'},
    {icon: <InfoIcon />, label: 'Infos'},
    {icon: <FormatListBulletedIcon />, label: 'Tasks'},
    // {icon: <ChatIcon />, label: 'Comments'},
    // {icon: <PersonOutlineIcon />, label: 'Users'},
    // {icon: <SettingsIcon />, label: 'Settings'},
]

const iconAdminLabel = [
    {icon: <HomeIcon />, label: 'Home'},
    {icon: <InfoIcon />, label: 'Infos'},
    {icon: <FormatListBulletedIcon />, label: 'Tasks'},
    // {icon: <ChatIcon />, label: 'Comments'},
    // {icon: <PersonOutlineIcon />, label: 'Users'},
    {icon: <SettingsIcon />, label: 'Settings'},
]

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  height: 'fit-content',
  marginTop: '115px',
  overflowX: 'hidden',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  backgroundColor: '#0F4473',
  borderRadius: ' 0 20px 20px 0',
});

const closedMixin = (theme: Theme): CSSObject => ({
  width: `calc(${theme.spacing(7)} + 1px)`,
  height: 'fit-content',
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  marginTop: '115px',
  overflowX: 'hidden',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: '#0F4473',
  borderRadius: ' 0 20px 20px 0',
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);


const useStyles = makeStyles((theme: Theme) => ({
  mainContainer: {
    display: 'flex',
    height: 0,
    '& .MuiPaper-elevation': {
      zIndex: '10',
    },
  },
}))


interface UseParamProps {
  id: string,
}

const Sidenav = () => {
  const classes = useStyles()
  const [open, setOpen] = useState(false);
  const { data: dataMyProfile } = useQuery(MY_PROFILE)

  const history = useHistory();
  const { id } = useParams<UseParamProps>();
    const { data, loading } = useQuery(GET_ONE_PROJECT, {
        variables: {
            projectId: parseInt(id, 10)
        }
    })

    const isAdmin = useMemo(() => {
      if (dataMyProfile) {
        return dataMyProfile.myProfile.role.identifier === ROLE_ADMIN;
      }
      return false;
    }, [dataMyProfile])

    const project: Project | undefined = useMemo(() => {
        if (data) return data.project;
    }, [data])

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleIconClick = (label: string) => {
    if (label === 'Home') {
      history.push('/');
    } else {
      history.push(`/project/${id}/${label}`);
    }

  }

  return (

    <>
      { loading && (
                <CircularProgress />
              )}
              { !loading && project && (
        <Box className={classes.mainContainer}>
          <CssBaseline />
          <Drawer variant="permanent" open={open}>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                  margin: 0,
                  zIndex: 1201,
                  minHeight: 64,
                  ...(open && { display: 'none' }),
                }}
              >
              <ChevronRightIcon/>
            </IconButton>

            { open === true &&
              <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                <Box color='#fff'><ChevronLeftIcon /></Box>
                </IconButton>
              </DrawerHeader>
            }

            <Divider />
            <List>
              {isAdmin
              ? <>
                  {iconAdminLabel.map((item) => (
                    <ListItemButton
                    key={item.label}
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                    }}
                    onClick={() => handleIconClick(item.label)}
                    >
                        <ListItemIcon
                        sx={{
                            minWidth: 0,
                            mr: open ? 3 : 'auto',
                            justifyContent: 'center',
                        }}
                        >
                        <Box color='#fff'>{item.icon}</Box>
                        </ListItemIcon>
                        <ListItemText primary={item.label} sx={{ opacity: open ? 1 : 0 }} />
                  </ListItemButton>
                  ))}
                </>
              :
                <>
                  {iconLabel.map((item) => (
                    <ListItemButton
                    key={item.label}
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                    }}
                    onClick={() => handleIconClick(item.label)}
                    >
                        <ListItemIcon
                        sx={{
                            minWidth: 0,
                            mr: open ? 3 : 'auto',
                            justifyContent: 'center',
                        }}
                        >
                        <Box color='#fff'>{item.icon}</Box>
                        </ListItemIcon>
                        <ListItemText primary={item.label} sx={{ opacity: open ? 1 : 0 }} />
                  </ListItemButton>
                  ))}
                </>
              }

            </List>
            <Divider />
          </Drawer>
        </Box>
        )
      }
    </>
 )
}
export default Sidenav
