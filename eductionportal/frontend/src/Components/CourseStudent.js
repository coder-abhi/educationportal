import React, { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from '../Api/axios';
import AuthContext from '../context/AuthProvider';
import { Button, Table, Card, Space } from 'antd'

function CourseStudent() {
  const { id } = useParams();
  const { auth } = useContext(AuthContext);
  const [course, setCourse] = useState(null);
  
  const BASE_URL_CONTENT = `/admin/${auth.id}/courses/${id}/users`;
  const COURSE_URL = `/admin/course/${id}`;
  const UNENROLL_STUDENT_URL = `admin/${id}/users/${auth.id}`;
  const [enrolledStudents, setEnrolledStudents] = useState(null);

  const getData = async () => {
    try {
      const response = await axios.get(BASE_URL_CONTENT
      );
      console.log("In Get Data of Course Student List" + JSON.stringify(response));
      setEnrolledStudents(response.data)
   
    } catch (e) {
      console.log("In Get Data of Course :" + e)
    }
    try {
      const response = await axios.get(COURSE_URL
      );
      console.log("In Get Data of Course by ID" + JSON.stringify(response));
      setCourse(response.data)
   
    } catch (e) {
      console.log("In Get Data of Course by ID :" + e)
    }
  }

  useEffect(() => {
    if (enrolledStudents === null) getData();
  })

  const handleUnenrollStudent = async () => {
    try {
      const response = await axios.delete(UNENROLL_STUDENT_URL
      );
      console.log("In Resp of Delete Student : "+ JSON.stringify(response.data));
      getData();

    } catch (e) {
      console.log(e)
    }

  }
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
      title: 'Action',
      dataIndex: '',
      key: 'x',
    
      render: (_, record) => <Button onClick={() => { handleUnenrollStudent(record.id) }} type="primary" danger ghost>Delete</Button>,
    },
  ];
  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  }

  return <Space
  block={true}
  direction={'vertical'}
  size={['middle']}
  wrap
  align='center'
  >
    <Card
      title={course?.title}
      bordered={false}
      style={{
        width: 1200,
      }}
    >
      <p>Start Date: {course?.startDate}</p>
      <p>End Date: {course?.endtDate}</p>
      <p>Capacity: {course?.capacity}</p>
    </Card>
    <Table
    style={{
      width:1200,
      alignItems:'center'
    }}
    pagination={{ pageSizeOptions: ['5', '10'], showSizeChanger: true }}
      columns={columns} dataSource={enrolledStudents} onChange={onChange} />
  </Space>
}

export default CourseStudent;
