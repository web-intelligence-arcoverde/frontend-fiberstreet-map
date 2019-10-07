import React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { AppBar, Tabs, Tab, Typography, Box } from "@material-ui/core/";

//Components
import Modal from "react-bootstrap/Modal";

//ComponentsEditados
import TableClients from "./Components/TableClients";
import TableUsers from "./Components/TableUsers";
import TableProvider from "./Components/TableProvider";
import TableCtos from "./Components/TableCtos";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "100%"
  },
  bigIndicator: {
    height: 5,
    backgroundColor: "#F7D358"
  }
}));

export default function FullWidthTabs() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = index => {
    setValue(index);
  };

  return (
    <Modal size="lg" show={false}>
      <Modal.Body>
        <div className={classes.root}>
          <AppBar position="static" color="default">
            <Tabs
              value={value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="auto"
              classes={{ indicator: classes.bigIndicator }}
            >
              <Tab label="Funcionarios" {...a11yProps(0)} />
              <Tab label="Clientes" {...a11yProps(1)} />
              <Tab label="Provedores" {...a11yProps(2)} />
              <Tab label="Ctos" {...a11yProps(3)} />
              <Tab label="Ceos" {...a11yProps(4)} />
              <Tab label="Splitters" {...a11yProps(5)} />
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={value} index={0} dir={theme.direction}>
              <TableUsers />
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              <TableClients />
            </TabPanel>
            <TabPanel value={value} index={2} dir={theme.direction}>
              <TableProvider />
            </TabPanel>
            <TabPanel value={value} index={3} dir={theme.direction}>
              <TableCtos />
            </TabPanel>
            <TabPanel value={value} index={4} dir={theme.direction}>
              Text 3
            </TabPanel>
            <TabPanel value={value} index={5} dir={theme.direction}>
              Text 3
            </TabPanel>
          </SwipeableViews>
        </div>
      </Modal.Body>
    </Modal>
  );
}
