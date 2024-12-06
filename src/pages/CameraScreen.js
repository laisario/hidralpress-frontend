import {
  Alert,
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Typography
} from "@mui/material";
import React, { useState, useRef, useMemo } from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import CheckIcon from '@mui/icons-material/Check';
import { useLocation, useNavigate } from "react-router-dom/dist";
import useData from "../hooks/useData";
import DeleteIcon from '@mui/icons-material/Delete';
import Loading from "../components/Loading";
import ImageGallery from "../components/ImageGallery";
import useSubmitData from "../hooks/useSubmitData";
import useImages from "../hooks/useImages";


const steps = {
  'desmontagem': {
    'C-EQUIPAMENTO': 'CHEGADA',
    'E-DESMONTADO': 'DESMONTADO',
    'E-PRONTO': 'PRONTO'
  },
  'montagem': {
    'E-MONTAGEM': 'MONTAGEM',
    'E-TESTE': 'TESTE'
  }
}

function CameraScreen() {
  const hiddenFileInput = useRef(null);
  const [step, setStep] = useState('')
  const [selectedImage, setSelectedImage] = useState();
  const { handleSubmit, loading, error } = useSubmitData()
  const navigate = useNavigate()
  const { pathname, state } = useLocation()
  const pathData = useMemo(() => unescape(pathname)?.split('/'), [pathname])
  const { stepsMapping } = useData()
  const { images, deleteImage, isDeleting } = useImages({ step, os: state?.os })
  const existPhotos = useMemo(() => !!images?.length, [images])
  console.log(images)
  const removePhoto = () => {
    deleteImage(selectedImage?.id)
  }

  const takePhoto = (e) => {
    sendPhoto({
      file: e.target.files[0]
    })
  }

  const handleClickGoBack = () => {
    navigate(-1)
  }

  const sendPhoto = async (image) => {
    const data = new FormData();
    data.append('os', pathData[2]);
    data.append('sector', pathData[4]);
    data.append('step', step);
    data.append('image', image?.file);

    handleSubmit(data)
  }

  const handleClickFinish = () => {
    navigate("/os", { state: { status: 'ok' } })
  }

  return (
    <Box p={2} display="flex" flexDirection="column" height='100svh' alignItems='center' justifyContent="space-between">
      <div>
        <Typography variant="h6" fontWeight={700} mb={1} >Selecione a etapa que está fotografando:</Typography>
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel id="etapa-select">Etapa</InputLabel>
          <Select
            labelId="etapa-select"
            id="etapa-select"
            value={step}
            label="Etapa"
            onChange={(e) => setStep(e.target.value)}
            placeholder="Escolha a etapa"
            sx={{ color: 'black' }}
          >
            {stepsMapping[pathData[4]]?.map((step) => (
              <MenuItem sx={{ color: 'black' }} value={step?.name} key={step?.id}>{steps[pathData[4]][step?.name]}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <Box sx={{ borderRadius: 1, p: 1, boxShadow: existPhotos ? '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' : null, mb: 2 }}>
        <Box sx={{ display: "flex", justifyContent: existPhotos ? "space-between" : "center", p: 1, alignItems: 'center' }}>
          {loading ? <Loading /> : <Button
            disabled={step.length < 1}
            variant="contained"
            size="large"
            startIcon={<AddAPhotoIcon />}
            fullWidth={!existPhotos}
            onClick={() => hiddenFileInput.current.click()}
          >
            Bater foto
          </Button>}
          <input
            type="file"
            accept="image/*,video/*"
            capture="environment"
            onChange={takePhoto}
            ref={hiddenFileInput}
            style={{ display: 'none' }}
          />
          {existPhotos && (
            isDeleting
              ? <Loading />
              : <IconButton variant="contained" size="large">
                <DeleteIcon color='primary' onClick={removePhoto} />
              </IconButton>
          )}
        </Box>
        {existPhotos && step && <ImageGallery
          images={images}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />}
      </Box>
      {error && <Alert severity="error">{error}</Alert>}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', m: 2 }}>
        <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={handleClickGoBack}>Voltar</Button>
        <Button endIcon={<CheckIcon />} disabled={images?.length < 1} variant="contained" onClick={handleClickFinish}>Finalizar</Button>
      </Box>
    </Box>
  )
}

export default CameraScreen;