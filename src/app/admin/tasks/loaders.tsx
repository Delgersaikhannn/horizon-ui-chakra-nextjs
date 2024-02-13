'use client';

import { Skeleton, VStack } from '@chakra-ui/react';

const UsersListLoader = () => {
  return (
    <VStack w="100%">
      <Skeleton h="60px" w="100%" />
    </VStack>
  );
};

export { UsersListLoader };
