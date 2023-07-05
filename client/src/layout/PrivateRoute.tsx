
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../app/store/configureStore";




export default function PrivateRoute() {
    const {user} = useAppSelector(state => state.account);
    const location = useLocation();
    return (
       user ? <Outlet /> : <Navigate  to="/login" state={{from: location}}/>
        
    )
}

