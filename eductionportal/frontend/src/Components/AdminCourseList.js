import React, { useContext, useEffect, useState } from 'react'
import CourseBox from './CourseBox'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthProvider';
import { toast } from 'react-toastify';
import { Space } from 'antd';
import axios from '../Api/axios';



function AdminCourseList({ forStudent }) {
  const navigate = useNavigate()


  const { auth } = useContext(AuthContext);
  const [courses, setCourses] = useState();

  const GET_ALL_COURSE = `admin/${auth?.id}/courses`;



  useEffect(() => {
    console.log("FOR COURSE STUDENT LIST : " + forStudent);
    if (auth === null || auth === undefined) {
      toast.info("Not Authorized Login First", { autoClose: 200 });
      navigate('../');
    }
  })

  const getAllCourses = async () => {
    try {
      const response = await axios.get(GET_ALL_COURSE);
      console.log("In Get all Courses" + JSON.stringify(response.data));
      setCourses(response.data)
    }
    catch (err) {
      console.log("In Get Error all Queries of UserDashboard.js" + err);
    }
  }

  useEffect(() => {
    if (courses === null || courses === undefined) getAllCourses();
  })


  return (
    <Space direction="horizontal" size={10} className='admin-course-list'>
      {courses ? courses.map((ele) => {
        return <div onClick={() => {
          forStudent ? navigate('../courseStudentList/' + ele.id) : navigate('../course/' + ele.id)
        }} className="course_box_len">
          <CourseBox title={ele.title} description={ele.description} capacity={ele.capacity} forStudent={forStudent} />
        </div>
      }) : null}
    </Space>
  )
}

export default AdminCourseList