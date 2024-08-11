"use clint"

import { ReactNode, useEffect, useRef } from "react";
import { api } from "~/trpc/react";
import useIsInViewport from "../_hooks/useIsInViewport";

export default function InViewTrackingWrapper({ children, trackingId }: {
    children: ReactNode;
    trackingId: string;
}) {
    const addImageView = api.imageViews.addItemView.useMutation();

    const elementRef = useRef<HTMLDivElement>(null);
    const isInViewport = useIsInViewport(elementRef, true);

    useEffect(() => {
        if (isInViewport)
            addImageView.mutate({ type: 'image', itemId: trackingId, userUid: sessionStorage.getItem("session_id")! });
    }, [isInViewport])

    return (
        <div ref={elementRef}>{children}</ div>
    )
}