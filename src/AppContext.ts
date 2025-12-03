import { createContext } from 'react';

export const AppUserContext = createContext<{
 isAuthorized: boolean;
 setIsAuthorized: (item: boolean) => void;
}>({
 isAuthorized: false,
 setIsAuthorized: item => {},
});

