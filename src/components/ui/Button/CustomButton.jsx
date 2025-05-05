import React from 'react'
import { Button, Image, Text, Box } from '@chakra-ui/react'

const ICON_SIZE = "20px"
const TRANSITION_MAIN = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
const DELAY_STANDART = ".1s"
const GAP_STANDART = "18px"
const RADIUS_STANDART = "8px"
const COLOR_MAIN = 'main'


function CustomButton({ 
    icon, 
    gap = GAP_STANDART, 
    handleClick, 
    padding, 
    children = "Click me", 
    title, 
    isFull = false, 
    isColor = false,
    transitionDelay = DELAY_STANDART
}) {
    return (
        <Button 
            fontSize="md"
            position="relative"
            borderRadius={RADIUS_STANDART}
            bg={isColor ? COLOR_MAIN : 'white'}
            gap={gap}
            onClick={handleClick}
            p={padding || 2}
            title={title || ''}
            w={isFull ? '100%' : 'max-content'}
            overflow="hidden"
            transition={TRANSITION_MAIN}
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
                transition={`${TRANSITION_MAIN} ${transitionDelay}`}
                w="100%"
            >
                <Image 
                    src={icon} 
                    w={ICON_SIZE}
                    h={ICON_SIZE}
                    flexShrink={0}
                />
                <Text 
                    color={isColor ? 'white' : COLOR_MAIN}
                    fontWeight="500"
                    opacity={isFull ? 1 : 0}
                    w={isFull ? 'auto' : '0'}
                    overflow="hidden"
                    whiteSpace="nowrap"
                    transition={`opacity 0.2s ease ${transitionDelay}, width 0.3s ease ${transitionDelay}`}
                >
                    {children}
                </Text>
            </Box>
        </Button>
    )
}

export default React.memo(CustomButton)