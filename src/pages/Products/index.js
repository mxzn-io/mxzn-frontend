import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { BadgeProps } from 'antd';
import { Button, Badge } from 'antd';
import { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import ProCard from '@ant-design/pro-card';
// @ts-ignore
// import styles from './split.less';
import IpList from './components/IpList';

export default () => {
  return (
    <PageContainer>
      <ProCard split="vertical">
        <ProCard colSpan="384px" ghost>
          {/*<IPList onChange={(cIp) => setIp(cIp)} ip={ip} />*/}
        </ProCard>
        <ProCard title={ip}>{/*<DetailList ip={ip} />*/}</ProCard>
      </ProCard>
    </PageContainer>
  );
};
