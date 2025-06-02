
import { Flex, Spinner, Heading, Box } from '@chakra-ui/react';
import NewCustomButton from '../Button/NewCustomButton';

export const Modal = ({
    isOpen,
    onClose,
    title,
    children,
    primaryButtonText = 'Confirm',
    onPrimaryButtonClick,
    secondaryButtonText,
    onSecondaryButtonClick,
    isLoading = false,

}) => {
    if (!isOpen) return null;



    return (
        <Flex
            position="fixed"
            top={0}
            bottom={0}
            left={0}
            right={0}
            alignItems="center"
            justifyContent="center"
            bg="blackAlpha.800"
            zIndex={9999}
        >
            <Flex
                bg="white"
                p={6}
                flexDirection="column"
                maxW="90vw"
                maxH="90vh"
                overflow="auto"
                borderRadius="md"
                position="relative"
            >
                {title && (
                    <Heading size="md" mb={4}>
                        {title}
                    </Heading>
                )}

                <Box flex={1}>
                    {isLoading ? (
                        <Flex justify="center" align="center" minH="200px">
                            <Spinner size="xl" />
                        </Flex>
                    ) : (
                        children
                    )}
                </Box>

                <Flex justify="flex-end" gap={3} mt={4}>
                    {secondaryButtonText && (
                        <NewCustomButton
                            variant="outline"
                            handleClick={onSecondaryButtonClick || onClose}
                        >
                            {secondaryButtonText}
                        </NewCustomButton>
                    )}
                    <NewCustomButton
                        display={isLoading ? 'none' : 'block'}
                        bg="green"
                        color="white"
                        handleClick={onPrimaryButtonClick || onClose}
                    >
                        {primaryButtonText}
                    </NewCustomButton>
                </Flex>
            </Flex>
        </Flex>
    );
};