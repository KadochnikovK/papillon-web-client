// components/ImagePreview/ImagePreview.jsx
import { Flex, Image } from '@chakra-ui/react';

export const ImagePreview = ({ imageSrc, isEditing }) => {
    if (!isEditing) return null;

    return (
        <Flex maxWidth="400px" height="630px" minWidth={0} padding="20px" flexBasis={'100%'}
            borderRadius="8px" border="1px solid lightGrey"
            flexDirection="column" gap="20px">
            <Image w="100%" aspectRatio={1} height="100%" src={imageSrc} objectFit={'contain'}/>
        </Flex>
    );
};