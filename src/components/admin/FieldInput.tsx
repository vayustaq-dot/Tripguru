"use client";

import { ChevronDown, ChevronUp, Plus, Trash2 } from "lucide-react";
import { emptyRecord, type Field } from "@/lib/admin-schema";

type Row = Record<string, unknown>;

export const inputCls =
  "w-full px-3 py-2 border border-border rounded-sm bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors";
const labelCls = "block text-xs font-medium text-muted-foreground mb-1";

export const isHalf = (f: Field) => "width" in f && f.width === "half";

function RowTools({
  i,
  len,
  onMove,
  onRemove,
}: {
  i: number;
  len: number;
  onMove: (dir: -1 | 1) => void;
  onRemove: () => void;
}) {
  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        aria-label="Move up"
        disabled={i === 0}
        onClick={() => onMove(-1)}
        className="p-1 text-muted-foreground hover:text-primary disabled:opacity-30 transition-colors"
      >
        <ChevronUp size={14} />
      </button>
      <button
        type="button"
        aria-label="Move down"
        disabled={i === len - 1}
        onClick={() => onMove(1)}
        className="p-1 text-muted-foreground hover:text-primary disabled:opacity-30 transition-colors"
      >
        <ChevronDown size={14} />
      </button>
      <button
        type="button"
        aria-label="Remove"
        onClick={onRemove}
        className="p-1 text-muted-foreground hover:text-destructive transition-colors"
      >
        <Trash2 size={14} />
      </button>
    </div>
  );
}

export default function FieldInput({
  field,
  value,
  onChange,
}: {
  field: Field;
  value: unknown;
  onChange: (v: unknown) => void;
}) {
  if (field.kind === "group") {
    const obj = (value && typeof value === "object" ? value : {}) as Row;
    return (
      <fieldset className="border border-border rounded-sm p-4">
        <legend className="px-2 text-xs font-semibold uppercase tracking-wider text-primary">
          {field.label}
        </legend>
        {field.help && <p className="text-xs text-muted-foreground mb-3">{field.help}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {field.fields.map((sub) => (
            <div key={sub.name} className={isHalf(sub) ? "" : "sm:col-span-2"}>
              <FieldInput
                field={sub}
                value={obj[sub.name]}
                onChange={(v) => onChange({ ...obj, [sub.name]: v })}
              />
            </div>
          ))}
        </div>
      </fieldset>
    );
  }

  if (field.kind === "stringList") {
    const list = Array.isArray(value) ? (value as string[]) : [];
    return (
      <div>
        <label className={labelCls}>{field.label}</label>
        {field.help && <p className="text-xs text-muted-foreground/70 mb-2">{field.help}</p>}
        <div className="space-y-2">
          {list.map((item, i) => (
            <div key={i} className="flex gap-2">
              <input
                className={inputCls}
                value={item}
                onChange={(e) => {
                  const next = [...list];
                  next[i] = e.target.value;
                  onChange(next);
                }}
              />
              <RowTools
                i={i}
                len={list.length}
                onMove={(d) => {
                  const next = [...list];
                  const t = i + d;
                  if (t < 0 || t >= next.length) return;
                  [next[i], next[t]] = [next[t], next[i]];
                  onChange(next);
                }}
                onRemove={() => onChange(list.filter((_, j) => j !== i))}
              />
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => onChange([...list, ""])}
          className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
        >
          <Plus size={13} /> {field.addLabel}
        </button>
      </div>
    );
  }

  if (field.kind === "objectList") {
    const list = Array.isArray(value) ? (value as Row[]) : [];
    return (
      <div>
        <label className={labelCls}>{field.label}</label>
        <div className="space-y-3">
          {list.map((item, i) => (
            <div key={i} className="border border-border rounded-sm p-3 bg-muted/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-foreground/70">
                  {String(item[field.titleKey] || `Item ${i + 1}`)}
                </span>
                <RowTools
                  i={i}
                  len={list.length}
                  onMove={(d) => {
                    const next = [...list];
                    const t = i + d;
                    if (t < 0 || t >= next.length) return;
                    [next[i], next[t]] = [next[t], next[i]];
                    onChange(next);
                  }}
                  onRemove={() => onChange(list.filter((_, j) => j !== i))}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {field.fields.map((sub) => (
                  <div key={sub.name} className={isHalf(sub) ? "" : "sm:col-span-2"}>
                    <FieldInput
                      field={sub}
                      value={item[sub.name]}
                      onChange={(v) => {
                        const next = [...list];
                        next[i] = { ...next[i], [sub.name]: v };
                        onChange(next);
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => onChange([...list, emptyRecord(field.fields)])}
          className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
        >
          <Plus size={13} /> {field.addLabel}
        </button>
      </div>
    );
  }

  const common = { className: inputCls, value: String(value ?? "") };

  return (
    <div>
      <label className={labelCls}>{field.label}</label>
      {field.kind === "textarea" ? (
        <textarea
          {...common}
          rows={field.rows ?? 3}
          onChange={(e) => onChange(e.target.value)}
          className={`${inputCls} resize-none`}
        />
      ) : field.kind === "select" ? (
        <select {...common} onChange={(e) => onChange(e.target.value)}>
          {field.options.map((o) => (
            <option key={o} value={o}>
              {o || "—"}
            </option>
          ))}
        </select>
      ) : (
        <input
          {...common}
          placeholder={"placeholder" in field ? field.placeholder : undefined}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
      {"help" in field && field.help && (
        <p className="text-xs text-muted-foreground/70 mt-1">{field.help}</p>
      )}
    </div>
  );
}
