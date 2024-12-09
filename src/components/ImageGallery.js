import React from 'react';
import { Box, Typography } from '@mui/material';
import Loading from "./Loading";

const ImageGallery = ({ images, selectedImage, setSelectedImage, isLoadingImgs }) => {
  return (
    <Box sx={{ width: '90svw', margin: '0 auto', textAlign: 'center' }}>
      <Box sx={{ padding: 2 }}>
        {selectedImage?.image ? (
          <img
            src={selectedImage?.image}
            alt={`Selecionada imagem: ${selectedImage?.id}`}
            style={{
              width: '100%',
              maxHeight: '450px',
              objectFit: 'contain',
              borderRadius: '8px',
            }}
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
        {isLoadingImgs ? <Loading /> : images?.map((img, i) => (
          <Box
            key={img?.image}
            onClick={() => setSelectedImage(img)}
            sx={{
              flex: '0 0 auto',
              width: 100,
              height: 100,
              p: 1,
              cursor: 'pointer',
              borderRadius: '8px',
              overflow: 'hidden',
              border: selectedImage?.image === img?.image ? '3px solid #003366' : 'none',
              boxShadow:
                selectedImage?.image === img?.image
                  ? '0 0 10px rgba(0, 51, 102, 0.7)'
                  : 'none',
              transition: 'transform 0.2s, border 0.2s',
              '&:hover': {
                transform: 'scale(1.05)',
              },
              position: 'relative',
            }}
          >
            <img
              src={img?.image}
              key={img?.id}
              style={{
                position: 'absolute', 
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                minWidth: '100%',
                minHeight: '100%',
                objectFit: 'cover',
              }}
              alt={`Imagem ${i + 1}`}
            />
          </Box>
        )).reverse()}
      </Box>
    </Box>
  );
};

export default ImageGallery;
