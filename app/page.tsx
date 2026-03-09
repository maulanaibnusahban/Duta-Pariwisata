"use client";
import Sidebar from "@/components/ui/Sidebar";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Vote from "@/components/pages/Vote";
import Shop from "@/components/pages/Shop";
import Home from "@/components/pages/Home";
import BottomNav from "@/components/ui/BottomNav";
import Profile from "@/components/pages/Profile";
import CandidateDetail from "@/components/pages/CandidateDetail";

function PageContent() {
  const searchParams = useSearchParams();
  const [page, setPage] = useState(searchParams.get("page") ?? "home");
  const [selectedCandidateId, setSelectedCandidateId] = useState<number | null>(null);

  const handleSelectCandidate = (id: number) => {
    setSelectedCandidateId(id);
    setPage("candidate-detail");
  };

  let pageToRender;

  if (page === "home") {
    pageToRender = <Home setPage={setPage} />;
  } else if (page === "vote") {
    pageToRender = <Vote setPage={setPage} onSelectCandidate={handleSelectCandidate} />;
  } else if (page === "candidate-detail" && selectedCandidateId !== null) {
    pageToRender = <CandidateDetail candidateId={selectedCandidateId} setPage={setPage} />;
  } else if (page === "shop") {
    pageToRender = <Shop />;
  } else if (page === "profile") {
    pageToRender = <Profile />;
  } else {
    pageToRender = <Home setPage={setPage} />;
  }

  return (
    <div className="bg-white min-h-screen max-w-full flex relative font-plus-jakarta">
      <Sidebar setPage={setPage} page={page} />
      {pageToRender}
      <BottomNav setPage={setPage} page={page} />
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={null}>
      <PageContent />
    </Suspense>
  );
}
