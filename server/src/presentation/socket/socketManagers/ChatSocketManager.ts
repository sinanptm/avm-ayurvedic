import { Server, Socket, Namespace } from "socket.io";
import ITokenService from "../../../domain/interface/services/ITokenService";
import CreateChatUseCase from "../../../use_case/chat/CreateChatUseCase";
import { StatusCode, TokenPayload, UserRole } from "../../../types";
import GetChatUseCase from "../../../use_case/chat/GetChatUseCase";
import CustomError from "../../../domain/entities/CustomError";
import logger from "../../../utils/logger";

export default class ChatSocketManager {
    private io: Namespace;

    constructor(
        io: Server,
        private tokenService: ITokenService,
        private createChatUseCase: CreateChatUseCase,
        private getChatUseCase: GetChatUseCase
    ) {
        this.io = io.of("/chat");
        this.configureMiddleware();
        this.initializeChatNamespace();
    }

    private configureMiddleware() {
        this.io.use((socket, next) => {
            const token = socket.handshake.auth.token;
            if (!token) {
                return next(new CustomError("Authentication error", StatusCode.Forbidden));
            }
            try {
                socket.data.user = this.tokenService.verifyAccessToken(token);
                next();
            } catch (error) {
                return next(new CustomError("Invalid token", StatusCode.Unauthorized));
            }
        });

    }

    private initializeChatNamespace() {
        this.io.on("connection", (socket: Socket) => {
            this.initializeEvents(socket);
        });
    }

    private initializeEvents(socket: Socket) {
        socket.on("joinRoom", async (chatId: string) => {
            await this.handleError(socket, this.joinChatRoom(socket, chatId));
        });

        socket.on("getChats", async () => {
            await this.handleError(socket, this.getChats(socket));
        });

        socket.on("getMessages", async (chatId: string) => {
            await this.handleError(socket, this.getMessages(socket, chatId));
        });

        socket.on("getPatients", async () => {
            await this.handleError(socket, this.getPatients(socket));
        });

        socket.on("createChat", async (receiverId: string) => {
            await this.handleError(socket, this.createChat(socket, receiverId));
        });

        socket.on("createMessage", async ({chatId, receiverId, message}) => {
            await this.handleError(socket, this.createMessage(socket, chatId, receiverId, message));
        });
    }

    private async joinChatRoom(socket: Socket, chatId:string) {
        const user = socket.data.user as TokenPayload;

        const isAuthorized = await this.getChatUseCase.isAuthorizedInChat(chatId, user.id);
        if (!isAuthorized) {
            throw new CustomError("Unauthorized to join this chat", StatusCode.Forbidden);
        }

        socket.join(chatId);
        socket.emit("joinedRoom", chatId);
    }

    private async createChat(socket: Socket, receiverId: string) {
        const user = socket.data.user as TokenPayload;
        console.log(user);
        
        const chatId = (user.role === UserRole.Doctor)
            ? await this.createChatUseCase.createChat(user.id, receiverId)
            : await this.createChatUseCase.createChat(receiverId, user.id);

        socket.join(chatId.toString());
        
        socket.emit("joinedRoom", chatId.toString())
        console.log('joined');
        
    }

    private async createMessage(socket: Socket, chatId: string, receiverId: string, message: string) {
        const user = socket.data.user as TokenPayload;

        const createdMessage = await this.createChatUseCase.createMessage(chatId, receiverId, message, user.id);
        this.io.to(chatId).emit("newMessage", createdMessage);
    }

    private async getChats(socket: Socket) {
        const user = socket.data.user as TokenPayload;        
        const chats = (user.role === UserRole.Doctor)
            ? await this.getChatUseCase.getAllChatsWithDoctorId(user.id)
            : await this.getChatUseCase.getAllChatsWithPatientId(user.id);

        socket.emit("chats", chats);
    }

    private async getMessages(socket: Socket, chatId: string) {
        const user = socket.data.user as TokenPayload;
        const response = await this.getChatUseCase.getMessagesOfChat(chatId, user.id);
        socket.emit("messages", response.data.items);
        socket.emit("chat",response.chat)
    }

    private async getPatients(socket: Socket) {
        const patients = await this.getChatUseCase.getPatientsDoctor();
        socket.emit("patients", patients);
    }

    private async handleError(socket: Socket, handler: Promise<void>) {
        try {
            await handler;
        } catch (error) {
            if (error instanceof CustomError) {
                socket.emit('error', { message: error.message, statusCode: error.statusCode });
            } else {
                socket.emit("error", { message: "An unexpected error occurred" });
                logger.error(error);
            }
        }
    }
}
