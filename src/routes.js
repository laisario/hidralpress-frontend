import React from 'react'
import FormScreen from './pages/FormScreen';
import CameraScreen from './pages/CameraScreen';
import ButtonScreen from './pages/ButtonScreen'
import Layout from './layouts/Layout';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

function Router() {
    // const element = useRoutes([
    //     {
    //         path: "/",
    //         element: <Layout />,
    //         children: [
    //             { element: <Navigate to="/os" />, index: true },
    //             { path: "os", element: <FormScreen /> },
    //             {
    //                 path: "/os/:os/setor",
    //                 element: <ButtonScreen />,
    //             },
    //         ],
    //     },
    //     {path: "/os/:os/setor/:setor/camera", element: <CameraScreen /> },
    // ]);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Navigate to="/os" />} />
                    <Route path="/os" element={<FormScreen />} />
                    <Route path="/os/:os/setor" element={<ButtonScreen />} />
                </Route>
                <Route path="/os/:os/setor/:setor/camera" element={<CameraScreen />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router