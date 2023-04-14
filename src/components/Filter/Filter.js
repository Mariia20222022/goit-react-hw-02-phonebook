import PropTypes from 'prop-types';
import css from './Filter.module.css';

function Filter({ value, onChange }) {
  return (
    <div className={css.field}>
      <label className={css.label} htmlFor="filter">
        Find contacts by name:
      </label>
      <input
        className={css.input}
        type="text"
        id="filter"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
Filter.PropTypes = {
  value: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};
export default Filter;
