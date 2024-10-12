import apiUrls from '@/config/apiConfig';
import { io, Socket } from 'socket.io-client';

type Props = {
    role: 'patient' | 'doctor',
    namespace: string;
};

let existingSocket: Socket | null = null;

const connectSocketIO = ({ role, namespace }: Props) => {
    // if (existingSocket && existingSocket.connected) {
    //     return existingSocket;
    // }

    let auth = JSON.parse(localStorage.getItem('auth') || '{}');

    const token = role === 'doctor' ? auth.doctorToken : auth.patientToken;

    const socket = io(`${apiUrls.BASE_URL}/${namespace}`, {
        auth: {
            token: token,
        },
    });

    socket.on("connect_error", (err) => {
        console.error(`connect_error due to ${err.message}`);
    });
    existingSocket = socket;
    return socket;
};

export default connectSocketIO;