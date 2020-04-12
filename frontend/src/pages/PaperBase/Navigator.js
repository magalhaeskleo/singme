import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';

import {
  ListItemText,
  ListItemIcon,
  ListItem,
  List,
  Drawer,
  Divider,
} from '@material-ui/core';

import {
  Dashboard,
  People,
  Equalizer,
  PhotoLibrary,
  MeetingRoom,
  MonetizationOn,
  Home,
} from '@material-ui/icons';
import { useEffect } from 'react';

const menu = [
  {
    id: 1,
    active: true,
    sigla: 'Dashboard',
    icon: <Dashboard />,
  },
  {
    id: 2,
    active: false,
    sigla: 'Equipe',
    icon: <People />,
  },
  {
    id: 3,
    active: false,
    sigla: 'Rider Tec.',
    icon: <Equalizer />,
  },
  {
    id: 4,
    active: false,
    sigla: 'Press kit',
    icon: <PhotoLibrary />,
  },
  {
    id: 5,
    active: false,
    sigla: 'Room List',
    icon: <MeetingRoom />,
  },
  {
    id: 6,
    active: false,
    sigla: 'Financeiro',
    icon: <MonetizationOn />,
  },
];

const styles = (theme) => ({
  categoryHeader: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  categoryHeaderPrimary: {
    color: theme.palette.common.white,
  },
  item: {
    paddingTop: 10,
    paddingBottom: 1,
    color: 'rgba(255, 255, 255, 0.7)',
    '&:hover,&:focus': {
      backgroundColor: '#232f3e',
    },
  },
  itemActiveItem: {
    color: theme.palette.primary.dark,
  },

  itemCategory: {
    backgroundColor: '#232f3e',
    boxShadow: '0 -1px 0 #232f3e inset',
    paddingTop: theme.spacing(6.2),
    paddingBottom: theme.spacing(2),
  },
  itemPrimary: {
    fontSize: 'inherit',
  },
  itemIcon: {
    minWidth: 'auto',
    marginRight: theme.spacing(2),
  },
  divider: {
    marginTop: theme.spacing(2),
  },
});

function Navigator(props) {
  const { classes, handleSelectPage, ...other } = props;
  const [pages, setPages] = useState(menu);
  const [pageSelect, setPageSelect] = useState(1);

  useEffect(() => {
    handleSelect(pageSelect);
  }, [pageSelect]);

  function handleSelect(id) {
    const pagesAlt = pages.map((el) =>
      el.id === id ? { ...el, active: true } : { ...el, active: false }
    );
    setPages(pagesAlt);
    handleSelectPage(id);
  }

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem className={clsx(classes.item, classes.itemCategory)}>
          <ListItemIcon className={classes.itemIcon}>
            <Home />
          </ListItemIcon>
          <ListItemText
            classes={{
              primary: classes.itemPrimary,
            }}
          >
            RPZ App
          </ListItemText>
        </ListItem>
        <Divider color="primary" />
        {pages.map(({ id, active, sigla, icon }) => (
          <ListItem
            key={id}
            button
            onClick={() => setPageSelect(id)}
            className={clsx(classes.item, active && classes.itemActiveItem)}
          >
            <ListItemIcon className={classes.itemIcon}>{icon}</ListItemIcon>
            <ListItemText
              classes={{
                primary: classes.itemPrimary,
              }}
            >
              {sigla}
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

Navigator.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navigator);
