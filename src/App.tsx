import { createBrowserRouter } from "react-router-dom";

import { Home } from "./pages/home";
import { SignIn } from "./pages/signin";
import { Register } from "./pages/register";
import { Layout } from "./components/layout";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },

    ]
  },
  { path: '/signin', element: <SignIn /> },
  { path: '/register', element: <Register /> }
])