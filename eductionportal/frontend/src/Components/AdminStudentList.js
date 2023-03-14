import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from '../Api/axios';
import { Table, Button } from 'antd';
function AdminStudentList() {
  const [students, setStudents] = useState(null)
  const USERS_URL = "users";
  const navigate = useNavigate()


  const getData = async () => {
    try {
      const response = await axios.get(USERS_URL
      );
      console.log(response.data)
      setStudents(response.data)
    } catch (e) {
    }
  }

  useEffect(() => {
    if (students === null) getData();
  });

  const columns = [
    {
      title: 'First Name',
      dataIndex: 'firstName',

      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => (a.firstName).toLowerCase() < (b.firstName).toLowerCase(),
      sortDirections: ['descend'],
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',

      sorter: (a, b) => a.lastName < b.lastName,
      sortDirections: ['descend'],
    },
    {
      title: 'Email',
      dataIndex: 'email',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (_, record) => <Button onClick={() => { console.log(record.id) }} type="primary" danger ghost>Delete</Button>,
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  return <Table 
  style={{ width: 1200, marginLeft:60 }} 
  pagination={{ pageSizeOptions: ['5', '10'], 
  showSizeChanger: true }}
  columns={columns} 
  dataSource={students} 
  onChange={onChange} />

}

export default AdminStudentList