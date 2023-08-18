import React from "react"
import { createRoot } from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import App from "./App"

import Dashboard from "./pages/dashboard"
import News from "./pages/news"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />
      },

      {
        path: "news",
        element: <News />
      }
    ]
  }
])

const rootApp = createRoot(document.getElementById("app"))

rootApp.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
