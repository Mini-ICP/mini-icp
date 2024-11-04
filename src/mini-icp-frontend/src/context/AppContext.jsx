import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    useMemo,
} from "react";
import { createAuthClient } from '../auth';

const defaultValue = {
    identity: "",
    setIdentity: () => {},
};

export const IdentityContext = createContext(defaultValue);

export const IdentityProvider = ({ children }) => {
    const [identity, setIdentity] = useState("");
    const value = useMemo(() => ({ identity, setIdentity }), [identity]);

    useEffect(() => {
        createAuthClient()
            .then((authClient) => {
                const existingIdentity = authClient
                    .getIdentity()
                    .getPrincipal()
                    .toString();
                if(existingIdentity && existingIdentity !== "2vxsx-fae"){
                    setIdentity(existingIdentity);
                }
            })
        .catch((err) => console.log(err));
    }, [identity]);

    return (
        <IdentityContext.Provider value={value}>
            {children}
        </IdentityContext.Provider>
    );
};

export const useIdentity = () => useContext(IdentityContext);