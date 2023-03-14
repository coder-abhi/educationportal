
import React from 'react';
import { Card } from 'antd';
const { Meta } = Card;
const CourseBox = ({ title, description, capacity }) => {
  return (
    <Card hoverable className="course-container"  
    style={{
      width: 300,
    }}>
          <Meta
              title={title}
              description={description}
            />
        <p className="course-capacity">Capacity: {capacity}</p>
    </Card>
  );
};
export default CourseBox;