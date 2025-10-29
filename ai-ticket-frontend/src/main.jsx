import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CheckAuth from './components/check-auth.jsx'
import Navbar from './components/navbar.jsx'
import TicketsPage from './pages/tickets.jsx'
import TicketPage from './pages/ticket.jsx'
import AdminPanel from './pages/admin.jsx'
import SignupPage from "./pages/signup.jsx";
import LoginPage from "./pages/login.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route 
          path='/'
          element={
            <CheckAuth protectedRoute={true}>
              <TicketsPage/>
            </CheckAuth>
          }
        />

        <Route 
          path='/tickets/:id'
          element={
            <CheckAuth protectedRoute={true}>
              <TicketPage/>
            </CheckAuth>
          }
        />

        <Route 
          path='/login'
          element={
            <CheckAuth protectedRoute={false}>
              <LoginPage/>
            </CheckAuth>
          }
        />

        <Route 
          path='/signup'
          element={
            <CheckAuth protectedRoute={false}>
              <SignupPage/>
            </CheckAuth>
          }
        />

        <Route 
          path='/admin'
          element={
            <CheckAuth protectedRoute={true}>
              <AdminPanel/>
            </CheckAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
