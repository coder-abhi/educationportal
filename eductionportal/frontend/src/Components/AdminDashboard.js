import React, { useState, useEffect, useContext } from 'react';
import { Outlet, useNavigate } from "react-router-dom";
import axios from '../Api/axios';
import Sidebar from './Sidebar'
import { Drawer, Layout, FloatButton, Input, Modal, Button, Space, Card } from 'antd'
import AuthContext from '../context/AuthProvider';

const { Sider, Content } = Layout;
const { TextArea } = Input;

function AdminDashboard() {
  const { auth } = useContext(AuthContext);

  const GET_QUERY_URL = `admin/getAllQuery`
  const RESOLVE_QUERY_URL = `admin/${auth?.id}/resolveQuery/`;
  const USERS_URL = "users";


  const [students, setStudents] = useState(null);

  const [drawerStatus, setDrawerStatus] = useState(false);
  const [queryFormStatus, setQueryFormStatus] = useState(false);

  const onClose = () => {
    setDrawerStatus(false);
  };

  const onOpen = () => {
    setDrawerStatus(true);
    getAllQueries()
  }

  const getData = async () => {
    try {
      const response = await axios.get(USERS_URL
      );
      console.log(response.data)
      setStudents(response.data)
    } catch (e) {
    }
  }

  // useEffect(() => {
  //   getData();
  // }, []);

  const [answer, setAnswer] = useState('');

  const handleCancel = () => {
    setQueryFormStatus(false);
  }

  const [queries, setQueries] = useState();
  const getAllQueries = async () => {
    try {
      const response = await axios.get(GET_QUERY_URL);
      console.log("In Get all Queries of UserDashboard.js" + JSON.stringify(response.data));
      setQueries(response.data)
    }
    catch (err) {
      console.log("In Get Error all Queries of UserDashboard.js" + err);
    }
  }

  const [currentQuery, setCurrentQuery] = useState(null)

  const resolveQuery = async () => {
    try {
      const response = await axios.put(RESOLVE_QUERY_URL + currentQuery?.id, { answer });
      console.log("In Get all Queries of UserDashboard.js" + JSON.stringify(response.data));
      setCurrentQuery(null)
      getAllQueries();
      setAnswer('');
      setQueryFormStatus(false);
    }
    catch (err) {
      console.log("In Resolve Query Error" + err);
    }
  }

  return (
    <Layout hasSider className='dashboard'>
      <Sidebar Sider={Sider} />
      <Content style={
        {
          textAlign: 'center',
          minHeight: 120,
          lineHeight: '20px',
          width: 1200,
          marginLeft: 180,
          color: '#fff',

          backgroundColor: '#fff',
        }} className="course">

        <Outlet Content={Content} />
      </Content>

      <Drawer title="Queries Section Student" placement="right" onClose={onClose} open={drawerStatus}>
        {queries?.map((ele) => {
          return <Card key={ele.id}>
            <p>
              Q : {ele.question}
            </p>
            <pre>
              Ans : {ele.answer}
            </pre>
            <Button onClick={() => { setQueryFormStatus(true); setCurrentQuery(ele); }} disabled={ele?.resolved}>Resolve</Button>
          </Card>
        })}
      </Drawer>
      <FloatButton onClick={onOpen}>Ask Queries</FloatButton>
      <Modal
        open={queryFormStatus}
        title="Resolve Query"
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={resolveQuery}>
            Submit
          </Button>,
        ]}
      >
        <Space>Question : {currentQuery?.question}</Space>
        <br />
        <TextArea value={answer} onChange={(e) => { setAnswer(e.target.value) }} placeholder={'Ask Question'} />
      </Modal>
    </Layout>
  );
};

export default AdminDashboard;