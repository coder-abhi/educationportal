import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from '../Api/axios';
import { Button, Table, Layout, Card, Space,Input,Select, Modal, Form, DatePicker } from 'antd'
const { Option } = Select;

function Course() {
  const { id } = useParams();
  const BASE_URL = '/admin/addContent/' + id;
  const DELETE_CONTENT_URL = `admin/course/${id}/content/`;
  const BASE_URL_CONTENT = "/admin/course/" + id;
  const ASSIGNMENT_URL = `users/courses/${id}/getAssignment`;
  const DELETE_ASSIGNMENT_URL = `admin/course/${id}/assignment/`;
  const ASSIGNMENT_ADD_URL = `/admin/course/${id}/addAssignment`

  const [form] = Form.useForm();

  const [content, setContent] = useState(null);

  const [course, setCourse] = useState(null);


  const getData = async () => {
    try {
      const response = await axios.get(BASE_URL_CONTENT
      );
      console.log("In Get Data of Course" + JSON.stringify(response));
      setCourse(response.data)
      setContent(response.data.contents)
    } catch (e) {
      console.log("In Get Data of Course :" + e)
    }
  }

  useEffect(() => {
    if (course === null){ 
      getData()
      getAssignment()
    };
  })

  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [assignment, setAssignment] = useState(null);
  const [assignmentForm, setAssignmentForm] = useState(false);


  const handleAddContent = async () => {
    if (newTitle.length === 0 || newContent.length === 0) return;
    try {
      const response = await axios.post(BASE_URL,
        { 'contentName': newTitle, 'link': newContent }

      );
      setNewTitle('')
      setNewContent('')
      toast('content Succefuly added !', { autoClose: 200 });
      getData();

    } catch (e) {
      console.log(e)
      alert("Something went wrong")
    }

  }
  const handleDeleteContent = async (cont_id) => {
    try {
      const response = await axios.delete(DELETE_CONTENT_URL+cont_id
      );
      console.log("In Delete Contentof"+cont_id+" : "+JSON.stringify(response));
      toast('content Deleted !', { autoClose: 200 });
      getData();

    } catch (e) {
      console.log(e)
    }
  }
  const handleDeleteAssignment = async (assignId) => {
    try {
      const response = await axios.delete(DELETE_ASSIGNMENT_URL+assignId
      );
      toast('Assignment Deleted !', { autoClose: 200 });
      getAssignment();
    } catch (e) {
      console.log(e)
    }
  }
  const getAssignment = async() => {
    try {
      const response = await axios.get(ASSIGNMENT_URL
        );
        console.log("In Get Assignment of Course"+JSON.stringify(response));
        setAssignment(response.data)
  }catch(e){
  console.log("In Get Data of Course :"+e)
  }}

  // Ant Design Table data
  const columns2 = [
    {
      title: 'Question',
      dataIndex: 'description',
  
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => (a.firstName).toLowerCase() < (b.firstName).toLowerCase(),
      sortDirections: ['descend'],
    },
    {
      title: 'Language',
      dataIndex: 'title',
  
      sorter: (a, b) => a.lastName < b.lastName,
      sortDirections: ['descend'],
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
    
      render: (_,record) => <Button onClick={()=>{handleDeleteAssignment(record.id)}} danger ghost>Delete</Button>,
    },                      //c<Checkbox onChange={onChange}>Checkbox</Checkbox>;
  ];
  const columns = [
    {
      title: 'Topic',
      dataIndex: 'contentName',
  
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => (a.firstName).toLowerCase() < (b.firstName).toLowerCase(),
      sortDirections: ['descend'],
    },
    {
      title: 'Resources',
      dataIndex: 'link',
  
      sorter: (a, b) => a.lastName < b.lastName,
      sortDirections: ['descend'],
      render: (_, record) => <a href={"https://"+record.link} target={'_blank'}> {record.link}</a>
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
    
      render: (_, record) => <Button onClick={() => { handleDeleteContent(record.id) }} type="primary" danger ghost>Delete</Button>,
    },
  ];
  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  }

  // Input Data
  const selectBefore = (
    <Select defaultValue="http://">
      <Option value="https://">https://</Option>
    </Select>
  );
  console.log("Course Running : "+id);

  // Adding Assignment
  const [date, setDate] = useState();
  const onFinish = async(values) => {
    console.log("Course ID : "+id);
    try {
      const response = await axios.post(ASSIGNMENT_ADD_URL,
        {         description:values.description,
        dueDate:date,
        title:values.title}
      );
          console.log(JSON.stringify(response.data));
          form.resetFields();
          getAssignment();
          setAssignmentForm(false);
          
    } catch (err) {
      setAssignmentForm(false);
      if (err.code === "ERR_NETWORK") {
        toast.error("Server Not Responding Logged In", { position: "top-right", autoClose: 2000 })
        // navigate('../')
      }
      else if(err.code === "ERR_BAD_REQUEST"){
        console.log(err);
        toast.error("Invalid Credintial", { position: "top-right", autoClose: 2000, })
      }
      else{
        
        toast.error("Something Went Wrong in LogIn", { position: "top-right", autoClose: 2000, })
      }
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const onChangeDate = (date, dateString)=>{
    setDate(dateString)
  }
  const handleCancel = ()=>{

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
      <Space block={true} align='center' style={{
        padding:10
      }} >
      <Input style={{
        width:400
      }}
       value={newTitle} onChange={(e) => { setNewTitle(e.target.value) }} placeholder="Enter Content Title" />
  
           <Input maxLength={20} style={{
            width:500
           }}
            addonBefore={selectBefore} value={newContent} placeholder="Enter Content Link" onChange={(e) => { setNewContent(e.target.value); }} />
    <Button onClick={handleAddContent}>Add Content</Button>
    <Button onClick={()=>{setAssignmentForm(true)}} >Add Assignment</Button>
      </Space>
    <Table
    style={{
      width:1200,
      alignItems:'center'
    }}
    
    caption="Content List"
    pagination={{ pageSizeOptions: ['5', '10'], showSizeChanger: true }}
      columns={columns} dataSource={content} onChange={onChange} />
    <Table
    style={{
      width:1200,
      alignItems:'center'
    }}
    pagination={{ pageSizeOptions: ['5', '10'], showSizeChanger: true }}
      columns={columns2} dataSource={assignment} onChange={onChange} />

<Modal
        open={assignmentForm}
        title="Add Assignment"
        closable={true}
        footer={[
          <Button key="back" onClick={()=>{setAssignmentForm(false)}}>
            Cancel
          </Button>
        ]}
        >
        <Form title='Assignment'
    name="basic"
    labelCol={{span: 8}}
    wrapperCol={{ span: 16}}
    style={{
      maxWidth: 600,
    }}
    initialValues={{
      remember: true,
    }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    form={form}
    autoComplete="off"
  >
    <Form.Item
      label="Question"
      name="description"
      rules={[
        {
          required: true,
          message: 'Please input your Question!',
        },
      ]}
    >
      <Input maxLength={80}/>
    </Form.Item>

    <Form.Item
      label="Due Date"
      name="due_date"
      rules={[
        {
          required: true,
          message: 'Please input your Due Date!',
        },
      ]}
    >
      <DatePicker onChange={onChangeDate} format='YYYY-MM-DD' style={{width:'100%'}}/>
    </Form.Item>

    <Form.Item
      label="Language"
      name="title"
      rules={[
        {
          required: true,
          message: 'Please input Target Language',
        },
      ]}
      wrapperCol={{
        offset: 0,
        span: 16,
      }}
    >
      <Select
  
      options={[
        {
          value: 'python',
          label: 'Python',
        },
        {
          value: 'java',
          label: 'Java',
        },
        {
          value: 'cpp',
          label: 'C++',
        },
        {
          value: 'javascript',
          label: 'JavaScript',
        },
        {
          value: 'text',
          label: 'Text Only',
        },
      ]}
    />
    </Form.Item>

    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
      </Modal>

  </Space>
}

export default Course
