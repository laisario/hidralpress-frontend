import { Box, CircularProgress } from '@mui/material'
import React from 'react'

function Loading() {
    return (
        <Box display='flex' m={2} justifyContent="center">
            <CircularProgress />
        </Box>
    )
}

export default Loading