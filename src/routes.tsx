import { Icon } from '@chakra-ui/react';
import { IoMdListBox } from 'react-icons/io';
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  MdOutlineShoppingCart,
  MdGroups,
  MdApartment,
  MdGrid3X3,
  MdList,
} from 'react-icons/md';

// Admin Imports
// import MainDashboard from './pages/admin/default';
// import NFTMarketplace from './pages/admin/nft-marketplace';
// import Profile from './pages/admin/profile';
// import DataTables from './pages/admin/data-tables';
// import RTL from './pages/rtl/rtl-default';

// Auth Imports
// import SignInCentered from './pages/auth/sign-in';
import { IRoute } from 'types/navigation';

const routes: IRoute[] = [
  {
    name: 'Main Dashboard',
    layout: '/admin',
    path: '/default',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
  },
  {
    name: 'Companies',
    layout: '/admin',
    path: '/companies',
    icon: <Icon as={MdApartment} width="20px" height="20px" color="inherit" />,
    secondary: true,
  },
  {
    name: 'Users',
    layout: '/admin',
    icon: <Icon as={MdGroups} width="20px" height="20px" color="inherit" />,
    path: '/users',
  },
  {
    name: 'Resources',
    layout: '/admin',
    path: '/recources',
    icon: <Icon as={IoMdListBox} width="20px" height="20px" color="inherit" />,
  },
  {
    name: 'Tasks',
    layout: '/admin',
    path: '/tasks',
    icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
  },
  // {
  //   name: 'RTL Layout',
  //   layout: '/rtl',
  //   path: '/rtl-default',
  //   icon: <Icon as={MdGrid3X3} width="20px" height="20px" color="inherit" />,
  // },
];

export default routes;
