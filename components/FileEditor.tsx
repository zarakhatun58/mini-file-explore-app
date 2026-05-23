"use client";

interface Props {
  content: string;
  onChange: (value: string) => void;
}

export default function FileEditor({
  content,
  onChange,
}: Props) {
  return (
    <div className="p-5">
      <p className="text-sm text-gray-500 mb-2">
        Changes are saved automatically
      </p>

      <textarea
        value={content}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-[500px] border rounded-2xl p-5 outline-none"
      />
    </div>
  );
}