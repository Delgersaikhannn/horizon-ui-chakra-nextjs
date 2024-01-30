'use client';

import { Center, Spinner } from '@chakra-ui/react';
import { ReactNode, useEffect, useState } from 'react';
import { authValidate } from 'services/auth.service';
import _axios from 'services/axios';
import Cookies from 'universal-cookie';

const MainLayout = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const cookies = new Cookies();

  const init = async () => {
    const token = cookies.get('auth_token');

    if (token) {
      _axios.defaults.headers['set-cookie'] = `Authorization=${token}`;
    }

    const res = await authValidate();

    console.log('res', res);

    setIsLoading(false);
  };

  useEffect(() => {
    init();
  }, []);

  if (isLoading)
    return (
      <Center>
        <Spinner />
      </Center>
    );

  return <>{children}</>;
};

export default MainLayout;
