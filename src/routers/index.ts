import React from 'react';
import { RouteObject } from 'react-router-dom';
import LayoutComp from '@/components/layout';
import Redirect from '@/components/redirect';
import LoginPage from '@/pages/login';

const Invoice = React.lazy(() => import('comps/invoice'));
const Invoices = React.lazy(() => import('comps/invoices'));
const Ex1 = React.lazy(() => import('comps/example/ex1'));
const Ex2 = React.lazy(() => import('comps/example/ex2'));

const TestPage = React.lazy(() => import('@/pages/test'));

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
    path: '/login',
    element: React.createElement(LoginPage)
  },
  {
    path: '/index',
    element: React.createElement(LayoutComp)
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
        path: '/invoices',
        element: React.createElement(Invoices)
      },
      {
        path: '/test',
        element: React.createElement(TestPage)
      }
    ]
  }
];

export { routeConfig };
