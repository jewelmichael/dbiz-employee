"use client";

export default function Toast({ message }: { message: string }) {
  return (
    <div className="fixed top-5 right-5 z-50">
      <div className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg animate-slide-in">
        {message}
      </div>
    </div>
  );
}
