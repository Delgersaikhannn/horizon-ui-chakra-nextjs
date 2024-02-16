import {
  Box,
  Button,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
  useColorModeValue,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import MiniStatistics from 'components/card/MiniStatistics';
import { FormInput } from 'components/formInput';
import IconBox from 'components/icons/IconBox';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { HiOutlineUserPlus } from 'react-icons/hi2';
import { createUser } from 'services/users.service';

// type UserCreateProps = {

// }

const formInputs = [
  {
    name: 'email',
    label: 'Email',
    isRequired: true,
    type: 'email',
  },
  {
    name: 'phone',
    label: 'Phone',
    isRequired: true,
    type: 'text',
  },
  {
    name: 'password',
    label: 'Password',
    isRequired: true,
    type: 'password',
  },
];

type UserFormType = {
  phone: string;
  email: string;
  password: string;
};

type UserCreateProps = {
  onSuccess?: () => Promise<any>;
};
const UserCreateModal = ({ onSuccess }: UserCreateProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');
  const brandColor = useColorModeValue('brand.500', 'white');

  const toast = useToast();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<UserFormType>();

  const onSubmit: SubmitHandler<UserFormType> = async (values: any) => {
    try {
      // console.log('values', values);
      // return;
      setIsLoading(true);
      const res = await createUser(values);
      onSuccess && (await onSuccess());
      setIsLoading(false);
      setValue('email', '');
      setValue('phone', '');
      setValue('password', '');
      toast({ description: 'Successful', status: 'success' });
      onClose();
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      toast({
        description:
          //@ts-ignore
          err?.response?.data ?? 'Error show on console .',
        status: 'error',
      });
    }
  };

  return (
    <>
      <Box onClick={onOpen} cursor="pointer">
        {' '}
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={
                <Icon
                  w="32px"
                  h="32px"
                  as={HiOutlineUserPlus}
                  color={brandColor}
                />
              }
            />
          }
          name="Create new user"
          value={'Create'}
        />
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Create new user
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <VStack w="100%">
                {formInputs?.map((el, idx) => (
                  <FormInput
                    {...el}
                    register={register}
                    error={errors[el?.name as keyof UserFormType]}
                    key={el.name}
                  />
                ))}
                <Button type="submit" isLoading={isLoading}>
                  Submit
                </Button>
              </VStack>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UserCreateModal;
