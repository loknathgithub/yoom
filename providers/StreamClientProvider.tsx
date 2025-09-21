"use client"
import { useSession } from 'next-auth/react';
import {
  StreamCall,
  StreamVideo,
  StreamVideoClient,
  User,
} from "@stream-io/video-react-sdk";
import { ReactNode, useEffect, useState } from "react";
import { tokenProvider } from "@/actions/stream.actions";
import Loader from "@/components/Loader";


const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
// const userId = "user-id";
// const token = "authentication-token";
// const user: User = { id: userId };

// const client = new StreamVideoClient({ apiKey, user, token });
// const call = client.call("default", "my-first-call");
// call.join({ create: true });

function streamSafeId(email: string) {
  return email.replace(/[^a-z0-9@_-]/gi, "_").toLowerCase();
}

export const StreamVideoProvider = ({children}: {children: ReactNode}) => {
  const [ videoClient, setVideoClient ] = useState<StreamVideoClient>();
  const { data:session, status } = useSession();
  
  useEffect(() => {
    if(!session?.user || !status) return;
    if(!apiKey) throw new Error("Stream API key missing");

    const client = new StreamVideoClient({
        apiKey,
        user:{

          // In clerk there is id by default, but in next auth id is not present, only {name, email, image} is there
          // so I replaced the id with email as id, and map it to a accepted format using streamSafeId in both token generator
          // 'tokenProvider' and here, so that I am now getting the token from tokenProvider accurately, resolving the problem of Id not found

          id: streamSafeId(session?.user?.email!),   
          name: session?.user?.name ?? session?.user?.email ?? undefined, 
          image: session?.user?.image ?? undefined,
        },
        tokenProvider,
    })

    setVideoClient(client);

    return () => {
    client.disconnectUser?.();
    };

  }, [session?.user, status]);


    if(!videoClient) return <Loader />;
    return (
    <StreamVideo client={videoClient}>
        {children}
    </StreamVideo>
  );
};