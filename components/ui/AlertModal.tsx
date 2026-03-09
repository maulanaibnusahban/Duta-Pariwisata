"use client";

import React, { useEffect, useRef } from "react";

export interface AlertModalProps {
  /** Icon element rendered in the circle at the top */
  icon: React.ReactNode;
  /** Background/border colour class for the icon circle, e.g. "bg-green-500" */
  iconBg?: string;
  title: string;
  description?: React.ReactNode;
  okLabel?: string;
  onOk: () => void;
  /** Optional second button */
  cancelLabel?: string;
  onCancel?: () => void;
}

export default function AlertModal({
  icon,
  iconBg = "bg-gold-gradient",
  title,
  description,
  okLabel = "OK",
  onOk,
  cancelLabel,
  onCancel,
}: AlertModalProps) {
  const btnRef = useRef<HTMLButtonElement>(null);

  // Focus OK button on mount for keyboard accessibility
  useEffect(() => {
    btnRef.current?.focus();
  }, []);

  // Close on backdrop click
  const handleBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onOk();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm font-plus-jakarta"
      onClick={handleBackdrop}
    >
      {/* Card */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-sm mx-5 px-8 py-10 flex flex-col items-center text-center animate-[scale-in_0.2s_ease-out]">
        {/* Icon circle */}
        <div className={`w-16 h-16 rounded-full ${iconBg} flex items-center justify-center mb-5 shadow-lg`}>{icon}</div>

        <h2 className="text-xl font-extrabold text-gray-900 mb-2 leading-tight">{title}</h2>

        {description && <div className="text-sm text-gray-500 leading-relaxed mb-7">{description}</div>}
        {!description && <div className="mb-5" />}

        {/* Buttons */}
        <div className={`flex gap-3 w-full ${cancelLabel ? "" : "justify-center"}`}>
          {cancelLabel && onCancel && (
            <button
              onClick={onCancel}
              className="flex-1 py-3 rounded-2xl border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-colors active:scale-[0.98] cursor-pointer"
            >
              {cancelLabel}
            </button>
          )}
          <button
            ref={btnRef}
            onClick={onOk}
            className={`${cancelLabel ? "flex-1" : "px-12"} py-3 rounded-2xl bg-gold-gradient text-white font-bold text-sm hover:opacity-90 transition-opacity active:scale-[0.98] cursor-pointer shadow-md`}
          >
            {okLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
