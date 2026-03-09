"use client";

import { useSyncExternalStore } from "react";
import { getUser, getVoteHistory, User, VoteRecord } from "./auth";

// Module-level caches — only updated when dp-auth-update fires
let cachedUser: User | null = getUser();
let cachedVoteHistory: VoteRecord[] = getVoteHistory();

function subscribe(callback: () => void) {
  const handler = () => {
    cachedUser = getUser();
    cachedVoteHistory = getVoteHistory();
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
