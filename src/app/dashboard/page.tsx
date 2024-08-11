"use client"

import { useMemo } from "react";
import { AxisOptions, Chart } from "react-charts";
import { api } from "~/trpc/react";

type StatsData = {
    primary: string;
    secondary: number;
}

type ChartData = {
    data: StatsData[];
}

export default function DashboardPage() {
    const pageViewsStats = api.pageVisit.getVisitStats.useQuery();
    const itemViewsStats = api.itemViews.getViewsStats.useQuery();

    const data: ChartData[] = [
        {
            data: [
                {
                    secondary: pageViewsStats.data?.filter(i => i.page === "home").reduce((acc) => acc + 1, 0) || 0,
                    primary: "Accessed the initial page",

                },
                {
                    secondary: itemViewsStats.data?.filter(i => i.type === "image").reduce((acc) => acc + 1, 0) || 0,
                    primary: "Scrolled to the image",
                },
            ]
        }
    ]

    const primaryAxis = useMemo(
        (): AxisOptions<StatsData> => ({
            getValue: datum => datum.primary,
        }),
        []
    )

    const secondaryAxes = useMemo(
        (): AxisOptions<StatsData>[] => [
            {
                getValue: datum => datum.secondary,
                hardMin: 0,
            },
        ],
        []
    )
    console.log(data);
    if (pageViewsStats.isLoading || itemViewsStats.isLoading) return <p>Loading...</p>;

    return (
        <div className="container mx-auto">
            <h1 className="font-sans text-xl font-bold">Users stats</h1>
            <div className="w-full h-96 mx-auto">
                <Chart
                    options={{
                        data,
                        primaryAxis,
                        secondaryAxes,

                    }}
                />
            </div>
        </div>
    )
}