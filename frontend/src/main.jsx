import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PayPalScriptProvider } from '@paypal/react-paypal-js' // <--- Import PayPal
import store from './store'
import App from './App.jsx'
import './index.css' // Or './custom.css' if you used that
import AdminRoute from './components/AdminRoute.jsx'
// 1. We wrap the App in BrowserRouter here 
// (OR if you are using the newer router method, we fix it below)

/* CRITICAL FIX: 
   If your App.jsx has <Routes> inside it (which yours does), 
   we should use <BrowserRouter> in main.jsx, NOT RouterProvider.
*/

import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>
)