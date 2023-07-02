import React, { useState } from 'react'
import { Row, Col, Card, Radio, Table, Upload, message, Progress, Button, Avatar, Typography, Form, Input, Modal, DatePicker, Tag, Select, Popconfirm,
    InputNumber
} from "antd";
import { BACK_END_URL } from '../../context/const';
import { useData } from '../../context/NewAppContext';
import moment from 'moment';

const TachHoKhauModal = (props) => {
    const { 
        selectedRecord, 
        setSelectedRecord, 
        editModalVisible, 
        setEditModalVisible,
    } = props

    const {hokhau, setHokhau, nhankhau, setNhanKhau, fetchDataHoKhau} = useData()

    const returnChuHo = (soHoKhau) => {
        const hk = hokhau.find(item => item.soHoKhau === soHoKhau)
        const ch = nhankhau.find(item => item.id === hk.idChuHo)
        return ch;
    }

    const returnListThanhVienKhongPhaiChuHo = (soHoKhau) => {
        const hk = hokhau.find(item => item.soHoKhau === soHoKhau)
        const thanhVien = nhankhau.filter(item => item.idHoKhau === hk.id && item.id !== hk.idChuHo)
        return thanhVien
    } 

    const TachForm = ({ visible, onCreate, onCancel }) => {
        const [form] = Form.useForm();
        return (
            <Modal visible={visible} title="Điền thông tin hộ khẩu mới" okText="Lưu" cancelText="Hủy" onCancel={onCancel} onOk={() => {
                form.validateFields().then((values) => {
                    form.resetFields();
                    onCreate(values);
                }).catch((info) => {
                    console.log('Validate Failed:', info);
                });
            }}>
                <Form form={form} layout="vertical">
                    {/* <Form.Item
                        label="Số hộ khẩu"
                        name="soHoKhau"
                        rules={[
                            { required: true, message: "Hãy điền trường này" }
                        ]}
                    >
                        <Input></Input>
                    </Form.Item> */}
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
                        label="Danh sách thành viên (lưu ý người đầu tiên sẽ là chủ hộ mới)"
                        name="idNhanKhau"
                        rules={[
                            { required: true, message: "Hãy điền trường này" }
                        ]}
                    >
                        <Select 
                            mode='multiple'
                            options={returnListThanhVienKhongPhaiChuHo(selectedRecord.soHoKhau).map(item => {
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

    const handleTach = async (values) => {
        const fetchData = async () => {
        try {
            values.soHoKhau = `HK00` + (hokhau.length + 1)
            const res = await fetch(`${BACK_END_URL}/hokhau/tach`, {
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
                message.success('Tách hộ khẩu thành công!')
                setEditModalVisible(false);
                await fetchDataHoKhau()
            }
          } catch (error) {
            console.error(error);
          }
        }

        console.log(values);
        await fetchData()
    }

    return (
        <TachForm
            visible={editModalVisible}
            onCreate={handleTach}
            onCancel={() => {
                setEditModalVisible(false);
                setSelectedRecord(null);
            }}
            initialValues={selectedRecord}
        />
    )
}

export default TachHoKhauModal