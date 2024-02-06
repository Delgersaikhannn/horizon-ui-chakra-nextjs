import {
  Button,
  Flex,
  Link,
  Text,
  useColorModeValue,
  Image,
  HStack,
  Avatar,
  VStack,
  IconButton,
  Popover,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  PopoverFooter,
  ButtonGroup,
  useDisclosure,
  PopoverTrigger,
  Portal,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
} from '@chakra-ui/react';
import { useUser } from 'contexts/appContext';
import { MdLogout } from 'react-icons/md';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export default function SidebarDocs() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const bgColor = 'linear-gradient(135deg, #868CFF 0%, #4318FF 100%)';
  const textColor = useColorModeValue('black', 'white');

  const { user, updateUser } = useUser();
  const router = useRouter();

  const logout = () => {
    Cookies.remove('auth_token');
    updateUser(null);
    router.push('/auth/sign-in');
  };

  return (
    <HStack w="100%" px="10px">
      <HStack flexGrow={1}>
        {/* <Avatar size="sm" /> */}
        <VStack
          color={textColor}
          spacing={0}
          alignItems="flex-start"
          fontWeight={500}
          lineHeight={1.2}
        >
          <Text fontSize="12px" opacity={0.5}>
            {user?.role}
          </Text>
          <Text noOfLines={1}>{user?.email}</Text>
        </VStack>
      </HStack>

      <IconButton
        icon={<MdLogout />}
        aria-label="log-out"
        color="red.300"
        onClick={onOpen}
      />

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody pt="60px">
            <Text w="100%" textAlign="center">
              Are you sure you want to logout?
            </Text>
            <ModalFooter display="flex" justifyContent="center">
              <ButtonGroup size="sm">
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button colorScheme="red" onClick={logout}>
                  Logout
                </Button>
              </ButtonGroup>
            </ModalFooter>
          </ModalBody>
        </ModalContent>
      </Modal>
    </HStack>
  );
}
