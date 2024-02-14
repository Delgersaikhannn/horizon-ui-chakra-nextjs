import { Input, Text, VStack, useColorModeValue } from '@chakra-ui/react';

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
  error,
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
        {...(register(name), { required: isRequired })}
        defaultValue={defaultValue}
        color={textColor}
      />
    </VStack>
  );
};
