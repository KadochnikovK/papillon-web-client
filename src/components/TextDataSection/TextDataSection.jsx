import { Flex, Heading } from '@chakra-ui/react';
import CustomInput from '../ui/CustomInput/CustomInput';

export const TextDataSection = ({ textData, onChange, isEditing }) => {
    if (!isEditing) return null;

    return (
        <Flex gap="20px" w="100%" h="100%" bg="white" flexDirection="column" paddingTop="8px"
            height="85vh" overflowY="auto" className="scrollbar" paddingRight="20px">
            {/* <Heading size="md">Text Data</Heading> */}
            {Object.entries(textData).map(
                ([key, value]) => key !== 'employee_id' && (
                    <CustomInput
                        key={key}
                        label={key}
                        value={value}
                        onChange={(e) => onChange(e, key)}
                    />
                )
            )}
        </Flex>
    );
};