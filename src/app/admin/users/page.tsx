'use client';

import React, { useEffect, useState } from 'react';

// Chakra imports
import {
  Box,
  Button,
  Flex,
  Grid,
  Text,
  useColorModeValue,
  SimpleGrid,
  Link,
  FormLabel,
  Icon,
  VStack,
} from '@chakra-ui/react';

// Custom components
import TableTopCreators from 'views/admin/marketplace/components/TableTopCreators';
import Card from 'components/card/Card';
import tableDataTopCreators from 'views/admin/marketplace/variables/tableDataTopCreators';
import { fetchUserList } from 'services/users.service';
import MiniStatistics from 'components/card/MiniStatistics';
import IconBox from 'components/icons/IconBox';
import { MdPerson } from 'react-icons/md';
import UsersTable from './usersTable';
import UserCreateModal from './createUser';

export type User = {
  id: string;
  createdAt: string;
  email: string;
  isActive: boolean;
  password: string;
  phone: string;
  role: string;
  updatedAt: string;
};

export type UserList = {
  pagination: {
    page: number;
    pageby: number;
    total: number;
  };
  result: Array<User>;
} | null;

export default function NftMarketplace() {
  // Chakra Color Mode
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorBrand = useColorModeValue('brand.500', 'white');
  const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');
  const brandColor = useColorModeValue('brand.500', 'white');

  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState({ page: 1, pageby: 25 });
  const [userList, setUserList] = useState<UserList>(null);

  const getUsers = async () => {
    try {
      setIsLoading(true);
      const res = await fetchUserList(pagination);
      setUserList(res);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  };

  const init = async () => {
    getUsers();
  };

  const props = { pagination, setPagination };

  useEffect(() => {
    init();
  }, [pagination]);

  return (
    <VStack
      pt={{ base: '180px', md: '80px', xl: '80px' }}
      w="100%"
      spacing="24px"
    >
      <Grid w="100%" gridTemplateColumns={{ xl: 'repeat(4, 1fr)' }} gap="24px">
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={<Icon w="32px" h="32px" as={MdPerson} color={brandColor} />}
            />
          }
          name="Total Users"
          value={userList?.pagination?.total ?? 0}
        />
        <UserCreateModal onSuccess={getUsers} />
      </Grid>
      <Grid
        mb="20px"
        gridTemplateColumns={{ xl: 'repeat(1fr)', '2xl': '1fr' }}
        gap={{ base: '20px', xl: '20px' }}
        display={{ base: 'block', xl: 'grid' }}
        w="100%"
      >
        <Card px="0px" mb="20px" maxW="100%">
          <UsersTable userList={userList} isLoading={isLoading} {...props} />
        </Card>
      </Grid>
      {/* Delete Product */}
    </VStack>
  );
}
