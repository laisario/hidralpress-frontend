import { Button, Divider, Grid, Typography } from '@mui/material'
import React from 'react'
import ConstructionIcon from '@mui/icons-material/Construction';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useLocation, useNavigate } from 'react-router-dom/dist';
import useData from '../hooks/useData';

function ButtonScreen() {
  const navigate = useNavigate()
  const location = useLocation()
  const { sectors } = useData()
  console.log(sectors)

  const handleClick = (sector) => {
    navigate(`${sector}/camera`)
  }

  const handleClickGoBack = () => {
    navigate('/os')
  }

  const handleSector = {
    'montagem': {icon: <ConstructionIcon />, color: 'secondary'},
    'desmontagem': {icon: <TravelExploreIcon />, color: 'primary'}
  }
  const title = unescape(location?.pathname?.split('/')[2])
  console.log(sectors)
  return (
    <>
      <Grid container px={4} pt={2}>
        <Grid item xs={2}>
          <Button startIcon={<ArrowBackIcon />} size='large' onClick={handleClickGoBack}></Button>
        </Grid>
        <Grid item xs={8} display="flex" alignItems="center" justifyContent="center">
          <Typography variant='h5'>{title}</Typography>
        </Grid>
        <Grid item xs={2} />
      </Grid>
      <Grid
        container
        sx={{ px: 4, height: "70%" }}
        direction="column"
        display="flex"
        justifyContent="center"
      >
        <Typography variant='overline'>Selecione o setor:</Typography>
        {!!sectors?.length && sectors?.map((sector) => (
          <div key={sector?.id}>
            <Button fullWidth size='large' startIcon={handleSector[sector?.name]?.icon} color={handleSector[sector?.name]?.color} variant='contained' onClick={() => handleClick(sector?.name)} sx={{ padding: 4, fontSize: '24px' }}>{sector?.name}</Button>
            <Divider sx={{ my: 2 }} />
          </div>
        ))}
      </Grid>
    </>
  )
}

export default ButtonScreen