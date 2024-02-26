import './App.css'
import React, {useEffect} from "react";
import {Route, Routes, useNavigate} from "react-router-dom";
import {useSelector} from 'react-redux'
import AuthorizationPage from "./components/AuthorizationPage.tsx";
import {getAuthStatus} from "./redux/slices/authSlice.ts";
import MainPage from "./components/MainPage.tsx";
import Welcome from "./components/Welcome.tsx";


const App: React.FC = () => {
    const navigate = useNavigate()
    const logSuccess = useSelector(getAuthStatus)
    useEffect(() => {
        if (!logSuccess) {
            navigate('/auth');
        }
        else {
            navigate('/welcome');
        }
        // This will run only on the first render and whenever isLoggedIn changes
    }, [logSuccess]);

    return (

        <Routes>
            {logSuccess &&
                <Route path={'/'} element={<MainPage />}>
                    <Route path={'/welcome'} element={<Welcome/>}/>
                </Route>
            }

            <Route path={'/auth'} element={<AuthorizationPage/>}/>
        </Routes>

    )
}

export default App
