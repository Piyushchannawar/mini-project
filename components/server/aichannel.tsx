"use client"

import { Server } from "@prisma/client";
import { useRouter } from "next/navigation"


interface AiChannelProps {
    server: Server;
  }


export const AiChannel = ({server}:AiChannelProps) => {

    const router = useRouter();
    const onClick = () => {
        router.push(`/servers/${server.id}/aichannel`);
      };
    return(
        <div>
            <button onClick={onClick}>
           <span>Talk To Ai</span>
           </button> 
        </div>
    )
}