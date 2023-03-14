import React, { useState, useContext } from 'react';
import { Outlet } from "react-router-dom";
import SidebarUser from './SidebarUser';
import AuthContext from '../context/AuthProvider';
import { Card, Input, Space } from 'antd';
import { Layout, Drawer, FloatButton, Button, Modal } from 'antd';
import axios from '../Api/axios';
const { Sider, Content } = Layout;

function UserDashboard() {
  const { TextArea } = Input;
  const { auth } = useContext(AuthContext);
  const QUERY_URL = `users/${auth?.id}/addQuery`
  const GET_QUERY_URL = `admin/getAllQuery`

  const [drawerStatus, setDrawerStatus] = useState(false);
  const [queryFormStatus, setQueryFormStatus] = useState(false);
  const [question, setQuestion] = useState('');

  const onOpen = () => {
    setDrawerStatus(true)
    getAllQueries()
  }

  const onClose = () => {
    setDrawerStatus(false);
  };

  const handleSubmitQuery = async () => {
    try {
      const response = await axios.post(QUERY_URL, {
        question
      }

      );
      console.log("response UserDashboard.js in Query Handle:" + JSON.stringify(response));
      getAllQueries();
      setQuestion('');
      setQueryFormStatus(false);
    } catch (err) {
      console.log(err);
    }
  }

  const handleCancel = () => {
    setQuestion('');
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
  
  return (
    <Layout hasSider className='dashboard'>
      <SidebarUser Sider={Sider} />

      <div className='dashboard-content'>
        <Content style={
          {
            textAlign: 'center',
            minHeight: 120,
            lineHeight: '20px',
            width: 1200,
            marginLeft: 120,
            color: '#fff',

            backgroundColor: '#fff',
          }} className="course">


          <Outlet />

          
        </Content>
      </div>

      <Drawer title="Queries Section Student" placement="right" onClose={onClose} open={drawerStatus}>
        <Button onClick={() => { setQueryFormStatus(true) }}>Raise Query</Button>
        {queries?.map((ele) => {
          return <Card key={ele.id}>
            <p>
              Q : {ele.question}
            </p>
            <pre>
              Ans : {ele.answer}
            </pre>
          </Card>
        }
        )
        }

      </Drawer>
      <FloatButton onClick={onOpen}>Ask Queries</FloatButton>
      <Modal
        open={queryFormStatus}
        title="Raise Query"
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleSubmitQuery}>
            Submit
          </Button>,
        ]}
      >
        <Space>Ask Your Dought</Space>
        <br />
        <TextArea value={question} onChange={(e) => { setQuestion(e.target.value) }} placeholder={'Ask Question'} />
      </Modal>
    </Layout>
  );
}

export default UserDashboard;
