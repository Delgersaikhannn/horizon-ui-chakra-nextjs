import { ArrowLeftIcon } from '@chakra-ui/icons';
import { HStack, IconButton, Text } from '@chakra-ui/react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

type PaginatorProps = {
  page: number;
  pageby: number;
  total: number;
};

export const Paginator = ({ page, pageby, total }: PaginatorProps) => {
  return (
    <HStack spacing="12px">
      <IconButton icon={<MdChevronLeft />} aria-label="left" />
      <Text>{page}</Text>
      <IconButton icon={<MdChevronRight />} aria-label="right" />
    </HStack>
  );
};
