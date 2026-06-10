import React from "react";
import PropTypes from "prop-types";

function decodificarToken(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error('Erro ao decodificar token:', error);
        return null;
    }
}
const AuthContext = React.createContext();

function AuthProvider({ children }) {
    const [token, setToken] = React.useState(localStorage.getItem("token"));
    const [user, setUser] = React.useState(null);
    const [ehDiretor, setEhDiretor] = React.useState(false);

    React.useEffect(() => {
        if (token){
            const decodedToken = decodificarToken(token);
            if (decodedToken) {
                setUser(decodedToken);
                setEhDiretor(decodedToken.cargo !== "Membro");
            } else {
                logOut();
            }
        } else {
                setUser(null);
                setEhDiretor(false);
        }
    }, [token]);

    const loginGlobal = (novoToken) => {
        localStorage.setItem("token", novoToken);
        setToken(novoToken);
    }

    const logOut = () => {
        localStorage.removeItem("token");
        setToken(null);
    }

    return (
        <AuthContext.Provider value={{
            token,
            user,
            ehDiretor,
            loginGlobal,
            logOut
        }}>
            {children}
        </AuthContext.Provider>
    );
}
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    return React.useContext(AuthContext);
}

export default AuthProvider;
        