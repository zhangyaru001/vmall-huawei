import { Layout, Table, Card, Typography, Button, InputNumber, Space, Row, Col, Divider, Empty, Checkbox, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {
  DeleteOutlined,
  ShoppingOutlined,
  HeartOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useCart, type CartItem } from '../context/CartContext';

const { Content } = Layout;
const { Title, Text } = Typography;

export default function Cart() {
  const navigate = useNavigate();
  const {
    items,
    updateQuantity,
    removeItem,
    toggleSelect,
    toggleSelectAll,
    getSelectedItems,
    getTotalPrice,
    getTotalSaving,
  } = useCart();

  const selectedItems = getSelectedItems();
  const totalPrice = getTotalPrice();
  const totalSaving = getTotalSaving();

  const selectAll = items.length > 0 && items.every(item => item.selected);

  const handleSelectAll = (checked: boolean) => {
    toggleSelectAll(checked);
  };

  const handleDelete = (id: number) => {
    removeItem(id);
  };

  const handleCheckout = () => {
    const selected = getSelectedItems();
    if (selected.length === 0) {
      message.warning('请选择要结算的商品');
      return;
    }
    message.success('正在跳转到结算页面...');
  };

  const columns: ColumnsType<CartItem> = [
    {
      title: '商品信息',
      dataIndex: 'name',
      key: 'name',
      render: (_: unknown, record: CartItem) => (
        <Space>
          <Checkbox
            checked={record.selected}
            onChange={() => toggleSelect(record.id)}
          />
          <img
            src={record.image}
            alt={record.name}
            style={{ width: 80, height: 80, objectFit: 'contain', background: '#f5f5f5', borderRadius: 4 }}
          />
          <div>
            <div style={{ fontWeight: 500 }}>{record.name}</div>
            <Text type="secondary" style={{ fontSize: 12 }}>{record.selectedSpec}</Text>
          </div>
        </Space>
      ),
    },
    {
      title: '单价',
      dataIndex: 'price',
      key: 'price',
      width: 150,
      render: (_: unknown, record: CartItem) => (
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
      render: (_: unknown, record: CartItem) => (
        <InputNumber
          min={1}
          max={10}
          value={record.quantity}
          onChange={(value) => updateQuantity(record.id, value || 1)}
          style={{ width: 80 }}
        />
      ),
    },
    {
      title: '小计',
      key: 'subtotal',
      width: 150,
      render: (_: unknown, record: CartItem) => (
        <Text style={{ color: '#cf0a2c', fontSize: 16, fontWeight: 'bold' }}>
          ¥{record.price * record.quantity}
        </Text>
      ),
    },
    {
      title: '操作',
      key: 'action',
      width: 100,
      render: (_: unknown, record: CartItem) => (
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

      {items.length === 0 ? (
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
                  dataSource={items}
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
