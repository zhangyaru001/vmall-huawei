import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Layout, Row, Col, Card, Typography, Button, Space, Tag, Radio, message, Breadcrumb, Divider, InputNumber, Rate } from 'antd';
import {
  ShoppingCartOutlined,
  HeartOutlined,
  ShareAltOutlined,
  CheckCircleOutlined,
  CarOutlined,
} from '@ant-design/icons';
import { products, Product } from '../data/products';

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSpec, setSelectedSpec] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const productId = parseInt(id || '1');
    const foundProduct = products.find(p => p.id === productId);
    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedSpec(foundProduct.specs[0]);
    }
    setLoading(false);
  }, [id]);

  if (loading || !product) {
    return (
      <Content style={{ padding: '100px 40px', textAlign: 'center', background: '#f5f5f5', minHeight: '100vh' }}>
        <Text>加载中...</Text>
      </Content>
    );
  }

  const handleAddToCart = () => {
    message.success(`已添加 ${product.name} x${quantity} 到购物车`);
  };

  return (
    <Content style={{ background: '#f5f5f5', minHeight: '100vh', paddingBottom: 40 }}>
      {/* Breadcrumb */}
      <div style={{ background: '#fff', padding: '12px 40px', borderBottom: '1px solid #eee' }}>
        <Breadcrumb
          items={[
            { title: <Link to="/">首页</Link> },
            { title: <Link to={`/category/${product.category}`}>{product.category}</Link> },
            { title: product.name }
          ]}
        />
      </div>

      {/* Product Info */}
      <div style={{ background: '#fff', padding: '30px 40px' }}>
        <Row gutter={60}>
          {/* Left - Image */}
          <Col xs={24} md={12}>
            <Card
              bodyStyle={{ padding: 40, background: '#f9f9f9' }}
              style={{ borderRadius: 8 }}
            >
              <div style={{ textAlign: 'center' }}>
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ width: '100%', maxWidth: 400, height: 350, objectFit: 'contain' }}
                />
              </div>
              <Space style={{ marginTop: 20, justifyContent: 'center' }}>
                <Tag color="red">热销</Tag>
                <Tag color="blue">正品保证</Tag>
                <Tag color="green">7天无理由退换</Tag>
              </Space>
            </Card>
          </Col>

          {/* Right - Info */}
          <Col xs={24} md={12}>
            <div style={{ padding: '10px 0' }}>
              <Title level={3} style={{ marginBottom: 16, fontWeight: 600 }}>
                {product.name}
              </Title>
              
              <Paragraph style={{ fontSize: 14, color: '#666', marginBottom: 16 }}>
                {product.description}
              </Paragraph>

              <div style={{ background: '#fdf6ec', padding: 16, borderRadius: 8, marginBottom: 20 }}>
                <Space>
                  <Text style={{ color: '#cf0a2c', fontSize: 28, fontWeight: 'bold' }}>
                    ¥{product.price}
                  </Text>
                  <Text delete style={{ fontSize: 16, color: '#999' }}>
                    ¥{product.originalPrice}
                  </Text>
                  <Tag color="red">省 ¥{product.originalPrice - product.price}</Tag>
                </Space>
              </div>

              <Divider />

              {/* Spec Selection */}
              <div style={{ marginBottom: 24 }}>
                <Text strong style={{ marginBottom: 12, display: 'block' }}>选择版本:</Text>
                <Radio.Group
                  value={selectedSpec}
                  onChange={(e) => setSelectedSpec(e.target.value)}
                  style={{ width: '100%' }}
                >
                  <Space direction="vertical" style={{ width: '100%' }}>
                    {product.specs.map((spec, index) => (
                      <Radio key={index} value={spec} style={{ width: '100%' }}>
                        <span style={{ padding: '8px 16px', border: '1px solid #d9d9d9', borderRadius: 4, marginLeft: 8 }}>
                          {spec}
                        </span>
                      </Radio>
                    ))}
                  </Space>
                </Radio.Group>
              </div>

              {/* Quantity */}
              <div style={{ marginBottom: 24 }}>
                <Text strong style={{ marginBottom: 12, display: 'block' }}>数量:</Text>
                <InputNumber
                  min={1}
                  max={10}
                  value={quantity}
                  onChange={(value) => setQuantity(value || 1)}
                  style={{ width: 100 }}
                />
              </div>

              <Divider />

              {/* Service Tags */}
              <Space direction="vertical" style={{ width: '100%', marginBottom: 24 }}>
                <Space>
                  <CheckCircleOutlined style={{ color: '#52c41a' }} />
                  <Text>华为官方正品保障</Text>
                </Space>
                <Space>
                  <CarOutlined style={{ color: '#52c41a' }} />
                  <Text>全国联保，售后无忧</Text>
                </Space>
              </Space>

              {/* Action Buttons */}
              <Space size="large">
                <Button
                  type="primary"
                  size="large"
                  icon={<ShoppingCartOutlined />}
                  style={{
                    background: '#cf0a2c',
                    borderColor: '#cf0a2c',
                    padding: '0 40px',
                    height: 50,
                    fontSize: 16
                  }}
                  onClick={handleAddToCart}
                >
                  立即购买
                </Button>
                <Button
                  size="large"
                  icon={<HeartOutlined />}
                  style={{ padding: '0 30px', height: 50, fontSize: 16 }}
                >
                  加入心愿单
                </Button>
                <Button
                  size="large"
                  icon={<ShareAltOutlined />}
                  style={{ padding: '0 20px', height: 50 }}
                >
                  分享
                </Button>
              </Space>
            </div>
          </Col>
        </Row>
      </div>

      {/* Product Details */}
      <div style={{ maxWidth: 1200, margin: '20px auto', padding: '0 20px' }}>
        <Card title="商品详情">
          <Row gutter={40}>
            <Col span={16}>
              <Title level={5}>产品介绍</Title>
              <Paragraph>
                {product.name} 是一款性能卓越的{product.category}，采用先进的技术和精湛的工艺，
                为用户带来出色的使用体验。无论是日常办公还是娱乐游戏，都能满足您的需求。
              </Paragraph>
              <Paragraph>
                华为始终坚持以客户为中心的理念，提供优质的产品和服务。选择华为，选择品质生活。
              </Paragraph>
            </Col>
            <Col span={8}>
              <Title level={5}>用户评价</Title>
              <Rate disabled defaultValue={5} />
              <div style={{ marginTop: 8 }}>
                <Text>5.0 分</Text>
                <Text type="secondary" style={{ marginLeft: 16 }}>1000+ 评价</Text>
              </div>
            </Col>
          </Row>
        </Card>
      </div>

      {/* Recommendations */}
      <div style={{ maxWidth: 1200, margin: '20px auto', padding: '0 20px' }}>
        <Card title="相关推荐">
          <Row gutter={[20, 20]}>
            {products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4).map((p) => (
              <Col xs={24} sm={12} md={6} key={p.id}>
                <Card
                  hoverable
                  cover={
                    <div style={{ padding: 20, background: '#f9f9f9' }}>
                      <img
                        alt={p.name}
                        src={p.image}
                        style={{ width: '100%', height: 120, objectFit: 'contain' }}
                      />
                    </div>
                  }
                  onClick={() => navigate(`/product/${p.id}`)}
                >
                  <Card.Meta
                    title={p.name}
                    description={
                      <div>
                        <Text style={{ color: '#cf0a2c', fontWeight: 'bold' }}>¥{p.price}</Text>
                        <Text delete type="secondary" style={{ marginLeft: 8 }}>¥{p.originalPrice}</Text>
                      </div>
                    }
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </Card>
      </div>
    </Content>
  );
}
