'use client';

import { Card, Center, HStack, Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { getCompanyDetail } from 'services/company.service';

const CompanyDetail = ({ params }: { params: { id: string } }) => {
  const [detail, setDetail] = useState(null);
  const id = params.id;

  const init = async () => {
    const res = await getCompanyDetail(id);
    setDetail(res);
  };

  useEffect(() => {
    init();
  }, []);
  return (
    <VStack pt="100px" w="100%">
      <VStack w="100%" bg="white" borderRadius="8px" p="24px">
        {detail
          ? Object.keys(detail).map((el) => (
              <HStack w="100%" justifyContent="space-between" key={el}>
                <Text fontWeight={700}>{el}</Text>
                <Text>{detail[el]}</Text>
              </HStack>
            ))
          : null}
      </VStack>
    </VStack>
  );
};

export default CompanyDetail;
