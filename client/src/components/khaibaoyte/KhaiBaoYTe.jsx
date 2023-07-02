import React from "react";
import { useData } from '../../context/NewAppContext';
import { Card, Table, Row, Col, Button, Input, Modal, Descriptions, Tag, Space } from 'antd';
import moment from 'moment';

const KhaiBaoYTe = () => {

    const {khaiBaoYTe, fetchDataKhaiBaoYTe} = useData();

    const columsKhaiBaoYTe = [
        {

        },
    ]

    return (
        <>
        <div className="tabled">
            <Row gutter={[24, 0]}>
                <Col xs="24" xl={24}>
                <Card
                    bordered={false}
                    className="criclebox tablespace mb-24"
                    title="Khai báo y tế"
                    extra={
                        <Space>
                            {/* <Input 
                            placeholder='Nhập tên nk/CMND'
                            onChange={(e) => setSearch(e.target.value)}
                            width={600}
                            /> */}
                        </Space>
                    }>
                    <Table 
                        pagination={false} 
                        columns={columsKhaiBaoYTe} 
                        dataSource={khaiBaoYTe}
                        className="ant-border-space"
                        scroll={{ y: 200 }}
                    />
                    </Card>
                </Col>
            </Row>
        </div>
        </>
    )
}

export default KhaiBaoYTe