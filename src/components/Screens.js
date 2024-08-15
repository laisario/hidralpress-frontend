import React, { useState } from 'react'
import FormScreen from '../screens/FormScreen';
import ButtonScreen from '../screens/ButtonScreen';
import CameraScreen from '../screens/CameraScreen';
import "../App.css"

function Screens() {
  const [screen, setScreen] = useState(1)

  const renderScreen = () => {
    switch (screen) {
      case 1:
        return <FormScreen setScreen={setScreen} />;
      case 2:
        return <ButtonScreen setScreen={setScreen} />;
      case 3:
        return <CameraScreen setScreen={setScreen} />;
      default:
        return <FormScreen setScreen={setScreen} />;
    }
  };

  return (renderScreen())
}

export default Screens