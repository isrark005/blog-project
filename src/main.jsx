import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter, createRoutesFromChildren } from 'react-router-dom'
import { AddPost, AllPosts, EditPost, Home, Post, Signin, Signup } from './pages'
import { Protection } from './compnents/AuthLayout.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    children: [
      {
        path: '/login',
        element: (
          <Protection authentication={false}>
            <Signin />
          </Protection>
        )
      },{
        path: '/create-account',
        element: (
          <Protection authentication={false}>
            <Signup />
          </Protection>
        )
      },{
        path: '/blogs',
        element: (
          <Protection authentication={false}>
            <AllPosts />
          </Protection>
        )
      },{
        path: '/blog/:slug',
        element: (
          <Protection authentication={false}>
            <Post />
          </Protection>
        )
      },{
        path: '/blog/new/:slug',
        element: (
          <Protection authentication>
            <AddPost />
          </Protection>
        )
      },{
        path: '/blog/edit/:slug',
        element: (
          <Protection authentication>
            <EditPost />
          </Protection>
        )
      },
    ]
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
