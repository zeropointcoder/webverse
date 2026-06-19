import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Products from '../pages/Products' 
import Cart from '../pages/Cart'
import Checkout from '../pages/Checkout'
import OrderSuccess from '../pages/OrderSuccess'
import OrderFailure from '../pages/OrderFailure'

function AppRoutes() {
  return (
    <Routes>
        <Route path={'/'} element={<Products></Products>}></Route>
        <Route path={'/products'} element={<Navigate to={'/'} />}></Route>
        <Route path={'/cart'} element={<Cart></Cart>}></Route>
        <Route path={'/checkout'} element={<Checkout></Checkout>}></Route>
        <Route path={'/orders/success'} element={<OrderSuccess></OrderSuccess>}></Route>
        <Route path={'/orders/failure'} element={<OrderFailure></OrderFailure>}></Route>
        <Route path={'*'} element={<Navigate to={'/'} />}></Route>
    </Routes>
  )
}

export default AppRoutes