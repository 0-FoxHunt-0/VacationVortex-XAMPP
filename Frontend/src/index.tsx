import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Layout from './Components/LayoutArea/Layout/Layout';
import './index.css';
import reportWebVitals from './reportWebVitals';
import interceptors from './Utils/Interceptor';

// Create interceptors once:
interceptors.create()

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <Layout />
  </BrowserRouter>
);

reportWebVitals();
