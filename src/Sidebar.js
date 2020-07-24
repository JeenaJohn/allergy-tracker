import React, { useState } from 'react';

import { NavLink, withRouter } from 'react-router-dom';


import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  MenuList,
  MenuItem,
  ListItemText,
 } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    drawer: {
      width: 200,
      
    },
    fullList: {
      width: 'auto',
    },
  }),
);

const Sidebar: React.FC = (props: any) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' ||
        event.key === 'Shift')
    ) {
      return;
    }

    setIsOpen(open);
  };

  const activeRoute = (routeName: any) => {
    return props.location.pathname === routeName ? true : false;
  }

  return (
    <div>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
  
          </Toolbar>
        </AppBar>
      </div>
      <Drawer classes={{ paper: classes.drawer }} open={isOpen} onClose={toggleDrawer(false)}>
        <div
          className={classes.fullList}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <MenuList>
   
          </MenuList>
        </div>
      </Drawer>
    </div>
  );
};

export default withRouter(Sidebar);
