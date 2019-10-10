import React, { useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import moment from "moment";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
  Paper,
  Checkbox,
  IconButton,
  Tooltip
} from "@material-ui/core/";

// redux
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

//Creators redux
import { Creators as clienteCreators } from "../../../redux/store/ducks/cliente";

//Icons
import { Delete, FilterList, LocationOn, Edit } from "@material-ui/icons/";

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

const headCells = [
  { id: "cpf", numeric: false, disablePadding: false, label: "CPF" },
  { id: "name", numeric: false, disablePadding: false, label: "Nome" },
  { id: "ppoe", numeric: false, disablePadding: false, label: "PPPOE" },
  { id: "speed", numeric: false, disablePadding: false, label: "Plano" },
  {
    id: "created_at",
    numeric: false,
    disablePadding: false,
    label: "Criação"
  },
  {
    id: "installation_date",
    numeric: false,
    disablePadding: false,
    label: "Instalação"
  },
  { id: "obs", numeric: false, disablePadding: false, label: "Obs." }
];

function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort
  } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            style={{ color: "#FFBF00" }}
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all desserts" }}
          />
        </TableCell>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "center"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={order}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

const useToolbarStyles = makeStyles(theme => ({
  root2: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1)
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten("#FFBF00", 0.5)
        }
      : {
          color: "#D8D8D8",
          backgroundColor: theme.palette.secondary.dark
        },
  spacer: {
    flex: "1 1 100%"
  },
  actions: {
    color: theme.palette.text.secondary,
    display: "inherit"
  },
  title: {
    flex: "0 0 auto",
    color: "#FFF"
  }
}));

const EnhancedTableToolbar = props => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography variant="subtitle1">
            {numSelected} selecionado(s)
          </Typography>
        ) : (
          <Typography></Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <>
            {numSelected === 1 && (
              <>
                <Tooltip title="Ir para o cliente">
                  <IconButton aria-label="ir">
                    <LocationOn />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Edit">
                  <IconButton aria-label="editar">
                    <Edit />
                  </IconButton>
                </Tooltip>
              </>
            )}

            <Tooltip title="Excluir">
              <IconButton aria-label="delete">
                <Delete />
              </IconButton>
            </Tooltip>
          </>
        ) : (
          <Tooltip title="Filter list">
            <IconButton aria-label="filter list">
              <FilterList />
            </IconButton>
          </Tooltip>
        )}
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired
};

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3)
  },
  paper: {
    width: "100%",
    marginBottom: "0px"
  },
  table: {
    minWidth: "100%"
  },
  tableWrapper: {
    overflowX: "auto"
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1
  }
}));

function TableSplitters(props) {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const data = props.redux.client.geojson.clients;

  useEffect(() => {
    const { loadClientRequest } = props;
    loadClientRequest();
  });

  console.log("Procurar os splitters");
  console.log(props.redux);

  function handleRequestSort(event, property) {
    const isDesc = orderBy === property && order === "desc";
    setOrder(isDesc ? "asc" : "desc");
    setOrderBy(property);
  }

  function handleSelectAllClick(event) {
    if (event.target.checked) {
      const newSelecteds = data.map(row => row.properties.data.cpf);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  }

  function formatDate(data) {
    const date = moment(data).format("DD/MM/YYYY");
    return date;
  }

  function formatCpfCnpj(v) {
    //Remove tudo o que não é dígito
    v = v.replace(/\D/g, "");

    if (v.length <= 14) {
      //CPF

      //Coloca um ponto entre o terceiro e o quarto dígitos
      v = v.replace(/(\d{3})(\d)/, "$1.$2");

      //Coloca um ponto entre o terceiro e o quarto dígitos
      //de novo (para o segundo bloco de números)
      v = v.replace(/(\d{3})(\d)/, "$1.$2");

      //Coloca um hífen entre o terceiro e o quarto dígitos
      v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    } else {
      //CNPJ

      //Coloca ponto entre o segundo e o terceiro dígitos
      v = v.replace(/^(\d{2})(\d)/, "$1.$2");

      //Coloca ponto entre o quinto e o sexto dígitos
      v = v.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");

      //Coloca uma barra entre o oitavo e o nono dígitos
      v = v.replace(/\.(\d{3})(\d)/, ".$1/$2");

      //Coloca um hífen depois do bloco de quatro dígitos
      v = v.replace(/(\d{4})(\d)/, "$1-$2");
    }

    return v;
  }

  function handleClick(event, name) {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  }

  function handleChangePage(event, newPage) {
    console.log("");
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(+event.target.value);
    setPage(0);
  }

  const isSelected = name => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

  return (
    <div className={classes.root2}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          style={{ marginTop: "0px" }}
          numSelected={selected.length}
        />
        <div className={classes.tableWrapper}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={"medium"}
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {data &&
                stableSort(data, getSorting(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.properties.data.cpf);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={event =>
                          handleClick(event, row.properties.data.cpf)
                        }
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.properties.data.cpf}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isItemSelected}
                            inputProps={{ "aria-labelledby": labelId }}
                            style={{ color: "#FFBF00" }}
                          />
                        </TableCell>

                        <TableCell
                          component="th"
                          style={{ color: "#BDBDBD" }}
                          id={labelId}
                          scope="row"
                          padding="none"
                        >
                          {formatCpfCnpj(row.properties.data.cpf)}
                        </TableCell>
                        <TableCell align="center" style={{ color: "#BDBDBD" }}>
                          {row.properties.data.name}
                        </TableCell>
                        <TableCell align="center" style={{ color: "#BDBDBD" }}>
                          {row.properties.data.pppoe}
                        </TableCell>
                        <TableCell align="center" style={{ color: "#BDBDBD" }}>
                          {row.properties.data.speed}
                        </TableCell>
                        <TableCell align="center" style={{ color: "#BDBDBD" }}>
                          {formatDate(row.properties.data.created_at)}
                        </TableCell>
                        <TableCell align="center" style={{ color: "#BDBDBD" }}>
                          {formatDate(row.properties.data.installation_date)}
                        </TableCell>
                        <TableCell align="center" style={{ color: "#BDBDBD" }}>
                          {row.properties.data.obs}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={10} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, data.length]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            "aria-label": "previous page"
          }}
          nextIconButtonProps={{
            "aria-label": "next page"
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

const mapStateToProps = state => ({
  redux: state
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(clienteCreators, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableSplitters);
