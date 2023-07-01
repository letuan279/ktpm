import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';
import { Button, Card, Row, message, Select, Input } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons'
import { useData } from '../../context/AppContext';

const Container = styled.div`
  display: flex;
  
`;

const TaskList = styled.div`
  min-height: 100px;
  display: flex;
  flex-direction: column;
  min-width: 341px;
  border-radius: 5px;
  padding: 15px 15px;
  margin-right: 45px;
`;

const TaskColumnStyles = styled.div`
  margin: 8px;
  display: flex;
  width: 100%;
  min-height: 80vh;
`;

const Title = styled.span`
  color: #10957d;
  background: rgba(16, 149, 125, 0.15);
  padding: 2px 10px;
  border-radius: 5px;
  align-self: flex-start;
`;

const Kanban = () => {
    const { dataJson, setDataJson } = useData()
    const columnsFromBackend = {
        "1": {
            title: 'To-do',
            items: dataJson.dataPersonal.filter(item => item.State === "Todo"),
        },
        "2": {
            title: 'In Progress',
            items: dataJson.dataPersonal.filter(item => item.State === "In progress"),
        },
        "3": {
            title: 'Done',
            items: dataJson.dataPersonal.filter(item => item.State === "Done"),
        }
    };
    const [columns, setColumns] = useState(columnsFromBackend);
    const [search, setSearch] = useState("")
    const [workOption, setWorkOption] = useState("")
    // console.log(search, workOption);
    // console.log(columns["1"].items.filter(e => e.TaskName.includes(search) && e.Work.includes(workOption)));

    // console.log(columns);

    useEffect(() => {
        setColumns({
            "1": {
                title: 'To-do',
                items: columnsFromBackend["1"].items.filter(e => e.TaskName.toUpperCase().includes(search.toUpperCase()) && (workOption === undefined ? true : e.Work.includes(workOption))),
            },
            "2": {
                title: 'In Progress',
                items: columnsFromBackend["2"].items.filter(e => e.TaskName.toUpperCase().includes(search.toUpperCase()) && (workOption === undefined ? true : e.Work.includes(workOption))),
            },
            "3": {
                title: 'Done',
                items: columnsFromBackend["3"].items.filter(e => e.TaskName.toUpperCase().includes(search.toUpperCase()) && (workOption === undefined ? true : e.Work.includes(workOption))),
            }
        })
    }, [search, workOption])

    const onDragEnd = (result, columns, setColumns) => {
        if (!result.destination) return;
        const { source, destination } = result;
        if (source.droppableId !== destination.droppableId) {
            const sourceColumn = columns[source.droppableId];
            const destColumn = columns[destination.droppableId];
            const sourceItems = [...sourceColumn.items];
            const destItems = [...destColumn.items];
            const [removed] = sourceItems.splice(source.index, 1);
            destItems.splice(destination.index, 0, removed);
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...sourceColumn,
                    items: sourceItems,
                },
                [destination.droppableId]: {
                    ...destColumn,
                    items: destItems,
                },
            });
            message.success("Thay đổi thành công!")
            const destIDs = destItems.map(i => i.id)
            console.log("DEST_ID", destIDs);
            console.log(destination.droppableId);
            const newDataJsonPersonal = dataJson.dataPersonal.map(item => {
                if (destIDs.includes(item.id)) {
                    return {
                        ...item,
                        "State": destination.droppableId == 1 ? "Todo" : (destination.droppableId == 2 ? "In progress" : "Done")
                    }
                }
                return item
            })
            setDataJson({
                ...dataJson,
                dataPersonal: newDataJsonPersonal
            })
        } else {
            const column = columns[source.droppableId];
            const copiedItems = [...column.items];
            const [removed] = copiedItems.splice(source.index, 1);
            copiedItems.splice(destination.index, 0, removed);
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...column,
                    items: copiedItems,
                },
            })
        }
    };
    return (
        <>
            <div className='kanban-top'>
                <div className='kanban-top-ele'>
                    <span className='ele-title'>Tìm kiếm</span>
                    <Input
                        placeholder="Nhập tên của công việc..."
                        style={{ height: 32, fontWeight: 400, color: "black" }}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className='kanban-top-ele-2'>
                    <span className='ele-title'>Nơi làm việc</span>
                    <Select
                        onChange={e => setWorkOption(e)}
                        className='ele-select'
                        placeholder="Lựa chọn ..."
                        style={{
                            width: 200
                        }}
                        allowClear
                        options={[
                            {
                                value: 'Phòng nghiên cứu',
                                label: 'Phòng nghiên cứu'
                            },
                            {
                                value: 'Trường đại học',
                                label: 'Trường đại học'
                            },
                            {
                                value: 'Nơi thực tập',
                                label: 'Nơi thực tập'
                            }
                        ]}
                    />
                </div>

                {/* <div className='kanban-top-ele-2'>
                    <span className='ele-title'>Time filter</span>
                    <DatePicker.RangePicker></DatePicker.RangePicker>
                </div> */}

                <Button style={{ marginLeft: "560px" }} type='primary'><PlusCircleOutlined /> Thêm</Button>
            </div>
            <DragDropContext
                onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
            >
                <Container>
                    <TaskColumnStyles>
                        {Object.entries(columns).map(([columnId, column], index) => {
                            return (
                                <Droppable key={columnId} droppableId={columnId}>
                                    {(provided, snapshot) => (
                                        <TaskList
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                        >
                                            <Card
                                                bordered={false}
                                                title={index === 0 ? <span>🔴Todo</span> : (index === 1 ? <span>🔵In Progress</span> : <span>🟢Done</span>)}
                                            >
                                                {column.items.map((item, index) => (
                                                    <TaskCard key={item} item={item} index={index} />
                                                ))}
                                                {provided.placeholder}
                                            </Card>
                                        </TaskList>
                                    )}
                                </Droppable>
                            );
                        })}
                    </TaskColumnStyles>
                </Container>
            </DragDropContext>
        </>

    );
};

export default Kanban;
