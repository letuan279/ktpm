import React, { useEffect, useState } from 'react'
import { useData } from '../../context/NewAppContext';
import { Card, Table, Row, Col, Button, Input, Modal, Descriptions, Tag, Space } from 'antd';
import moment from 'moment';
import AddCachLyModal from "./AddCachLyModal";

const CachLy = () => {

    const {cachLy, fetchDataCachLy, nhankhau} = useData();

    const columsCachLy = [
        {
            title: 'Họ và tên',
            dataIndex: 'idNhanKhau',
            key: 'idNhanKhau',
            width: '15%',
            render: item => {
                return nhankhau.find(e => e.id === item).hoTen
              }
        },
        {
            title: 'Thời điểm',
            dataIndex: 'thoiDiem',
            key: 'thoiDiem',
            render: item => moment(item).format('DD-MM-YYYY')
        },
        {
            title: 'Hình thức test',
            dataIndex: 'hinhThucTest',
            key: 'hinhThucTest',
        },
        {
            title: 'Mức độ covid',
            dataIndex: 'mucDoCovid',
            key: 'mucDoCovid',
        },
        {
            title: 'Trạng thái test',
            dataIndex: 'trangThaiTest',
            key: 'trangThaiTest',
        },
    ]

    useEffect(() => {
        fetchDataCachLy()
    }, [])

       // Add modal CachLy
       const [addKhaiBaoCachLyModalVisible, setAddKhaiBaoCachLyModalVisible] = useState(false);
       const handleAddKhaiBaoCachLy = () => {
           setAddKhaiBaoCachLyModalVisible(true);
       };

    return (
        <>
        <div className="tabled">
            <Row gutter={[24, 0]}>
                <Col xs="24" xl={24}>
                <Card
                    bordered={false}
                    className="criclebox tablespace mb-24"
                    title="Thông tin về cách ly"
                    extra={
                        <Space>
                            <Space>
                           <Button type="primary" onClick={handleAddKhaiBaoCachLy}>Khai báo cách ly</Button>
                        </Space>
                        </Space>
                    }>
                    <Table 
                        pagination={false} 
                        columns={columsCachLy} 
                        dataSource={cachLy}
                        className="ant-border-space"
                        scroll={{ y: 480 }}
                    />
                    </Card>
                </Col>
            </Row>
            {addKhaiBaoCachLyModalVisible && <AddCachLyModal 
                    editModalVisible={addKhaiBaoCachLyModalVisible}
                    setEditModalVisible={setAddKhaiBaoCachLyModalVisible}
                />}
        </div>
        </>
    )
}

export default CachLy