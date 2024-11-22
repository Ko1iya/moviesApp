import { ConfigProvider } from 'antd';
import React from 'react';

interface IProps {
  children: React.ReactNode;
}

function WrapperConfigProvider(prop: IProps) {
  <ConfigProvider
    theme={{
      components: {
        Button: {
          // headerHeigh: '100',
        },
      },
    }}
  >
    {prop.children}
  </ConfigProvider>;
}

export default WrapperConfigProvider;
