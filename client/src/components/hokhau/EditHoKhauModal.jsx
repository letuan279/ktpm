import React, { useState } from 'react'
import { Row, Col, Card, Radio, Table, Upload, message, Progress, Button, Avatar, Typography, Form, Input, Modal, DatePicker, Tag, Select, Popconfirm,
    InputNumber
} from "antd";
import { BACK_END_URL } from '../../context/const';
import { useData } from '../../context/NewAppContext';
import moment from 'moment';

const EditHoKhauModal = (props) => {
    const { 
        selectedRecord, 
        setSelectedRecord, 
        editModalVisible, 
        setEditModalVisible,
    } = props

    const {hokhau, setHokhau, nhankhau, setNhanKhau} = useData()

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

    const EditForm = ({ visible, onCreate, onCancel, initialValues }) => {
        const [form] = Form.useForm();
        return (
            <Modal visible={visible} title="Chỉnh sửa hộ khẩu" okText="Lưu" cancelText="Hủy" onCancel={onCancel} onOk={() => {
                form.validateFields().then((values) => {
                    form.resetFields();
                    onCreate(values);
                }).catch((info) => {
                    console.log('Validate Failed:', info);
                });
            }}>
                <Form form={form} initialValues={{
                    ...initialValues,
                    ngayLap: moment(initialValues.ngayLap, 'YYYY-MM-DD'),
                    idChuHo: returnChuHo(initialValues.soHoKhau).id
                }} layout="vertical">
                    <Form.Item
                        label="Số hộ khẩu"
                        name="soHoKhau"
                        rules={[
                            { required: true, message: "Hãy điền trường này" }
                        ]}
                    >
                        <Input></Input>
                    </Form.Item>
                    <Form.Item
                        label="Khu vực"
                        name="khuVuc"
                        rules={[
                            { required: true, message: "Hãy điền trường này" }
                        ]}
                    >
                        <Input></Input>
                    </Form.Item>
                    <Form.Item
                        label="Địa chỉ"
                        name="diaChi"
                        rules={[
                            { required: true, message: "Hãy điền trường này" }
                        ]}
                    >
                        <Input></Input>
                    </Form.Item>
                    <Form.Item
                        label="Ngày lập"
                        name="ngayLap"
                        rules={[
                            { required: true, message: "Hãy điền trường này" }
                        ]}
                    >
                        <DatePicker/>
                    </Form.Item>
                    <Form.Item
                        label="Chủ hộ"
                        name="idChuHo"
                        rules={[
                            { required: true, message: "Hãy điền trường này" }
                        ]}
                    >
                        <Select 
                            options={returnListThanhVien(initialValues.soHoKhau).map(item => {
                                return {
                                    label: item.hoTen,
                                    value: item.id
                                }
                            })}
                        ></Select>
                    </Form.Item>
                </Form>
            </Modal>
        );
    };

    const handleEditSubmit = async (values) => {
        const fetchData = async () => {
        try {
            const res = await fetch(`${BACK_END_URL}/hokhau/thaydoi/${selectedRecord.id}`, {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...values,
                    ngayLap: values.ngayLap.format("YYYY-MM-DD")
                })
            });
            const data = await res.json();
            if(data.success === true){
                setHokhau(hokhau.map(item => {
                    if(item.id === selectedRecord.id){
                        return data.data
                    }
                    return item
                }))
                message.success('Thay đổi thành công!')
                setEditModalVisible(false);
            }
          } catch (error) {
            console.error(error);
          }
        }

        await fetchData()
    }

    return (
        <EditForm
            visible={editModalVisible}
            onCreate={handleEditSubmit}
            onCancel={() => {
                setEditModalVisible(false);
                setSelectedRecord(null);
            }}
            initialValues={selectedRecord}
        />
    )
}

export default EditHoKhauModal