import {
    Row,
    Col,
    Card,
    Radio,
    Table,
    Upload,
    message,
    Progress,
    Button,
    Avatar,
    Typography,
    Form,
    Input,
    Modal,
    DatePicker,
    Tag,
    Select
} from "antd";
import { ToTopOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
// import { personalData } from "./data";
import { useState } from "react";
import dataJson from '../data.json'
// var fs = require('bro-fs');

const { Title } = Typography;

const CreateForm = (props) => {
    const { visible, setVisible, onCreate } = props;
    const [form] = Form.useForm();

    const onChange = (date, dateString) => {
        console.log(date, dateString);
    };

    const handleCreate = () => {
        form
            .validateFields()
            .then((values) => {
                form.resetFields();
                onCreate(values);
            })

            .catch((info) => {
                console.log("Validate Failed:", info);
            });
        setVisible(false);
    };
    return (
        <Modal
            visible={visible}
            title="Add New Task"
            okText="Ok"
            onCancel={() => {
                setVisible(false);
            }}
            onOk={handleCreate}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    label="Nhóm"
                    name="groupName"
                    rules={[
                        { required: true, message: "Please input this field" }
                    ]}
                >
                    <Select options={dataGroup.map(e => {
                        return {
                            value: e.groupName,
                            label: e.groupName
                        }
                    })}
                    ></Select>
                </Form.Item>
                <Form.Item
                    label="Tên công việc"
                    name="TaskName"
                    rules={[
                        { required: true, message: "Please input this field" }
                    ]}
                >
                    <Input style={{ fontWeight: 400, color: "black" }} />
                </Form.Item>
                <Form.Item
                    label="Người giao việc"
                    name="Assigner"
                    rules={[
                        { required: true, message: "Please input this field" }
                    ]}

                >
                    <Select options={[{
                        label: "Hoàng Danh Quân",
                        value: "Hoàng Danh Quân",
                    }]} />
                </Form.Item>
                <Form.Item
                    label="Người thực hiện"
                    name="Assignee"
                    rules={[
                        { required: true, message: "Please input this field" }
                    ]}

                >
                    <Select options={dataJson.members.map(item => {
                        return {
                            label: item,
                            value: item
                        }
                    })} />
                </Form.Item>
                <Form.Item
                    label="Người hỗ trợ"
                    name="Support"
                    rules={[
                        { required: true, message: "Please input this field" }
                    ]}

                >
                    <Select options={dataJson.members.map(item => {
                        return {
                            label: item,
                            value: item
                        }
                    })} />
                </Form.Item>
                <Form.Item
                    name="StartDate"
                    label="Ngày bắt đầu"
                    rules={[
                        { required: true, message: "Please input this field" }
                    ]}
                >
                    <DatePicker onChange={onChange} style={{ width: '60%', height: '35px' }} />
                </Form.Item>
                <Form.Item
                    name="EndDate"
                    label="Dự kiến kết thúc"
                    rules={[
                        { required: true, message: "Please input this field" }
                    ]}
                >
                    <DatePicker onChange={onChange} style={{ width: '60%', height: '35px' }} />
                </Form.Item>


            </Form>
        </Modal>
    );
};
const dataGroup = dataJson.dataGroup
const project = [
    {
        title: "NHÓM",
        dataIndex: "groupName",
        width: "18%",
        filters: dataGroup.map(e => {
            return {
                value: e.groupName,
                text: e.groupName
            }
        }),
        onFilter: (value, record) => record.groupName.indexOf(value) === 0,
    },
    {
        title: "TÊN CÔNG VIỆC",
        dataIndex: "name",
        width: "25%",
        render: text => text.length > 40 ? text.slice(0, 40) + '...' : text
    },
    {
        title: "NGƯỜI GIAO VIỆC",
        dataIndex: "Assigner",
        render: text => (<Tag color="purple">{text}</Tag>),
        filters: dataJson.members.map(item => {
            return {
                text: item,
                value: item
            }
        }),
        onFilter: (value, record) => record.Assigner.indexOf(value) === 0,
    },
    {
        title: "NGƯỜI THỰC HIỆN",
        dataIndex: "Assignee",
        render: text => (<Tag color="purple">{text}</Tag>),
        filters: dataJson.members.map(item => {
            return {
                text: item,
                value: item
            }
        }),
        onFilter: (value, record) => record.Assignee.indexOf(value) === 0,
    },
    {
        title: "NGƯỜI HỖ TRỢ",
        dataIndex: "Support",
        render: text => (<Tag color="purple">{text}</Tag>),
        filters: dataJson.members.map(item => {
            return {
                text: item,
                value: item
            }
        }),
        onFilter: (value, record) => record.Support.indexOf(value) === 0,
    },
    {
        title: "TRẠNG THÁI",
        dataIndex: "state",
        render: item => returnTag(item),
        filters: [
            {
                text: "Done",
                value: "Done"
            },
            {
                text: "In progress",
                value: "In progress"
            },
            {
                text: "Todo",
                value: "Todo"
            }
        ],
        onFilter: (value, record) => record.state.indexOf(value) === 0,
    }
];

function convertPercentToNumber(percentString) {
    // Bỏ ký tự % cuối chuỗi
    percentString = percentString.slice(0, -1);
    // Chuyển chuỗi thành số nguyên
    return parseInt(percentString);
}

const returnTag = (string) => {
    if (string === "Done") return <Tag color="green">Done</Tag>
    if (string === "In progress") return <Tag color="blue">In progress</Tag>
    if (string === "Todo") return <Tag color="red">Todo</Tag>
}



// const dataShow = dataJson.dataPersonal.sort((a, b) => convertPercentToNumber(a.Result) - convertPercentToNumber(b.Result))
let dataShow = []
for (let i = 0; i < dataGroup.length; ++i) {
    const groupTask = dataGroup[i].data.map(item => {
        return {
            "groupName": dataGroup[i].groupName,
            "workLocation": dataGroup[i].workLocation,
            ...item
        }
    })
    dataShow = [...dataShow, ...groupTask]
}
const dataReal = dataShow.map((item, index) => {
    return {
        key: item.TaskName,
        name: item.TaskName,
        from: item.StartDate,
        to: item.EndDate,
        state: item.State,
        groupName: item.groupName,
        Assigner: item.Assigner,
        Assignee: item.Assignee,
        Support: item.Support,
        work: (<span style={{ padding: "2px 5px", borderRadius: "5px", background: "#a1af2f", color: "white", fontWeight: 600 }} >{item.workLocation}</span>),
    }
})



function GroupTask({ state, onSave, onCancel }) {
    const [data, setData] = useState(dataReal)
    const [visible, setVisible] = useState(false);

    const onChange = async (e) => {
        console.log(e);
        setData([
            {
                key: e.TaskName,
                name: e.TaskName,
                from: e.StartDate.format("DD/MM/YYYY"),
                to: e.EndDate.format("DD/MM/YYYY"),
                state: "Todo",
                groupName: e.groupName,
                Assigner: e.Assigner,
                Assignee: e.Assignee,
                Support: e.Support
            },
            ...data,
        ])
        message.success("Tạo mới thành công!")
    }
    const onCreate = (values) => {
        onChange(values);
        setVisible(false);
    };

    const [selectedRow, setSelectedRow] = useState(null);

    const handleRowClick = (record, rowIndex) => {
        setSelectedRow(record);
    };

    const handleModalClose = () => {
        setSelectedRow(null);
    };



    return (
        <>
            <div className="tabled">
                <Row gutter={[24, 0]}>
                    <Col xs="24" xl={24}>
                        <Card
                            bordered={false}
                            className="criclebox tablespace mb-24"
                            title="Danh sách"
                            extra={
                                <>
                                    <Button
                                        type="primary"
                                        onClick={() => setVisible(true)}
                                    >
                                        <PlusCircleOutlined />
                                        Thêm
                                    </Button>
                                    <CreateForm
                                        visible={visible}
                                        setVisible={setVisible}
                                        onCreate={onCreate}
                                    />
                                </>
                            }
                        >
                            <div className="table-responsive">
                                <Table
                                    columns={project}
                                    dataSource={data}
                                    pagination={false}
                                    className="ant-border-space"
                                    onRow={(record, rowIndex) => {
                                        return {
                                            onClick: () => {
                                                handleRowClick(record, rowIndex);
                                            },
                                        };
                                    }}
                                    scroll={{ y: 470 }}
                                />
                            </div>
                        </Card>
                    </Col>
                </Row>
                <Modal
                    visible={selectedRow !== null}
                    title={<span style={{ fontWeight: 600 }}>Thông tin chi tiết</span>}
                    onCancel={handleModalClose}
                    footer={null}
                >
                    {selectedRow !== null && (
                        <div>
                            <p>Nhóm: {<span style={{ fontWeight: 600 }}>{selectedRow.groupName}</span>}</p>
                            <p>Tên: {<span style={{ fontWeight: 600 }}>{selectedRow.name}</span>}</p>
                            <p>Người giao việc: {<Tag color="purple" >{selectedRow.Assigner}</Tag>}</p>
                            <p>Người thực hiện: {<Tag color="purple">{selectedRow.Assignee}</Tag>}</p>
                            <p>Người hỗ trợ: {<Tag color="purple">{selectedRow.Support}</Tag>}</p>
                            <p>Thời gian: {selectedRow.from} - {selectedRow.to}</p>
                            <p>Trạng thái: {selectedRow.state}</p>
                        </div>
                    )}
                </Modal>
            </div>
        </>
    );
}

export default GroupTask;