import React from 'react';
import { RouteObject } from 'react-router-dom';
import LayoutComp from '@/components/layout';
import Redirect from '@/components/redirect';
import RegisterPage from '@/pages/register';

const Home = React.lazy(() => import('comps/home'));
const Invoice = React.lazy(() => import('comps/invoice'));
const Invoices = React.lazy(() => import('comps/invoices'));
const Ex1 = React.lazy(() => import('comps/example/ex1'));
const Ex2 = React.lazy(() => import('comps/example/ex2'));

const LoginPage = React.lazy(() => import('pages/login'));

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
  {},
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
        path: '/login',
        element: React.createElement(LoginPage)
      },
      {
        path: '/register',
        element: React.createElement(RegisterPage)
      }
    ]
  }
];

export { routeConfig };
