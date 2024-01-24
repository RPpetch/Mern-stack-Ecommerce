import React from 'react'
import {useSelector} from "react-redux";
import LoadingToRedirect from './LoadingToRedirect';

const UserRoute = ({children}) => {
    const token = useSelector((state)=> state.user.token);
    return token != null ? children : <LoadingToRedirect/>;
}

export default UserRoute