import { Button, Grid, Typography } from '@mui/material'
import React from 'react'
import ConstructionIcon from '@mui/icons-material/Construction';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';

function ButtonScreen({setScreen}) {
  const handleClickAssembly = () => {
    setScreen(3)
  }

  const handleClickDisassembly = () => {
    setScreen(3)
  }
  return (
    <Grid
      container
      sx={{ mt: 8, p: 4 }}
    >
      <Grid item xs={12}>
        <Typography align='center' variant="h5" fontWeight={900}>Escolha o setor em que você está atuando:</Typography>
      </Grid>
      <Grid item sx={{mt: 8}} xs={12} >
        <Button fullWidth size='large' startIcon={<TravelExploreIcon />} color="primary" variant='contained' onClick={handleClickDisassembly} sx={{padding: 8}}>Desmontagem</Button>
      </Grid>
      <Grid item xs={12} sx={{my: 4}}>
        <Typography align='center' variant="subtitle1" fontWeight={900}>Ou</Typography>
      </Grid>
      <Grid item xs={12}>
        <Button  fullWidth size='large' color="secondary" startIcon={<ConstructionIcon />} variant='contained' sx={{padding: 8}} onClick={handleClickAssembly}>Montagem</Button>
      </Grid>
    </Grid>
  )
}

export default ButtonScreen