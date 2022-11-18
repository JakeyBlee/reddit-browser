import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './app/App';
import { Provider } from 'react-redux';
import { store } from './app/store'
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import { ErrorPage } from './app/ErrorPage';
import { PostPage } from './components/resultsSection/PostPage';
import { PostList } from './components/resultsSection/PostList';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            path: '/',
            element: <PostList />
          },
          {
            path: '/:postId',
            element: <PostPage/>
          },
        ],
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>
);