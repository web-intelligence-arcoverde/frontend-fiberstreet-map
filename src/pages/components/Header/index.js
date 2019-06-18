import { AppBar } from "material-ui";
import PropTypes from "prop-types";

// const Header = ({ title, iconClassNameRight }) => {
//   return <AppBar title={title} />;
// };

function Header(props) {
  return (
    <>
      <div />
    </>
  );
}

const { string } = PropTypes;

Header.propTypes = {
  title: string.isRequired,
  iconClassNameRight: string.isRequired
};

export default Header;
