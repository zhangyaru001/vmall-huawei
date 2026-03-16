import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout, Row, Col, Card, Typography, Select, Space, Button, Rate, Tag, Empty, message } from 'antd';
import {
  AppstoreOutlined,
  UnorderedListOutlined,
  ShoppingCartOutlined,
  HeartOutlined,
} from '@ant-design/icons';
import { products } from '../data/products';
import type { Product } from '../data/products';

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;

export default function Category() {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [sortBy, setSortBy] = useState<string>('default');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    if (category) {
      let filtered = products.filter(p => p.category === category);
      
      switch (sortBy) {
        case 'price-asc':
          filtered.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          filtered.sort((a, b) => b.price - a.price);
          break;
        case 'name':
          filtered.sort((a, b) => a.name.localeCompare(b.name));
          break;
      }
      
      setFilteredProducts(filtered);
    }
  }, [category, sortBy]);

  const handleSortChange = (value: string) => {
    setSortBy(value);
  };

  const handleAddToCart = (product: Product) => {
    message.success(`已添加 ${product.name} 到购物车`);
  };

  return (
    <Content style={{ background: '#f5f5f5', minHeight: '100vh', paddingBottom: 40 }}>
      {/* Header */}
      <div style={{ background: '#fff', padding: '20px 40px', borderBottom: '1px solid #eee' }}>
        <Title level={3} style={{ margin: 0 }}>{category}</Title>
        <Text type="secondary">共 {filteredProducts.length} 款商品</Text>
      </div>

      {/* Toolbar */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '20px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Space>
              <Text>排序:</Text>
              <Select
                value={sortBy}
                onChange={handleSortChange}
                style={{ width: 150 }}
                options={[
                  { value: 'default', label: '默认排序' },
                  { value: 'price-asc', label: '价格从低到高' },
                  { value: 'price-desc', label: '价格从高到低' },
                  { value: 'name', label: '按名称排序' },
                ]}
              />
            </Space>
            <Space>
              <Button
                icon={<AppstoreOutlined />}
                type={viewMode === 'grid' ? 'primary' : 'default'}
                onClick={() => setViewMode('grid')}
              />
              <Button
                icon={<UnorderedListOutlined />}
                type={viewMode === 'list' ? 'primary' : 'default'}
                onClick={() => setViewMode('list')}
              />
            </Space>
          </div>
        </Card>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <Empty description="暂无商品" style={{ marginTop: 60 }} />
        ) : (
          <Row gutter={[20, 20]} style={{ marginTop: 20 }}>
            {filteredProducts.map((product) => (
              <Col xs={24} sm={12} md={viewMode === 'grid' ? 6 : 12} key={product.id}>
                <Card
                  hoverable
                  style={{ overflow: 'hidden', borderRadius: 8 }}
                  cover={
                    <div style={{ padding: 20, background: '#fff', cursor: 'pointer' }} onClick={() => navigate(`/product/${product.id}`)}>
                      <img
                        alt={product.name}
                        src={product.image}
                        style={{ width: '100%', height: viewMode === 'grid' ? 180 : 120, objectFit: 'contain' }}
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
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Space>
                            <Text style={{ color: '#cf0a2c', fontSize: 18, fontWeight: 'bold' }}>
                              ¥{product.price}
                            </Text>
                            <Text delete type="secondary">
                              ¥{product.originalPrice}
                            </Text>
                          </Space>
                        </div>
                        <div style={{ marginTop: 8 }}>
                          {product.tags.map((tag, index) => (
                            <Tag key={index} color={tag === '热销' ? 'red' : 'blue'} style={{ marginBottom: 4 }}>
                              {tag}
                            </Tag>
                          ))}
                        </div>
                        <div style={{ marginTop: 12 }}>
                          <Space>
                            <Button
                              type="primary"
                              icon={<ShoppingCartOutlined />}
                              size="small"
                              style={{ background: '#cf0a2c', borderColor: '#cf0a2c' }}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAddToCart(product);
                              }}
                            >
                              加入购物车
                            </Button>
                            <Button
                              icon={<HeartOutlined />}
                              size="small"
                              onClick={(e) => e.stopPropagation()}
                            >
                              心愿单
                            </Button>
                          </Space>
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
