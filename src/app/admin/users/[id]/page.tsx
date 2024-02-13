'use client';

import {
  Divider,
  HStack,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { fetchUserDetail } from 'services/users.service';
import { formatData } from 'utils/helpers';

const UserDetail = ({ params }: { params: { id: string } }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [detail, setDetail] = useState(null);
  const [resources, setResources] = useState(null);
  const id = params.id;

  const bgColor = useColorModeValue('white', 'navy.800');

  const init = async () => {
    const res = await fetchUserDetail(id);
    setDetail(res);
    //   const resource = await resourceList({ companyID: id });
    //   setResources(resource);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <VStack pt="100px" w="100%" spacing="24px">
      <VStack w="100%" bg={bgColor} borderRadius="8px" p="24px">
        <Text w="100%" fontWeight={700} fontSize="20px">
          User Detail
        </Text>
        <Divider />
        {detail
          ? Object.keys(detail).map((el) => (
              <HStack w="100%" justifyContent="space-between" key={el}>
                <Text>{el}</Text>
                <Text fontWeight={700}>{formatData(detail[el])}</Text>
              </HStack>
            ))
          : null}
      </VStack>

      {/* {resources ? (
          <CompanyResources data={resources} isLoading={isLoading} />
        ) : null} */}
    </VStack>
  );
};
export default UserDetail;
