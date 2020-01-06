import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

function checkAuth({ roles, permissions }, checkRole, checkPermission) {
  if (checkRole && !roles.includes(checkRole)) {
    return false;
  }

  if (checkPermission && !roles.includes(checkPermission)) {
    return false;
  }

  return true;
}

const Can = ({ children, auth, checkRole, checkPermission }) =>
  checkAuth(auth, checkRole, checkPermission) && children;

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Can);
