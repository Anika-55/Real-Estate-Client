import { LandingHeader } from "@/features/landing/components/landing-header";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <LandingHeader />
      {children}
    </>
  );
}
