import { Alert, Box, Button, FormControl, IconButton, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import React, { useState, useRef } from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import CheckIcon from '@mui/icons-material/Check';
import ImageGallery from "react-image-gallery";
import { useLocation, useNavigate } from "react-router-dom/dist";
import axios from '../api'
import useData from "../hooks/useData";
import DeleteIcon from '@mui/icons-material/Delete';
import Loading from "../components/Loading";


function CameraScreen() {
  const hiddenFileInput = useRef(null);
  const [images, setImages] = useState([])
  const [etapa, setEtapa] = useState('')
  const [index, setIndex] = useState(0)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const { pathname } = useLocation()

  const pathData = unescape(pathname)?.split('/')

  const { stepsMapping } = useData()

  const removePhoto = () => {
    const currentImg = images?.find((_, i) => i === index)
    setImages(images.filter((image) => image?.file?.name !== currentImg?.file?.name))
    setIndex(0)
  }

  const handleClickGoBack = () => {
    navigate(`/os/${pathData[2]}/setor`)
  }
  const handleClickSave = async () => {
    const data = new FormData()
    data.append('os', pathData[2])
    data.append('sector', pathData[4])
    data.append('step', etapa)
    for (let image of images) {
      data.append('images', image.file)
    }
    setLoading(true)
    const response = await axios.post('/os/', data)
    setLoading(false)
    if (response.status === 200) {
      navigate("/os",  { state: { status: 'ok' } })
    } else {
      setError('Erro ao enviar as fotos. Tente novamente e se persistir entre em contato com o Administrador.')
    }
  }

  const existPhotos = !!images?.length

  return (
    <Box p={2} display="flex" flexDirection="column" height='100%' alignItems='center'>
      <div>
        <Typography variant="h6" fontWeight={700} mb={1} >Selecione a etapa que está fotografando:</Typography>
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel id="etapa-select">Etapa</InputLabel>
          <Select
            labelId="etapa-select"
            id="etapa-select"
            value={etapa}
            label="Etapa"
            onChange={(e) => setEtapa(e.target.value)}
            placeholder="Escolha a etapa"
            sx={{ color: 'black' }}
          >
            {stepsMapping[pathData[4]]?.map((step) => (
              <MenuItem sx={{ color: 'black' }} value={step?.name} key={step?.id}>{step?.name.toUpperCase()}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <Box sx={{ borderRadius: 1, p: 1, boxShadow: existPhotos ? '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' : null, mb: 2 }}>
        <Box sx={{ display: "flex", justifyContent: existPhotos ? "space-between" : "center", p: 1, alignItems: 'center' }}>
          <Button
            disabled={etapa.length < 1}
            variant="contained"
            size="large"
            startIcon={<AddAPhotoIcon />}
            fullWidth={!existPhotos}
            onClick={() => hiddenFileInput.current.click()}
          >
            Bater foto
          </Button>
          <input
            type="file"
            capture="environment"
            onChange={(e) => setImages(images => [{ original: URL.createObjectURL(e.target.files[0]), thumbnail: URL.createObjectURL(e.target.files[0]), thumbnailHeight: "100px", thumbnailWidth: "100px", file: e.target.files[0] }, ...images])}
            ref={hiddenFileInput}
            style={{ display: 'none' }}
          />
          {existPhotos && (
            <IconButton variant="contained" size="large">
              <DeleteIcon color='primary' onClick={removePhoto} />
            </IconButton>
          )}
        </Box>
        {existPhotos && (
          <ImageGallery
            onSlide={(index) => setIndex(index)}
            showPlayButton={false}
            infinite={false}
            showIndex
            showThumbnails
            items={images}
          />
        )}
      </Box>
      {error && <Alert severity="error">{error}</Alert>}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', position: existPhotos ? 'static' : 'fixed', bottom: 10, width: '90%' }}>
        <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={handleClickGoBack}>Voltar</Button>
        {loading ? <Loading /> : (
          <Button endIcon={<CheckIcon />} disabled={images?.length < 1} variant="contained" onClick={handleClickSave}>Enviar</Button>
        )}
      </Box>
    </Box>
  )
}

export default CameraScreen