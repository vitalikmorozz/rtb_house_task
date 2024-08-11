"use client"

import { ReactNode, useEffect, useState } from "react";
import { api } from "~/trpc/react";
import { useUser } from "../_context/userContext";

export default function SessionWrapper({ children, fallback = null }: {
    children: ReactNode;
    fallback?: ReactNode;
}) {
    const [hasSession, setHasSession] = useState<boolean>(false);
    const { setUser } = useUser();

    const userData = api.user.get.useQuery({ uid: sessionStorage.getItem("session_id")! }, { enabled: hasSession });
    const createUserMutation = api.user.create.useMutation();

    useEffect(() => {
        const sessionId = sessionStorage.getItem("session_id");
        if (!sessionId) {
            createUserMutation.mutate({}, {
                onSuccess: (data) => {
                    if (!data) return;
                    sessionStorage.setItem("session_id", data.uid || "");
                    setHasSession(true);
                },
                onError: (error) => {
                    console.error("Failed to create user:", error);
                    setHasSession(false);
                }
            });
        } else {
            setHasSession(true);
        }
    }, []);

    useEffect(() => {
        if (userData.data) {
            setUser(userData.data);
        }
    }, [userData])

    if (createUserMutation.isError) {
        return <>Error fetching session, try again a bit later</>;
    }

    if (!hasSession) {
        return <>{fallback}</>;
    }

    return <>{children}</>;
}