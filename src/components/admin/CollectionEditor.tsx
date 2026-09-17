"use client";

import { useState, useTransition } from "react";
import { ChevronDown, ChevronRight, ChevronUp, Check, GripVertical, Plus, Trash2 } from "lucide-react";
import { emptyRecord, type Schema } from "@/lib/admin-schema";
import FieldInput, { isHalf } from "./FieldInput";

type Row = Record<string, unknown>;
export type SaveResult = { ok: boolean; error?: string };

export default function CollectionEditor({
  initialItems,
  schema,
  save,
  addLabel,
  emptyMessage,
}: {
  initialItems: Row[];
  schema: Schema;
  save: (json: string) => Promise<SaveResult>;
  addLabel: string;
  emptyMessage?: string;
}) {
  const [items, setItems] = useState<Row[]>(initialItems);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [pending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const dirty = JSON.stringify(items) !== JSON.stringify(initialItems);

  const update = (i: number, key: string, v: unknown) =>
    setItems((prev) => prev.map((row, j) => (j === i ? { ...row, [key]: v } : row)));

  const move = (i: number, dir: -1 | 1) =>
    setItems((prev) => {
      const next = [...prev];
      const t = i + dir;
      if (t < 0 || t >= next.length) return prev;
      [next[i], next[t]] = [next[t], next[i]];
      return next;
    });

  const onSave = () =>
    startTransition(async () => {
      setError(null);
      const res = await save(JSON.stringify(items));
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
      } else {
        setError(res.error ?? "Could not save.");
      }
    });

  return (
    <div>
      <div className="space-y-3">
        {items.length === 0 && (
          <p className="text-sm text-muted-foreground border border-dashed border-border rounded-sm p-8 text-center">
            {emptyMessage ?? "Nothing here yet."}
          </p>
        )}

        {items.map((item, i) => {
          const open = openIndex === i;
          return (
            <div key={i} className="border border-border rounded-sm bg-card overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3">
                <GripVertical size={15} className="text-muted-foreground/40 shrink-0" />
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? null : i)}
                  className="flex items-center gap-2 flex-1 min-w-0 text-left"
                  aria-expanded={open}
                >
                  {open ? (
                    <ChevronDown size={15} className="text-primary shrink-0" />
                  ) : (
                    <ChevronRight size={15} className="text-muted-foreground shrink-0" />
                  )}
                  <span className="min-w-0">
                    <span className="block font-medium text-sm text-foreground truncate">
                      {String(item[schema.titleKey] || "Untitled")}
                    </span>
                    {schema.subtitleKey && (
                      <span className="block text-xs text-muted-foreground truncate">
                        {String(item[schema.subtitleKey] || "")}
                      </span>
                    )}
                  </span>
                </button>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    aria-label="Move up"
                    disabled={i === 0}
                    onClick={() => move(i, -1)}
                    className="p-1.5 text-muted-foreground hover:text-primary disabled:opacity-30 transition-colors"
                  >
                    <ChevronUp size={15} />
                  </button>
                  <button
                    type="button"
                    aria-label="Move down"
                    disabled={i === items.length - 1}
                    onClick={() => move(i, 1)}
                    className="p-1.5 text-muted-foreground hover:text-primary disabled:opacity-30 transition-colors"
                  >
                    <ChevronDown size={15} />
                  </button>
                  <button
                    type="button"
                    aria-label="Delete"
                    onClick={() => {
                      if (!confirm(`Delete "${String(item[schema.titleKey] || "this item")}"?`)) return;
                      setItems((prev) => prev.filter((_, j) => j !== i));
                      setOpenIndex(null);
                    }}
                    className="p-1.5 text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>

              {open && (
                <div className="border-t border-border p-4 bg-muted/20 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {schema.fields.map((f) => (
                    <div key={f.name} className={isHalf(f) ? "" : "sm:col-span-2"}>
                      <FieldInput field={f} value={item[f.name]} onChange={(v) => update(i, f.name, v)} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => {
          setItems((prev) => [...prev, emptyRecord(schema.fields)]);
          setOpenIndex(items.length);
        }}
        className="mt-4 inline-flex items-center gap-2 px-4 py-2 border border-dashed border-primary/50 text-primary text-sm font-medium rounded-sm hover:bg-primary/5 transition-colors"
      >
        <Plus size={15} /> {addLabel}
      </button>

      <div className="sticky bottom-0 mt-6 -mx-6 px-6 py-4 bg-card/95 backdrop-blur border-t border-border flex items-center gap-3">
        <button
          type="button"
          onClick={onSave}
          disabled={pending || !dirty}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground font-semibold text-sm rounded-sm hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {pending ? "Saving…" : "Save changes"}
        </button>
        {saved && (
          <span className="inline-flex items-center gap-1.5 text-sm text-primary font-medium">
            <Check size={16} /> Saved &amp; published
          </span>
        )}
        {dirty && !saved && !pending && (
          <span className="text-sm text-muted-foreground">Unsaved changes</span>
        )}
        {error && <span className="text-sm text-destructive">{error}</span>}
      </div>
    </div>
  );
}
