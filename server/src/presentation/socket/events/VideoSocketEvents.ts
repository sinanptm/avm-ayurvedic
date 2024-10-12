import { Socket, Namespace } from "socket.io";
import UpdateAppointmentUseCase from "../../../use_case/appointment/UpdateAppointmentUseCase";
import logger from "../../../utils/logger";

export default class VideoSocketEvents {
    constructor(
        private io: Namespace,
        private updateAppointmentUseCase: UpdateAppointmentUseCase
    ) { }

    public initializeEvents(socket: Socket) {
        socket.on("join-room", async (roomId: string) => {
            console.log("Joined", socket.data.user );
            
            if (roomId) {
                if (socket.data.user.role === 'doctor') {
                    await this.updateAppointmentUseCase.updateCompleteSection(roomId, socket.data.user.id!);
                }
                socket.join(roomId);
            } else {
                socket.emit("error", { message: "Room ID is required to join the room" });
            }
        });

        socket.on("signal", (signalData: any, roomId: string) => {
            try {
                socket.to(roomId).emit("signal", signalData);
            } catch (error: any) {
                logger.error(`Error handling signal from socket ${socket.id}: ${error.message}`);
                socket.emit("error", { message: `Error handling signal from socket ${socket.id}: ${error.message}` });
            }
        });

        socket.on("disconnect", () => {
            this.handleUserDisconnection(socket);
        });

        socket.on("leave-room", (roomId: string) => {
            if (roomId) {
                socket.leave(roomId);
                this.notifyRoomAboutLeaving(roomId, socket.id);
            } else {
                logger.warn(`Socket ${socket.id} attempted to leave a room without a roomId`);
            }
        });
    }

    private notifyRoomAboutLeaving(roomId: string, socketId: string) {
        this.io.to(roomId).emit("leave-room", { userId: socketId });
    }

    private handleUserDisconnection(socket: Socket) {
        const rooms = Array.from(socket.rooms).filter(room => room !== socket.id);
        rooms.forEach((roomId) => {
            socket.leave(roomId);
            this.notifyRoomAboutLeaving(roomId, socket.id);
        });
    }
}
