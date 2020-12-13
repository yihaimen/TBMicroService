import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';

ReactDOM.render(
  <div className="App">
    <h1>Hello React!</h1>
    <p>Hi Aaron</p>
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
