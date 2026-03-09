import type { Metadata } from "next";
import AppShell from "@/components/ui/AppShell";
import CandidateDetail from "@/components/pages/CandidateDetail";
import { candidates } from "@/lib/content";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://duta-pariwisata.vercel.app";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const candidate = candidates.find((c) => c.id === Number(id));

  if (!candidate) {
    return { title: "Kandidat tidak ditemukan – Duta Pariwisata" };
  }

  const title = `${candidate.name} – Duta Pariwisata Indonesia`;
  const description = `Dukung ${candidate.name} dari ${candidate.region} untuk menjadi Duta Pariwisata Indonesia. Vote sekarang!`;
  const imageUrl = candidate.image.startsWith("http") ? candidate.image : `${BASE_URL}${candidate.image}`;
  const pageUrl = `${BASE_URL}/vote/${candidate.id}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: "Duta Pariwisata Indonesia",
      images: [{ url: imageUrl, width: 1200, height: 630, alt: candidate.name }],
      type: "website",
      locale: "id_ID",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default function CandidateDetailPage() {
  return (
    <AppShell showBottomBar={false}>
      <CandidateDetail />
    </AppShell>
  );
}
