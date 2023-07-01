import React, { useState } from 'react'
import { useData } from '../../context/NewAppContext'
import { Card, Table, Row, Col, Button, Input, Modal, Descriptions, Tag } from 'antd';
import moment from 'moment';
import { BACK_END_URL } from '../../context/const';
import EditHoKhauModal from './EditHoKhauModal';

const HoKhau = () => {
  const {hokhau, setHokhau, nhankhau, setNhanKhau} = useData()
  const returnChuHo = (soHoKhau) => {
    const hk = hokhau.find(item => item.soHoKhau === soHoKhau)
    const ch = nhankhau.find(item => item.id === hk.idChuHo)
    return ch;
}
  
  // Search
  const [search, setSearch] = useState("")
  const searchedData = hokhau ? hokhau.filter(item => item.soHoKhau.toLowerCase().includes(search.toLowerCase())): []
  
  
  // View detail
  const [selectedRow, setSelectedRow] = useState(null);
  const [hoKhauDetail, setHoKhauDetail] = useState(null);
  const handleRowClick = async (record, rowIndex) => {
    const fetchData = async () => {
        try {
            const res = await fetch(`${BACK_END_URL}/hokhau/${record.id}`);
            const data = await res.json();
            setHoKhauDetail(data.data);
          } catch (error) {
            console.error(error);
          }
    }

    await fetchData()
    setSelectedRow(record);
  };

  // Edit HoKhau
  const [editSelectedRow, setEditSelectedRow] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const handleEdit = (record) => {
    setEditSelectedRow(record);
    setEditModalVisible(true);
};


  // Colums
  const columns = [
    {
      title: 'Số hộ khẩu',
      dataIndex: 'soHoKhau',
      key: 'soHoKhau',
      width: '15%'
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'diaChi',
      key: 'diaChi',
      width: '30%'
    },
    {
      title: 'Khu vực',
      dataIndex: 'khuVuc',
      key: 'khuVuc',
    },
    {
      title: 'Ngày lập',
      dataIndex: 'ngayLap',
      key: 'ngayLap',
      render: item => moment(item).format('DD-MM-YYYY')
    },
    {
      title: 'Thao tác',
      render: (text, record) => (
        <div onClick={e => e.stopPropagation()}>
            <Button onClick={() => handleEdit(record)} >Sửa</Button>
            <Button style={{marginLeft: 10}}>Tách hộ</Button>
        </div>
    ),
    },
  ];

  return (
    <div className="tabled">
    <Row gutter={[24, 0]}>
        <Col xs="24" xl={24}>
          <Card
            bordered={false}
            className="criclebox tablespace mb-24"
            title="Danh sách"
            extra={
                <>
                    <Input 
                      placeholder='Nhập số hộ khẩu'
                      onChange={(e) => setSearch(e.target.value)}
                    />
                </>
            }>
              <Table 
                pagination={false} 
                columns={columns} 
                dataSource={hokhau ? searchedData.map(item => {
                  return {
                    ...item,
                    key: item.soHoKhau
                  }
                }) : []}
                className="ant-border-space"
                onRow={(record, rowIndex) => {
                  return {
                      onClick: () => {
                          handleRowClick(record, rowIndex);
                      },
                  };
              }}
              />
            </Card>
          </Col>
          {/* Modal Hokhau Detail */}
          <Modal
              visible={selectedRow !== null}
              title={<span style={{ fontWeight: 600 }}>Thông tin chi tiết</span>}
              onCancel={() => setSelectedRow(null)}
              footer={null}
          >
            {selectedRow !== null && (
                <Descriptions column={1}>
                <Descriptions.Item label="Số Hộ Khẩu">{selectedRow.soHoKhau}</Descriptions.Item>
                <Descriptions.Item label="Địa Chỉ">{selectedRow.diaChi}</Descriptions.Item>
                <Descriptions.Item label="Khu Vực">{selectedRow.khuVuc}</Descriptions.Item>
                <Descriptions.Item label="Ngày Lập">{moment(selectedRow.ngayLap).format('DD-MM-YYYY')}</Descriptions.Item>

                <Descriptions.Item label="Chủ hộ">{<Tag color='orange'>{returnChuHo(selectedRow.soHoKhau).hoTen}</Tag>}</Descriptions.Item>
                <Descriptions.Item label="Danh sách thành viên">{hoKhauDetail.map(item => <Tag key={item.soCMND} color='purple'>{item.hoTen}</Tag>)}</Descriptions.Item>
                
              </Descriptions>
            )}
        </Modal>

        {/* Modal Edit HoKhau */}
              {editSelectedRow && 
                <EditHoKhauModal 
                  selectedRecord={editSelectedRow} 
                  setSelectedRecord={setEditSelectedRow}
                  editModalVisible={editModalVisible}
                  setEditModalVisible={setEditModalVisible}
                />}
        </Row>
    </div>
  )
}

export default HoKhau