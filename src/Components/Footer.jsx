import React from "react";

const Footer = () => {
  return (
    <div className="bg-black text-white py-2 w-full text-center">
      <footer>
        <h1>© {new Date().getFullYear} TodoMate. All rights reserved</h1>
        <h1>Created by Mahesh Rayate</h1>
      </footer>
    </div>
  );
};

export default Footer;
