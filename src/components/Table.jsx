import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Table = ({ caption, fields, rows, resourceName }) => {
  return (
    <div className="w-100">
      <h2 className="mb-3">{caption}</h2>
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="card mb-3">
          <div className="card-body">
            {fields.map((field, fieldIndex) => (
              <p key={fieldIndex} className="card-text">
                <strong>{field.label}: </strong>{row[field.name]}
              </p>
            ))}
            <div className="d-flex justify-content-between">
              <Link className="btn btn-info btn-sm" to={`/${resourceName}/${row.id}/update`} state={row}>
                Update
              </Link>
              <Link className="btn btn-danger btn-sm" to={`/${resourceName}/${row.id}/delete`} state={row}>
                Delete
              </Link>
              <Link className="btn btn-warning btn-sm" to={`/${resourceName}/${row.id}/components`} state={row}>
                View
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

Table.propTypes = {
  caption: PropTypes.string,
  fields: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  resourceName: PropTypes.string,
};

export default Table;
