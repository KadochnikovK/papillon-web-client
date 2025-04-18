import React from 'react'
import { Button, Image, Text, Box } from '@chakra-ui/react'

function CustomButton({ 
    icon, 
    gap, 
    handleClick, 
    padding, 
    children, 
    title, 
    isFull = false, 
    isColor = false,
    transitionDelay = '.1s'
}) {
    return (
        <Button 
            fontSize="md"
            position="relative"
            borderRadius="8px"
            bg={isColor ? 'main' : 'white'}
            gap={gap || '18px'}
            onClick={handleClick}
            p={padding || 2}
            title={title || ''}
            w="100%"
            overflow="hidden"
            transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
            _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'md'
            }}
            _active={{
                transform: 'scale(0.98)'
            }}
        >
            <Box
                display="flex"
                alignItems="center"
                gap={gap || '18px'}
                transform={isFull ? 'translateX(0)' : 'translateX(calc(50% - 10px))'}
                transition={`transform 0.3s cubic-bezier(0.4, 0, 0.2, 1) ${transitionDelay}`}
                w="100%"
            >
                <Image 
                    src={icon} 
                    w="20px"
                    h="20px"
                    flexShrink={0}
                />
                <Text 
                    color={isColor ? 'white' : 'main'}
                    fontWeight="500"
                    opacity={isFull ? 1 : 0}
                    w={isFull ? 'auto' : '0'}
                    overflow="hidden"
                    whiteSpace="nowrap"
                    transition={`opacity 0.2s ease ${transitionDelay}, width 0.3s ease ${transitionDelay}`}
                >
                    {children || 'click me'}
                </Text>
            </Box>
        </Button>
    )
}

export default React.memo(CustomButton)