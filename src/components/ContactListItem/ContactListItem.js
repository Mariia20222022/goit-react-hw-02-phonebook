import css from './ContactListItem.module.css';
import PropTypes from 'prop-types';
function ContactListItem({ contact, onDelete }) {
  const { id, name, number } = contact;
  return (
    <li className={css.item}>
      {name} : {number}
      <button className={css.button} onClick={() => onDelete(id)}>
        Delete
      </button>
    </li>
  );
}
ContactListItem.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};
export default ContactListItem;
