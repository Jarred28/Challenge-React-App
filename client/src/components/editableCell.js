import React from 'react';
import PropTypes from 'prop-types';  
import { Input } from 'formik-antd'

const EditableCell = ({
  editing,
  dataIndex,
  title,
  record,
  index,
  errors,
  children,
  ...restProps
}) => {
  return (
    <td {...restProps}>
      {editing ? (
        <>
          <Input name={dataIndex}/>
          {errors[dataIndex]}
        </>
      ) : (
        children
      )}
    </td>
  );
};

EditableCell.propTypes = {
  editing: PropTypes.bool,
  dataIndex: PropTypes.string,
  children: PropTypes.node,
  title: PropTypes.any,
  errors: PropTypes.object,
  record: PropTypes.object,
  index: PropTypes.number,
}

export default EditableCell