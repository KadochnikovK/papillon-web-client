import React from 'react'
import { Button, IconButton } from '@chakra-ui/react';


function NewCustomButton({ children, handleClick, title, variant = "ghost", bg, isFull = false, w = '100%', disabled = false, ...props}) {
    // console.log(children)
    return (<>
        { isFull &&
            <Button w={w} justifyContent={'flex-start'} variant={variant} onClick={handleClick} title={title} bg={bg} disabled={disabled} {...props}>
                {children}
            </Button>
        }
        { !isFull &&
            <IconButton w={w} justifyContent={'center'} variant={variant} onClick={handleClick} title={title} bg={bg} disabled={disabled} {...props}>
                {children}
            </IconButton>
        }


    </>
    )
}

export default  React.memo(NewCustomButton)
