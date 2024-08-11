"use client"

import FillerText from "../_components/fillerText";
import InViewTrackingWrapper from "../_components/inViewTrackingWrapper";
import { useUser } from "../_context/userContext";
import PageTrackingWrapper from "../_components/pageTrackingWrapper";

export default function HomePage() {
    const { user } = useUser();

    return (
        <>
            <PageTrackingWrapper page="home">
                <FillerText paragraphsNum={10} />
                <InViewTrackingWrapper trackingId={sessionStorage.getItem("session_id")! + "/avatar"}>
                    {user && <img src={user?.avatar} alt="User avatar image" />}
                </InViewTrackingWrapper>
                <FillerText paragraphsNum={10} />
            </PageTrackingWrapper>
        </>
    )
}