import { Box, Divider, Typography } from '@mui/material'
import React, { useState } from 'react'


function Footer() {
  return (
    <Box sx={{ textAlign: "center", position: "fixed", bottom: 0, width: "100%", }}>
      <Divider variant="middle" />
      <Typography variant='caption'>Boa sessão de fotos!</Typography>
    </Box>
  )
}

export default Footer