import { EditOutlined, HomeOutlined, MailOutlined, MobileOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Spin, message } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { UserInfo } from '../../common/interfaces/user';
import { fetchUser } from '../libs/api';
import './home.css';

const ProfileFields = {
  username: { label: '用户名', icon: <UserOutlined /> },
  tel_no: { label: '手机号', icon: <MobileOutlined /> },
  email: { label: '邮箱', icon: <MailOutlined /> },
  address: { label: '地址', icon: <HomeOutlined /> },
};

type MenuItem = { key: string; label: string; icon: JSX.Element; value: any };
function Home() {
  const [userInfo, setUserInfo] = useState([] as MenuItem[]);
  const [loading, setLoading] = useState(true);
  const [rawUserInfo, setRawUserInfo] = useState({} as UserInfo & { id: number });

  const convertUserInfo = (userData: { [x: string]: string }) => {
    const menuItems: MenuItem[] = [];
    Object.keys(ProfileFields).forEach((key) => {
      const field = ProfileFields[key as keyof typeof ProfileFields];
      if (key !== 'avatar') {
        menuItems.push({
          key,
          label: field.label,
          icon: field.icon,
          value: userData[key],
        });
      }
    });
    return userInfo;
  };

  useEffect(() => {
    fetchUser(1)
      .then((result) => {
        if (result.code !== 0) {
          message.error(result.message);
          return;
        }
        if (!result.data) {
          message.error('用户不存在');
          return;
        }
        setRawUserInfo(result.data);
        const info = convertUserInfo(result.data);
        setUserInfo(info);
        setLoading(false);
      })
      .catch((error) => {
        message.error(error.message);
      });
  });

  const navigate = useNavigate();

  return (
    <div className="profile" style={{ background: '#85a5ff', borderRadius: 8 }}>
      <div style={{ display: 'flex', justifyContent: 'center', padding: '20px 0px' }}>
        <Avatar
          size={{ xs: 100, sm: 100, md: 100, lg: 64, xl: 80, xxl: 100 }}
          src={rawUserInfo.avatar}
          style={{ border: 'white 4px solid', background: '#5cdbd3' }}
        />
      </div>
      <Card
        style={{ width: 300 }}
        actions={[
          <Button
            type="link"
            size="small"
            color="default"
            variant="link"
            icon={<EditOutlined />}
            block
            onClick={() => {
              navigate('/edit', {
                state: rawUserInfo,
              });
            }}>
            编辑
          </Button>,
        ]}>
        <div style={{ minHeight: 50 }}>
          {loading ? (
            <Spin style={{ padding: '20px 0' }} tip="正在读取用户信息" size="large">
              {' '}
            </Spin>
          ) : (
            <ul>
              {userInfo.map((user) => (
                <li key={user.key}>
                  <div style={{ marginBottom: 8 }}>
                    {user.icon}
                    <span style={{ marginLeft: 12 }}>
                      {user.value ? (
                        <strong>{user.value}</strong>
                      ) : (
                        <span style={{ color: 'GrayText' }}>暂无{user.label}...</span>
                      )}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Card>
    </div>
  );
}

export default Home;
