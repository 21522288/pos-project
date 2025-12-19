import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import PosScreen from './pages/PosScreen/PosScreen'
import AppLayout from './components/Layout/AppLayout'
import OrderScreen from './pages/OrderScreen/OrderScreen';

function App() {

  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/pos" element={<PosScreen />} />
          <Route path="/orders" element={<OrderScreen/>} />
        </Routes>
      </AppLayout>
    </Router>

  )
}

export default App
