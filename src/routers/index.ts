import React from 'react';
import { RouteObject } from 'react-router-dom';
import LayoutComp from '@/components/layout';
import Redirect from '@/components/redirect';

const Home = React.lazy(() => import('comps/home'));
const Invoice = React.lazy(() => import('comps/invoice'));
const Ex1 = React.lazy(() => import('comps/example/ex1'));
const Ex2 = React.lazy(() => import('comps/example/ex2'));

const routeConfig: RouteObject[] = [
  {
    path: '*',
    element: 'not found'
  },
  {
    path: '/',
    element: React.createElement(Redirect)
  },
  {
    path: '/index',
    element: React.createElement(Home)
  },
  {
    element: React.createElement(LayoutComp),
    children: [
      {
        path: '/Ex1',
        element: React.createElement(Ex1)
      },
      {
        path: '/Ex2',
        element: React.createElement(Ex2),
        children: [
          {
            path: 'invoice:invoiceId',
            element: React.createElement(Invoice)
          }
        ]
      },
      {
        path: '/invoice',
        element: React.createElement(Invoice)
      }
    ]
  }
];

export { routeConfig };
