import React, { useState } from 'react'
import { Row, Col, Card, Radio, Table, Upload, message, Progress, Button, Avatar, Typography, Form, Input, Modal, DatePicker, Tag, Select, Popconfirm,
    InputNumber
} from "antd";
import { BACK_END_URL } from '../../context/const';
import { useData } from '../../context/NewAppContext';
import moment from 'moment';

const AddTamTruModal = (props) => {
    const {
        editModalVisible, 
        setEditModalVisible,
    } = props

    const {hokhau, tamTru, fetchDataTamTru, setHokhau, nhankhau, setNhanKhau} = useData()

    const returnChuHo = (soHoKhau) => {
        const hk = hokhau.find(item => item.soHoKhau === soHoKhau)
        const ch = nhankhau.find(item => item.id === hk.idChuHo)
        return ch;
    }

    const returnListThanhVien = (soHoKhau) => {
        const hk = hokhau.find(item => item.soHoKhau === soHoKhau)
        const thanhVien = nhankhau.filter(item => item.idHoKhau === hk.id)
        return thanhVien
    } 

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
                        label="Họ và tên"
                        name="HoTen"
                        rules={[
                            { required: true, message: "Hãy điền trường này" }
                        ]}
                    >
                        <Input></Input>
                    </Form.Item>
                    <Form.Item
                        label="Số CMND"
                        name="soCMND"
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
                        label="Thời gian tạm trú"
                        name="thoiGianTamTru"
                        rules={[
                            { required: true, message: "Hãy điền trường này" }
                        ]}
                    >
                        <DatePicker></DatePicker>
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
                        label="Lý do tạm trú"
                        name="lyDo"
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
            values.soGiayTamTru = `TT00${tamTru.length + 1}`
            values.ngaySinh = values.ngaySinh.format("YYYY-MM-DD")
            values.thoiGianTamTru = values.thoiGianTamTru.format("YYYY-MM-DD")
            const res = await fetch(`${BACK_END_URL}/nhankhau/tamtru`, {
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
                fetchDataTamTru()
                message.success("Tạo giấy tạm trú thành công!")
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

export default AddTamTruModal