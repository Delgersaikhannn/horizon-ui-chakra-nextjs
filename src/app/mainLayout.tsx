'use client';

import { Center, Spinner } from '@chakra-ui/react';
import { useUser } from 'contexts/appContext';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';
import { authValidate } from 'services/auth.service';
import _axios from 'services/axios';

const MainLayout = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);

  const { user, updateUser } = useUser();

  const router = useRouter();

  const init = async () => {
    try {
      const res = await authValidate();

      updateUser(res);

      setIsLoading(false);
    } catch (err) {
      router.push('/auth/sign-in');
      setIsLoading(false);
      console.log(err);
    }
  };

  useEffect(() => {
    init();
  }, []);

  if (isLoading)
    return (
      <Center minH="100vh" w="100%">
        <Spinner />
      </Center>
    );

  return <>{children}</>;
};

export default MainLayout;
