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

export const StreamVideoProvider = ({children}: {children: ReactNode}) => {
  const [ videoClient, setVideoClient ] = useState<StreamVideoClient>();
  const { data:session, status } = useSession();
  
  useEffect(() => {
    if(!session?.user || !status) return;
    if(!apiKey) throw new Error("Stream API key missing");

    const client = new StreamVideoClient({
        apiKey,
        user:{
            id: session?.user?.id as string,
            name: session?.user?.name || session?.user?.id,
            image: session?.user?.image ?? undefined,
        },
        tokenProvider,
    })

    setVideoClient(client);

  }, [session?.user, status]);


    if(!videoClient) return <Loader />;
    return (
    <StreamVideo client={videoClient}>
        {children}
    </StreamVideo>
  );
};