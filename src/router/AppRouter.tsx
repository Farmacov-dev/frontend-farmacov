import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Login, Catalog} from '../pages';


export default function AppRouter(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/catalog" element={<Catalog />} />
            </Routes>
        </BrowserRouter>
    );
}