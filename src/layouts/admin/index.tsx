// Chakra imports
import { Portal, Box, useDisclosure } from '@chakra-ui/react';
import { AdminNavbar } from 'components/navbar/NavbarAdmin';
// Layout components
import Sidebar from 'components/sidebar/Sidebar';
import { SidebarContext } from 'contexts/SidebarContext';
import { useUser } from 'contexts/appContext';
import { usePathname, useRouter } from 'next/navigation';
import { PropsWithChildren, useEffect, useState } from 'react';
import routes from 'routes';
import {
  getActiveNavbar,
  getActiveNavbarText,
  getActivePath,
  getActiveRoute,
  isWindowAvailable,
} from 'utils/navigation';

interface DashboardLayoutProps extends PropsWithChildren {
  [x: string]: any;
}

// Custom Chakra theme
export default function AdminLayout(props: DashboardLayoutProps) {
  const { children, ...rest } = props;
  // states and functions
  const [fixed] = useState(false);
  const [toggleSidebar, setToggleSidebar] = useState(false);

  const pathname = usePathname();
  // functions for changing the states from components
  const { onOpen } = useDisclosure();

  useEffect(() => {
    window.document.documentElement.dir = 'ltr';
  });

  return (
    <Box>
      <SidebarContext.Provider
        value={{
          toggleSidebar,
          setToggleSidebar,
        }}
      >
        <Sidebar routes={routes} display="none" {...rest} />
        <Box
          float="right"
          minHeight="100vh"
          height="100%"
          overflow="auto"
          position="relative"
          maxHeight="100%"
          w={{ base: '100%', xl: 'calc( 100% - 290px )' }}
          maxWidth={{ base: '100%', xl: 'calc( 100% - 290px )' }}
          transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
          transitionDuration=".2s, .2s, .35s"
          transitionProperty="top, bottom, width"
          transitionTimingFunction="linear, linear, ease"
        >
          <Portal>
            <Box>
              <AdminNavbar
                onOpen={onOpen}
                logoText={'Horizon UI Dashboard PRO'}
                brandText={getActiveRoute(routes, pathname)}
                secondary={getActiveNavbar(routes, pathname)}
                message={getActiveNavbarText(routes, pathname)}
                path={getActivePath(routes, pathname)}
                fixed={fixed}
                {...rest}
              />
            </Box>
          </Portal>

          <Box
            mx="auto"
            p={{ base: '20px', md: '30px' }}
            pe="20px"
            minH="100vh"
            pt="50px"
          >
            {children}
          </Box>
        </Box>
      </SidebarContext.Provider>
    </Box>
  );
}
