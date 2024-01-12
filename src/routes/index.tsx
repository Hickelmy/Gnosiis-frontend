// src/routes/routes.tsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from "../page/Home";
import About from "../page/About";
import Contact from "../page/Contact";
import { AddBook } from "../page/Books";
import { NotFound } from "../page/NotFound/Animation/lottie";
import Login from "../page/Login";
import { Register } from "../page/Register";
import { BooktListPage } from "../page/BookTable";
import { UserList } from "../page/UserList";

const AppRoutes: React.FC = () => {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<About />} />
        <Route path="/contato" element={<Contact />} />
        <Route path="/novolivro" element={<AddBook />} />
        <Route path="/tabelalivros" element={<BooktListPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/registro" element={<Register />} />
        <Route path="*" element={<NotFound />} />


        
      </Routes>
  );
};

export default AppRoutes;
