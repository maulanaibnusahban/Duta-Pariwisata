import type { Metadata } from "next";
import CandidateDetail from "@/components/pages/CandidateDetail";
import { getCandidateBySlug } from "@/lib/api/candidates";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;

  try {
    const candidate = await getCandidateBySlug(slug);

    if (!candidate) {
      return { title: "Kandidat tidak ditemukan – Duta Pariwisata" };
    }

    const title = `${candidate.name} – Duta Pariwisata Indonesia`;
    const description = `Dukung ${candidate.name} dari ${candidate.region} untuk menjadi Duta Pariwisata Indonesia. Vote sekarang!`;

    // Asumsi candidate.photo_url tersedia, jika tidak fallback ke image lama atau kosong
    const photo = candidate.image || "";
    const imageUrl = photo.startsWith("http") ? photo : `${BASE_URL}${photo}`;
    const pageUrl = `${BASE_URL}/vote/${candidate.slug}`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url: pageUrl,
        siteName: "Duta Pariwisata Indonesia",
        images: photo ? [{ url: imageUrl, width: 1200, height: 630, alt: candidate.name }] : [],
        type: "website",
        locale: "id_ID",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: photo ? [imageUrl] : [],
      },
    };
  } catch (err: unknown) {
    return { title: "Error memuat Kandidat – Duta Pariwisata" };
  }
}

export default function CandidateDetailPage() {
  return <CandidateDetail />;
}
