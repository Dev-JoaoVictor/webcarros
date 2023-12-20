import { createBrowserRouter } from "react-router-dom";

import { Home } from "./pages/home";
import { SignIn } from "./pages/signin";
import { Register } from "./pages/register";
import { Layout } from "./components/layout";

import { New } from "./pages/new";
import { Private } from "./routes/private";
import { Dashboard } from "./pages/dashboard";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/dashboard', element: <Private><Dashboard /></Private> },
      { path: '/dashboard/new', element: <Private><New /></Private> }

    ]
  },
  { path: '/signin', element: <SignIn /> },
  { path: '/register', element: <Register /> }
])