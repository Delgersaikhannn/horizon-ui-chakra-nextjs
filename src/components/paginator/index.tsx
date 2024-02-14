import { ArrowLeftIcon } from '@chakra-ui/icons';
import { HStack, IconButton, Text } from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

type PaginatorProps = {
  pagination: { page: number; pageby: number };
  setPagination: Dispatch<SetStateAction<{ page: number; pageby: number }>>;
  total: number;
};

export const Paginator = ({
  pagination,
  setPagination,
  total = 0,
}: PaginatorProps) => {
  const onNext = () => {
    const curr = pagination?.page * pagination?.pageby;
    if (curr < total) {
      setPagination({ ...pagination, page: pagination?.page + 1 });
    }
  };

  const onPrev = () => {
    if (pagination?.page === 1) {
      return;
    }
    const curr = pagination?.page * pagination?.pageby;
    setPagination({ ...pagination, page: pagination?.page - 1 });
    console.log('prev', pagination?.page === 1);
  };
  return (
    <HStack spacing="12px">
      <IconButton
        icon={<MdChevronLeft />}
        aria-label="left"
        onClick={onPrev}
        isDisabled={pagination?.page <= 1}
      />
      <Text>{pagination?.page}</Text>
      <IconButton
        icon={<MdChevronRight />}
        aria-label="right"
        onClick={onNext}
        isDisabled={pagination?.page * pagination?.pageby >= total}
      />
    </HStack>
  );
};
