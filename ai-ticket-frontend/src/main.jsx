import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CheckAuth from './components/check-auth.jsx'
import TicketsPage from './pages/tickets.jsx'
import TicketPage from './pages/ticket.jsx'
import AdminPanel from './pages/admin.jsx'
import SignupPage from "./pages/signup.jsx";
import LoginPage from "./pages/login.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route 
          path='/'
          element={
            <CheckAuth protected={true}>
              <TicketsPage/>
            </CheckAuth>
          }
        />

        <Route 
          path='/tickets/:id'
          element={
            <CheckAuth protected={true}>
              <TicketPage/>
            </CheckAuth>
          }
        />

        <Route 
          path='/login'
          element={
            <CheckAuth protected={false}>
              <LoginPage/>
            </CheckAuth>
          }
        />

        <Route 
          path='/signup'
          element={
            <CheckAuth protected={false}>
              <SignupPage/>
            </CheckAuth>
          }
        />

        <Route 
          path='/admin'
          element={
            <CheckAuth protected={true}>
              <AdminPanel/>
            </CheckAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
