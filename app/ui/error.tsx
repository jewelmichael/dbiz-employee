export default function Error({ children }: { children: React.ReactNode }) {
  return <span className="text-red-600 text-sm italic mt-2">{children}</span>
}