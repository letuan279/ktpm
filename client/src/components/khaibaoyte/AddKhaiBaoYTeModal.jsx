import React, { useState } from 'react'
import { Row, Col, Card, Radio, Table, Upload, message, Progress, Button, Avatar, Typography, Form, Input, Modal, DatePicker, Tag, Select, Popconfirm,
    InputNumber
} from "antd";
import { BACK_END_URL } from '../../context/const';
import { useData } from '../../context/NewAppContext';
import moment from 'moment';

const AddKhaiBaoYTeModal = (props) => {
    const {
        editModalVisible, 
        setEditModalVisible,
    } = props

    const {nhankhau, khaiBaoYTe, fetchDataKhaiBaoYTe} = useData();

    const [selectedNhanKhau, setSelectedNhanKhau] = useState(null);
    
    const AddForm = ({ visible, onCreate, onCancel, initialValues }) => {
        const [form] = Form.useForm();
        const [hoTen, setHoTen] = useState("");
        function handleNhanKhauChange(value, option) {
            const nhanKhau = nhankhau.find((item) => item.id === value);
            setHoTen(nhanKhau.hoTen);
          }
        return (
            <Modal visible={visible} title="Khai báo y tế" okText="Lưu" cancelText="Hủy" onCancel={onCancel} onOk={() => {
                form.validateFields().then((values) => {
                    form.resetFields();
                    onCreate(values);
                }).catch((info) => {
                    console.log('Validate Failed:', info);
                });
            }}>
                <Form form={form} layout="vertical">
                <Form.Item
                        label="Chọn người khai báo y tế theo số CMND"
                        name="idNhanKhau"
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
                        label="Họ và tên"
                        name="hoTen"
                        // rules={[
                        //     { required: true, message: "Hãy điền trường này" }
                        // ]}
                    >
                        <Input value={hoTen} disabled  onChange={e => setHoTen(e.target.value)}/>
                    </Form.Item>
                    
                    <Form.Item
                        label="Hành Trình"
                        name="hanhTrinh"
                        rules={[
                            { required: true, message: "Hãy điền trường này" }
                        ]}
                    >
                         <Input></Input>
                    </Form.Item>
                   
                    <Form.Item
                        label="Triệu chứng"
                        name="trieuChung"
                        rules={[
                            { required: true, message: "Hãy điền trường này" }
                        ]}
                    >
                        <Input></Input>
                    </Form.Item>

                    <Form.Item
                        label="Đối tượng tiếp xúc"
                        name="doiTuongTiepXuc"
                        rules={[
                            { required: true, message: "Hãy điền trường này" }
                        ]}
                    >
                        <Input></Input>
                    </Form.Item>

                    <Form.Item
                        label="Ngày khai báo"
                        name="ngayKhaiBao"
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
            // values.soGiayTamTru = `TT00${tamTru.length + 1}`
            // values.ngaySinh = values.ngaySinh.format("YYYY-MM-DD")
            values.ngayKhaiBao = values.ngayKhaiBao.format("YYYY-MM-DD")
            const res = await fetch(`${BACK_END_URL}/yte/khaibao`, {
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
                await fetchDataKhaiBaoYTe()
                message.success("Khai báo y tế thành công!")
                setEditModalVisible(false);
            }
            else{
                message.error("Khai báo không thành công!");
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

export default AddKhaiBaoYTeModal