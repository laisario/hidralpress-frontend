import { useEffect, useState } from 'react'
import axios from '../api'

function useData() {
    const [sectors, setSectors] = useState(null);
    const [steps, setSteps] = useState(null);

    useEffect(() => {
        (async () => {
            const response = await axios.get('/sectors')
            if (response?.status === 200) {
                setSectors(response?.data)
            }
            const responseStep = await axios.get('/steps')
            if (responseStep?.status === 200) {
                setSteps(responseStep?.data)
            }
        })()
    }, [])

    const stepsMapping = {
        'montagem': steps?.filter((step) => step?.sector?.name === 'montagem'),
        'desmontagem': steps?.filter((step) => step?.sector?.name === 'desmontagem')
    }
    
    return { sectors, steps, stepsMapping }
}

export default useData