import { Box, Divider, IconButton } from '@mui/material'
import React, { useState } from 'react'
import SettingsIcon from '@mui/icons-material/Settings';
import Settings from './Settings';

function Footer({setErrMsg}) {
  const [open, setOpen] = useState(false)
  const handleClose = () => setOpen(false)
  const handleOpen = () => setOpen(true)


  return (
    <Box sx={{ textAlign: "center", position: "fixed", bottom: 8, width: "100%", height: "40px" }}>
      <Divider variant="middle" />
      <IconButton onClick={handleOpen} sx={{ mb: 3 }}>
        <SettingsIcon />
      </IconButton>
      <Settings open={open} setErrMsg={setErrMsg} handleClose={handleClose} />
    </Box>
  )
}

export default Footer