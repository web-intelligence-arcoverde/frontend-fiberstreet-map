import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Check from "@material-ui/icons/Check";
import StepConnector from "@material-ui/core/StepConnector";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import styled from "styled-components";
import Link from "@material-ui/core/Link";
import { Form } from "react-bootstrap/";

import PersonAddIcon from "@material-ui/icons/PersonAdd";
import HomeIcon from "@material-ui/icons/Home";
import DoneIcon from "@material-ui/icons/Done";

const useQontoStepIconStyles = makeStyles({
  root: {
    color: "#eaeaf0",
    display: "flex",
    height: 22,
    alignItems: "center"
  },
  active: {
    color: "#784af4"
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "currentColor"
  },
  completed: {
    color: "#784af4",
    zIndex: 1,
    fontSize: 18
  }
});

function QontoStepIcon(props) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active
      })}
    >
      {completed ? (
        <Check className={classes.completed} />
      ) : (
        <div className={classes.circle} />
      )}
    </div>
  );
}

QontoStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool
};

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22
  },
  active: {
    "& $line": {
      backgroundImage: "linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)"
    }
  },
  completed: {
    "& $line": {
      backgroundImage: "linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)"
    }
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: "#eaeaf0",
    borderRadius: 1
  }
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center"
  },

  active: {
    backgroundImage: "linear-gradient(160deg, #0093E9 0%, #80D0C7 100%);",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)"
  },
  completed: {
    backgroundImage: "linear-gradient(160deg, #0093E9 0%, #80D0C7 100%);"
  }
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <PersonAddIcon />,
    2: <HomeIcon />,
    3: <DoneIcon />
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

ColorlibStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
  icon: PropTypes.node
};

const useStyles = makeStyles(theme => ({
  root: {
    width: "90%"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  button: {
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(3)
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  }
}));

function getSteps() {
  return ["Criar usuario", "Cria provedor", "Completo"];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return FormUser();
    case 1:
      return FormProvider();
    case 2:
      return "Cadastro completo.";
    default:
      return "Unknown step";
  }
}

export default function CustomizedSteppers() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.paper}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <Stepper
            alternativeLabel
            activeStep={activeStep}
            connector={<ColorlibConnector />}
          >
            {steps.map(label => (
              <Step key={label}>
                <StepLabel StepIconComponent={ColorlibStepIcon}>
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Grid>
        <Grid item xs={12} sm={12}>
          <div>
            {activeStep === steps.length - 1 ? (
              <div style={{ marginLeft: "15%" }}>
                <Link href="/" variant="body2">
                  {"Cadastro concluido."}
                </Link>
              </div>
            ) : (
              <div>
                <Typography className={classes.instructions}>
                  {getStepContent(activeStep)}
                </Typography>
                <div style={{ marginLeft: "16%" }}>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? "Finish" : "Next"}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

function FormUser() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form style={{ marginTop: "40px", marginButtom: "20px" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={2}></Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="firstName"
            variant="outlined"
            required
            fullWidth
            label="Nome"
            autoFocus
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <Form.Group>
            <Form.Control
              as="select"
              value={type}
              onChange={e => setType(e.target.value)}
              style={{
                height: "54px"
              }}
            >
              <option>Admin</option>
              <option>Funcionario</option>
            </Form.Control>
          </Form.Group>
        </Grid>
        <Grid item xs={12} sm={2}></Grid>
        <Grid item xs={12} sm={2}></Grid>
        <Grid item xs={12} sm={8}>
          <TextField
            name="firstName"
            variant="outlined"
            required
            fullWidth
            label="Email"
            autoFocus
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={2}></Grid>
        <Grid item xs={12} sm={2}></Grid>
        <Grid item xs={12} sm={8}>
          <TextField
            name="firstName"
            variant="outlined"
            required
            fullWidth
            label="Password"
            type="password"
            autoFocus
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={2}></Grid>
        <Grid item xs={12} sm={6}></Grid>
      </Grid>
    </form>
  );
}

function FormProvider() {
  return (
    <form>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={2}></Grid>
        <Grid item xs={12} sm={8}>
          <TextField
            name="firstName"
            variant="outlined"
            required
            fullWidth
            label="Nome do provedor"
            autoFocus
          />
        </Grid>
        <Grid item xs={12} sm={2}></Grid>
        <Grid item xs={12} sm={2}></Grid>
        <Grid item xs={12} sm={8}>
          <TextField
            variant="outlined"
            required
            fullWidth
            label="Endereço"
            name="lastName"
          />
        </Grid>
        <Grid item xs={12} sm={2}></Grid>
        <Grid item xs={12} sm={2}></Grid>
        <Grid item xs={12} sm={8}>
          <TextField
            variant="outlined"
            required
            fullWidth
            label="CNPJ"
            name="CNPJ"
          />
        </Grid>
        <Grid item xs={12} sm={2}></Grid>
      </Grid>
    </form>
  );
}
