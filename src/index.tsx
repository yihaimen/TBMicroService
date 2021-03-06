import { Button } from 'antd';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';

ReactDOM.render(
  <div>
    <h1>Hello React!</h1>
    <p>Hi Aaron</p>
    <Button type="primary">Click</Button>
  </div>,
  document.getElementById('root'),
);

declare let module: any;
if (module.hot) {
  module.hot.accept();
}

// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker
//       .register('/service-worker.js')
//       .then((registration) => {
//         console.log('SW registered: ', registration);
//       })
//       .catch((registrationError) => {
//         console.log('SW registration failed: ', registrationError);
//       });
//   });
// }
