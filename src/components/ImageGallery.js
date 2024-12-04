import React from 'react';
import { Box, Typography } from '@mui/material';

const ImageGallery = ({ images, selectedImage, setSelectedImage }) => {
    return (
        <Box sx={{ width: '90svw', margin: '0 auto', textAlign: 'center' }}>
            <Box sx={{ marginBottom: 2 }}>
                {selectedImage?.original ? (
                    <img
                        src={selectedImage?.original}
                        alt="Selected"
                        style={{
                            width: '100%',
                            maxHeight: '450px',
                            objectFit: 'contain',
                            borderRadius: '8px',
                        }}
                        loading="lazy"
                    />
                ) : (
                    <Typography variant="h6" color="text.secondary">
                        Nenhuma imagem selecionada
                    </Typography>
                )}
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    overflowX: 'auto',
                    gap: 2,
                    padding: 1,
                    '&::-webkit-scrollbar': {
                        display: 'none',
                    },
                }}
            >
                {images?.map((img, i) => (
                    <Box
                        key={img?.original}
                        onClick={() => setSelectedImage(img)}
                        sx={{
                            flex: '0 0 auto',
                            width: '120px',
                            height: '80px',
                            cursor: 'pointer',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            border: selectedImage?.original === img?.original ? '3px solid #003366' : 'none',
                            boxShadow:
                                selectedImage?.original === img?.original
                                    ? '0 0 10px rgba(0, 51, 102, 0.7)'
                                    : 'none',
                            transition: 'transform 0.2s, border 0.2s',
                            '&:hover': {
                                transform: 'scale(1.05)',
                            },
                        }}
                    >
                        <img
                            src={img.original}
                            alt={`Thumbnail ${i + 1}`}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                            }}
                            loading="lazy"
                        />
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default ImageGallery;
