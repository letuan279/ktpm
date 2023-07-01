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
import { personalData } from "../data.js";
import dataJson from '../data.json'
import { useState } from "react";

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
                    label="Tên nhóm"
                    name="groupName"
                    rules={[
                        { required: true, message: "Hãy điền trường này" }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Nơi làm việc"
                    name="workLocation"
                    rules={[
                        { required: true, message: "Hãy điền trường này" }
                    ]}
                >
                    <Select options={[
                        {
                            value: 'Phòng nghiên cứu',
                            label: 'Phòng nghiên cứu'
                        },
                        {
                            value: 'Trường đại học',
                            label: 'Trường đại học'
                        },
                        {
                            value: 'Chỗ làm thêm',
                            label: 'Chỗ làm thêm'
                        }
                    ]} />
                </Form.Item>
                <Form.Item
                    label="Thành viên"
                    name="member"
                    rules={[
                        { required: true, message: "Hãy điền trường này" }
                    ]}
                >
                    <Select
                        mode="multiple"
                        showArrow
                        tagRender={({ label, value }) => <Tag color="blue">{value}</Tag>}
                        style={{
                            width: '100%',
                        }}
                        options={dataJson.members.map(item => {
                            return {
                                label: item,
                                value: item
                            }
                        })}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};
const project = [
    {
        title: "TÊN NHÓM",
        dataIndex: "name",
        width: "32%",
    },
    {
        title: "NƠI LÀM VIỆC",
        dataIndex: "workSpace",
    },
    {
        title: "SỐ LƯỢNG THÀNH VIÊN",
        dataIndex: "numberOfMember"
    },
    {
        title: "MỨC ĐỘ HOÀN THÀNH",
        dataIndex: "completion",
    },
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

const getPercent = (data) => {
    const len = data.length;
    const doneTask = data.filter(item => item.State === "Done")
    return parseFloat(doneTask.length / len * 100).toFixed(0);
}

const dataReal = dataJson.dataGroup.map((item, index) => {
    return {
        key: item.id,
        name: item.groupName,
        numberOfMember: item.member.length,
        member: item.member,
        data: item.data,
        workSpace: (<span style={{ padding: "2px 5px", borderRadius: "5px", background: "#a1af2f", color: "white", fontWeight: 600 }} >{item.workLocation}</span>),
        completion: (
            <>
                <div className="ant-progress-project">
                    <Progress percent={getPercent(item.data)} size="small" />
                    {/* <span>
                        <Link to="/">
                            <img src={pencil} alt="" />
                        </Link>
                    </span> */}
                </div>
            </>
        ),
    }
})


function GroupList({ state, onSave, onCancel }) {
    const [data, setData] = useState(dataReal)
    const [visible, setVisible] = useState(false);

    const onChange = (e) => {
        console.log(e);
        setData([
            {
                key: e.title,
                name: e.groupName,
                numberOfMember: e.member.length,
                data: [],
                member: e.member,
                workSpace: (<span style={{ padding: "2px 5px", borderRadius: "5px", background: "#a1af2f", color: "white", fontWeight: 600 }} >{e.workLocation}</span>),
                completion: (
                    <>
                        <div className="ant-progress-project">
                            <Progress percent={0} size="small" />
                            {/* <span>
                                <Link to="/">
                                    <img src={pencil} alt="" />
                                </Link>
                            </span> */}
                        </div>
                    </>
                ),
            },
            ...data,
        ])
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
                            <p>Tên: {<span style={{ fontWeight: 600 }}>{selectedRow.name}</span>}</p>
                            <p>Nơi làm việc: {<span style={{ padding: "2px 5px", borderRadius: "5px", background: "#a1af2f", color: "white", fontWeight: 600 }} >{selectedRow.workSpace}</span>}</p>
                            <p>Số lượng công việc sắp làm: <b>{selectedRow.data === [] ? 0 : selectedRow.data.filter(i => i.State === "Todo").length}</b></p>
                            <p>Số lượng công việc đang làm: <b>{selectedRow.data === [] ? 0 : selectedRow.data.filter(i => i.State === "In progress").length}</b></p>
                            <p>Số lượng công việc đã hoàn thành: <b>{selectedRow.data === [] ? 0 : selectedRow.data.filter(i => i.State === "Done").length}</b></p>
                            <p>Số lượng công việc đang được review: <b>{selectedRow.data === [] ? 0 : selectedRow.data.filter(i => i.State === "Review").length}</b></p>
                            <p>Thành viên: </p>
                            {selectedRow.member.map(i => (
                                <Tag color="purple">{i}</Tag>
                            ))}
                        </div>
                    )}
                </Modal>
            </div>
        </>
    );
}

export default GroupList;