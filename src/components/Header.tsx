import { useState } from 'react';
import { Layout, Menu, Input, Button, Badge, Dropdown, Space, Avatar } from 'antd';
import {
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import type { MenuProps } from 'antd';

const { Header } = Layout;

const headerStyle: React.CSSProperties = {
  background: '#fff',
  position: 'sticky',
  top: 0,
  zIndex: 100,
  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
  padding: '0 40px',
  height: 80,
  lineHeight: '80px'
};

const logoStyle: React.CSSProperties = {
  fontSize: 24,
  fontWeight: 'bold',
  color: '#cf0a2c',
  marginRight: 40,
  cursor: 'pointer',
  fontFamily: 'HuaweiSans, Arial, sans-serif'
};

const searchStyle: React.CSSProperties = {
  width: 400,
  borderRadius: 20
};

const navItems: MenuProps['items'] = [
  { key: '1', label: <Link to="/">首页</Link> },
  { key: '2', label: <Link to="/category/手机">手机</Link> },
  { key: '3', label: <Link to="/category/笔记本">笔记本</Link> },
  { key: '4', label: <Link to="/category/平板">平板</Link> },
  { key: '5', label: <Link to="/category/穿戴">穿戴</Link> },
  { key: '6', label: <Link to="/category/音频">音频</Link> },
];

const userMenuItems: MenuProps['items'] = [
  { key: '1', label: <Link to="/profile">个人中心</Link> },
  { key: '2', label: <Link to="/orders">我的订单</Link> },
  { key: '3', label: <Link to="/address">收货地址</Link> },
  { type: 'divider' },
  { key: '4', label: '退出登录' },
];

export default function HeaderComponent() {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = () => {
    if (searchValue) {
      navigate(`/search?q=${encodeURIComponent(searchValue)}`);
    }
  };

  return (
    <Header style={headerStyle}>
      <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
        <Link to="/">
          <div style={logoStyle}>
            华为商城
          </div>
        </Link>

        <Menu
          mode="horizontal"
          defaultSelectedKeys={['1']}
          items={navItems}
          style={{ 
            flex: 1, 
            border: 'none', 
            minWidth: 400,
            fontSize: 15
          }}
        />

        <Space size="large">
          <Input
            placeholder="搜索商品"
            prefix={<SearchOutlined />}
            style={searchStyle}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onPressEnter={handleSearch}
          />
          
          <Badge count={0} showZero={false}>
            <Button 
              type="text" 
              icon={<ShoppingCartOutlined style={{ fontSize: 22 }} />}
              onClick={() => navigate('/cart')}
            />
          </Badge>

          <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
            <Avatar 
              icon={<UserOutlined />} 
              style={{ cursor: 'pointer', background: '#cf0a2c' }}
            />
          </Dropdown>
        </Space>
      </div>
    </Header>
  );
}
