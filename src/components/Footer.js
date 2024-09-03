import { Box, Divider, Typography } from '@mui/material'
import React from 'react'

function Footer() {
  return (
    <Box sx={{textAlign: "center", position: "fixed", bottom: 0, width: "100%", height: "40px"}}>
        <Divider variant="middle" sx={{mb:1}} />
        <Typography variant='caption' color="text.secondary" fontWeight={500}>Boa sessão de fotos!</Typography>
    </Box>
  )
}

export default Footer