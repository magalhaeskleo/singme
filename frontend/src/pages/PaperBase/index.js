import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  createMuiTheme,
  ThemeProvider,
  withStyles,
} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Hidden, Divider, Tabs, Tab } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

import Link from '@material-ui/core/Link';
import Navigator from './Navigator';
import Eventos from '../Eventos';
import Equipe from '../Equipe';
import Camarim from '../Camarim';
import Financeiro from '../Financeiro';
import RiderTec from '../RiderTec';
import Presskit from '../Presskit';
import Header from './Header';
import { useEffect } from 'react';

function Copyright() {
  return (
    <Typography
      variant="body2"
      color="textSecondary"
      align="center"
      style={{ color: 'silver' }}
    >
      {'©gruporpz '}
      <Link color="inherit" href="https://www.gruporpz.com.br">
        www.gruporpz.com.br
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

let theme = createMuiTheme({
  palette: {
    primary: {
      light: '#63ccff',
      main: '#009be5',
      dark: '#006db3',
    },
    secondary: {
      light: '#e3da30', // light: '#63ccff',
      main: '#d1b036', // main: '#009be5',
      dark: '#c47127', //dark: '#006db3',
    },
  },
  typography: {
    h5: {
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: 0.5,
    },
  },
  shape: {
    borderRadius: 8,
  },
  props: {
    MuiTab: {
      disableRipple: true,
    },
  },
  mixins: {
    toolbar: {
      minHeight: 48,
    },
  },
});

theme = {
  ...theme,
  overrides: {
    MuiDrawer: {
      paper: {
        backgroundColor: '#232f3e',
      },
    },
    MuiButton: {
      label: {
        textTransform: 'none',
      },
      contained: {
        boxShadow: 'none',
        '&:active': {
          boxShadow: 'none',
        },
      },
    },
    MuiTabs: {
      root: {
        marginLeft: theme.spacing(1),
      },
      indicator: {
        height: 3,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        backgroundColor: theme.palette.common.white,
      },
    },
    MuiTab: {
      root: {
        textTransform: 'none',
        margin: '0 16px',
        minWidth: 0,
        padding: 0,
        [theme.breakpoints.up('md')]: {
          padding: 0,
          minWidth: 0,
        },
      },
    },
    MuiIconButton: {
      root: {
        padding: theme.spacing(1),
      },
    },
    MuiTooltip: {
      tooltip: {
        borderRadius: 4,
      },
    },
    MuiDivider: {
      root: {
        backgroundColor: '#404854',
      },
    },
    MuiListItemText: {
      primary: {
        fontWeight: theme.typography.fontWeightMedium,
      },
    },
    MuiListItemIcon: {
      root: {
        color: 'inherit',
        marginRight: 0,
        '& svg': {
          fontSize: 20,
        },
      },
    },
    MuiAvatar: {
      root: {
        width: 32,
        height: 32,
      },
    },
  },
};

const drawerWidth = 200;

const styles = {
  root: {
    display: 'flex',
    minHeight: '100vh',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  app: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  main: {
    flex: 1,
    padding: theme.spacing(6, 4),
    background: '#eaeff1',
  },
  footer: {
    padding: theme.spacing(2),
    background: '#eaeff1',
  },
};

function Paperbase(props) {
  const [tabValue, setTab] = useState(1);

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  useEffect(() => {
    handleSelectPage(pageSelect.id);
  }, [tabValue]);

  const menu = [
    {
      id: 1,
      description: 'Eventos',
      page: <Eventos tabValue={tabValue} />,
      tabs: [
        <Tab label="Período" value={1} key={1} />,
        <Tab label="Dia" value={2} key={2} />,
      ],
    },
    {
      id: 2,
      description: 'Equipe',
      page: <Equipe />,
    },
    {
      id: 3,
      description: 'Rider Técnico',
      page: <RiderTec />,
    },
    {
      id: 4,
      description: 'Press kit',
      page: <Presskit />,
    },
    {
      id: 5,
      description: 'Room List',
      page: <Camarim />,
    },
    {
      id: 6,
      description: 'Financeiro',
      page: <Financeiro />,
    },
  ];

  const { classes } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [pageSelect, setPageSelect] = useState(menu[0]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  function handleSelectPage(id) {
    const select = menu.find((el) => el.id === id);
    setPageSelect(select);
  }

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <nav className={classes.drawer}>
          <Hidden smUp implementation="js">
            <Navigator
              PaperProps={{ style: { width: drawerWidth } }}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              handleSelectPage={handleSelectPage}
            />
          </Hidden>
          <Hidden xsDown implementation="css">
            <Navigator
              PaperProps={{ style: { width: drawerWidth } }}
              handleSelectPage={handleSelectPage}
            />
          </Hidden>
        </nav>
        <div>
          <Divider className={classes.divider} orientation="vertical" />
        </div>
        <div className={classes.app}>
          <Header
            onDrawerToggle={handleDrawerToggle}
            name={pageSelect.description}
          >
            <Tabs value={tabValue} onChange={handleChange} textColor="inherit">
              {pageSelect.tabs}
            </Tabs>
          </Header>
          <main className={classes.main}>{pageSelect.page}</main>
          <footer className={classes.footer}>
            <Copyright />
          </footer>
        </div>
      </div>
    </ThemeProvider>
  );
}

Paperbase.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Paperbase);
