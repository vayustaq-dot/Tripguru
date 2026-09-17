"use client";

import { useState, useTransition } from "react";
import { Check } from "lucide-react";
import type { Field } from "@/lib/admin-schema";
import FieldInput, { isHalf } from "./FieldInput";
import type { SaveResult } from "./CollectionEditor";

/**
 * Edits one structured object (a page's copy) rather than a list of them.
 * Shares the field renderer with CollectionEditor.
 */
export default function ObjectEditor<T extends Record<string, unknown>>({
  initialValue,
  fields,
  save,
}: {
  initialValue: T;
  fields: Field[];
  save: (json: string) => Promise<SaveResult>;
}) {
  const [value, setValue] = useState<Record<string, unknown>>(initialValue);
  const [pending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const dirty = JSON.stringify(value) !== JSON.stringify(initialValue);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-4xl">
        {fields.map((f) => (
          <div key={f.name} className={isHalf(f) ? "" : "sm:col-span-2"}>
            <FieldInput
              field={f}
              value={value[f.name]}
              onChange={(v) => setValue((prev) => ({ ...prev, [f.name]: v }))}
            />
          </div>
        ))}
      </div>

      <div className="sticky bottom-0 mt-8 -mx-6 px-6 py-4 bg-card/95 backdrop-blur border-t border-border flex items-center gap-3">
        <button
          type="button"
          disabled={pending || !dirty}
          onClick={() =>
            startTransition(async () => {
              setError(null);
              const res = await save(JSON.stringify(value));
              if (res.ok) {
                setSaved(true);
                setTimeout(() => setSaved(false), 2500);
              } else setError(res.error ?? "Could not save.");
            })
          }
          className="px-6 py-2.5 bg-primary text-primary-foreground font-semibold text-sm rounded-sm hover:bg-primary/90 transition-colors disabled:opacity-50"
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
