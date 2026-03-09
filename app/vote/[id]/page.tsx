import AppShell from "@/components/ui/AppShell";
import CandidateDetail from "@/components/pages/CandidateDetail";

export default function CandidateDetailPage() {
  return (
    <AppShell showBottomBar={false}>
      <CandidateDetail />
    </AppShell>
  );
}
