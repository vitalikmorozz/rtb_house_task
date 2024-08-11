"use client"

import FillerText from "../_components/fillerText";
import InViewTrackingWrapper from "../_components/inViewTrackingWrapper";
import PageTrackingWrapper from "../_components/pageTrackingWrapper";
import { useUser } from "../_context/userContext";

export default function HomePage() {
    const { user } = useUser();

    return (
        <>
            <PageTrackingWrapper page="home">
                <FillerText paragraphsNum={10} />
                <InViewTrackingWrapper trackingId={sessionStorage.getItem("session_id")! + "/avatar"}>
                    <div className="border-2 border-slate-700 rounded-lg h-40 flex items-center mb-2 p-2">
                        {user && <>
                            <img className="h-full rounded-full" src={user?.avatar} alt="User avatar image" title="Your avatar" />
                            <div>
                                <div className="font-bold">{user.firstName} {user.lastName}</div>
                                <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis mollitia quia architecto magni voluptatum cumque, voluptas tempore tenetur esse fuga quibusdam quisquam suscipit iure, veritatis quas nobis saepe quae dolorem labore quaerat porro aut? Iste, deserunt magni molestias veniam voluptate laborum praesentium iusto quos non dicta amet optio nobis hic.</div>
                            </div>
                        </>}
                    </div>
                </InViewTrackingWrapper>
                <FillerText paragraphsNum={10} />
            </PageTrackingWrapper>
        </>
    )
}