import { Box, Button, Dialog, DialogContent, DialogContentText, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import axios from '../api';

function CircularProgressWithTimer({isLoading, handleClose, intervalRef}) {
    const averageTime = 50
    const totalTime = averageTime * 60;
    const [timeLeft, setTimeLeft] = useState(totalTime);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
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
        if (seconds === 15) {
            clearInterval(intervalRef.current)
            handleClose()
        }
    }, [seconds])
    
    
    useEffect(() => {
        if (timeLeft <= 0) {
            startTimer()
            return
        }
        const intervalId = setInterval(() => {
            setTimeLeft((prevTime) => Math.max(prevTime - 1, 0));
        }, 1000);
        
        return () => clearInterval(intervalId);
    }, [timeLeft]);
    
    const percentageComplete = ((totalTime - timeLeft) / totalTime) * 100;
    
    return (
        <Box sx={{ position: 'relative', display: 'inline-flex', mt: 2 }}>
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
    );
}

function Settings({ open, handleClose }) {
    const intervalRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false)
    const handleUpdate = async () => {
        setIsLoading(true);
        const response = await axios.post('os/execute_update_os/');
        console.log(response)
        clearInterval(intervalRef.current)
        setIsLoading(false);
        handleClose()
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
                <DialogContentText>Clique caso tenha aberto uma OS com o sistema fora do ar</DialogContentText>
                {isLoading
                    ? <CircularProgressWithTimer intervalRef={intervalRef} isLoading={isLoading} />
                    : <Button sx={{ mt: 2 }} onClick={handleUpdate} variant='contained' autoFocus>Atualizar OS's</Button>}
            </DialogContent>
        </Dialog>
    )
}

export default Settings