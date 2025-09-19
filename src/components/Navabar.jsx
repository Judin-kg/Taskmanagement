// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// // import logo from "../src/assets/1000360388-removebg-preview.png";

// const Navabar = () => {
//   const [cartCount, setCartCount] = useState(0);
//   const user = JSON.parse(localStorage.getItem("user")); // 👈 get logged-in user

// //   useEffect(() => {
// //     if (user) {
// //       fetchCartCount();
// //     }
// //   }, [user]);

//   // ✅ Fetch cart item count
// //   const fetchCartCount = async () => {
// //     try {
// //       const res = await axios.get(`http://localhost:3000/api/cart/${user._id}`);
// //       setCartCount(res.data.length); // assuming backend returns array of items
// //     } catch (err) {
// //       console.error("❌ Error fetching cart count:", err);
// //     }
// //   };

//   return (
//     <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
     
//       <Link className="navbar-brand" to="/">
//   <img 
//     // src={logo}   // 👈 place your logo inside public/images/
//     alt="Task Manager" 
//     style={{ height: "40px" }} 
//   />
// </Link>

//       <button
//         className="navbar-toggler"
//         type="button"
//         data-bs-toggle="collapse"
//         data-bs-target="#navbarNav"
//       >
//         <span className="navbar-toggler-icon"></span>
//       </button>

//       <div className="collapse navbar-collapse" id="navbarNav">
//         <ul className="navbar-nav ms-auto">
//            <li className="nav-item">
//             <Link className="nav-link" to="/asstmanager-login">
//               Assistant Manager
//             </Link>
//           </li>
//           <li className="nav-item">
//             <Link className="nav-link" to="/manager-login">
//               Manager
//             </Link>
//           </li>
//           <li className="nav-item">
//             <Link className="nav-link" to="/admin-login">
//               Admin
//             </Link>
//           </li>

//           {/* ✅ Cart Button */}
          
//           {/* {user && (
//             <li className="nav-item">
//               <Link className="nav-link position-relative" to="/cart">
//                 🛒 Cart
//                 {cartCount > 0 && (
//                   <span className="badge bg-danger rounded-pill position-absolute top-0 start-100 translate-middle">
//                     {cartCount}
//                   </span>
//                 )}
//               </Link>
//             </li>
//           )} */}
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default Navabar;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
 // Import custom CSS for additional styling
// import logo from "../assets/1000360388-removebg-preview.png";

const Navabar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user")); // logged-in user

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 py-2 shadow-sm">
      {/* Brand Logo */}
      <Link className="navbar-brand d-flex align-items-center" to="/">
        <img
          // src={logo}
          // alt="Task Manager"
          style={{ height: "40px", marginRight: "8px" }}
        />
        <span className="fw-bold text-light">Task Manager</span>
      </Link>

      {/* Toggle Button for Mobile */}
      <button
        className="navbar-toggler"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* Desktop Menu */}
      <div className="collapse navbar-collapse d-none d-lg-flex" id="navbarNav">
        <ul className="navbar-nav ms-auto gap-3">
          <li className="nav-item">
            <Link className="nav-link" to="/asstmanager-login">
              Assistant Manager
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/manager-login">
              Manager
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/admin-login">
              Admin
            </Link>
          </li>
        </ul>
      </div>

      {/* Mobile Menu (Animated) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mobile-menu bg-dark position-absolute top-100 start-0 w-100 shadow-lg d-lg-none"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="list-unstyled m-0 p-3">
              <motion.li whileHover={{ x: 5 }}>
                <Link className="text-light d-block py-2" to="/asstmanager-login" onClick={() => setIsOpen(false)}>
                  Assistant Manager
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }}>
                <Link className="text-light d-block py-2" to="/manager-login" onClick={() => setIsOpen(false)}>
                  Manager
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }}>
                <Link className="text-light d-block py-2" to="/admin-login" onClick={() => setIsOpen(false)}>
                  Admin
                </Link>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navabar;
