import { useState } from 'react';
import { Form, Input, Select } from 'antd';

const { Option } = Select;

const MyForm = () => {
    const [selectedNhanKhau, setSelectedNhanKhau] = useState(null);
    const [hoTen, setHoTen] = useState("");

    const nhankhau = [
        { id: 1, soCMND: "123456789", hoTen: "Nguyễn Văn A" },
        { id: 2, soCMND: "987654321", hoTen: "Trần Thị B" }
    ];

    const handleNhanKhauChange = (value) => {
        setSelectedNhanKhau(value);
        const selected = nhankhau.find(item => item.id === value);
        setHoTen(selected.hoTen);
    }

    return (
        <Form>
            <Form.Item
                label="Chọn người khai báo y tế theo số CMND"
                name="idNhanKhau"
                rules={[
                    { required: true, message: "Hãy điền trường này" }
                ]}
            >
                <Select
                    showSearch
                    style={{ width: '100%' }}
                    options={nhankhau.map(item =>
                        <Option key={item.id} value={item.id}>{item.soCMND}</Option>
                    )}
                    onChange={handleNhanKhauChange}
                />
            </Form.Item>

            <Form.Item
                label="Họ và tên"
                name="hoTen"
                rules={[
                    { required: true, message: "Hãy điền trường này" }
                ]}
            >
                <Input value={hoTen} onChange={e => setHoTen(e.target.value)} />
            </Form.Item>
        </Form>
    );
};

export default MyForm;