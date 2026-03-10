"use client";

import { useSyncExternalStore } from "react";
import { getUser, getVoteHistory, getSupportMessages, User, VoteRecord, SupportMessage } from "./auth";

// Module-level caches — only updated when dp-auth-update fires
let cachedUser: User | null = getUser();
let cachedVoteHistory: VoteRecord[] = getVoteHistory();
let cachedMessages: SupportMessage[] = getSupportMessages();
// Per-candidateId cache — cleared whenever cachedMessages is updated
const cachedMessagesByCandidate = new Map<number, SupportMessage[]>();

function subscribe(callback: () => void) {
  const handler = () => {
    cachedUser = getUser();
    cachedVoteHistory = getVoteHistory();
    cachedMessages = getSupportMessages();
    cachedMessagesByCandidate.clear();
    callback();
  };
  window.addEventListener("dp-auth-update", handler);
  return () => window.removeEventListener("dp-auth-update", handler);
}

export function useUser(): User | null {
  return useSyncExternalStore(subscribe, () => cachedUser, () => null);
}

export function useVoteHistory(): VoteRecord[] {
  return useSyncExternalStore(subscribe, () => cachedVoteHistory, () => []);
}

export function useHasVoted(candidateId: number): boolean {
  return useSyncExternalStore(
    subscribe,
    () => cachedVoteHistory.some((r) => r.candidateId === candidateId),
    () => false,
  );
}

export function useSupportMessages(candidateId: number): SupportMessage[] {
  return useSyncExternalStore(
    subscribe,
    () => {
      if (!cachedMessagesByCandidate.has(candidateId)) {
        cachedMessagesByCandidate.set(
          candidateId,
          cachedMessages.filter((m) => m.candidateId === candidateId),
        );
      }
      return cachedMessagesByCandidate.get(candidateId)!;
    },
    () => [],
  );
}
