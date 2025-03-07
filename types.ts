import { Server as NetServer, Socket } from "net";
import { NextApiResponse } from "next"; 
import { Server as SocketIoServer } from "socket.io"

import { Member, Profile, Server } from "@prisma/client"

export type ServerWithMembersWithProfiles = Server & {
    members: (Member & { profile: Profile })[];
};


export type NextApiResponseServerIo = NextApiResponse & {
    socket: Socket & {
        server: NetServer & {
            io: SocketIoServer;
        };
    };
};

export type Message = {
    sender: "user" | "ai";
    text: string;
  };
  