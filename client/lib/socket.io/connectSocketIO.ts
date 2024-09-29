import { io, Socket } from 'socket.io-client';

type Props = {
    role: 'patient' | 'doctor',
    namespace: string
}

let existingSocket: Socket | null = null;

const connectSocketIO = ({ role, namespace }: Props) => {
    if (existingSocket && existingSocket.connected) {
        return existingSocket;
    }
    let auth = JSON.parse(localStorage.getItem('auth') || '{}');
    let token;
    if (role === 'patient') {
        token = auth.patientToken;
    } else {
        token = auth.doctorToken;
    }

    const socket = io(`${process.env.NEXT_PUBLIC_API_URL!}/${namespace}`, {
        auth: {
            token: token,
        },

    });

    existingSocket = socket;
    return socket;
}

export default connectSocketIO;