import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Sidebar.css';
function SidebarUser(){
    const navigate = useNavigate(); 

    return(
    <div  className="sidebar">
   
    <button className='sidebar-btns' onClick={()=>{navigate('enrolled_courses')}}>Enrolled Course</button><br />
    <button className='sidebar-btns' onClick={()=>{navigate('available_courses')}}>Available Course</button><br />
    <button className='sidebar-btns' onClick={()=>{navigate('code_editor/1')}}> Practice Code </button>
    </div>
    )
}
export default SidebarUser;