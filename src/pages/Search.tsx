import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Layout, Row, Col, Card, Typography, Empty, Button, Rate, Tag, Space } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { products } from '../data/products';
import type { Product } from '../data/products';

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;

export default function Search() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<Product[]>([]);

  useEffect(() => {
    if (query) {
      const filtered = products.filter(
        p =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    }
  }, [query]);

  return (
    <Content style={{ background: '#f5f5f5', minHeight: '100vh', paddingBottom: 40 }}>
      <div style={{ background: '#fff', padding: '20px 40px', borderBottom: '1px solid #eee' }}>
        <Title level={4} style={{ margin: 0 }}>
          搜索结果: "{query}"
        </Title>
        <Text type="secondary">找到 {results.length} 个相关商品</Text>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '20px' }}>
        {results.length === 0 ? (
          <Empty description="未找到相关商品" style={{ marginTop: 60 }}>
            <Button type="primary" onClick={() => navigate('/')}>
              返回首页
            </Button>
          </Empty>
        ) : (
          <Row gutter={[20, 20]}>
            {results.map((product) => (
              <Col xs={24} sm={12} md={6} key={product.id}>
                <Card
                  hoverable
                  style={{ overflow: 'hidden', borderRadius: 8 }}
                  cover={
                    <div style={{ padding: 20, background: '#fff', cursor: 'pointer' }} onClick={() => navigate(`/product/${product.id}`)}>
                      <img
                        alt={product.name}
                        src={product.image}
                        style={{ width: '100%', height: 180, objectFit: 'contain' }}
                      />
                    </div>
                  }
                >
                  <Card.Meta
                    title={product.name}
                    description={
                      <div>
                        <Paragraph ellipsis={{ rows: 2 }} style={{ marginBottom: 8, fontSize: 13 }}>
                          {product.description}
                        </Paragraph>
                        <div style={{ marginBottom: 8 }}>
                          <Rate disabled defaultValue={5} style={{ fontSize: 12 }} />
                        </div>
                        <Space>
                          <Text style={{ color: '#cf0a2c', fontSize: 18, fontWeight: 'bold' }}>
                            ¥{product.price}
                          </Text>
                          <Text delete type="secondary">
                            ¥{product.originalPrice}
                          </Text>
                        </Space>
                        <div style={{ marginTop: 8 }}>
                          {product.tags.map((tag, index) => (
                            <Tag key={index} color="blue" style={{ marginBottom: 4 }}>
                              {tag}
                            </Tag>
                          ))}
                        </div>
                        <div style={{ marginTop: 12 }}>
                          <Button
                            type="primary"
                            icon={<ShoppingCartOutlined />}
                            size="small"
                            style={{ background: '#cf0a2c', borderColor: '#cf0a2c' }}
                          >
                            加入购物车
                          </Button>
                        </div>
                      </div>
                    }
                  />
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </Content>
  );
}
