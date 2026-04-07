"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login, register } from "@/features/auth/lib/auth-client";

type AuthMode = "login" | "register";

interface AuthBlockProps {
  mode: AuthMode;
}

export function AuthBlock({ mode }: AuthBlockProps) {
  const router = useRouter();
  const isLogin = mode === "login";
  const [isPending, setIsPending] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const heading = isLogin ? "Welcome back" : "Create your account";
  const subheading = isLogin
    ? "Login to manage properties and bookings."
    : "Register to start managing your property journey.";

  const sideText = useMemo(
    () =>
      isLogin
        ? {
            title: "Everything in one dashboard",
            description:
              "Track listings, monitor booking requests, and stay synced with your backend in real time.",
          }
        : {
            title: "Start strong with Housix",
            description:
              "Create your account to publish properties faster and collaborate with the team from one place.",
          },
    [isLogin]
  );

  const submitLabel = isLogin ? "Login" : "Create account";
  const switchLabel = isLogin
    ? "Don’t have an account?"
    : "Already have an account?";
  const switchHref = isLogin ? "/register" : "/login";
  const switchCta = isLogin ? "Register" : "Login";

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsPending(true);
    try {
      const payload = isLogin
        ? await login({ email, password })
        : await register({ name, email, password, phone: phone || undefined });

      const token = payload.data.accessToken;
      localStorage.setItem("realestate_access_token", token);

      toast.success(payload.message ?? (isLogin ? "Login successful" : "Registration successful"));
      router.push("/");
      router.refresh();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong, please try again.";
      toast.error(message);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[var(--background)] p-4 sm:p-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_color-mix(in_srgb,var(--primary)_30%,transparent),transparent_45%)]" />
      <Card className="relative grid w-full max-w-5xl overflow-hidden md:grid-cols-2">
        <div className="hidden bg-[linear-gradient(155deg,color-mix(in_srgb,var(--primary)_85%,black),color-mix(in_srgb,var(--primary)_42%,white))] p-8 text-white md:block">
          <p className="text-xs uppercase tracking-[0.2em] text-white/80">Housix</p>
          <h2 className="mt-8 text-3xl font-semibold leading-tight">{sideText.title}</h2>
          <p className="mt-4 max-w-sm text-sm text-white/80">{sideText.description}</p>
        </div>
        <CardContent className="p-6 sm:p-8">
          <h1 className="text-2xl font-semibold text-[var(--foreground)]">{heading}</h1>
          <p className="mt-2 text-sm text-[var(--muted-foreground)]">{subheading}</p>
          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            {!isLogin ? (
              <div className="space-y-2">
                <Label htmlFor="name">Full name</Label>
                <Input
                  id="name"
                  autoComplete="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                />
              </div>
            ) : null}

            {!isLogin ? (
              <div className="space-y-2">
                <Label htmlFor="phone">Phone (optional)</Label>
                <Input
                  id="phone"
                  autoComplete="tel"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                />
              </div>
            ) : null}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                autoComplete={isLogin ? "current-password" : "new-password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Please wait..." : submitLabel}
            </Button>
          </form>
          <p className="mt-5 text-sm text-[var(--muted-foreground)]">
            {switchLabel}{" "}
            <Link href={switchHref} className="font-semibold text-[var(--primary)] hover:underline">
              {switchCta}
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
