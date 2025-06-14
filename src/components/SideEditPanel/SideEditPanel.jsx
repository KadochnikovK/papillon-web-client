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
import { usePersonsList } from '../../hooks/usePersonsList';

import imagePlaceholder from '../../images/image-placeholder.svg'



function SideEditPanel({ isFull }) {
    const [imagePreview, setImagePreview] = useState(imagePlaceholder);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { persone, personsLoading, isEditing, hasChanges, changeTextField, changeFingerprint, savePersone, cancelEditingPersone, getPersonsData } = usePersone()
    const { fetchPersonsList, activePerson } = usePersonsList()
    const { settings } = useSettings()

    const { processAndCropImage } = useImageCropper()

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
        await fetchPersonsList()
    }

    const handleCancel = () => {
        setImagePreview(null)
        cancelEditingPersone();
        getPersonsData(activePerson)
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
            p={activePerson ? '10px 32px' : '10px 16px'}
            w={personsLoading ? '0' : '100px'}
            zIndex="999"
            minW={isEditing ? `calc(100% - ${isFull ? '300px' : '80px'})` : '300px'}
            transform={activePerson || isEditing ? 'translateX(0)' : 'translateX(100%)'}
            gap="20px"
            transition="all .2s cubic-bezier(0.4, 0, 0.2, 1);"
            boxShadow="md"
        >
            <Heading size={'xl'}>Edit Person
            </Heading>
            {
                personsLoading
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

                        <Flex maxWidth="300px" minWidth={0} flexDirection={'column'} gap={'20px'} marginTop={'8px'}>
                            <BiometricSection isEditing={isEditing}
                                onScanFingers={handleScanFingers}
                                setImagePreview={setImagePreview} />
                        </Flex>
                    </Flex>
            }
            <ActionButtons
                isEditing={isEditing}
                hasChanges={hasChanges}
                onSave={handleSave}
                onCancel={handleCancel}
            />

            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSecondaryButtonClick={handleCloseModal}
                secondaryButtonText="Cancel"
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

export default React.memo(SideEditPanel);