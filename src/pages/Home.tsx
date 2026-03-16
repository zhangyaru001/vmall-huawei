import { Layout, Carousel, Row, Col, Card, Typography, Tag, Button, Space, Rate, Tabs, Flex } from 'antd';
import {
  RightOutlined,
  ShoppingCartOutlined,
  HeartOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { products, banners, categories } from '../data/products';
import type { Product } from '../data/products';

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;

const bannerStyle: React.CSSProperties = {
  height: 500,
  overflow: 'hidden'
};

const categoryCardStyle: React.CSSProperties = {
  textAlign: 'center',
  cursor: 'pointer',
  transition: 'all 0.3s',
  padding: '20px 10px',
  borderRadius: 8,
  background: '#fff',
  border: 'none',
  boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
};

const productCardStyle: React.CSSProperties = {
  cursor: 'pointer',
  transition: 'all 0.3s',
  overflow: 'hidden',
  borderRadius: 8
};

const sectionTitleStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 24
};

export default function Home() {
  const navigate = useNavigate();

  const handleProductClick = (product: Product) => {
    navigate(`/product/${product.id}`);
  };

  const hotProducts = products.slice(0, 4);
  const newProducts = products.slice(4, 8);

  const tabItems = [
    {
      key: 'hot',
      label: (
        <span>
          <ThunderboltOutlined /> 热门推荐
        </span>
      ),
      children: (
        <Row gutter={[20, 20]}>
          {hotProducts.map((product) => (
            <Col xs={24} sm={12} md={6} key={product.id}>
              <Card
                hoverable
                style={productCardStyle}
                cover={
                  <div style={{ padding: 20, background: '#f5f5f5' }}>
                    <img
                      alt={product.name}
                      src={product.image}
                      style={{ width: '100%', height: 180, objectFit: 'contain' }}
                    />
                  </div>
                }
                onClick={() => handleProductClick(product)}
              >
                <Card.Meta
                  title={product.name}
                  description={
                    <div>
                      <Paragraph ellipsis={{ rows: 2 }} style={{ marginBottom: 8, fontSize: 13 }}>
                        {product.description}
                      </Paragraph>
                      <Flex justify="space-between" align="center">
                        <Space>
                          <Text style={{ color: '#cf0a2c', fontSize: 20, fontWeight: 'bold' }}>
                            ¥{product.price}
                          </Text>
                          {product.originalPrice > product.price && (
                            <Text delete type="secondary">
                              ¥{product.originalPrice}
                            </Text>
                          )}
                        </Space>
                      </Flex>
                      <div style={{ marginTop: 8 }}>
                        {product.tags.map((tag, index) => (
                          <Tag key={index} color={tag === '热销' ? 'red' : 'blue'} style={{ marginBottom: 4 }}>
                            {tag}
                          </Tag>
                        ))}
                      </div>
                    </div>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
      )
    },
    {
      key: 'new',
      label: '新品上市',
      children: (
        <Row gutter={[20, 20]}>
          {newProducts.map((product) => (
            <Col xs={24} sm={12} md={6} key={product.id}>
              <Card
                hoverable
                style={productCardStyle}
                cover={
                  <div style={{ padding: 20, background: '#f5f5f5' }}>
                    <img
                      alt={product.name}
                      src={product.image}
                      style={{ width: '100%', height: 180, objectFit: 'contain' }}
                    />
                  </div>
                }
                onClick={() => handleProductClick(product)}
              >
                <Card.Meta
                  title={product.name}
                  description={
                    <div>
                      <Paragraph ellipsis={{ rows: 2 }} style={{ marginBottom: 8, fontSize: 13 }}>
                        {product.description}
                      </Paragraph>
                      <Flex justify="space-between" align="center">
                        <Space>
                          <Text style={{ color: '#cf0a2c', fontSize: 20, fontWeight: 'bold' }}>
                            ¥{product.price}
                          </Text>
                          {product.originalPrice > product.price && (
                            <Text delete type="secondary">
                              ¥{product.originalPrice}
                            </Text>
                          )}
                        </Space>
                      </Flex>
                      <div style={{ marginTop: 8 }}>
                        {product.tags.map((tag, index) => (
                          <Tag key={index} color="green" style={{ marginBottom: 4 }}>
                            {tag}
                          </Tag>
                        ))}
                      </div>
                    </div>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
      )
    }
  ];

  return (
    <Content style={{ background: '#f5f5f5', minHeight: '100vh' }}>
      {/* Banner Carousel */}
      <Carousel autoplay effect="fade" style={bannerStyle}>
        {banners.map((banner) => (
          <div key={banner.id}>
            <div
              style={{
                height: 500,
                background: `linear-gradient(to right, #fff 0%, #f5f5f5 100%)`,
                display: 'flex',
                alignItems: 'center',
                paddingLeft: 120
              }}
            >
              <div style={{ width: 400 }}>
                <Title level={2} style={{ color: '#333', marginBottom: 16 }}>
                  {banner.title}
                </Title>
                <Text style={{ fontSize: 18, color: '#666' }}>{banner.subtitle}</Text>
                <div style={{ marginTop: 24 }}>
                  <Button type="primary" size="large" style={{ background: '#cf0a2c', borderColor: '#cf0a2c' }}>
                    立即购买
                  </Button>
                </div>
              </div>
              <img
                src={banner.image}
                alt={banner.title}
                style={{ width: 500, height: 400, objectFit: 'contain', marginLeft: 100 }}
              />
            </div>
          </div>
        ))}
      </Carousel>

      {/* Categories */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 20px 20px' }}>
        <Row gutter={[16, 16]}>
          {categories.map((category, index) => (
            <Col xs={12} sm={8} md={3} key={index}>
              <div
                style={categoryCardStyle}
                onClick={() => navigate(`/category/${category.key}`)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
                }}
              >
                <div style={{ fontSize: 32, marginBottom: 8 }}>{category.icon}</div>
                <Text strong>{category.name}</Text>
              </div>
            </Col>
          ))}
        </Row>
      </div>

      {/* Hot Products Section */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 20px' }}>
        <div style={sectionTitleStyle}>
          <Title level={4} style={{ margin: 0 }}>热门产品</Title>
          <Link to="/category/手机" style={{ color: '#666' }}>
            查看更多 <RightOutlined />
          </Link>
        </div>
        <Row gutter={[20, 20]}>
          {products.slice(0, 4).map((product) => (
            <Col xs={24} sm={12} md={6} key={product.id}>
              <Card
                hoverable
                style={productCardStyle}
                cover={
                  <div style={{ padding: 20, background: '#fff' }}>
                    <img
                      alt={product.name}
                      src={product.image}
                      style={{ width: '100%', height: 180, objectFit: 'contain' }}
                    />
                  </div>
                }
                onClick={() => handleProductClick(product)}
              >
                <Card.Meta
                  title={product.name}
                  description={
                    <div>
                      <Paragraph ellipsis={{ rows: 2 }} style={{ marginBottom: 8, fontSize: 13 }}>
                        {product.description}
                      </Paragraph>
                      <Flex justify="space-between" align="center">
                        <Space>
                          <Text style={{ color: '#cf0a2c', fontSize: 20, fontWeight: 'bold' }}>
                            ¥{product.price}
                          </Text>
                          <Text delete type="secondary">
                            ¥{product.originalPrice}
                          </Text>
                        </Space>
                      </Flex>
                      <Flex justify="space-between" align="center" style={{ marginTop: 12 }}>
                        <Rate disabled defaultValue={5} style={{ fontSize: 12 }} />
                        <Space>
                          <Button
                            type="text"
                            icon={<HeartOutlined />}
                            size="small"
                          />
                          <Button
                            type="primary"
                            icon={<ShoppingCartOutlined />}
                            size="small"
                            style={{ background: '#cf0a2c', borderColor: '#cf0a2c' }}
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                          >
                            加入购物车
                          </Button>
                        </Space>
                      </Flex>
                    </div>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* All Products with Tabs */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px 40px' }}>
        <div style={sectionTitleStyle}>
          <Title level={4} style={{ margin: 0 }}>全部产品</Title>
        </div>
        <Card>
          <Tabs items={tabItems} />
        </Card>
      </div>
    </Content>
  );
}
