import { PropTypes } from 'prop-types';

function Helmet(props) {
  document.title = props.title.toUpperCase() + ' - POPU';
  return <>{props.children}</>;
}

Helmet.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Helmet;
