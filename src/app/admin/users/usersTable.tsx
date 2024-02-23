import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Input,
  Progress,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { User, UserList } from 'app/admin/users/page';
import { Paginator } from 'components/paginator';
// Custom components
import * as React from 'react';
import Link from 'next/link';
// Assets

const columnHelper = createColumnHelper<User>();

type TopCreatorTableProps = {
  userList: UserList;
  isLoading: boolean;
  pagination: { page: number; pageby: number };
  setPagination: React.Dispatch<
    React.SetStateAction<{ page: number; pageby: number }>
  >;
};

// const columns = columnsDataCheck;
export default function UsersTable(props: TopCreatorTableProps) {
  const { userList, pagination, setPagination, isLoading } = props;
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = useColorModeValue('secondaryGray.600', 'white');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');

  const paginatorProps = {
    pagination,
    setPagination,
  };
  const columns = [
    columnHelper.accessor((row) => row?.email, {
      id: 'email',
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: '10px', lg: '12px' }}
          color="gray.400"
        >
          EMAIL
        </Text>
      ),
      cell: (info) => (
        <Link
          href={`/admin/users/${
            userList?.result ? userList?.result[info.row.index].id : ''
          }`}
        >
          <Text
            color={textColor}
            fontSize="sm"
            fontWeight="600"
            onClick={() => console.log(info)}
          >
            {info?.getValue()}
          </Text>
        </Link>
      ),
    }),
    columnHelper.accessor('role', {
      id: 'role',
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: '10px', lg: '12px' }}
          color="gray.400"
        >
          ROLE
        </Text>
      ),
      cell: (info) => (
        <Text color={textColorSecondary} fontSize="sm" fontWeight="500">
          {info.getValue()}
        </Text>
      ),
    }),
    columnHelper.accessor('phone', {
      id: 'phone',
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: '10px', lg: '12px' }}
          color="gray.400"
        >
          PHONE
        </Text>
      ),
      cell: (info) => (
        <Text color={textColorSecondary} fontSize="sm" fontWeight="500">
          {info.getValue()}
        </Text>
      ),
    }),
    columnHelper.accessor('password', {
      id: 'password',
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: '10px', lg: '12px' }}
          color="gray.400"
        >
          PASSWORD
        </Text>
      ),
      cell: (info) => (
        <Input
          color={textColorSecondary}
          fontSize="sm"
          fontWeight="500"
          value={info.getValue()}
          type="password"
        />
      ),
    }),
    columnHelper.accessor('isActive', {
      id: 'isActive',
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: '10px', lg: '12px' }}
          color="gray.400"
        >
          Is Active
        </Text>
      ),
      cell: (info) => (
        <Text color={textColorSecondary} fontSize="sm" fontWeight="500">
          {info ? 'ACTIVE' : 'NOT ACTIVE'}
        </Text>
      ),
    }),
    columnHelper.accessor('createdAt', {
      id: 'createdAt',
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: '10px', lg: '12px' }}
          color="gray.400"
        >
          Created at
        </Text>
      ),
      cell: (info) => (
        <Text
          color={textColorSecondary}
          fontSize="sm"
          fontWeight="500"
          opacity={0.6}
        >
          {info.getValue()}
        </Text>
      ),
    }),
    columnHelper.accessor('updatedAt', {
      id: 'updatedAt',
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: '10px', lg: '12px' }}
          color="gray.400"
        >
          Updated at
        </Text>
      ),
      cell: (info) => (
        <Text
          color={textColorSecondary}
          fontSize="sm"
          fontWeight="500"
          opacity={0.6}
        >
          {info.getValue()}
        </Text>
      ),
    }),
  ];

  const table = useReactTable({
    data: userList?.result,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });
  if (isLoading)
    return (
      <Center w="100%" minH="300px">
        <Spinner />
      </Center>
    );
  return (
    <Flex
      direction="column"
      w="100%"
      overflowX={{ sm: 'scroll', lg: 'hidden' }}
    >
      <Flex
        align={{ sm: 'flex-start', lg: 'center' }}
        justify="space-between"
        w="100%"
        px="22px"
        pb="20px"
        mb="10px"
        boxShadow="0px 40px 58px -20px rgba(112, 144, 176, 0.26)"
      >
        <Text color={textColor} fontSize="xl" fontWeight="600">
          User profiles
        </Text>
        <Paginator
          total={userList?.pagination?.total ?? 0}
          {...paginatorProps}
        />
      </Flex>
      <Box w="100%" overflow="auto">
        <Box>
          <Table variant="simple" color="gray.500" mt="12px" w="100%">
            <Thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <Tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <Th
                        key={header.id}
                        colSpan={header.colSpan}
                        pe="10px"
                        borderColor={borderColor}
                        cursor="pointer"
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        <Flex
                          justifyContent="space-between"
                          align="center"
                          fontSize={{ sm: '10px', lg: '12px' }}
                          color="gray.400"
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                          {{
                            asc: '',
                            desc: '',
                          }[header.column.getIsSorted() as string] ?? null}
                        </Flex>
                      </Th>
                    );
                  })}
                </Tr>
              ))}
            </Thead>
            <Tbody>
              {userList?.result.length
                ? table
                    .getRowModel()
                    .rows.slice(0, 11)
                    .map((row) => {
                      return (
                        <Tr key={row.id}>
                          {row.getVisibleCells().map((cell) => {
                            return (
                              <Td
                                key={cell.id}
                                fontSize={{ sm: '14px' }}
                                minW={{ sm: '150px', md: '200px', lg: 'auto' }}
                                borderColor="transparent"
                              >
                                {flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext(),
                                )}
                              </Td>
                            );
                          })}
                        </Tr>
                      );
                    })
                : null}
            </Tbody>
          </Table>
        </Box>
      </Box>
    </Flex>
  );
}
