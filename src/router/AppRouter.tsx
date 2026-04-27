import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { Analisis_Sintomas} from '../pages';
import Login from '../pages/Login'
import Catalog from '../pages/Catalog';


export default function AppRouter(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/analisis_sintomas" element={<Analisis_Sintomas/>}/>
            </Routes>
        </BrowserRouter>
    );
}