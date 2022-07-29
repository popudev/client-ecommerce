import { PropTypes } from 'prop-types';

function Helmet(props) {
  document.title = 'Popu - ' + props.title;
  return <div>{props.children}</div>;
}

Helmet.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Helmet;
