import React, { useState } from 'react'
import { Card, Table, Row, Col, Button, Input, Modal, Descriptions, Tag, Space } from 'antd';
import { useData } from '../../context/NewAppContext';

const TamTruTamVang = () => {

    const {tamTru, tamVang, fetchDataTamTru, fetchDataTamVang, setTamTru, setTamVang } = useData()

    const columnsTamTru = [
        {
            title: 'Số giấy tạm trú',
            dataIndex: 'soGiayTamTru',
            key: 'soGiayTamTru',
            width: '15%'
        },
        {
            title: 'Lý do',
            dataIndex: 'lyDo',
            key: 'lyDo',
        },
        {
            title: 'Thời gian tạm trú',
            dataIndex: 'thoiGianTamTru',
            key: 'thoiGianTamTru',
        },
        {
            title: 'Họ và tên',
            dataIndex: 'HoTen',
            key: 'HoTen',
        },
        {
            title: 'Số CMND',
            dataIndex: 'soCMND',
            key: 'soCMND',
        }
    ]

    const [searchTamTru, SetSearchTamTru] = useState("")
    const searchedDataTamTru = tamTru ? tamTru.filter(item => item.hoTen.toLowerCase().includes(searchTamTru.toLowerCase()) || item.soCMND.toLowerCase().includes(searchTamTru.toLowerCase())): []
    

  return (
    <>
        <div className="tabled">
            <Row gutter={[24, 0]}>
                <Col xs="24" xl={24}>
                <Card
                    bordered={false}
                    className="criclebox tablespace mb-24"
                    title="Danh sách"
                    extra={
                        <Space>
                            <Input 
                            placeholder='Nhập tên nk/CMND'
                            onChange={(e) => SetSearchTamTru(e.target.value)}
                            width={600}
                            />
                        </Space>
                    }>
                    <Table 
                        pagination={false} 
                        columns={columnsTamTru} 
                        dataSource={tamTru}
                        className="ant-border-space"
                    />
                    </Card>
                </Col>
            </Row>
        </div>
    </>

  )
}

export default TamTruTamVang