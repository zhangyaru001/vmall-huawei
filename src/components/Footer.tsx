import { Layout, Row, Col, Typography, Space, Divider } from 'antd';
import {
  CustomerServiceOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';

const { Footer } = Layout;
const { Title, Text, Link } = Typography;

const footerStyle: React.CSSProperties = {
  background: '#f5f5f5',
  padding: '40px 60px 20px',
  marginTop: 60
};

const serviceItems = [
  { icon: <CustomerServiceOutlined />, title: '帮助中心', items: ['账户管理', '购物指南', '订单操作'] },
  { icon: <EnvironmentOutlined />, title: '配送服务', items: ['配送说明', '签收须知', '配送查询'] },
  { icon: <ClockCircleOutlined />, title: '售后服务', items: ['退换货政策', '退换货流程', '保修政策'] },
];

export default function FooterComponent() {
  return (
    <Footer style={footerStyle}>
      <Row gutter={[48, 32]} justify="center">
        <Col xs={24} md={6}>
          <Title level={5} style={{ marginBottom: 16 }}>客户服务</Title>
          <Space direction="vertical" size={8}>
            {serviceItems.map((item, index) => (
              <div key={index}>
                <Text style={{ fontSize: 16, marginBottom: 8, display: 'block' }}>
                  {item.icon} {item.title}
                </Text>
                <Space direction="vertical" size={4}>
                  {item.items.map((subItem, subIndex) => (
                    <Link key={subIndex} href="#" style={{ fontSize: 12, color: '#666' }}>
                      {subItem}
                    </Link>
                  ))}
                </Space>
              </div>
            ))}
          </Space>
        </Col>

        <Col xs={24} md={6}>
          <Title level={5} style={{ marginBottom: 16 }}>关注我们</Title>
          <Space direction="vertical" size={8}>
            <Link href="#">官方微博</Link>
            <Link href="#">官方微信</Link>
            <Link href="#">官方抖音</Link>
            <Link href="#">花粉俱乐部</Link>
          </Space>
        </Col>

        <Col xs={24} md={6}>
          <Title level={5} style={{ marginBottom: 16 }}>关于我们</Title>
          <Space direction="vertical" size={8}>
            <Link href="#">公司简介</Link>
            <Link href="#">华为商城简介</Link>
            <Link href="#">联系我们</Link>
            <Link href="#">隐私政策</Link>
          </Space>
        </Col>

        <Col xs={24} md={6}>
          <Title level={4} style={{ color: '#cf0a2c', marginBottom: 16 }}>
            400-088-6888
          </Title>
          <Text type="secondary">8:00-20:00 (仅收市话费)</Text>
          <div style={{ marginTop: 16 }}>
            <Link
              href="#"
              style={{
                display: 'inline-block',
                padding: '8px 20px',
                border: '1px solid #cf0a2c',
                color: '#cf0a2c',
                borderRadius: 20
              }}
            >
              在线客服
            </Link>
          </div>
        </Col>
      </Row>

      <Divider style={{ margin: '30px 0 20px' }} />

      <div style={{ textAlign: 'center' }}>
        <Space split={<Divider type="vertical" />}>
          <Link href="#">使用条款</Link>
          <Link href="#">隐私政策</Link>
          <Link href="#">Cookie</Link>
          <Link href="#">隐私政策概要</Link>
        </Space>
        <div style={{ marginTop: 10 }}>
          <Text type="secondary" style={{ fontSize: 12 }}>
            Copyright © 2011-2024 华为技术有限公司 版权所有 | 
            增值电信业务经营许可证：合字B2-20230001 |
            备案号：粤ICP备20230001号
          </Text>
        </div>
      </div>
    </Footer>
  );
}
