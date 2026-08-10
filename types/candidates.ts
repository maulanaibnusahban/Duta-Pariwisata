// ── Social media links — semua field optional karena tidak semua platform selalu ada
export interface SocialMedia {
  instagram?: string;
  tiktok?: string;
  youtube?: string;
  twitter?: string;
}

// ── Data kandidat lengkap dari API
export interface Candidate {
  id: number;
  name: string;
  slug: string;
  number: number;
  region: string;
  image: string;
  bio: string;
  social_media: SocialMedia;
  video_url: string | null;
  vote_count: number;
  rank: number;
  is_active: boolean;
  created_at: string;
}

// ── Nilai valid untuk parameter sort
export type CandidateSort = "votes" | "number" | "name";

// ── Query params untuk GET /api/candidates
export interface GetCandidatesParams {
  search?: string;
  sort?: CandidateSort;
}
