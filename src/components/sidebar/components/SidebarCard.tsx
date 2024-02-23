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
  Box,
} from '@chakra-ui/react';
import { useUser } from 'contexts/appContext';
import { MdLogout } from 'react-icons/md';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { logoutService } from 'services/auth.service';
import { PropsWithChildren, useState } from 'react';

export default function LogoutWrapper({ children }: PropsWithChildren) {
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const bgColor = 'linear-gradient(135deg, #868CFF 0%, #4318FF 100%)';
  const textColor = useColorModeValue('black', 'white');

  const { user, updateUser } = useUser();
  const router = useRouter();

  const logout = async () => {
    try {
      setIsLoading(true);
      await logoutService();
    } catch (err) {
    } finally {
      setIsLoading(false);
      Cookies.remove('auth_token');
      updateUser(null);
      router.push('/auth/sign-in');
    }
  };

  return (
    <>
      <Box onClick={onOpen}>{children}</Box>

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
                <Button
                  colorScheme="red"
                  onClick={logout}
                  isLoading={isLoading}
                >
                  Logout
                </Button>
              </ButtonGroup>
            </ModalFooter>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
