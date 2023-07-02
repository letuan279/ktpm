import React, { useState } from 'react'
import { Row, Col, Card, Radio, Table, Upload, message, Progress, Button, Avatar, Typography, Form, Input, Modal, DatePicker, Tag, Select, Popconfirm,
    InputNumber
} from "antd";
import { BACK_END_URL } from '../../context/const';
import { useData } from '../../context/NewAppContext';
import moment from 'moment';

const AddTamVangModal = (props) => {
    const {
        editModalVisible, 
        setEditModalVisible,
    } = props

    const {nhankhau, tamVang, fetchDataTamVang, setHokhau, setNhanKhau} = useData()

    const AddForm = ({ visible, onCreate, onCancel, initialValues }) => {
        const [form] = Form.useForm();
        return (
            <Modal visible={visible} title="Thêm nhân khẩu mới" okText="Lưu" cancelText="Hủy" onCancel={onCancel} onOk={() => {
                form.validateFields().then((values) => {
                    form.resetFields();
                    onCreate(values);
                }).catch((info) => {
                    console.log('Validate Failed:', info);
                });
            }}>
                <Form form={form} layout="vertical">
                    <Form.Item
                        label="Chọn nhân khẩu tạm vắng theo soCMND"
                        name="id"
                        rules={[
                            { required: true, message: "Hãy điền trường này" }
                        ]}
                    >
                         <Select
                            showSearch
                            style={{
                                width: '100%',
                            }}
                            options={nhankhau.map(item => {
                                return {
                                    label: item.soCMND,
                                    value: item.id
                                }
                            })}
                         ></Select>
                    </Form.Item>
                    <Form.Item
                        label="Nơi tạm trú"
                        name="noiTamTru"
                        rules={[
                            { required: true, message: "Hãy điền trường này" }
                        ]}
                    >
                        <Input></Input>
                    </Form.Item>
                    <Form.Item
                        label="Từ ngày"
                        name="tuNgay"
                        rules={[
                            { required: true, message: "Hãy điền trường này" }
                        ]}
                    >
                        <DatePicker></DatePicker>
                    </Form.Item>
                    <Form.Item
                        label="Đến ngày"
                        name="denNgay"
                        rules={[
                            { required: true, message: "Hãy điền trường này" }
                        ]}
                    >
                        <DatePicker></DatePicker>
                    </Form.Item>
                </Form>
            </Modal>
        );
    };

    const handleAddSubmit = async (values) => {
        const fetchData = async () => {
        try {
            values.soGiayTamVang = `TT00${tamVang.length + 1}`
            values.tuNgay = values.tuNgay.format("YYYY-MM-DD")
            values.denNgay = values.denNgay.format("YYYY-MM-DD")
            const res = await fetch(`${BACK_END_URL}/nhankhau/tamvang/${values.id}`, {
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
                fetchDataTamVang()
                message.success("Tạo giấy tạm vắng thành công!")
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
            }}
        />
    )
}

export default AddTamVangModal