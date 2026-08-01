import DashboardClient from "./DashboardClient";

export default async function Dashboard({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <DashboardClient id={id} />;
}