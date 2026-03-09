export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface VoteRecord {
  candidateId: number;
  candidateName: string;
  candidateRegion: string;
  candidateImage: string;
  votedAt: string;
  method: "ads" | "purchase";
}

function notify() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("dp-auth-update"));
  }
}

export function getUser(): User | null {
  if (typeof window === "undefined") return null;
  try {
    const data = localStorage.getItem("dp_user");
    return data ? (JSON.parse(data) as User) : null;
  } catch {
    return null;
  }
}

export function loginWithGoogle(): User {
  const user: User = {
    id: "google-user-demo",
    name: "Pian",
    email: "demo@gmail.com",
    avatar: "/avatar.png",
  };
  localStorage.setItem("dp_user", JSON.stringify(user));
  notify();
  return user;
}

export function logout(): void {
  localStorage.removeItem("dp_user");
  notify();
}

export function getVoteHistory(): VoteRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem("dp_vote_history");
    return data ? (JSON.parse(data) as VoteRecord[]) : [];
  } catch {
    return [];
  }
}

export function addVoteRecord(record: VoteRecord): void {
  const history = getVoteHistory();
  history.unshift(record);
  localStorage.setItem("dp_vote_history", JSON.stringify(history));
  notify();
}

export function hasVotedFor(candidateId: number): boolean {
  return getVoteHistory().some((r) => r.candidateId === candidateId);
}
