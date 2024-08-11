import { type ReactNode, useEffect } from "react";
import { api } from "~/trpc/react";
import { useUser } from "../_context/userContext";

export default function PageTrackingWrapper({ children, page }: {
    children: ReactNode;
    page: "home" | "dashboard";
}) {
    const { user } = useUser();
    const addPageVisit = api.pageVisit.addPageVisitForUser.useMutation();

    useEffect(() => {
        if (!user) return;
        addPageVisit.mutate({ page, userUid: user.uid });
    }, [user, page]);

    return (
        <>{children}</>
    )
}