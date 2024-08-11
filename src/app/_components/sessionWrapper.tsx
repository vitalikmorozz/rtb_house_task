"use client"

import { type ReactNode, useEffect, useState } from "react";
import { api } from "~/trpc/react";
import { useUser } from "../_context/userContext";

export default function SessionWrapper({ children, fallback = null }: {
    children: ReactNode;
    fallback?: ReactNode;
}) {
    const isBrowser = typeof window !== 'undefined';
    const [hasSession, setHasSession] = useState<boolean>(false);
    const { setUser } = useUser();

    const userData = api.user.get.useQuery({ uid: isBrowser ? sessionStorage.getItem("session_id") ?? '' : '' }, { enabled: hasSession && sessionStorage !== undefined });
    const createUserMutation = api.user.create.useMutation();

    useEffect(() => {
        if (!isBrowser) return;

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

    }, [isBrowser]);

    useEffect(() => {
        if (userData.data) {
            setUser(userData.data);
        }
    }, [userData, setUser])

    if (createUserMutation.isError) {
        return <>Error fetching session, try again a bit later</>;
    }

    if (!hasSession) {
        return <>{fallback}</>;
    }

    return <>{children}</>;
}