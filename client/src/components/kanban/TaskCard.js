import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from '@emotion/styled';
import './index.css'
import { EllipsisOutlined } from '@ant-design/icons'
// import CustomAvatar from '../TableComponents/CustomAvatar'
// import { ReactComponent as RedArrow } from '../../assets/icons/High.svg'
// import { ReactComponent as YellowArrow } from '../../assets/icons/Medium.svg'
// import { ReactComponent as BlueArrow } from '../../assets/icons/Low.svg'

const TaskInformation = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 10px;
  padding-bottom: 5px;
  min-height: 95px;
  border-radius: 3px;
  border: 1px solid;
  border-color: #ccc;
  max-width: 300px;
  /* background: ${({ isDragging }) =>
        isDragging ? 'rgba(255, 59, 59, 0.15)' : 'white'}; */
  background: white;
  margin-top: 15px;
  margin-left: 5px;
  &:hover {
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  }

  .secondary-details {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    font-size: 12px;
    font-weight: 400px;
    color: #7d7d7d;
  }
  /* .priority{ */
  /* margin-right: 12px; */
  /* align-self: center;
    svg{
      width: 12px !important;
      height: 12px !important;
      margin-right: 12px; */
  /* margin-top: 2px; */
  /* } */
  /* } */
`;

const TaskCard = ({ item, index }) => {
    return (
        <Draggable key={item.id} draggableId={item.id} index={index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <TaskInformation>
                        <div className=''>
                            <p className='task-name'>{item.TaskName}</p>
                            <div className='tag'>{item.Work}</div>
                        </div>

                        <span>{item.Description}</span>

                        <div className="secondary-details">
                            <p style={{ marginTop: "5px" }}>
                                <span>
                                    {item.StartDate} - {item.EndDate}
                                </span>
                            </p>
                        </div>
                    </TaskInformation>
                </div>
            )}
        </Draggable>
    );
};

export default TaskCard;
