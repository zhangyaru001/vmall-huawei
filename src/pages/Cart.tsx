import { useState } from 'react';
import { Layout, Table, Card, Typography, Button, InputNumber, Space, Row, Col, Divider, Empty, Checkbox, message } from 'antd';
import {
  DeleteOutlined,
  ShoppingOutlined,
  HeartOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import type { Product } from '../data/products';

const { Content } = Layout;
const { Title, Text } = Typography;

interface CartItem extends Product {
  quantity: number;
  selected: boolean;
}

const initialCartItems: CartItem[] = [
  { ...products[0], quantity: 1, selected: true },
  { ...products[2], quantity: 2, selected: true },
  { ...products[4], quantity: 1, selected: false },
];

export default function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [selectAll, setSelectAll] = useState(true);

  const handleQuantityChange = (id: number, quantity: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const handleSelect = (id: number, checked: boolean) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, selected: checked } : item
      )
    );
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    setCartItems(items =>
      items.map(item => ({ ...item, selected: checked }))
    );
  };

  const handleDelete = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
    message.success('已从购物车移除');
  };

  const handleCheckout = () => {
    const selectedItems = cartItems.filter(item => item.selected);
    if (selectedItems.length === 0) {
      message.warning('请选择要结算的商品');
      return;
    }
    message.success('正在跳转到结算页面...');
  };

  const selectedItems = cartItems.filter(item => item.selected);
  const totalPrice = selectedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalSaving = selectedItems.reduce(
    (sum, item) => sum + (item.originalPrice - item.price) * item.quantity,
    0
  );

  const columns = [
    {
      title: '商品信息',
      dataIndex: 'name',
      key: 'name',
      render: (_: any, record: CartItem) => (
        <Space>
          <Checkbox
            checked={record.selected}
            onChange={(e) => handleSelect(record.id, e.target.checked)}
          />
          <img
            src={record.image}
            alt={record.name}
            style={{ width: 80, height: 80, objectFit: 'contain', background: '#f5f5f5', borderRadius: 4 }}
          />
          <div>
            <div style={{ fontWeight: 500 }}>{record.name}</div>
            <Text type="secondary" style={{ fontSize: 12 }}>{record.description}</Text>
          </div>
        </Space>
      ),
    },
    {
      title: '单价',
      dataIndex: 'price',
      key: 'price',
      width: 150,
      render: (_: any, record: CartItem) => (
        <Space direction="vertical" size={0}>
          <Text style={{ color: '#cf0a2c', fontSize: 16, fontWeight: 'bold' }}>
            ¥{record.price}
          </Text>
          {record.originalPrice > record.price && (
            <Text delete type="secondary" style={{ fontSize: 12 }}>
              ¥{record.originalPrice}
            </Text>
          )}
        </Space>
      ),
    },
    {
      title: '数量',
      dataIndex: 'quantity',
      key: 'quantity',
      width: 150,
      render: (_: any, record: CartItem) => (
        <InputNumber
          min={1}
          max={10}
          value={record.quantity}
          onChange={(value) => handleQuantityChange(record.id, value || 1)}
          style={{ width: 80 }}
        />
      ),
    },
    {
      title: '小计',
      key: 'subtotal',
      width: 150,
      render: (_: any, record: CartItem) => (
        <Text style={{ color: '#cf0a2c', fontSize: 16, fontWeight: 'bold' }}>
          ¥{record.price * record.quantity}
        </Text>
      ),
    },
    {
      title: '操作',
      key: 'action',
      width: 100,
      render: (_: any, record: CartItem) => (
        <Space direction="vertical">
          <Button
            type="link"
            icon={<HeartOutlined />}
            size="small"
          >
            移入心愿单
          </Button>
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            size="small"
            onClick={() => handleDelete(record.id)}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Content style={{ background: '#f5f5f5', minHeight: '100vh', paddingBottom: 40 }}>
      {/* Header */}
      <div style={{ background: '#fff', padding: '20px 40px', borderBottom: '1px solid #eee' }}>
        <Title level={3} style={{ margin: 0 }}>购物车</Title>
      </div>

      {cartItems.length === 0 ? (
        <div style={{ padding: '100px 40px' }}>
          <Empty
            image={<ShoppingOutlined style={{ fontSize: 80, color: '#ccc' }} />}
            description="购物车还是空的"
          >
            <Button type="primary" onClick={() => navigate('/')}>
              去逛逛
            </Button>
          </Empty>
        </div>
      ) : (
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '20px' }}>
          <Row gutter={20}>
            {/* Cart Items */}
            <Col xs={24} lg={18}>
              <Card>
                <div style={{ marginBottom: 16 }}>
                  <Checkbox
                    checked={selectAll}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                  >
                    全选
                  </Checkbox>
                  <Text type="secondary" style={{ marginLeft: 16 }}>
                    已选择 {selectedItems.length} 件商品
                  </Text>
                </div>
                <Table
                  columns={columns}
                  dataSource={cartItems}
                  rowKey="id"
                  pagination={false}
                  bordered={false}
                />
              </Card>
            </Col>

            {/* Summary */}
            <Col xs={24} lg={6}>
              <Card>
                <Title level={5}>订单摘要</Title>
                <Divider />
                <Space direction="vertical" style={{ width: '100%' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Text>商品件数:</Text>
                    <Text>{selectedItems.reduce((sum, item) => sum + item.quantity, 0)} 件</Text>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Text>商品总价:</Text>
                    <Text>¥{selectedItems.reduce((sum, item) => sum + item.originalPrice * item.quantity, 0)}</Text>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#52c41a' }}>
                    <Text>优惠节省:</Text>
                    <Text>-¥{totalSaving}</Text>
                  </div>
                  <Divider />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text strong style={{ fontSize: 16 }}>应付金额:</Text>
                    <Text style={{ color: '#cf0a2c', fontSize: 24, fontWeight: 'bold' }}>
                      ¥{totalPrice}
                    </Text>
                  </div>
                </Space>
                <Button
                  type="primary"
                  size="large"
                  block
                  style={{
                    marginTop: 20,
                    background: '#cf0a2c',
                    borderColor: '#cf0a2c',
                    height: 48,
                    fontSize: 16
                  }}
                  onClick={handleCheckout}
                >
                  去结算
                </Button>
                <div style={{ marginTop: 16, textAlign: 'center' }}>
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    继续购物可获得更多优惠
                  </Text>
                </div>
              </Card>

              {/* Tips */}
              <Card style={{ marginTop: 16 }}>
                <Title level={5} style={{ fontSize: 14 }}>温馨提示</Title>
                <Space direction="vertical" style={{ width: '100%', fontSize: 12 }}>
                  <Text type="secondary">• 商品价格以实际下单时为准</Text>
                  <Text type="secondary">• 促销活动名额有限，先到先得</Text>
                  <Text type="secondary">• 如遇问题，请联系客服</Text>
                </Space>
              </Card>
            </Col>
          </Row>
        </div>
      )}
    </Content>
  );
}
