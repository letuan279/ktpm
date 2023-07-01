import { createContext, useContext, useEffect, useState } from "react";
import { BACK_END_URL } from "./const";

const NewAppContext = createContext();

const NewAppContextProvider = ({ children }) => {
    const [hokhau, setHokhau] = useState([])
    const [nhankhau, setNhanKhau] = useState([])

    const fetchDataHoKhau = async () => {
        try {
            const res = await fetch(`${BACK_END_URL}/hokhau`);
            const data = await res.json();
            setHokhau(data.data);
          } catch (error) {
            console.error(error);
          }
    }

    const fetchDataNhanKhau = async () => {
        try {
            const res = await fetch(`${BACK_END_URL}/nhankhau`);
            const data = await res.json();
            setNhanKhau(data.data);
          } catch (error) {
            console.error(error);
          }
    }

    useEffect(() => {
        fetchDataHoKhau()
        fetchDataNhanKhau()
    }, [])

    return (
        <NewAppContext.Provider value={
            {
                hokhau,
                setHokhau,
                nhankhau,
                setNhanKhau,
                fetchDataHoKhau,
                fetchDataNhanKhau
            }
        }>
            {children}
        </NewAppContext.Provider>
    )
}

export default NewAppContextProvider;
export const useData = () => {
    return useContext(NewAppContext);
}