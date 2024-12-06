import React from 'react';
import { Box, Typography } from '@mui/material';

const ImageGallery = ({ images, selectedImage, setSelectedImage }) => {
  console.log(images[0]?.image)
  return (
    <Box sx={{ width: '90svw', margin: '0 auto', textAlign: 'center' }}>
      <Box sx={{ marginBottom: 2 }}>
        {true ? (
          <img
            src={images[0]?.image?.replace("http://", "https://")}
            alt="Selected"
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
        {images?.map((img, i) => (
          <Box
            key={img?.image}
            onClick={() => setSelectedImage(img)}
            sx={{
              flex: '0 0 auto',
              width: '120px',
              height: '80px',
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
            }}
          >
            <Typography key={img?.id}>{i + 1}º foto</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ImageGallery;
