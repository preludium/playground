import { createContext, FC } from 'react';
import { io, Socket } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:5000';

const socket = io(SOCKET_URL, { path: '/api/socket' });
socket.connect();
export const SocketContext = createContext<Socket>(socket);

const SocketProvider: FC = ({ children }) => {
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;
