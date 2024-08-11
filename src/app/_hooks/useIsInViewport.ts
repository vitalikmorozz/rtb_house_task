import { type RefObject, useEffect, useMemo, useState } from "react";

export default function useIsInViewport(ref: RefObject<HTMLDivElement>, isSingleUse = false) {
    const [isIntersecting, setIsIntersecting] = useState(false);

    const observer = useMemo(
        () =>
            new IntersectionObserver(([entry]) => {
                if (isSingleUse && isIntersecting) return;
                setIsIntersecting(entry?.isIntersecting ?? false);
            }),
        [isIntersecting, isSingleUse],
    );

    useEffect(() => {
        if (!ref?.current) return;

        observer.observe(ref?.current);

        return () => {
            observer.disconnect();
        };
    }, [ref, observer]);

    return isIntersecting;
}