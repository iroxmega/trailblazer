import React, {createContext, useState} from 'react';
import Header from "./Header.tsx";
import {Outlet} from "react-router-dom";

export const SelectedPageContext = createContext<{
    selectedPage: string;
    setSelectedPage: (page: string) => void;
}>({
    selectedPage: '',
    setSelectedPage: () => {
    },
});
const MainPage: React.FC = () => {
    const [selectedPage, setSelectedPage] = useState('welcome')

    return (
        <div>
            <SelectedPageContext.Provider value={{selectedPage, setSelectedPage}}>
                <Header/>
                <div>
                    <Outlet/>
                </div>
            </SelectedPageContext.Provider>
        </div>
    );
};

export default MainPage;