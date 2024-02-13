'use client';

import {
  Card,
  Center,
  Divider,
  HStack,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { getCompanyDetail } from 'services/company.service';
import { resourceList } from 'services/resources.service';
import CompanyResources from './resourcesTable';

const CompanyDetail = ({ params }: { params: { id: string } }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [detail, setDetail] = useState(null);
  const [resources, setResources] = useState(null);
  const id = params.id;

  const bgColor = useColorModeValue('white', 'navy.800');

  const init = async () => {
    const res = await getCompanyDetail(id);
    setDetail(res);
    const resource = await resourceList({ companyID: id });
    setResources(resource);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <VStack pt="100px" w="100%" spacing="24px">
      <VStack w="100%" bg={bgColor} borderRadius="8px" p="24px">
        <Text w="100%" fontWeight={700} fontSize="20px">
          Company Detail
        </Text>
        <Divider />
        {detail
          ? Object.keys(detail).map((el) => (
              <HStack w="100%" justifyContent="space-between" key={el}>
                <Text fontWeight={700}>{el}</Text>
                <Text>{detail[el]}</Text>
              </HStack>
            ))
          : null}
      </VStack>

      {resources?.result?.length ? (
        <CompanyResources data={resources} isLoading={isLoading} />
      ) : null}
    </VStack>
  );
};

export default CompanyDetail;