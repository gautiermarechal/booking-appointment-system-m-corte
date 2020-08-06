import React, { useState, useEffect } from 'react';

export function useStateWithLocalStorage(localStorageKey){
    
    const[userSession, setUserSession] = useState(JSON.parse(localStorage.getItem(localStorageKey)) || '');

    useEffect(()=>{
        localStorage.setItem(localStorageKey, JSON.stringify(userSession));
    }
    ,[userSession]);

    return [userSession, setUserSession];
}