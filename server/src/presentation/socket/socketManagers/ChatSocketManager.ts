import { Server, Namespace } from "socket.io";
import ITokenService from "../../../domain/interface/services/ITokenService";
import CreateChatUseCase from "../../../use_case/chat/CreateChatUseCase";
import GetChatUseCase from "../../../use_case/chat/GetChatUseCase";
import CustomError from "../../../domain/entities/CustomError";
import ChatSocketEvents from "../events/ChatSocketEvents";
import { StatusCode } from "../../../types";

export default class ChatSocketManager {
   private io: Namespace;
   private chatSocketEvents: ChatSocketEvents;

   constructor(
      io: Server,
      private tokenService: ITokenService,
      createChatUseCase: CreateChatUseCase,
      getChatUseCase: GetChatUseCase
   ) {
      this.io = io.of("/chat");
      this.chatSocketEvents = new ChatSocketEvents(this.io, createChatUseCase, getChatUseCase);
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
      this.io.on("connection", (socket) => {
         this.chatSocketEvents.initializeEvents(socket);
      });
   }
}
