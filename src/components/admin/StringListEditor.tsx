"use client";

import { useState, useTransition } from "react";
import { Check, ChevronDown, ChevronUp, Plus, Trash2 } from "lucide-react";
import type { SaveResult } from "./CollectionEditor";

export default function StringListEditor({
  initialItems,
  save,
  addLabel,
  multiline = false,
}: {
  initialItems: string[];
  save: (json: string) => Promise<SaveResult>;
  addLabel: string;
  multiline?: boolean;
}) {
  const [items, setItems] = useState<string[]>(initialItems);
  const [pending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const dirty = JSON.stringify(items) !== JSON.stringify(initialItems);
  const cls =
    "w-full px-3 py-2 border border-border rounded-sm bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors";

  const move = (i: number, dir: -1 | 1) =>
    setItems((prev) => {
      const next = [...prev];
      const t = i + dir;
      if (t < 0 || t >= next.length) return prev;
      [next[i], next[t]] = [next[t], next[i]];
      return next;
    });

  return (
    <div>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex gap-2 items-start">
            <span className="mt-2.5 text-xs text-muted-foreground w-5 shrink-0 text-right">{i + 1}</span>
            {multiline ? (
              <textarea
                rows={2}
                className={`${cls} resize-none`}
                value={item}
                onChange={(e) =>
                  setItems((prev) => prev.map((v, j) => (j === i ? e.target.value : v)))
                }
              />
            ) : (
              <input
                className={cls}
                value={item}
                onChange={(e) =>
                  setItems((prev) => prev.map((v, j) => (j === i ? e.target.value : v)))
                }
              />
            )}
            <div className="flex shrink-0">
              <button
                type="button"
                aria-label="Move up"
                disabled={i === 0}
                onClick={() => move(i, -1)}
                className="p-2 text-muted-foreground hover:text-primary disabled:opacity-30 transition-colors"
              >
                <ChevronUp size={14} />
              </button>
              <button
                type="button"
                aria-label="Move down"
                disabled={i === items.length - 1}
                onClick={() => move(i, 1)}
                className="p-2 text-muted-foreground hover:text-primary disabled:opacity-30 transition-colors"
              >
                <ChevronDown size={14} />
              </button>
              <button
                type="button"
                aria-label="Remove"
                onClick={() => setItems((prev) => prev.filter((_, j) => j !== i))}
                className="p-2 text-muted-foreground hover:text-destructive transition-colors"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3 mt-4">
        <button
          type="button"
          onClick={() => setItems((prev) => [...prev, ""])}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
        >
          <Plus size={14} /> {addLabel}
        </button>
        <span className="flex-1" />
        <button
          type="button"
          disabled={pending || !dirty}
          onClick={() =>
            startTransition(async () => {
              setError(null);
              const res = await save(JSON.stringify(items.filter((s) => s.trim())));
              if (res.ok) {
                setSaved(true);
                setTimeout(() => setSaved(false), 2500);
              } else setError(res.error ?? "Could not save.");
            })
          }
          className="px-5 py-2 bg-primary text-primary-foreground font-semibold text-sm rounded-sm hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {pending ? "Saving…" : "Save"}
        </button>
        {saved && (
          <span className="inline-flex items-center gap-1.5 text-sm text-primary font-medium">
            <Check size={15} /> Saved
          </span>
        )}
        {error && <span className="text-sm text-destructive">{error}</span>}
      </div>
    </div>
  );
}
