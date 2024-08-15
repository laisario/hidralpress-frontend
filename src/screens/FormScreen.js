import React, { useState } from 'react'
import { Button, TextField, Typography, Box, Grid } from '@mui/material'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';


function FormScreen({setScreen}) {
  const [os, setOs] = useState('')

  const handleClick = () => {
    setScreen(2)
  }

  return (
    <Grid
      container
      sx={{mt: 8, p:4}}
    >
      <Grid item xs={12}>
        <Typography align='center' variant="h5" fontWeight={900}>Preencha o campo com o número da ordem de serviço:</Typography>
      </Grid>
      <Grid
        container
        item
        xs={12}
        sx={{
          display: "flex",
          flexDirection: "column",
          borderRadius: "4pt",
          padding: "16pt",
          textAlign: "left",
          width: "100%",
          backgroundColor: "white",
          mt: 8
        }}
      >
        <TextField
          required
          label="Numero da OS"
          helperText="Formato da os: OS-xxxx"
          value={os}
          onChange={(e) => setOs(e.target.value)}
          fullWidth
        />
        <Typography
          variant='subtitle1'
          color="text.secondary"
          sx={{ mb: 1, mt: 3 }}
        >
          Próxima etapa
        </Typography>
        <Button
          variant='contained'
          size='large'
          endIcon={<NavigateNextIcon />}
          fullWidth
          onClick={handleClick}
        >
          Escolher setor
        </Button>
      </Grid>
    </Grid>
  )
}

export default FormScreen