import React from 'react'
import {
  Row,
  Col,
  Card,
  Button,
  List,
  Descriptions,
  Avatar,
  Radio,
  Switch,
  Upload,
  message,
} from "antd";
import './home.css'

import Calendar from 'react-github-contribution-calendar';

var values = {
  '2016-06-23': 1,
  '2016-06-26': 2,
  '2016-06-27': 3,
  '2016-06-28': 4,
  '2016-06-29': 4
}
var until = '2016-06-30';

const Home = () => {
  return (
    <>
      <Row gutter={[24, 0]}>
        <Col span={24} md={8} className="mb-24">
          <Card
            bordered={false}
            title={<h6 className="font-semibold m-0">Tổng quan</h6>}
            className="header-solid h-full"
            bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
          >
          </Card>
        </Col>
        <Col span={24} md={16} className="mb-24">
          <Card
            bordered={false}
            title={<h6 className="font-semibold m-0">Thống kê mức độ làm việc</h6>}
            className="header-solid h-full"
            bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
          >
            <Calendar values={values} until={until} />
          </Card>
        </Col>
      </Row>
      <Row gutter={[24, 0]}>
        <Col span={24} md={8} className="mb-24 ">
          <Card
            bordered={false}
            className="header-solid h-full"
            title={<h6 className="font-semibold m-0">Phòng nghiên cứu</h6>}
          >
            <svg className='svg-tk' viewbox="0 0 136 136" stroke-width="6">
              <circle className='circle-tk c1' cx="68" cy="68" r="65" stroke="gold" stroke-dasharray="30 379" stroke-dashoffset="0" />
              <circle className='circle-tk c2' cx="68" cy="68" r="65" stroke="blue" stroke-dasharray="166 243" stroke-dashoffset="-40" />
              <circle className='circle-tk c3' cx="68" cy="68" r="65" stroke="mediumspringgreen" stroke-dasharray="86 323" stroke-dashoffset="-216" />
              <circle className='circle-tk c4' cx="68" cy="68" r="65" stroke="mediumslateblue" stroke-dasharray="87 322" stroke-dashoffset="-312" />
            </svg>
          </Card>
        </Col>
        <Col span={24} md={8} className="mb-24">
          <Card
            bordered={false}
            title={<h6 className="font-semibold m-0">Trường đại học</h6>}
            className="header-solid h-full card-profile-information"
            bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
          >
            <svg className='svg-tk' viewbox="0 0 136 136" stroke-width="6">
              <circle className='circle-tk c1' cx="68" cy="68" r="65" stroke="gold" stroke-dasharray="30 379" stroke-dashoffset="0" />
              <circle className='circle-tk c2' cx="68" cy="68" r="65" stroke="blue" stroke-dasharray="166 243" stroke-dashoffset="-40" />
              <circle className='circle-tk c3' cx="68" cy="68" r="65" stroke="mediumspringgreen" stroke-dasharray="86 323" stroke-dashoffset="-216" />
              <circle className='circle-tk c4' cx="68" cy="68" r="65" stroke="mediumslateblue" stroke-dasharray="87 322" stroke-dashoffset="-312" />
            </svg>
          </Card>
        </Col>
        <Col span={24} md={8} className="mb-24">
          <Card
            bordered={false}
            title={<h6 className="font-semibold m-0">Nơi thực tập</h6>}
            className="header-solid h-full"
            bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
          >
            <svg className='svg-tk' viewbox="0 0 136 136" stroke-width="6">
              <circle className='circle-tk c1' cx="68" cy="68" r="65" stroke="gold" stroke-dasharray="30 379" stroke-dashoffset="0" />
              <circle className='circle-tk c2' cx="68" cy="68" r="65" stroke="blue" stroke-dasharray="166 243" stroke-dashoffset="-40" />
              <circle className='circle-tk c3' cx="68" cy="68" r="65" stroke="mediumspringgreen" stroke-dasharray="86 323" stroke-dashoffset="-216" />
              <circle className='circle-tk c4' cx="68" cy="68" r="65" stroke="mediumslateblue" stroke-dasharray="87 322" stroke-dashoffset="-312" />
            </svg>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default Home