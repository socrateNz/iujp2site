// app/admin/layout.tsx
import AdminLayout from "@/components/admin/AdminLayout"; // ajuste le chemin si nécessaire

export const metadata = {
  title: "Admin | UIJP2",
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayout>{children}</AdminLayout>;
}
