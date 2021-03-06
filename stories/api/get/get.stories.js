import React from 'react';
import { storiesOf } from '@storybook/react';
import { Row, Col, Button } from 'antd';
import { wInfo } from '../../../.storybook/utils';
import mdGet from './get.md';

import { ComponentListFactory } from '../../../src';
import { modelPropsGen, COMP_LIST } from '../../helper';

const {
  ComponentListWithStore: ComponentListWithStore1,
  client: client1
} = ComponentListFactory();

// const {
//   ComponentListWithStore: ComponentListWithStore2,
//   client: client2
// } = ComponentListFactory();

const styles = {
  demoWrap: {
    display: 'flex',
    width: '100%'
  }
};

let attributes = {};

const getInfo = (client, filter) => () => {
  const query = filter && filter.length ? `filter=${filter.join(',')}` : '';
  client.get(`/model?${query}`).then(res => {
    const { status, body } = res;
    if (status === 200) {
      attributes = body.attributes;
    }

    document.getElementById('info').innerText = JSON.stringify(attributes, null, 4);
  });
};

const createNew = client => () => {
  const model = modelPropsGen();
  client.post('/model', { model: model });
};

function onClick(value) {
  console.log('当前值：', value);
}
storiesOf('API - get', module)
  .addParameters(wInfo(mdGet))
  .addWithJSX('/model 获取属性信息', () => {
    return (
      <Row style={styles.demoWrap}>
        <Row type="flex" justify="space-between" align="top">       
          <Col span={10} offset={2}>
            <Button onClick={getInfo(client1)}>获取信息</Button>
            <Button onClick={getInfo(client1, ['styles', 'visible'])}>
              获取指定信息(styles, visible)
            </Button>
            <Button onClick={createNew(client1)}>随机创建</Button>
          </Col>
          <Col span={12}>
            <div id="info" />
          </Col>
        </Row>
        <Col span={24}>
          <ComponentListWithStore1 list={COMP_LIST} onSelectItem={onClick} />
        </Col>
      </Row>
    );
  });