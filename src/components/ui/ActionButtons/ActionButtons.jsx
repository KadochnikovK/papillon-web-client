// components/ActionButtons/ActionButtons.jsx
import { Flex } from '@chakra-ui/react';
import NewCustomButton from '../Button/NewCustomButton';

export const ActionButtons = ({
    isEditing,
    hasChanges,
    onSave,
    onCancel
}) => {
    if (!isEditing) return null;

    return (
        <Flex gap="10px" position="fixed" bottom="10px">
            {hasChanges && (
                <NewCustomButton bg="green" color="white" padding="10px"
                    maxWidth="max-content" w="100%" handleClick={onSave}>
                    Save
                </NewCustomButton>
            )}
            <NewCustomButton bg="red" color="white" padding="10px"
                maxWidth="max-content" w="100%" handleClick={onCancel}>
                Cancel
            </NewCustomButton>
        </Flex>
    );
};