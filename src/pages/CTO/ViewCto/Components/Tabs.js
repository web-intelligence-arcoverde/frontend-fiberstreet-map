import React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

//Components
import TableUsers from "./TableUsers";
import TableSplitter from "./TableSplitter";
import TableCable from "./TableCable";
import CtoInformation from "./CtoInformation";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      <Box
        style={{
          paddingLeft: "0px",
          paddingTop: "0px",
          paddingRight: "0px",
          paddingBottom: "0px"
        }}
        p={3}
      >
        {children}
      </Box>
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
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`
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
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          classes={{ indicator: classes.bigIndicator }}
          style={{ backgroundColor: "#E6E6E6" }}
        >
          <Tab label="Caixa terminal optica" {...a11yProps(0)} />
          <Tab label="Usuarios" {...a11yProps(1)} />
          <Tab label="Splitter" {...a11yProps(2)} />
          <Tab label="Cabos" {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <CtoInformation />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <TableUsers />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <TableSplitter />
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
          <TableCable />
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}
