'use client';

import {
  Card,
  Center,
  Divider,
  HStack,
  IconButton,
  Text,
  VStack,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { getCompanyDetail } from 'services/company.service';
import { resourceList } from 'services/resources.service';
import { MdEdit } from 'react-icons/md';
import { getScanDetails } from 'services/scans.service';

const ScanDetail = ({ params }: { params: { id: string } }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [detail, setDetail] = useState(null);
  const [resources, setResources] = useState(null);
  const id = params.id;

  const bgColor = useColorModeValue('white', 'navy.800');

  const init = async () => {
    const res = await getScanDetails(id);
    setDetail(res);
    // const resource = await resourceList({ companyID: id });
    // setResources(resource);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <VStack pt="100px" w="100%" spacing="24px">
      <VStack w="100%" bg={bgColor} borderRadius="8px" p="24px" spacing="12px">
        <HStack w="100%" justifyContent="space-between">
          <Text w="100%" fontWeight={700} fontSize="20px">
            Scan Detail
          </Text>
          <IconButton icon={<MdEdit />} aria-label="edit" onClick={onOpen} />
        </HStack>
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

      {/* {resources?.result?.length ? (
        <CompanyResources data={resources} isLoading={isLoading} />
      ) : null} */}
      {/* <CompanyUpdateModal
        isOpen={isOpen}
        onClose={onClose}
        defaultValue={detail}
        onSuccess={init}
      /> */}
    </VStack>
  );
};

export default ScanDetail;
