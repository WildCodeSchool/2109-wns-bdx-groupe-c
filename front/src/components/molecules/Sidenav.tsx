import * as React from 'react';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import ChatIcon from '@mui/icons-material/Chat';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import InfoIcon from '@mui/icons-material/Info';
import MenuIcon from '@mui/icons-material/Menu';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from '@mui/icons-material/Home';
import { useHistory, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_ONE_PROJECT } from '../../queries/project';
import { Project } from '../../entities/project';

const drawerWidth = 240;

const iconLabel = [
    {icon: <HomeIcon />, label: 'Home'},
    {icon: <InfoIcon />, label: 'Infos'},
    {icon: <FormatListBulletedIcon />, label: 'Tasks'},
    {icon: <ChatIcon />, label: 'Comments'},
    {icon: <PersonOutlineIcon />, label: 'Users'},
    {icon: <SettingsIcon />, label: 'Settings'},
]

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
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

interface UseParamProps {
  id: string,
}

const Sidenav = () => {
  const [open, setOpen] = React.useState(false);
  const history = useHistory();
  const { id } = useParams<UseParamProps>();
    const { data, loading } = useQuery(GET_ONE_PROJECT, {
        variables: {
            projectId: parseInt(id, 10)
        }
    })

    const project: Project | undefined = React.useMemo(() => {
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
                  <p>Loading...</p>
              )}
              { !loading && project && (
        <Box sx={{ display: 'flex' }}>
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
                  ...(open && { display: 'none' }),
                }}
              >
              <MenuIcon sx={{color: '#fff'}} />
            </IconButton>
            <DrawerHeader>
              <IconButton onClick={handleDrawerClose}>
              <Box color='#fff'>{open === false ? '' : <ChevronLeftIcon />}</Box>
              </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
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