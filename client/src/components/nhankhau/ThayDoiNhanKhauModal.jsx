import React, { useState } from 'react'
import { Row, Col, Card, Radio, Table, Upload, message, Progress, Button, Avatar, Typography, Form, Input, Modal, DatePicker, Tag, Select, Popconfirm,
    InputNumber
} from "antd";
import { BACK_END_URL } from '../../context/const';
import { useData } from '../../context/NewAppContext';
import moment from 'moment';

const ThayDoiNhanKhauModal = (props) => {
    const {
        selectedRecord, 
        setSelectedRecord, 
        editModalVisible, 
        setEditModalVisible,
    } = props

    const {hokhau, setHokhau, nhankhau, setNhanKhau} = useData()

    const returnIdNhanKhau = (soCMND) => {
        const nk = nhankhau.find(item => item.soCMND === soCMND)
        return nk.id
    }

    const AddForm = ({ visible, onCreate, onCancel }) => {
        const [form] = Form.useForm();
        return (
            <Modal visible={visible} title="Chuyển đi" okText="Lưu" cancelText="Hủy" onCancel={onCancel} onOk={() => {
                form.validateFields().then((values) => {
                    form.resetFields();
                    onCreate(values);
                }).catch((info) => {
                    console.log('Validate Failed:', info);
                });
            }}>
                <Form form={form} layout="vertical">
                    <Form.Item
                        label="Ngày chuyển"
                        name="ngayChuyen"
                        rules={[
                            { required: true, message: "Hãy điền trường này" }
                        ]}
                    >
                        <DatePicker></DatePicker>
                    </Form.Item>
                    <Form.Item
                        label="Nơi chuyển"
                        name="noiChuyen"
                        rules={[
                            { required: true, message: "Hãy điền trường này" }
                        ]}
                    >
                        <Input></Input>
                    </Form.Item>
                    <Form.Item
                        label="Ghi chú"
                        name="ghiChu"
                        rules={[
                            { required: true, message: "Hãy điền trường này" }
                        ]}
                    >
                        <Input></Input>
                    </Form.Item>
                </Form>
            </Modal>
        );
    };

    const handleAddSubmit = async (values) => {
        const fetchData = async () => {
        try {
            const id = returnIdNhanKhau(selectedRecord.soCMND)
            const res = await fetch(`${BACK_END_URL}/nhankhau/thaydoi/${id}`, {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values)
            });
            const data = await res.json();
            if(data.success === true){
                message.success('Chuyển thành công!')
                setEditModalVisible(false);
            }
          } catch (error) {
            console.error(error);
          }
        }

        await fetchData()
    }

    return (
        <AddForm
            visible={editModalVisible}
            onCreate={handleAddSubmit}
            onCancel={() => {
                setEditModalVisible(false);
                setSelectedRecord(null);
            }}
        />
    )
}

export default ThayDoiNhanKhauModal