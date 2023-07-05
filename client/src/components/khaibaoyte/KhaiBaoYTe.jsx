import React, { useEffect, useState } from 'react'
import { useData } from '../../context/NewAppContext';
import { Card, Table, Row, Col, Button, Input, Modal, Descriptions, Tag, Space } from 'antd';
import moment from 'moment';
import AddKhaiBaoYTeModal from "./AddKhaiBaoYTeModal";

const KhaiBaoYTe = () => {

    const {khaiBaoYTe, fetchDataKhaiBaoYTe, nhankhau} = useData();

    const columsKhaiBaoYTe = [
        {
            title: 'Họ và tên',
            dataIndex: 'idNhanKhau',
            key: 'idNhanKhau',
            width: '12%',
            render: item => {
                return nhankhau.find(e => e.id === item).hoTen
              }
        },
        {
            title: 'Hành trình',
            dataIndex: 'hanhTrinh',
            key: 'hanhTrinh',
            width: '15%'
        },
        {
            title: 'Triệu chứng',
            dataIndex: 'trieuChung',
            key: 'trieuChung',
        },
        {
            title: 'Ngày khai báo',
            dataIndex: 'ngayKhaiBao',
            key: 'ngayKhaiBao',
            render: item => moment(item).format('DD-MM-YYYY')
        },
        {
            title: 'Đối tượng tiếp xúc',
            dataIndex: 'doiTuongTiepXuc',
            key: 'doiTuongTiepXuc',
        },
        

    ]

    useEffect(() => {
        fetchDataKhaiBaoYTe()
    }, [])

       // Add modal KhaiBaoYTe
       const [addKhaiBaoYTeModalVisible, setAddKhaiBaoYTeModalVisible] = useState(false);
       const handleAddKhaiBaoYTe = () => {
           setAddKhaiBaoYTeModalVisible(true);
       };

    return (
        <>
        <div className="tabled">
            <Row gutter={[24, 0]}>
                <Col xs="24" xl={24}>
                <Card
                    bordered={false}
                    className="criclebox tablespace mb-24"
                    title="Thông tin về khai báo y tế"
                    extra={
                        <Space>
                           <Button type="primary" onClick={handleAddKhaiBaoYTe}>Khai báo y tế</Button>
                        </Space>
                    }>
                    <Table 
                        pagination={false} 
                        columns={columsKhaiBaoYTe} 
                        dataSource={khaiBaoYTe}
                        className="ant-border-space"
                        scroll={{y: 480}}
                    />
                    </Card>
                </Col>
            </Row>
            {addKhaiBaoYTeModalVisible && <AddKhaiBaoYTeModal 
                    editModalVisible={addKhaiBaoYTeModalVisible}
                    setEditModalVisible={setAddKhaiBaoYTeModalVisible}
                />}
        </div>
        </>
    )
}

export default KhaiBaoYTe