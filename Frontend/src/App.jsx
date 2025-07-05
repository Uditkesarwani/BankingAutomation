
import Home from "./user/home";
import About from "./user/about";
import UserTransactions from "./user/UserTransactions";
import Transfer from "./user/transfer";
import Services from "./user/services";
import Contact from "./user/contact";
import Detail from "./user/detail";
import Profile from "./user/profile";
import AccountCreated from "./user/AccountCreated";

import AuthPage from "./auth/authpage";

import AdminHome from './admin/AdminHome'
import Transactions from './admin/Transactions'

import Navbar from "./components/navbar"

import { createBrowserRouter ,RouterProvider } from "react-router-dom";
import AccountDashboard from "./user/accountDashboard";
import ViewUserTransactions from "./admin/ViewUserTransactions";
import AdminUserTransactions from "./admin/AdminUserTransactions";
import ViewLogin from "./admin/ViewLogin";
import ManageAccount from "./admin/ManageAccount";
import AdminMessages from "./admin/Messages";
import ProtectedUserRoute from './components/ProtectedUserRoute'
import ProtectedAdminRoute from './components/ProtectedAdminRoute'

function App() {
  const router = createBrowserRouter([
    { path: "/auth", element: <AuthPage /> },

    {
      path: "/",
      element: (
        <>
        <ProtectedUserRoute>
          <Navbar />
          <Home />
          </ProtectedUserRoute>
        </>
      ),
    },
    {
      path: "/about",
      element: (
        <>
        <ProtectedUserRoute>
          <Navbar />
          <About />
          </ProtectedUserRoute>
        </>
      ),
    },
    {
      path: "/AccountCreate",
      element: (
        <>
        <ProtectedUserRoute>
          <Navbar />
          <AccountCreated />
        </ProtectedUserRoute>
        </>
      ),
    },
    {
      path: "/UserTransactions",
      element: (
        <>
        <ProtectedUserRoute>
          <Navbar />
          <UserTransactions />
          </ProtectedUserRoute>
        </>
      ),
    },
    {
      path: "/transfer",
      element: (
       <>
       <ProtectedUserRoute>
                <Navbar />
          <Transfer />
          </ProtectedUserRoute>
        </>
      ),
    },
    {
      path: "/services",
      element: (
        <>
        <ProtectedUserRoute>
          <Navbar />
          <Services />
          </ProtectedUserRoute>
        </>
      ),
    },
    {
      path: "/contact",
      element: (
        <>
        <ProtectedUserRoute>
          <Navbar />
          <Contact />
          </ProtectedUserRoute>
        </>
      ),
    },
    {
      path: "/detail",
      element: (
        <>
        <ProtectedUserRoute>
          <Navbar />
          <Detail />
          </ProtectedUserRoute>
        </>
      ),
    },
    {
      path: "/profile",
      element: (
        <>
        <ProtectedUserRoute>
          <Navbar />
          <Profile />
          </ProtectedUserRoute>
        </>
      ),
    },
    {
      path: "/AccountDashboard",
      element: (
        <>
        <ProtectedUserRoute>
          <Navbar />
          <AccountDashboard />
          </ProtectedUserRoute>
        </>
      ),
    },{
      path: "/admin",
      element: (
        <>
        <ProtectedAdminRoute>
          <AdminHome />
        </ProtectedAdminRoute>
        </>
      ),
    },
    {
      path: "/admin/view-Login",
      element: (
        <>
        <ProtectedAdminRoute>
          <ViewLogin />
        </ProtectedAdminRoute>
        </>
      ),
    },
    {
      path: "/admin/manage-account",
      element: (
        <>
        <ProtectedAdminRoute>
          <ManageAccount />
        </ProtectedAdminRoute>
        </>
      ),
    },
   
    {
      path: "/admin/transactions",
      element: (
        <>
        <ProtectedAdminRoute>
          <Transactions />
        </ProtectedAdminRoute>
        </>
      ),
    },
    {
      path: "/admin/Viewtransactions",
      element: (
        <>
        <ProtectedAdminRoute>
          <ViewUserTransactions/>
        </ProtectedAdminRoute>
        </>
      ),
    },
    {
      path: "/admin/user-transactions/:userId",
      element: (
        <>
        <ProtectedAdminRoute>
          <AdminUserTransactions/>
        </ProtectedAdminRoute>
        </>
      ),
    },
    {
      path: "/admin/messages",
      element: (
        <>
        <ProtectedAdminRoute>
          <AdminMessages/>
        </ProtectedAdminRoute>
        </>
      ),
    },
   
  ]);

  return <RouterProvider router={router} />;
}

export default App;
 
