import React ,{useContext, useEffect, useState} from 'react'
import CourseBox from './CourseBox'
import '../CSS/AdminCourseList.css'
import axios from '../Api/axios';
import { useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthProvider';
import { toast } from 'react-toastify';
import { Space } from 'antd';

function EnrolledCourse() {
  const { auth } = useContext(AuthContext);
  const GET_ENROLLED = `users/${auth?.id}/enrolled-courses`;
  const navigate = useNavigate()

  const [courses, setCourses] = useState();

  const getData = async () => {

    try {
      const response = await axios.get(GET_ENROLLED
      );
      console.log("In Get API of Enrolled Student : "+response.data)
      setCourses(response.data)
    } catch (e) {
      console.log("In Error of Enrolled Courses : "+e);
    }
  }

  useEffect(() => {
    if(courses === null || courses === undefined) getData();

  });
  

  useEffect(() => {
      if(auth === null || auth === undefined) {
          toast.info("Not Authorized Login First",{autoClose:200});
          navigate('../');
        }
  })

  return (
    
    <Space className='enrolled-courses admin-course-list'>
    {courses? courses.map( (ele)=>{
        return <div onClick={()=>{ navigate('../course/'+ele.id)}} className="course_box_len"> 
        <CourseBox title={ele.title} description={ele.description} capacity={ele.capacity} /> 
         </div>
    }):null}
</Space>
  )
}

export default EnrolledCourse