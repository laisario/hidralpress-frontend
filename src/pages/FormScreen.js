import React, { useState } from 'react'
import { Button, Typography, Grid, Alert } from '@mui/material'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useNavigate } from 'react-router-dom/dist';
import axios from '../api';

const InputStyle = {'border': 'none', 'width': '20%', 'textAlign': 'center', 'outline': 'none'}

function FormScreen() {
  const [os, setOs] = useState(null)
  const [os2, setOs2] = useState(null)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  
  const handleClick = async () => {
    const fullOs = `OS-${os}-${os2}`
    const osForm = new FormData()
    osForm.append("os", fullOs)
    const response = await axios.post('/validate-os/', osForm)
    if (response?.data?.ok) {
      navigate(`/os/${fullOs}/setor`)
    } else {
      setError(`Pasta '${fullOs}' não encontrada.`)
    }
  }

  const handleChangeInputOne = (e) => {
    const { target: { value }} = e
    setOs(value)
    if (value.length === 3) {
      document.getElementById("input-2").focus()
    }
  }

  return (
    <Grid
      container
      sx={{ mt: 8, p: 4 }}
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
          mt: 8
        }}
      >
        <div style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', border: '3px solid #003366', borderRadius: '4px', padding: '6px'}}>
          <Typography>OS - </Typography>
          <input
            value={os}
            maxLength={3}
            autoFocus
            style={InputStyle}
            id="input-1"
            inputmode="numeric"
            onChange={handleChangeInputOne}
          />
          <Typography>-</Typography>
          <input
            required
            maxLength={3}
            id="input-2"
            value={os2}
            inputmode="numeric"
            style={InputStyle}
            onChange={(e) => setOs2(e.target.value)}
          />
        </div>

        {!!error && <Alert severity='error' sx={{mt: 1}} >{error}</Alert>}

        <Button
          variant='contained'
          size='large'
          endIcon={<NavigateNextIcon />}
          fullWidth
          onClick={handleClick}
          sx={{ mt: 3 }}
          disabled={!(os?.length === 3 && os2?.length === 3)}
        >
          Escolher setor
        </Button>
      </Grid>
    </Grid>
  )
}

export default FormScreen