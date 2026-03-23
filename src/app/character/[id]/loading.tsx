import type { ReactElement } from "react";

export default function CharacterLoading(): ReactElement {
  return (
    <div className="mx-auto max-w-4xl animate-pulse space-y-8 px-4 py-8">
      <div className="h-6 w-40 rounded bg-gray-200 dark:bg-gray-700" />
      <div className="relative aspect-[4/3] w-full max-w-xl rounded-xl bg-gray-200 dark:bg-gray-700" />
      <div className="h-8 w-2/3 rounded bg-gray-200 dark:bg-gray-700" />
      <div className="space-y-2">
        <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-700" />
        <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-700" />
        <div className="h-4 w-5/6 rounded bg-gray-200 dark:bg-gray-700" />
      </div>
      <div className="max-w-md space-y-3">
        <div className="h-2 w-full rounded bg-gray-200 dark:bg-gray-700" />
        <div className="h-2 w-full rounded bg-gray-200 dark:bg-gray-700" />
        <div className="h-2 w-5/6 rounded bg-gray-200 dark:bg-gray-700" />
        <div className="h-2 w-full rounded bg-gray-200 dark:bg-gray-700" />
      </div>
    </div>
  );
}
