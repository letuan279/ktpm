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
    Select,
    Popconfirm,
    InputNumber
} from "antd";
import { ToTopOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
// import { personalData } from "./data";
import { useState } from "react";
import moment from "moment";
import { useData } from "../context/AppContext";
// var fs = require('bro-fs');

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
            title="Thêm công việc mới"
            okText="Ok"
            onCancel={() => {
                setVisible(false);
            }}
            onOk={handleCreate}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    label="Tên công việc"
                    name="title"
                    rules={[
                        { required: true, message: "Please input this field" }
                    ]}
                >
                    <Input style={{ fontWeight: 400, color: "black" }} />
                </Form.Item>
                <Form.Item
                    label="Mô tả"
                    name="desc"
                    rules={[
                        { required: true, message: "Please input this field" }
                    ]}
                >
                    <Input.TextArea style={{ fontWeight: 400, color: "black" }} />
                </Form.Item>
                <Form.Item
                    label="Nơi làm việc"
                    name="work"
                    rules={[
                        { required: true, message: "Please input this field" }
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
                    name="startDay"
                    label="Ngày bắt đầu"
                    rules={[
                        { required: true, message: "Please input this field" }
                    ]}
                >
                    <DatePicker onChange={onChange} style={{ width: '60%', height: '35px' }} />
                </Form.Item>
                <Form.Item
                    name="endDay"
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

const CreateHoKhauModal = () => {
    const [visible, setVisible] = useState(false);

    const onChange = async (e) => {
        
    }

    const onCreate = (values) => {
        onChange(values);
        setVisible(false);
    };

    return (
        <CreateForm
            visible={visible}
            setVisible={setVisible}
            onCreate={onCreate}
        />
    )
}

export default CreateHoKhauModal;