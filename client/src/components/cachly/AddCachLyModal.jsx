import React, { useState, useCallback } from 'react'
import { Row, Col, Card, Radio, Table, Upload, message, Progress, Button, Avatar, Typography, Form, Input, Modal, DatePicker, Tag, Select, Popconfirm,
    InputNumber
} from "antd";
import { BACK_END_URL } from '../../context/const';
import { useData } from '../../context/NewAppContext';
import moment from 'moment';

const AddCachLyModal
 = (props) => {
    const {
        editModalVisible, 
        setEditModalVisible,
    } = props

    const {nhankhau, cachLy, fetchDataCachLy} = useData();

    const [selectedNhanKhau, setSelectedNhanKhau] = useState(null);
    const [hoTen, setHoTen] = useState("");
    const [trangThaiTest, setTrangThaiTest] = useState("Âm Tính");

    const handleNhanKhauChange = (value) => {
        setSelectedNhanKhau(value);
        const selected = nhankhau.find(item => item.id === value);
        setHoTen(selected.hoTen);
    }

    const handleMucDoCovidChange = (e) => {
        if (e.target.value === "F0") {
          setTrangThaiTest("Dương tính");
        }
      };
 

    const AddForm = ({ visible, onCreate, onCancel, initialValues }) => {
        const [form] = Form.useForm();
        return (
            <Modal visible={visible} title="Khai báo cách ly" okText="Lưu" cancelText="Hủy" onCancel={onCancel} onOk={() => {
                form.validateFields().then((values) => {
                    form.resetFields();
                    onCreate(values);
                }).catch((info) => {
                    console.log('Validate Failed:', info);
                });
            }}>
                <Form form={form} layout="vertical">
                <Form.Item
                        label="Chọn người khai báo cách ly theo số CMND"
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
                            // onChange={handleNhanKhauChange}
                            // values ={this.value}
                         ></Select>
                </Form.Item>

                {/* <Form.Item
                        label="Họ và tên"
                        // name="doiTuongTiepXuc"
                        // rules={[
                        //     { required: true, message: "Hãy điền trường này" }
                        // ]}
                    >
                        <Input value={hoTen} disabled onChange={e => setHoTen(e.target.value)} />
                    </Form.Item> */}
                    
                    <Form.Item
                        label="Hình thức Test"
                        name="hinhThucTest"
                        rules={[
                            { required: true, message: "Hãy điền trường này" }
                        ]}
                    >
                          <Radio.Group>
                            <Radio value={"Test nhanh"}>Test nhanh</Radio>
                            <Radio value={"Test PCR"}>Test PCR</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item
                        label="Thời điểm"
                        name="thoiDiem"
                        rules={[
                            { required: true, message: "Hãy điền trường này" }
                        ]}
                    >
                        <DatePicker></DatePicker>
                    </Form.Item>

                    <Form.Item
                    label="Mức độ Covid"
                    name="mucDoCovid"
                    rules={[
                        { required: true, message: "Hãy điền trường này" }
                    ]}
                    >
                        <Radio.Group  >
                            <Radio value={"F0"}>F0</Radio>
                            <Radio value={"F1"}>F1</Radio>
                            <Radio value={"F2"}>F2</Radio>
                            <Radio value={"F3"}>F3</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item
                    label="Trạng thái Test"
                    name="trangThaiTest"
                    rules={[
                        { required: true, message: "Hãy điền trường này" }
                    ]}
                    >
                        <Radio.Group >
                            <Radio value={"Âm tính"}>Âm tính</Radio>
                            <Radio value={"Dương tính"}>Dương tính</Radio>
                        </Radio.Group>
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
            values.thoiDiem = values.thoiDiem.format("YYYY-MM-DD")
            const res = await fetch(`${BACK_END_URL}/yte/cachly`, {
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
                fetchDataCachLy()
                message.success("Khai báo cách ly thành công!")
                setEditModalVisible(false);
            }
            else{
                message.error("Khai báo lỗi");
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

export default AddCachLyModal
