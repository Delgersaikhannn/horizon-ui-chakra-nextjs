'use client';

import { Card, Center, Divider, HStack, Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { getCompanyDetail } from 'services/company.service';
import { resourceList } from 'services/resources.service';

const CompanyDetail = ({ params }: { params: { id: string } }) => {
  const [detail, setDetail] = useState(null);
  const [resources, setResources] = useState(null);
  const id = params.id;

  const init = async () => {
    const res = await getCompanyDetail(id);
    setDetail(res);
    // const resource = await resourceList({ companyID: id });
    // setResources(resource);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <VStack pt="100px" w="100%" spacing="24px">
      <VStack w="100%" bg="white" borderRadius="8px" p="24px">
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

      <VStack w="100%" bg="white" borderRadius="8px" p="24px">
        <Text w="100%" fontWeight={700} fontSize="20px">
          Resources
        </Text>
        <Divider />
        {/* {resources
          ? Object.keys(resources).map((el) => (
              <HStack w="100%" justifyContent="space-between" key={el}>
                <Text fontWeight={700}>{el}</Text>
                <Text>{detail[el]}</Text>
              </HStack>
            ))
          : null} */}
      </VStack>
    </VStack>
  );
};

export default CompanyDetail;
