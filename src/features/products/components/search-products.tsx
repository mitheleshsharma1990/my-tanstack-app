import { useState, useEffect, useRef } from 'react';

export default function SearchProducts({ onSearchChange }: { onSearchChange: (input: string) => void }) {
  const [input, setInput] = useState<string>('');
  const onSearchChangeRef = useRef(onSearchChange);

  useEffect(() => {
    onSearchChangeRef.current = onSearchChange;
  }, [onSearchChange]);

  useEffect(() => {
    const debounceFnId = setTimeout(() => {
      onSearchChangeRef.current(input);
    }, 300);

    return () => clearTimeout(debounceFnId);
  }, [input]);

  return (
    <div style={{ marginBottom: '20px' }}>
      <div className="mb-5">
        <input
          type="text"
          placeholder="Search products in catalog..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full rounded-md border border-gray-300 p-3 text-base outline-none transition-colors duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </div>
    </div>
  );
}
