import type { FormInstance } from 'antd';
import { Button, Card, Form, Input, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { UserInfo } from '../../common/interfaces/user';
import { fetchUser, saveUserById } from '../libs/api';

function SubmitButton(props: { form: FormInstance; children: any; saveHandle: (values: UserInfo) => void }) {
  const { form, children, saveHandle } = props;
  const [submittable, setSubmittable] = React.useState<boolean>(false);

  const values = Form.useWatch([], form);
  React.useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false));
  }, [form, values]);

  return (
    <Button
      type="primary"
      htmlType="submit"
      size="large"
      disabled={!submittable}
      block
      onClick={() => {
        saveHandle(values);
      }}>
      {children}
    </Button>
  );
}

export default function EditProfile() {
  const [form] = Form.useForm();
  const [user, setUser] = useState({} as { id: number });
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser(location.state.id)
      .then((result) => {
        setUser(result.data);
        form.setFieldsValue(result.data);
      })
      .catch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card style={{ width: 300 }}>
      <Form form={form} name="validateOnly" autoComplete="off">
        <Form.Item name="username" label="用户名" rules={[{ required: true, message: '用户名不能为空!' }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="tel_no"
          label="手机号"
          rules={[
            { required: true, message: '手机号不能为空!' },
            () => ({
              validator(_, value) {
                if (!value) {
                  return Promise.resolve(null);
                }
                if (/\d{11}/.test(value)) {
                  return Promise.resolve(null);
                }
                return Promise.reject(new Error('手机号是11位数字即可'));
              },
            }),
          ]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="电子邮件"
          rules={[
            () => ({
              validator(_, value) {
                if (!value) {
                  return Promise.resolve(null);
                }
                /* eslint-disable no-useless-escape */
                if (/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(value)) {
                  return Promise.resolve(null);
                }
                return Promise.reject(new Error('邮箱格式不正确!'));
              },
            }),
          ]}>
          <Input />
        </Form.Item>
        <Form.Item name="address" label="家庭住址">
          <Input.TextArea />
        </Form.Item>
        <Form.Item>
          <SubmitButton
            form={form}
            saveHandle={(values: UserInfo) => {
              saveUserById(user.id, values)
                .then((data) => {
                  if (data.code === 0) {
                    message.success('修改成功');
                    setTimeout(() => {
                      navigate('/');
                    }, 300);
                  } else {
                    message.error(data.message);
                  }
                })
                .catch((error) => {
                  message.error(error.message);
                });
            }}>
            保存
          </SubmitButton>
          <Button htmlType="reset" size="large" style={{ marginTop: 10 }} block>
            清空
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
