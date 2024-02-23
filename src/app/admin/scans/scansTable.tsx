import {
  Avatar,
  Box,
  Button,
  Flex,
  Input,
  Progress,
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
// Custom components
import * as React from 'react';
import { Scan, ScanList } from './page';
import Link from 'next/link';
import { Paginator } from 'components/paginator';
// Assets

const columnHelper = createColumnHelper<Scan>();

type TopCreatorTableProps = {
  data: ScanList;
  isLoading: boolean;
  pagination: { page: number; pageby: number };
  setPagination: React.Dispatch<
    React.SetStateAction<{ page: number; pageby: number }>
  >;
};

// const columns = columnsDataCheck;
export default function ScansTable(props: TopCreatorTableProps) {
  const { data, pagination, setPagination } = props;
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = useColorModeValue('secondaryGray.600', 'white');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');

  const paginatorProps = {
    pagination,
    setPagination,
  };

  const col0 = data?.result[0] ?? {};
  const columns = Object.keys(col0)?.map((el) =>
    columnHelper.accessor(
      //@ts-ignore
      el,
      {
        id: el,
        header: () => (
          <Text
            justifyContent="space-between"
            align="center"
            fontSize={{ sm: '10px', lg: '12px' }}
            color="gray.400"
          >
            {el}
          </Text>
        ),
        cell: (info: any) =>
          info?.column?.id === 'id' ? (
            <Link href={`/admin/scans/${info?.getValue()}`}>
              <Text
                color={textColorSecondary}
                fontSize="sm"
                fontWeight="500"
                minW="100px"
              >
                {info?.getValue()}
              </Text>
            </Link>
          ) : (
            <Text
              color={textColorSecondary}
              fontSize="sm"
              fontWeight="500"
              minW="100px"
            >
              {info?.getValue()}
            </Text>
          ),
      },
    ),
  );

  const table = useReactTable({
    data: data?.result,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });
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
          Scans
        </Text>
        <Paginator total={data?.pagination?.total ?? 0} {...paginatorProps} />
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
              {data?.result.length
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
