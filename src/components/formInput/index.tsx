import {
  Collapse,
  Input,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';

type FormInputProps = {
  label: string;
  name: string;
  error?: any;
  type: string;
  isRequired: boolean;
  register: any;
  defaultValue?: string;
};

export const FormInput = ({
  label,
  name,
  error = {},
  type,
  isRequired,
  register,
  defaultValue,
}: FormInputProps) => {
  const textColor = useColorModeValue('black', 'white');
  return (
    <VStack w="100%" alignItems="flex-start">
      <Text>{label}</Text>
      <Input
        placeholder={label}
        // defaultValue={defaultValue}
        color={textColor}
        type={type}
        {...register(name, { required: isRequired })}
      />
      <Collapse in={error ? true : false} style={{ width: '100%' }}>
        <Text color="red.300" fontSize="12px">
          {error?.type}
        </Text>
      </Collapse>
    </VStack>
  );
};
