import { notFound } from "next/navigation";
import {
  experts,
  getExpertById,
} from "@/features/expertise/data/experts-data";
import { ExpertiseDetailsPage } from "@/features/expertise/components/expertise-details-page";

type AgentRouteProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return experts.map((expert) => ({ id: expert.id }));
}

export default async function AgentDetailsRoute({ params }: AgentRouteProps) {
  const { id } = await params;
  const expert = getExpertById(id);

  if (!expert) {
    notFound();
  }

  return <ExpertiseDetailsPage expert={expert} />;
}
