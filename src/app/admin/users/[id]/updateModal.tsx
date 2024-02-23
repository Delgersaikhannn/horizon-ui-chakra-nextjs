import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { FormInput } from 'components/formInput';
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { updateUser } from 'services/users.service';

const formInputs = [
  {
    name: 'phone',
    label: 'Phone',
    isRequired: true,
    type: 'text',
  },
];

type UserFormType = { phone: string };

type UserUpdateModalProps = {
  isOpen: boolean;
  onClose: () => void;
  defaultValue: any;
  onSuccess: () => Promise<any>;
};
const UserUpdateModal = ({
  isOpen,
  onClose,
  onSuccess,
  defaultValue,
}: UserUpdateModalProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

  const onSubmit: SubmitHandler<UserFormType> = async (values: any) => {
    try {
      setIsLoading(true);
      console.log('values', values);
      const res = await updateUser(defaultValue?.id, values);
      onSuccess && (await onSuccess());
      setIsLoading(false);
      onClose();
    } catch (err: any) {
      console.log(err);
      toast({ status: 'error', description: err?.response?.data ?? '' });
      setIsLoading(false);
    }
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<UserFormType>();

  useEffect(() => {
    if (defaultValue) {
      setValue('phone', defaultValue?.phone);
    }
  }, [defaultValue]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody py="44px">
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack w="100%">
              {formInputs?.map((el, idx) => (
                <FormInput
                  {...el}
                  key={el.name}
                  register={register}
                  defaultValue={defaultValue ? defaultValue[el.name] : ''}
                />
              ))}
              <Button type="submit" isLoading={isLoading}>
                Update
              </Button>
            </VStack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
export default UserUpdateModal;
