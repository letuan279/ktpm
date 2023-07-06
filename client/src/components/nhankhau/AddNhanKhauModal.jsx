import React, { useState } from 'react'
import { Row, Col, Card, Radio, Table, Upload, message, Progress, Button, Avatar, Typography, Form, Input, Modal, DatePicker, Tag, Select, Popconfirm,
    InputNumber,
    Space
} from "antd";
import { BACK_END_URL } from '../../context/const';
import { useData } from '../../context/NewAppContext';
import moment from 'moment';

const AddNhanKhauModal = (props) => {
    const {
        editModalVisible, 
        setEditModalVisible,
    } = props

    const {hokhau, setHokhau, nhankhau, setNhanKhau, fetchDataNhanKhau} = useData()

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

                    <Row gutter={[24, 0]}>
                        <Col span={24} md={12} className="mb-24">
                            <Form.Item
                                label="Họ và tên"
                                name="hoTen"
                                rules={[
                                    { required: true, message: "Hãy điền trường này" }
                                ]}
                            >
                                <Input></Input>
                            </Form.Item>
                            <Form.Item
                                label="Ngày sinh"
                                name="ngaySinh"
                                rules={[
                                    { required: true, message: "Hãy điền trường này" }
                                ]}
                            >
                                <DatePicker></DatePicker>
                            </Form.Item>
                            <Form.Item
                                label="Số hộ khẩu"
                                name="idHoKhau"
                                rules={[
                                    { required: true, message: "Hãy điền trường này" }
                                ]}
                            >
                                <Select
                                    options={hokhau.map(item => {
                                        return {
                                            label: item.soHoKhau,
                                            value: item.id
                                        }
                                    })}
                                ></Select>
                            </Form.Item>
                            <Form.Item
                                label="Giới tính"
                                name="gioiTinh"
                                rules={[
                                    { required: true, message: "Hãy điền trường này" }
                                ]}
                            >
                                <Radio.Group>
                                    <Radio value={1}>Nam</Radio>
                                    <Radio value={0}>Nữ</Radio>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item
                                
                            >

                            </Form.Item>
                        </Col>
                        <Col span={24} md={12} className="mb-24">
                        <Form.Item
                                label="Số CMND"
                                name="soCMND"
                            >
                                <Input></Input>
                            </Form.Item>
                            <Form.Item
                                label="Thường trú"
                                name="thuongTru"
                            >
                                <Input></Input>
                            </Form.Item>
                            <Form.Item
                                label="Biệt danh"
                                name="bietDanh"
                            >
                                <Input></Input>
                            </Form.Item>
                            
                           
                            <Form.Item
                                label="Nghề nghiệp"
                                name="ngheNghiep"
                            >
                                <Input></Input>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        );
    };

    const handleAddSubmit = async (values) => {
        const fetchData = async () => {
        try {
            if(!values.thuongTru) values.thuongTru = "Mới sinh"
            if(!values.soCMND) values.soCMND = null
            if(!values.tonGiao) values.tonGiao = "Không"
            if(!values.ngheNghiep) values.ngheNghiep = "Không có"
            if(!values.bietDanh) values.bietDanh = "Không có"
            values.ngaySinh = values.ngaySinh.format("YYYY-MM-DD")
            values.trangThai = "Bình thường"
        
            const res = await fetch(`${BACK_END_URL}/nhankhau`, {
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
                await fetchDataNhanKhau()
                message.success('Tạo thành công!')
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

export default AddNhanKhauModal