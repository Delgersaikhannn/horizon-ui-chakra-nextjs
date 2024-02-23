import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  VStack,
} from '@chakra-ui/react';
import { FormInput } from 'components/formInput';
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { updateCompany } from 'services/company.service';
import { updateUser } from 'services/users.service';

const formInputs = [
  {
    name: 'name',
    label: 'Name',
    isRequired: true,
    type: 'text',
  },
  {
    name: 'domain',
    label: 'Domain',
    isRequired: true,
    type: 'email',
  },
  {
    name: 'status',
    label: 'Status',
    isRequired: true,
    type: 'text',
  },
  // {
  //   name: 'phone',
  //   label: 'Phone',
  //   isRequired: true,
  //   type: 'text',
  // },
  // {
  //   name: 'web',
  //   label: 'Web',
  //   isRequired: true,
  //   type: 'text',
  // },
];

type UserFormType = {
  name: string;
  domain: string;
  status: string;
  web: string;
  address: string;
};

type ResourceUpdateModalProps = {
  isOpen: boolean;
  onClose: () => void;
  defaultValue: any;
  onSuccess: () => Promise<any>;
};
const ResourceUpdateModal = ({
  isOpen,
  onClose,
  onSuccess,
  defaultValue,
}: ResourceUpdateModalProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<UserFormType> = async (values: any) => {
    try {
      // console.log('values', values);
      // return;
      setIsLoading(true);
      // const res = await updateCompany(defaultValue?.id, values);
      // onSuccess && (await onSuccess());
      setIsLoading(false);
      onClose();
    } catch (err) {
      console.log(err);
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
      setValue('name', defaultValue?.name);
      setValue('domain', defaultValue?.domain);
      setValue('status', defaultValue?.status);
      // setValue('email', defaultValue?.email);
      // setValue('name', defaultValue?.name);
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
export default ResourceUpdateModal;
