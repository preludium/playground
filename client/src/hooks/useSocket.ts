import { useContext } from 'react';

import { SocketContext } from '@providers/Socket.provider';

const useSocket = () => {
    const socket = useContext(SocketContext);
    return socket;
};

export default useSocket;
