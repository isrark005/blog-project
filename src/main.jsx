import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { AddPost, AllPosts, EditPost, Home, Post, Signin, Signup } from './pages'
import { Protection } from './compnents/AuthLayout.jsx'
import App from './App.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },{
        path: 'login',
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
          <Protection authentication>
            <AllPosts />
          </Protection>
        )
      },{
        path: '/post/:slug',
        element: (
          <Protection authentication>
            <Post />
          </Protection>
        )
      },{
        path: '/add-post',
        element: (
          <Protection authentication>
             {" "} 
            <AddPost />
          </Protection>
        )
      },{
        path: '/blog/edit-post/:slug',
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
