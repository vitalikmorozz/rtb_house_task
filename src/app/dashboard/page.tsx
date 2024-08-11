import { api } from "~/trpc/server"

export default async function DashboardPage() {
    const pageViewsStats = await api.pageVisit.getVisitStats();
    const itemViewsStats = await api.itemViews.getViewsStats();

    return (
        <div>
            <p>This is a dashbaord</p>
            {pageViewsStats?.map(view => (
                <p key={view.userUid + view.page}>user: {view.userUid} saw the page "{view.page}" {view.visits} time(s)</p>
            ))}
        </div>
    )
}