import React, { useState } from 'react';
import { Flex, Box, Image, Heading, Spinner } from '@chakra-ui/react';

import { TextDataSection } from '../TextDataSection/TextDataSection';
import { BiometricSection } from '../BiometricSection/BiometricSection';
import { ImagePreview } from '../ImagePreview/ImagePreview';
import { ActionButtons } from '../ui/ActionButtons/ActionButtons';
import { Modal } from '../ui/Modal/Modal';

import { usePersone } from '../../hooks/usePersone';
import { useSettings } from '../../hooks/useSettings';
import { useImageCropper } from '../../hooks/useImageCropper';
import { useFlatbedScanner } from '../../hooks/useFlatbedScanner';


function SideMenu({ isFull }) {
    const [imagePreview, setImagePreview] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { processAndCropImage } = useImageCropper()

    const { persone, loading, isEditing, isExistPersone, hasChanges, changeTextField, changeFingerprint, savePersone, cancelEditingPersone } = usePersone()

    const { settings } = useSettings()

    const {
        scanFingers,
        isScanning,
        scannedImage,
        error,
        resetScanner
    } = useFlatbedScanner(settings.mapAreas.pages[0].areas, processAndCropImage, changeFingerprint);

    const handleScanFingers = async () => {
        setIsModalOpen(true);
        try {
            await scanFingers();
        } catch {
            // Ошибка уже обработана в хуке
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        resetScanner();
    };

    const handleSave = async () => {
        setImagePreview(null)
        await savePersone();
    }

    const handleCancel = () => {
        setImagePreview(null)
        cancelEditingPersone();
    }


    if (isEditing) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }

    return (
        <Flex
            id={'sideEdit'}
            position="fixed"
            right={0}
            direction="column"
            bg={'white'}
            h="100vh"
            p={isExistPersone ? '10px 32px' : '10px 16px'}
            w={loading ? '0' : '100px'}
            zIndex="999"
            minW={isEditing ? `calc(100% - ${isFull ? '300px' : '80px'})` : '300px'}
            transform={isExistPersone || isEditing ? 'translateX(0)' : 'translateX(100%)'}
            gap="20px"
            transition="all .2s cubic-bezier(0.4, 0, 0.2, 1);"
            boxShadow="md"
        >
            <Heading size={'xl'}>Edit Person</Heading>
            {
                loading
                    ?
                    <Flex justify="center" align="center" h="100vh">
                        <Spinner size="xl" />
                    </Flex>
                    :
                    <Flex gap={'20px'}>

                        <TextDataSection
                            textData={persone.text}
                            onChange={changeTextField}
                            isEditing={isEditing}
                        />
                        <ImagePreview
                            imageSrc={imagePreview}
                            isEditing={isEditing}
                        />

                        <Flex maxWidth="300px" minWidth={0} flexDirection={'column'} gap={'20px'}>

                            <BiometricSection isEditing={isEditing}
                                onScanFingers={handleScanFingers}
                                setImagePreview={setImagePreview} />
                        </Flex>
                    </Flex>
            }
            <ActionButtons
                isEditing={isEditing} F
                hasChanges={hasChanges}
                onSave={handleSave}
                onCancel={handleCancel}
            />

            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title="Fingerprint Scanning"
                isLoading={isScanning}
            >
                {error ? (
                    <Box color="red.500">{error}</Box>
                ) : scannedImage ? (
                    <Image src={scannedImage} alt="Scanned fingerprint" maxH="70vh" />
                ) : (
                    <Box>Place your finger on the scanner</Box>
                )}
            </Modal>

        </Flex>
    );
}

export default React.memo(SideMenu);