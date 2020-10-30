import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'antd';
import { getContacts, updateContact } from '../reducers/contacts';
import SearchBar from '../components/searchbar';
import { PAGE_SIZE, INITIAL_PAGE } from '../constant';
import EditableCell from '../components/editableCell';
import { Form } from 'formik-antd';
import { Formik } from 'formik';
import { ContactValidation } from '../utils';

const ContactsTable = () => {
  const dispatch = useDispatch();
  const { data, totalCounts, isLoading, currentPage } = useSelector(state => state.contacts);
  const [editingItem, setEditingItem] = useState(null);
  const [search, setSearch] = useState({ name: '', phoneNumber: ''});

  useEffect(() => {
    dispatch(getContacts(INITIAL_PAGE, search))
  }, [dispatch, search])

  const isEditing = (record) => !!editingItem ? record._id === editingItem._id : false;
  //handle when click edit
  const edit = (record) => {
    setEditingItem(record);
  };
  //handle when click cancel of edit-mode
  const cancel = () => {
    setEditingItem(null);
  };
  //handle when navigate pagination
  const handlePageChange = page => {
    cancel();
    dispatch(getContacts(page, search));
  }
  //handle when search pararms changed
  const handleSearchChange = (field, value) => {
    setSearch({...search, [field]: value})
  }
  //handle when click save of edit-mode
  const handleEdit = (values) => {
    const id = editingItem._id;
    dispatch(updateContact(id, values))
    setEditingItem(null);
  };
  // basic colums of table
  const columns = [
    {
      title: 'No',
      render: (_, record, index) => (currentPage-1) * PAGE_SIZE + index + 1,
      width: '5%',
    },
    {
      title: () => 
        <div className="search-wrapper">
          <span>Name: </span>
          <SearchBar field={"name"} onChange={handleSearchChange} placeholder="Search by name ..."/>
        </div>,
      dataIndex: 'name',
      width: '38%',
      editable: true,
    },
    {
      title: () => 
        <div className="search-wrapper">
          <span>Phone Number: </span>
          <SearchBar field={"phoneNumber"} onChange={handleSearchChange} placeholder="Search by phone number ..."/>
        </div>,
      dataIndex: 'phoneNumber',
      width: '38%',
      editable: true,
    },
    {
      title: 'Operation',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <div className="operation">
            <button type="submit" >Save</button>
            <button onClick={cancel}>Cancel</button>
          </div>
        ) : (
          <div className="operation">
            <div disabled={!!editingItem} onClick={() => edit(record)}>
              Edit
            </div>
          </div>
        );
      },
    },
  ];
  //changed columns when it is in the editing-mode
  const mergedColumns = errors => {
    return columns.map((col) => {
      if (!col.editable) {
        return col;
      }

      return {
        ...col,
        onCell: (record) => ({
          record,
          dataIndex: col.dataIndex,
          title: col.title,
          errors, // errors from input validation
          editing: isEditing(record),
        }),
      };
    })
  };
  //intitial values for contact-form when it is in the editing-mode
  const getInitialValues = item => {
    if (!item) return {};
    const { name, phoneNumber } = item;
    return {
      name,
      phoneNumber
    }
  }
  return (
    <Formik
      initialValues={getInitialValues(editingItem)}
      validationSchema={ContactValidation}
      enableReinitialize
      onSubmit={handleEdit}
    >
    {({ errors }) => (
      <Form >
        <Table
          components={{
            body: {
            cell: EditableCell,
            },
          }}
          bordered
          dataSource={data}
          columns={mergedColumns(errors)}
          rowClassName="editable-row"
          loading={isLoading}
          rowKey='_id'
          pagination={{
            onChange: handlePageChange,
            total: totalCounts,
            pageSize: PAGE_SIZE,
            current: currentPage
          }}
        />
      </Form>
    )}
    </Formik>
  );
};

export default ContactsTable;