import React from 'react'

const LichSuThayDoi = () => {

  const columnsLichSuHoKhau = [
    {
      title:"te"
    }
  ]

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
                            {/* <Input 
                            placeholder='Nhập tên nk/CMND'
                            onChange={(e) => setSearch(e.target.value)}
                            width={600}
                            /> */}
                        </Space>
                    }>
                    <Table 
                        pagination={false} 
                        columns={columnsLichSuHoKhau} 
                        dataSource={tamTru ? tamTru : []}
                        className="ant-border-space"
                    />
                    </Card>
                </Col>
            </Row>
        </div>
    </>
  )
}

export default LichSuThayDoi