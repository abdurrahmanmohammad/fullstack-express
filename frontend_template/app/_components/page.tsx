'use client';

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type {{ModelName}} = {
  id?: number;
  [key: string]: any;
};

export default function {{ModelName}}Page() {
  const [{{ModelNamePlural}}, set{{ModelName}}s] = useState<{{ModelName}}[]>([]);
  const [new{{ModelName}}, setNew{{ModelName}}] = useState<{{ModelName}}>({});
  const [fields, setFields] = useState<string[]>([]);

  const apiUrl = "http://localhost:8080/api/{{ModelNamePlural}}";

  const isCollection = (value: any) =>
    Array.isArray(value) && value.length > 0 && typeof value[0] === "object" && value[0]?.id !== undefined;

  const isLikelyCollectionField = (key: string, value: any) =>
    Array.isArray(value) ||
    key.endsWith("s") ||
    (typeof value === "string" && value.includes(","));

  const cleanPayload = (obj: Record<string, any>) => {
    const cleaned: Record<string, any> = {};

    for (const [key, value] of Object.entries(obj)) {
      if (
        value === null ||
        value === undefined ||
        (typeof value === "string" && value.trim() === "") ||
        (Array.isArray(value) && value.length === 0)
      ) {
        continue;
      }

      if (typeof value === "string" && isLikelyCollectionField(key, value)) {
        const ids = value
          .split(",")
          .map((id) => parseInt(id.trim()))
          .filter((id) => !isNaN(id));

        if (ids.length > 0) {
          cleaned[key] = ids.map((id) => ({ id }));
        }
      } else {
        cleaned[key] = value;
      }
    }

    return cleaned;
  };

  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        set{{ModelName}}s(data);
        if (data.length > 0) {
          const keys = Object.keys(data[0]).filter((key) => key !== "id");
          setFields(keys);
          const emptyEntry = keys.reduce((acc, key) => ({ ...acc, [key]: "" }), {});
          setNew{{ModelName}}(emptyEntry);
        }
      })
      .catch((err) => console.error("Failed to load {{ModelNamePlural}}:", err));
  }, []);

  const handleSave = (item: {{ModelName}}) => {
    if (!item.id) return;
    const payload = cleanPayload({ ...item });

    fetch(`${apiUrl}/${item.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update");
        alert("{{ModelName}} updated");
      })
      .catch((err) => console.error(err));
  };

  const handleDelete = (id?: number) => {
    if (!id) return;
    fetch(`${apiUrl}/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete");
        set{{ModelName}}s({{ModelNamePlural}}.filter((item) => item.id !== id));
      })
      .catch((err) => console.error("Failed to delete:", err));
  };

  const handleAdd = () => {
    const payload = cleanPayload({ ...new{{ModelName}} });

    fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((created) => {
        set{{ModelName}}s([...{{ModelNamePlural}}, created]);
        const reset = fields.reduce((acc, key) => ({ ...acc, [key]: "" }), {});
        setNew{{ModelName}}(reset);
      })
      .catch((err) => console.error("Failed to create:", err));
  };

  const handleChange = (index: number, key: string, value: string) => {
    const updated = [...{{ModelNamePlural}}];
    updated[index] = { ...updated[index], [key]: value };
    set{{ModelName}}s(updated);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">{{ModelName}}s</h1>

      { {{ModelNamePlural}}.map((item, index) => (
        <div key={item.id ?? index} className="space-y-2 border p-4 rounded-md">
          {Object.entries(item).map(([key, value]) => {
            if (key === "id") {
              return <div key={key} className="text-sm text-gray-500">ID: {value}</div>;
            }

            const displayValue = isCollection(value)
              ? value.map((v: any) => v.id).join(", ")
              : String(value ?? "");

            return (
              <Input
                key={key}
                placeholder={key}
                value={displayValue}
                onChange={(e) => handleChange(index, key, e.target.value)}
              />
            );
          })}
          <div className="flex space-x-2 pt-2">
            <Button onClick={() => handleSave(item)}>Save</Button>
            <Button variant="destructive" onClick={() => handleDelete(item.id)}>Delete</Button>
          </div>
        </div>
      ))}

      {fields.length > 0 && (
        <div className="flex flex-wrap gap-4 items-center pt-4 border-t mt-6">
          {fields.map((key) => (
            <Input
              key={key}
              placeholder={`New ${key.charAt(0).toUpperCase() + key.slice(1)}`}
              value={new{{ModelName}}[key] ?? ""}
              onChange={(e) =>
                setNew{{ModelName}}({ ...new{{ModelName}}, [key]: e.target.value })
              }
            />
          ))}
          <Button onClick={handleAdd}>Add</Button>
        </div>
      )}
    </div>
  );
}
