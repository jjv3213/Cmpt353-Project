import React from 'react';
import { Router } from "@reach/router"

import { Dashboard } from './pages/Dashboard';
import { CustomerPage } from './pages/CustomerPage';
import { CustomerLoginPage } from './pages/CustomerLoginPage';
import { EmployeePage } from './pages/EmployeePage';
import { EmployeeMenuPage } from './pages/EmployeeMenuPage';
import { Navbar } from './components/Navbar'

function App() {
  return (
    <div>
      <Navbar />
      <Router>
        <Dashboard path="/" />
        <CustomerLoginPage path="customer/login" />
        <CustomerPage path="/customer/:name" />
        <EmployeePage path="/employee/orders" />
        <EmployeeMenuPage path="/employee/menu" />
      </Router>
    </div>
  );
}

export default App;
