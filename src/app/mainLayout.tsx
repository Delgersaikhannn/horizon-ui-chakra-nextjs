'use client';

import { Center, Spinner } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';
import { authValidate } from 'services/auth.service';
import _axios from 'services/axios';

const MainLayout = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  const init = async () => {
    try {
      const res = await authValidate();

      console.log('res', res);

      setIsLoading(false);
      router.push('/admin/default');
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    init();
  }, []);

  //   if (isLoading)
  //     return (
  //       <Center>
  //         <Spinner />
  //       </Center>
  //     );

  return <>{children}</>;
};

export default MainLayout;
