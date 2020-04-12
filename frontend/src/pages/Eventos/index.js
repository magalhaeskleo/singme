import React from 'react';

import Tab1 from './Tab1';
import Tab2 from './Tab2';

export default function Eventos(props) {
  const { tabValue } = props;
  // const tabValue = 2;
  return (
    <React.Fragment>
      {tabValue === 1 && <Tab1 />}
      {tabValue === 2 && <Tab2 />}
    </React.Fragment>
  );
}
