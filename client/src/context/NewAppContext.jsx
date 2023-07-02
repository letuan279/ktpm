import { createContext, useContext, useEffect, useState } from "react";
import { BACK_END_URL } from "./const";

const NewAppContext = createContext();

const NewAppContextProvider = ({ children }) => {
    const [hokhau, setHokhau] = useState([])
    const [nhankhau, setNhanKhau] = useState([])
    const [tamTru, setTamTru] = useState([])
    const [tamVang, setTamVang] = useState([])
    const [lichSuHoKhau, setLichSuHoKhau] = useState([])
    const [lichSuNhanKhau, setLichSuNhanKhau] = useState([])


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

    const fetchDataTamTru = async () => {
        try {
            const res = await fetch(`${BACK_END_URL}/nhankhau/thongke/tamtru`);
            const data = await res.json();
            setTamTru(data.data);
          } catch (error) {
            console.error(error);
          }
    }

    const fetchDataTamVang = async () => {
        try {
            const res = await fetch(`${BACK_END_URL}/nhankhau/thongke/tamvang`);
            const data = await res.json();
            setTamVang(data.data);
          } catch (error) {
            console.error(error);
          }
    }

    const fetchDataLichSuHoKhau = async () => {
      try {
          const res = await fetch(`${BACK_END_URL}/hokhau/thaydoi/hokhau`);
          const data = await res.json();
          setLichSuHoKhau(data.data);
        } catch (error) {
          console.error(error);
        }
    }

    const fetchDataLichSuNhanKhau = async () => {
      try {
          const res = await fetch(`${BACK_END_URL}/nhankhau/thaydoi/nhankhau`);
          const data = await res.json();
          setLichSuNhanKhau(data.data);
        } catch (error) {
          console.error(error);
        }
    }



    useEffect(() => {
        fetchDataHoKhau()
        fetchDataNhanKhau()
        fetchDataTamTru()
        fetchDataTamVang()
        fetchDataLichSuHoKhau()
        fetchDataLichSuNhanKhau()
    }, [])

    return (
        <NewAppContext.Provider value={
            {
                hokhau,
                setHokhau,
                nhankhau,
                setNhanKhau,
                fetchDataHoKhau,
                fetchDataNhanKhau,
                tamTru, 
                setTamTru,
                tamVang, 
                setTamVang,
                fetchDataTamTru,
                fetchDataTamVang,
                lichSuHoKhau, 
                setLichSuHoKhau,
                lichSuNhanKhau, 
                setLichSuNhanKhau
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