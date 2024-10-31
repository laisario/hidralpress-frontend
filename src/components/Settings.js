import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, IconButton, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import axios from '../api';


function Settings({ open, handleClose, setErrMsg}) {
    const averageTime = 50
    const totalTime = averageTime * 60;
    const [isLoading, setIsLoading] = useState(false)
    const [timeLeft, setTimeLeft] = useState(totalTime);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const intervalRef = useRef(null);
    const intervalIdRef = useRef(null);
    const percentageComplete = ((totalTime - timeLeft) / totalTime) * 100;

    const tick = () => {
        setSeconds((prevSeconds) => {
            if (prevSeconds === 59) {
                setMinutes((prevMinutes) => {
                    if (prevMinutes === 59) {
                        setHours((prevHours) => prevHours + 1);
                        return 0;
                    }
                    return prevMinutes + 1;
                });
                return 0;
            }
            return prevSeconds + 1;
        });
    };

    const startTimer = () => {
        intervalRef.current = setInterval(tick, 1000);
    }

    useEffect(() => {
        if (timeLeft <= 0) {
            startTimer()
            return
        }
        intervalIdRef.current = setInterval(() => {
            setTimeLeft((prevTime) => Math.max(prevTime - 1, 0));
        }, 1000);

        return () => clearInterval(intervalIdRef.current);
    }, [timeLeft]);

    const handleUpdate = async () => {
        setIsLoading(true);
        try {
            await axios.post('os/execute_update_os/');
            clearInterval(intervalIdRef.current)
            clearInterval(intervalRef.current)
            setIsLoading(false);
            handleClose()
            
        } catch (error) {
            console.log(error)
            setErrMsg("Erro ao atualizar os's, verifique a conexão com a rede e tente novamente.")
            handleClose()
        }
    }


    return (
        <Dialog
            open={open}
            onClose={handleClose}
        >
            <DialogContent
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: "center",
                    alignItems: 'center'
                }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', m: 0, p: 0 }}>
                    <DialogContentText>Clique caso tenha aberto uma OS com o sistema fora do ar</DialogContentText>
                    <IconButton onClick={handleClose}>
                        x
                    </IconButton>
                </Box>
                {isLoading
                    ? <Box sx={{ position: 'relative', display: 'inline-flex', mt: 2 }}>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '100%',
                                flexDirection: 'column',
                                gap: 2
                            }}
                        >
                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                {percentageComplete === 100 && !isLoading ? 'Atualização completa' : `${percentageComplete.toFixed(2)}% da média: 50 min`}
                            </Typography>
                            {timeLeft <= 0 && (
                                <Typography variant='caption' color="red">
                                    Tempo excedente
                                    {'  '}
                                    {String(hours).padStart(2, '0')}:
                                    {String(minutes).padStart(2, '0')}:
                                    {String(seconds).padStart(2, '0')}
                                </Typography>
                            )}
                        </Box>
                    </Box>
                    : <Button sx={{ mt: 2 }} onClick={handleUpdate} variant='contained' autoFocus>Atualizar OS's</Button>}
            </DialogContent>
        </Dialog>
    )
}

export default Settings