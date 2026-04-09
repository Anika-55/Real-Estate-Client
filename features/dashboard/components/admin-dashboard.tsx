"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  FiBell,
  FiBookmark,
  FiEye,
  FiFlag,
  FiGrid,
  FiHeart,
  FiHome,
  FiMessageCircle,
  FiLogOut,
  FiMenu,
  FiMessageSquare,
  FiMoreVertical,
  FiPlus,
  FiThumbsUp,
  FiSearch,
  FiSettings,
  FiStar,
  FiTrash2,
  FiUser,
  FiUserCheck,
  FiX,
} from "react-icons/fi";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import {
  updateMyProfile,
  uploadMyProfileAvatar,
} from "@/features/dashboard/lib/profile-client";
import {
  createPropertyListing,
  fetchMyFavorites,
  fetchMyProperties,
  type FavoriteListItem,
  type PaginationMeta,
  type PropertyListItem,
} from "@/features/dashboard/lib/property-client";
import { cn } from "@/lib/utils";

const stats = [
  { label: "All Properties", value: "1.7k+", icon: FiHome },
  { label: "Total Pending", value: "03", icon: FiBookmark },
  { label: "Total Views", value: "4.8k", icon: FiEye },
  { label: "Total Favourites", value: "07", icon: FiHeart },
];

const propertyViews = [
  { day: "Sat", views: 20000 },
  { day: "Sun", views: 12000 },
  { day: "Mon", views: 6000 },
  { day: "Tue", views: 16000 },
  { day: "Wed", views: 10000 },
  { day: "Thu", views: 5000 },
  { day: "Fri", views: 11000 },
];

const recentMessages = [
  {
    name: "Jenny Rio.",
    date: "AUG 22",
    title: "Work inquiry from google.",
    body: "Hello, this is Jenny from Google. We would like to connect for a listing opportunity.",
    dot: "bg-rose-500",
  },
  {
    name: "Hasan Islam.",
    date: "MAY 22",
    title: "Product Designer opportunities",
    body: "Hello, greetings from Uber. Hope you are doing great. We are approaching you for a role.",
    dot: "bg-sky-500",
  },
  {
    name: "Jakie Chan",
    date: "JULY 22",
    title: "Hiring marketing specialist",
    body: "Hello, this is Jannat from HuntX. We offer business solutions for our clients.",
    dot: "bg-emerald-500",
  },
];

type SidebarItem = {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href?: string;
};

const sidebarGroups: Array<{ title: string; items: SidebarItem[] }> = [
  {
    title: "",
    items: [
      { label: "Dashboard", icon: FiGrid, href: "/dashboard" },
      { label: "Message", icon: FiMessageSquare },
    ],
  },
  {
    title: "Profile",
    items: [
      { label: "Profile", icon: FiUser, href: "/dashboard/profile" },
      { label: "Account Settings", icon: FiSettings },
      { label: "Membership", icon: FiUserCheck },
    ],
  },
  {
    title: "Listing",
    items: [
      { label: "My Properties", icon: FiHome, href: "/dashboard/my-properties" },
      { label: "Add New Property", icon: FiPlus, href: "/dashboard/add-property" },
      { label: "Favourites", icon: FiHeart, href: "/dashboard/favourites" },
      { label: "Saved Search", icon: FiSearch, href: "/dashboard/saved-search" },
      { label: "Reviews", icon: FiStar, href: "/dashboard/reviews" },
    ],
  },
];

function initialsFromName(name: string) {
  const normalized = name.trim();
  if (!normalized) return "AD";
  const [first, second] = normalized.split(" ");
  return `${first?.[0] ?? ""}${second?.[0] ?? ""}`.toUpperCase();
}

function splitName(fullName: string) {
  const trimmed = fullName.trim();
  if (!trimmed) return { firstName: "", lastName: "" };

  const parts = trimmed.split(" ");
  return {
    firstName: parts[0] ?? "",
    lastName: parts.slice(1).join(" "),
  };
}

type DashboardMode =
  | "overview"
  | "profile"
  | "add-property"
  | "my-properties"
  | "favourites"
  | "reviews"
  | "saved-search";

export interface AdminDashboardProps {
  mode?: DashboardMode;
}

type ProfileFormState = {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  position: string;
  phone: string;
  website: string;
  about: string;
  network1: string;
  network2: string;
  address: string;
  country: string;
  city: string;
  zip: string;
  state: string;
  mapLocation: string;
};

const emptyProfileForm: ProfileFormState = {
  username: "",
  firstName: "",
  lastName: "",
  email: "",
  position: "AGENT",
  phone: "",
  website: "",
  about: "",
  network1: "",
  network2: "",
  address: "",
  country: "Bangladesh",
  city: "Dhaka",
  zip: "1207",
  state: "Dhaka",
  mapLocation: "23.8103,90.4125",
};

type AddPropertyFormState = {
  propertyTitle: string;
  description: string;
  category: string;
  listedFor: "RENT" | "SALE";
  price: string;
  pricePostfix: string;
  bedrooms: string;
  bathrooms: string;
  kitchens: string;
  garages: string;
  garageSize: string;
  yearBuilt: string;
  floorsNo: string;
  size: string;
  address: string;
  country: string;
  city: string;
  zip: string;
  state: string;
  mapLocation: string;
};

const emptyAddPropertyForm: AddPropertyFormState = {
  propertyTitle: "",
  description: "",
  category: "Apartment",
  listedFor: "RENT",
  price: "",
  pricePostfix: "Per Month",
  bedrooms: "",
  bathrooms: "",
  kitchens: "",
  garages: "",
  garageSize: "",
  yearBuilt: "",
  floorsNo: "",
  size: "",
  address: "",
  country: "Bangladesh",
  city: "Dhaka",
  zip: "1207",
  state: "Dhaka",
  mapLocation: "23.8103,90.4125",
};

const amenityOptions = [
  "AC & Heating",
  "Garage",
  "Swimming Pool",
  "Parking",
  "Laundry",
  "Gym",
  "Dishwasher",
  "Hard Wood",
  "Cable TV",
  "Elevator",
  "Outdoor Shower",
  "Microwave",
];

interface DashboardSidebarProps {
  className?: string;
  userName: string;
  avatarUrl: string | null;
  pathname: string;
  onNavigate?: () => void;
  onLogout: () => void;
}

function DashboardSidebar({
  className,
  userName,
  avatarUrl,
  pathname,
  onNavigate,
  onLogout,
}: DashboardSidebarProps) {
  const avatarInitials = initialsFromName(userName);

  return (
    <aside
      className={cn(
        "flex h-full w-72 shrink-0 flex-col border-r border-[var(--border)]/80 bg-white",
        className
      )}
    >
      <div className="flex h-20 items-center border-b border-[var(--border)]/70 px-6">
        <Link href="/" onClick={onNavigate} className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-full bg-black text-base font-bold text-white">
            h
          </span>
          <p className="text-2xl font-semibold tracking-tight text-black">homy</p>
        </Link>
      </div>

      <div className="flex-1 space-y-7 overflow-y-auto px-6 py-6">
        {sidebarGroups.map((group) => (
          <section key={group.title || "main"}>
            {group.title ? (
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                {group.title}
              </p>
            ) : null}
            <nav className="space-y-1.5">
              {group.items.map((item) => {
                const isActive = Boolean(item.href && pathname === item.href);
                const className = cn(
                  "flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition",
                  isActive
                    ? "bg-black text-white shadow-sm"
                    : "text-slate-700 hover:bg-slate-100"
                );

                if (item.href) {
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={onNavigate}
                      className={className}
                    >
                      <item.icon className="size-4" />
                      <span>{item.label}</span>
                    </Link>
                  );
                }

                return (
                  <button key={item.label} type="button" className={className}>
                    <item.icon className="size-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </section>
        ))}
      </div>

      <div className="border-t border-[var(--border)]/70 px-6 py-5">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-semibold text-slate-700">Profile Complete</span>
          <span className="font-semibold text-[var(--primary)]">82%</span>
        </div>
        <Progress value={82} />
        <div className="mt-3 flex items-center gap-2">
          <span className="grid size-8 place-items-center overflow-hidden rounded-full bg-slate-900 text-xs font-semibold text-white">
            {avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={avatarUrl} alt="User avatar" className="size-full object-cover" />
            ) : (
              avatarInitials
            )}
          </span>
          <p className="text-xs text-slate-500">Welcome back, {userName}</p>
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={onLogout}
          className="mt-4 h-9 w-full justify-start gap-2"
        >
          <FiLogOut className="size-4" />
          Logout
        </Button>
      </div>
    </aside>
  );
}

function OverviewContent({ isChartReady }: { isChartReady: boolean }) {
  return (
    <>
      <Card className="border-0 bg-white shadow-sm">
        <CardContent className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-4 sm:p-6">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-xl border border-slate-100 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm text-slate-500">{stat.label}</p>
                  <p className="mt-1 text-3xl font-semibold tracking-tight text-black sm:text-4xl">
                    {stat.value}
                  </p>
                </div>
                <span className="grid size-10 place-items-center rounded-full bg-black text-white sm:size-11">
                  <stat.icon className="size-5" />
                </span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Card className="border-0 bg-white shadow-sm xl:col-span-2">
          <CardContent className="p-4 sm:p-6">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                Property View
              </h2>
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-3 py-1.5 text-sm">
                <span className="text-slate-500">Sort by:</span>
                <span className="font-medium text-slate-800">Weekly</span>
              </div>
            </div>

            <div className="h-[280px] w-full min-w-0 sm:h-[320px]">
              {isChartReady ? (
                <ResponsiveContainer
                  width="100%"
                  height="100%"
                  minWidth={0}
                  minHeight={260}
                >
                  <BarChart data={propertyViews}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="day" tickLine={false} axisLine={false} />
                    <YAxis tickLine={false} axisLine={false} />
                    <Tooltip />
                    <Bar
                      dataKey="views"
                      fill="#ff6a2f"
                      radius={[8, 8, 0, 0]}
                      maxBarSize={44}
                    />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full w-full animate-pulse rounded-xl bg-slate-100" />
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-white shadow-sm">
          <CardContent className="space-y-5 p-4 sm:p-6">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Recent Message
            </h2>

            {recentMessages.map((message) => (
              <article
                key={message.name}
                className="border-t border-slate-100 pt-4 first:border-none first:pt-0"
              >
                <div className="mb-2 flex items-center justify-between text-sm text-slate-500">
                  <p className="inline-flex items-center gap-2">
                    <span className={cn("size-2 rounded-full", message.dot)} />
                    {message.name}
                  </p>
                  <span>{message.date}</span>
                </div>
                <p className="text-base font-semibold text-slate-900">{message.title}</p>
                <p className="mt-1 text-sm leading-6 text-slate-500">{message.body}</p>
              </article>
            ))}
          </CardContent>
        </Card>
      </section>
    </>
  );
}

interface ProfileContentProps {
  profileForm: ProfileFormState;
  setProfileForm: React.Dispatch<React.SetStateAction<ProfileFormState>>;
  onSave: () => Promise<void>;
  onCancel: () => void;
  userName: string;
  avatarUrl: string | null;
  onUploadPhoto: (file: File) => Promise<void>;
  isUploadingPhoto: boolean;
  isSaving: boolean;
}

function ProfileContent({
  profileForm,
  setProfileForm,
  onSave,
  onCancel,
  userName,
  avatarUrl,
  onUploadPhoto,
  isUploadingPhoto,
  isSaving,
}: ProfileContentProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const avatarInitials = initialsFromName(userName);
  const profileLabelClass =
    "text-[11px] font-semibold uppercase tracking-[0.04em] text-slate-500";
  const profileInputClass =
    "h-10 rounded-md border border-[#e8e4dd] bg-white px-3 text-[13px] text-slate-700 placeholder:text-slate-400 focus-visible:ring-1 focus-visible:ring-[#ff6a2f]";
  const profileSelectClass =
    "h-10 w-full rounded-md border border-[#e8e4dd] bg-white px-3 text-[13px] text-slate-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#ff6a2f]";
  const profileTextareaClass =
    "min-h-28 rounded-md border border-[#e8e4dd] bg-white text-[13px] text-slate-700 placeholder:text-slate-400 focus-visible:ring-1 focus-visible:ring-[#ff6a2f]";

  return (
    <div className="space-y-6">
      <Card className="border-0 bg-white shadow-sm">
        <CardContent className="space-y-5 p-4 sm:p-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="grid size-11 place-items-center overflow-hidden rounded-full bg-slate-900 text-sm font-semibold text-white">
              {avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={avatarUrl} alt="Profile avatar" className="size-full object-cover" />
              ) : (
                avatarInitials
              )}
            </span>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={async (event) => {
                const file = event.target.files?.[0];
                if (!file) return;
                await onUploadPhoto(file);
                event.currentTarget.value = "";
              }}
            />
            <Button
              type="button"
              size="sm"
              disabled={isUploadingPhoto}
              onClick={() => fileInputRef.current?.click()}
              className="h-8 bg-[#ff6a2f] px-3 text-xs text-white hover:bg-[#ef5a1f]"
            >
              {isUploadingPhoto ? "Uploading..." : "Upload new photo"}
            </Button>
            <button type="button" className="text-xs font-semibold text-slate-500 hover:text-slate-700">
              Delete
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="username" className={profileLabelClass}>Username*</Label>
              <Input
                id="username"
                className={profileInputClass}
                value={profileForm.username}
                onChange={(event) =>
                  setProfileForm((prev) => ({ ...prev, username: event.target.value }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="firstName" className={profileLabelClass}>First Name*</Label>
              <Input
                id="firstName"
                className={profileInputClass}
                value={profileForm.firstName}
                onChange={(event) =>
                  setProfileForm((prev) => ({ ...prev, firstName: event.target.value }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName" className={profileLabelClass}>Last Name*</Label>
              <Input
                id="lastName"
                className={profileInputClass}
                value={profileForm.lastName}
                onChange={(event) =>
                  setProfileForm((prev) => ({ ...prev, lastName: event.target.value }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className={profileLabelClass}>Email*</Label>
              <Input
                id="email"
                type="email"
                className={profileInputClass}
                value={profileForm.email}
                onChange={(event) =>
                  setProfileForm((prev) => ({ ...prev, email: event.target.value }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="position" className={profileLabelClass}>Position*</Label>
              <select
                id="position"
                value={profileForm.position}
                onChange={(event) =>
                  setProfileForm((prev) => ({ ...prev, position: event.target.value }))
                }
                className={profileSelectClass}
              >
                <option value="ADMIN">Admin</option>
                <option value="AGENT">Agent</option>
                <option value="USER">User</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className={profileLabelClass}>Phone Number*</Label>
              <Input
                id="phone"
                className={profileInputClass}
                value={profileForm.phone}
                onChange={(event) =>
                  setProfileForm((prev) => ({ ...prev, phone: event.target.value }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="website" className={profileLabelClass}>Website*</Label>
              <Input
                id="website"
                className={profileInputClass}
                value={profileForm.website}
                onChange={(event) =>
                  setProfileForm((prev) => ({ ...prev, website: event.target.value }))
                }
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="about" className={profileLabelClass}>About*</Label>
              <Textarea
                id="about"
                className={profileTextareaClass}
                value={profileForm.about}
                onChange={(event) =>
                  setProfileForm((prev) => ({ ...prev, about: event.target.value }))
                }
              />
              <p className="text-xs text-slate-400">
                Brief description for your profile. URLs are hyperlinked.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 bg-white shadow-sm">
        <CardContent className="space-y-4 p-4 sm:p-6">
          <h2 className="text-xl font-semibold text-slate-900">Social Media</h2>
          <div className="space-y-2">
            <Label htmlFor="network1" className={profileLabelClass}>Network 1*</Label>
            <Input
              id="network1"
              className={profileInputClass}
              value={profileForm.network1}
              onChange={(event) =>
                setProfileForm((prev) => ({ ...prev, network1: event.target.value }))
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="network2" className={profileLabelClass}>Network 2*</Label>
            <Input
              id="network2"
              className={profileInputClass}
              value={profileForm.network2}
              onChange={(event) =>
                setProfileForm((prev) => ({ ...prev, network2: event.target.value }))
              }
            />
          </div>
          <Button type="button" variant="outline" size="sm" className="h-8 px-3 text-xs">
            + Add more link
          </Button>
        </CardContent>
      </Card>

      <Card className="border-0 bg-white shadow-sm">
        <CardContent className="space-y-4 p-4 sm:p-6">
          <h2 className="text-xl font-semibold text-slate-900">Address & Location</h2>
          <div className="space-y-2">
            <Label htmlFor="address" className={profileLabelClass}>Address*</Label>
            <Input
              id="address"
              className={profileInputClass}
              value={profileForm.address}
              onChange={(event) =>
                setProfileForm((prev) => ({ ...prev, address: event.target.value }))
              }
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <Label htmlFor="country" className={profileLabelClass}>Country*</Label>
              <Input
                id="country"
                className={profileInputClass}
                value={profileForm.country}
                onChange={(event) =>
                  setProfileForm((prev) => ({ ...prev, country: event.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city" className={profileLabelClass}>City*</Label>
              <Input
                id="city"
                className={profileInputClass}
                value={profileForm.city}
                onChange={(event) =>
                  setProfileForm((prev) => ({ ...prev, city: event.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="zip" className={profileLabelClass}>Zip Code*</Label>
              <Input
                id="zip"
                className={profileInputClass}
                value={profileForm.zip}
                onChange={(event) =>
                  setProfileForm((prev) => ({ ...prev, zip: event.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state" className={profileLabelClass}>State*</Label>
              <Input
                id="state"
                className={profileInputClass}
                value={profileForm.state}
                onChange={(event) =>
                  setProfileForm((prev) => ({ ...prev, state: event.target.value }))
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="mapLocation" className={profileLabelClass}>Map Location*</Label>
            <Input
              id="mapLocation"
              className={profileInputClass}
              value={profileForm.mapLocation}
              onChange={(event) =>
                setProfileForm((prev) => ({ ...prev, mapLocation: event.target.value }))
              }
            />
          </div>

          <div className="overflow-hidden rounded-xl border border-[var(--border)]">
            <iframe
              title="map"
              src="https://www.openstreetmap.org/export/embed.html?bbox=90.3517%2C23.7460%2C90.4730%2C23.8665&layer=mapnik"
              className="h-[240px] w-full"
              loading="lazy"
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <Button
              type="button"
              onClick={onSave}
              disabled={isSaving}
              className="h-9 bg-[#ff6a2f] px-6 text-white hover:bg-[#ef5a1f]"
            >
              {isSaving ? "Saving..." : "Save"}
            </Button>
            <Button type="button" variant="ghost" onClick={onCancel} className="h-9 px-4">
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

interface AddPropertyContentProps {
  form: AddPropertyFormState;
  setForm: React.Dispatch<React.SetStateAction<AddPropertyFormState>>;
  selectedAmenities: string[];
  setSelectedAmenities: React.Dispatch<React.SetStateAction<string[]>>;
  selectedImages: File[];
  setSelectedImages: React.Dispatch<React.SetStateAction<File[]>>;
  onSave: () => Promise<void>;
  onCancel: () => void;
  isSaving: boolean;
}

function AddPropertyContent({
  form,
  setForm,
  selectedAmenities,
  setSelectedAmenities,
  selectedImages,
  setSelectedImages,
  onSave,
  onCancel,
  isSaving,
}: AddPropertyContentProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const labelClass =
    "text-[11px] font-semibold uppercase tracking-[0.04em] text-slate-500";
  const inputClass =
    "h-10 rounded-md border border-[#e8e4dd] bg-white px-3 text-[13px] text-slate-700 placeholder:text-slate-400 focus-visible:ring-1 focus-visible:ring-[#ff6a2f]";
  const textareaClass =
    "min-h-24 rounded-md border border-[#e8e4dd] bg-white text-[13px] text-slate-700 placeholder:text-slate-400 focus-visible:ring-1 focus-visible:ring-[#ff6a2f]";
  const selectClass =
    "h-10 w-full rounded-md border border-[#e8e4dd] bg-white px-3 text-[13px] text-slate-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#ff6a2f]";

  return (
    <div className="space-y-6">
      <Card className="border-0 bg-white shadow-sm">
        <CardContent className="space-y-4 p-4 sm:p-6">
          <h2 className="text-lg font-semibold text-slate-900">Overview</h2>
          <div className="space-y-2">
            <Label htmlFor="propertyTitle" className={labelClass}>Property Title*</Label>
            <Input
              id="propertyTitle"
              className={inputClass}
              value={form.propertyTitle}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, propertyTitle: event.target.value }))
              }
              placeholder="Your property title here"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="overviewDescription" className={labelClass}>Description*</Label>
            <Textarea
              id="overviewDescription"
              className={textareaClass}
              value={form.description}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, description: event.target.value }))
              }
              placeholder="Write about property..."
            />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="category" className={labelClass}>Category*</Label>
              <select
                id="category"
                className={selectClass}
                value={form.category}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, category: event.target.value }))
                }
              >
                <option>Apartment</option>
                <option>House</option>
                <option>Villa</option>
                <option>Office</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="listedFor" className={labelClass}>Listed For*</Label>
              <select
                id="listedFor"
                className={selectClass}
                value={form.listedFor}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    listedFor: event.target.value as "RENT" | "SALE",
                  }))
                }
              >
                <option value="RENT">Rent</option>
                <option value="SALE">Sale</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="price" className={labelClass}>Price*</Label>
              <Input
                id="price"
                className={inputClass}
                value={form.price}
                onChange={(event) => setForm((prev) => ({ ...prev, price: event.target.value }))}
                placeholder="Your Price"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pricePostfix" className={labelClass}>Rent For Year</Label>
              <Input
                id="pricePostfix"
                className={inputClass}
                value={form.pricePostfix}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, pricePostfix: event.target.value }))
                }
                placeholder="Ex: Per Month"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 bg-white shadow-sm">
        <CardContent className="space-y-4 p-4 sm:p-6">
          <h2 className="text-lg font-semibold text-slate-900">Listing Details</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="bedrooms" className={labelClass}>Bedrooms</Label>
              <Input id="bedrooms" className={inputClass} value={form.bedrooms} onChange={(event) => setForm((prev) => ({ ...prev, bedrooms: event.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bathrooms" className={labelClass}>Bathrooms</Label>
              <Input id="bathrooms" className={inputClass} value={form.bathrooms} onChange={(event) => setForm((prev) => ({ ...prev, bathrooms: event.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="kitchens" className={labelClass}>Kitchens</Label>
              <Input id="kitchens" className={inputClass} value={form.kitchens} onChange={(event) => setForm((prev) => ({ ...prev, kitchens: event.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="garages" className={labelClass}>Garage</Label>
              <Input id="garages" className={inputClass} value={form.garages} onChange={(event) => setForm((prev) => ({ ...prev, garages: event.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="garageSize" className={labelClass}>Garage Size</Label>
              <Input id="garageSize" className={inputClass} value={form.garageSize} onChange={(event) => setForm((prev) => ({ ...prev, garageSize: event.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="yearBuilt" className={labelClass}>Year Built</Label>
              <Input id="yearBuilt" className={inputClass} value={form.yearBuilt} onChange={(event) => setForm((prev) => ({ ...prev, yearBuilt: event.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="floorsNo" className={labelClass}>Floors No</Label>
              <Input id="floorsNo" className={inputClass} value={form.floorsNo} onChange={(event) => setForm((prev) => ({ ...prev, floorsNo: event.target.value }))} />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="size" className={labelClass}>Size (sq ft)</Label>
              <Input id="size" className={inputClass} value={form.size} onChange={(event) => setForm((prev) => ({ ...prev, size: event.target.value }))} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="listingDescription" className={labelClass}>Description</Label>
            <Textarea
              id="listingDescription"
              className={textareaClass}
              value={form.description}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, description: event.target.value }))
              }
              placeholder="Write about property..."
            />
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 bg-white shadow-sm">
        <CardContent className="space-y-4 p-4 sm:p-6">
          <h2 className="text-lg font-semibold text-slate-900">Photo & Video Attachment</h2>
          <div className="space-y-2">
            <Label className={labelClass}>File Attachment*</Label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(event) => {
                const files = Array.from(event.target.files ?? []);
                setSelectedImages(files);
              }}
            />
            <Button
              type="button"
              variant="outline"
              className="h-10 w-full justify-start border-[#e8e4dd] text-[13px]"
              onClick={() => fileInputRef.current?.click()}
            >
              {selectedImages.length
                ? `${selectedImages.length} file(s) selected`
                : "Browse files..."}
            </Button>
            {selectedImages.length ? (
              <div className="rounded-md border border-[#e8e4dd] bg-slate-50 p-2 text-xs text-slate-500">
                {selectedImages.slice(0, 4).map((file) => (
                  <p key={file.name}>{file.name}</p>
                ))}
              </div>
            ) : null}
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 bg-white shadow-sm">
        <CardContent className="space-y-4 p-4 sm:p-6">
          <h2 className="text-lg font-semibold text-slate-900">Select Amenities</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {amenityOptions.map((amenity) => {
              const checked = selectedAmenities.includes(amenity);
              return (
                <label key={amenity} className="inline-flex items-center gap-2 text-xs text-slate-600">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(event) => {
                      setSelectedAmenities((prev) =>
                        event.target.checked
                          ? [...prev, amenity]
                          : prev.filter((item) => item !== amenity)
                      );
                    }}
                  />
                  {amenity}
                </label>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 bg-white shadow-sm">
        <CardContent className="space-y-4 p-4 sm:p-6">
          <h2 className="text-lg font-semibold text-slate-900">Address & Location</h2>
          <div className="space-y-2">
            <Label htmlFor="propertyAddress" className={labelClass}>Address*</Label>
            <Input
              id="propertyAddress"
              className={inputClass}
              value={form.address}
              onChange={(event) => setForm((prev) => ({ ...prev, address: event.target.value }))}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <Label htmlFor="propertyCountry" className={labelClass}>Country*</Label>
              <Input id="propertyCountry" className={inputClass} value={form.country} onChange={(event) => setForm((prev) => ({ ...prev, country: event.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="propertyCity" className={labelClass}>City*</Label>
              <Input id="propertyCity" className={inputClass} value={form.city} onChange={(event) => setForm((prev) => ({ ...prev, city: event.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="propertyZip" className={labelClass}>Zip Code*</Label>
              <Input id="propertyZip" className={inputClass} value={form.zip} onChange={(event) => setForm((prev) => ({ ...prev, zip: event.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="propertyState" className={labelClass}>State*</Label>
              <Input id="propertyState" className={inputClass} value={form.state} onChange={(event) => setForm((prev) => ({ ...prev, state: event.target.value }))} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="propertyMapLocation" className={labelClass}>Map Location*</Label>
            <Input
              id="propertyMapLocation"
              className={inputClass}
              value={form.mapLocation}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, mapLocation: event.target.value }))
              }
            />
          </div>
          <div className="overflow-hidden rounded-xl border border-[var(--border)]">
            <iframe
              title="property-map"
              src="https://www.openstreetmap.org/export/embed.html?bbox=90.3517%2C23.7460%2C90.4730%2C23.8665&layer=mapnik"
              className="h-[220px] w-full"
              loading="lazy"
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <Button
              type="button"
              onClick={onSave}
              disabled={isSaving}
              className="h-9 bg-[#ff6a2f] px-6 text-white hover:bg-[#ef5a1f]"
            >
              {isSaving ? "Saving..." : "Submit Property"}
            </Button>
            <Button type="button" variant="ghost" onClick={onCancel} className="h-9 px-4">
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

const listStatusStyles = {
  Active: "bg-emerald-100 text-emerald-700",
  Pending: "bg-rose-100 text-rose-700",
  Processing: "bg-amber-100 text-amber-700",
} as const;

type ListStatus = keyof typeof listStatusStyles;

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const fallbackPagination: PaginationMeta = {
  total: 0,
  page: 1,
  limit: 1,
  totalPages: 1,
  hasNextPage: false,
};

function PaginationControls({
  page,
  totalPages,
  onChange,
}: {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <div className="flex items-center gap-3 text-sm text-slate-600">
      <button
        type="button"
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
        className="disabled:opacity-40"
      >
        Prev
      </button>
      {pages.map((item) => (
        <button
          key={`page-${item}`}
          type="button"
          onClick={() => onChange(item)}
          className={cn(
            "inline-flex size-8 items-center justify-center rounded-full",
            item === page
              ? "bg-black text-white"
              : "border border-slate-300 text-slate-700"
          )}
        >
          {item}
        </button>
      ))}
      <button
        type="button"
        disabled={page >= totalPages}
        onClick={() => onChange(page + 1)}
        className="disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
}

const pseudoViews = (id: string) =>
  id
    .split("")
    .reduce((sum, char) => sum + char.charCodeAt(0), 0) % 3500;

const pseudoStatus = (id: string): ListStatus => {
  const roll = pseudoViews(id) % 3;
  if (roll === 0) return "Active";
  if (roll === 1) return "Pending";
  return "Processing";
};

function MyPropertiesContent({
  properties,
  isLoading,
  pagination,
  onPageChange,
}: {
  properties: PropertyListItem[];
  isLoading: boolean;
  pagination: PaginationMeta;
  onPageChange: (page: number) => void;
}) {
  const start = pagination.total
    ? (pagination.page - 1) * pagination.limit + 1
    : 0;
  const end = pagination.total
    ? Math.min(pagination.page * pagination.limit, pagination.total)
    : 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">
          {isLoading
            ? "Loading properties..."
            : `Showing ${start}-${end} of ${pagination.total} results`}
        </p>
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-3 py-1.5 text-sm">
          <span className="text-slate-500">Sort by:</span>
          <span className="font-medium text-slate-800">Newest</span>
        </div>
      </div>

      <Card className="border-0 bg-white shadow-sm">
        <CardContent className="p-3 sm:p-4">
          <div className="hidden rounded-lg bg-black px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.06em] text-white/90 md:grid md:grid-cols-[2.2fr_1fr_0.7fr_1fr_44px]">
            <span>Title</span>
            <span>Date</span>
            <span>View</span>
            <span>Status</span>
            <span className="text-right">Action</span>
          </div>

          <div className="divide-y divide-slate-100">
            {isLoading ? (
              <div className="p-6 text-sm text-slate-500">Loading...</div>
            ) : properties.length ? (
              properties.map((property) => {
                const status = pseudoStatus(property.id);
                const views = pseudoViews(property.id);

                return (
                  <article
                    key={property.id}
                    className="grid gap-3 py-4 md:grid-cols-[2.2fr_1fr_0.7fr_1fr_44px] md:items-center md:px-2"
                  >
                    <div className="flex items-center gap-3">
                      <span className="overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={property.images[0] ?? "https://placehold.co/72x72/e2e8f0/334155?text=IMG"}
                          alt={property.title}
                          className="h-[62px] w-[72px] object-cover"
                        />
                      </span>
                      <div>
                        <p className="text-lg font-semibold text-slate-900">{property.title}</p>
                        <p className="text-sm text-slate-500">
                          {property.city}, {property.country}
                        </p>
                        <p className="text-xl font-bold text-black">
                          {priceFormatter.format(Number(property.price))}
                        </p>
                      </div>
                    </div>

                    <p className="text-sm text-slate-500">{formatDate(property.createdAt)}</p>
                    <p className="text-sm text-slate-500">{views}</p>
                    <span
                      className={cn(
                        "inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold",
                        listStatusStyles[status]
                      )}
                    >
                      {status}
                    </span>
                    <button
                      type="button"
                      className="ml-auto inline-flex size-8 items-center justify-center rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                    >
                      <FiMoreVertical className="size-4" />
                    </button>
                  </article>
                );
              })
            ) : (
              <div className="p-8 text-center text-sm text-slate-500">
                No properties yet. Add your first one from Add New Property.
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <PaginationControls
        page={pagination.page}
        totalPages={pagination.totalPages}
        onChange={onPageChange}
      />
    </div>
  );
}

function FavouritesContent({
  favorites,
  isLoading,
  pagination,
  onPageChange,
}: {
  favorites: FavoriteListItem[];
  isLoading: boolean;
  pagination: PaginationMeta;
  onPageChange: (page: number) => void;
}) {
  const start = pagination.total
    ? (pagination.page - 1) * pagination.limit + 1
    : 0;
  const end = pagination.total
    ? Math.min(pagination.page * pagination.limit, pagination.total)
    : 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">
          {isLoading
            ? "Loading favorites..."
            : `Showing ${start}-${end} of ${pagination.total} favorites`}
        </p>
      </div>

      {isLoading ? (
        <Card className="border-0 bg-white shadow-sm">
          <CardContent className="p-8 text-sm text-slate-500">Loading...</CardContent>
        </Card>
      ) : favorites.length ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {favorites.map((favorite) => {
            const property = favorite.property;
            return (
              <Card key={favorite.id} className="overflow-hidden border-0 bg-white shadow-sm">
                <CardContent className="space-y-3 p-3">
                  <div className="relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={property.images[0] ?? "https://placehold.co/500x300/e2e8f0/334155?text=Property"}
                      alt={property.title}
                      className="h-40 w-full rounded-xl object-cover"
                    />
                    <span
                      className={cn(
                        "absolute left-2 top-2 rounded-full px-2 py-1 text-[10px] font-semibold uppercase text-white",
                        property.type === "RENT" ? "bg-[#ff6a2f]" : "bg-emerald-500"
                      )}
                    >
                      {property.type === "RENT" ? "For Rent" : "For Sell"}
                    </span>
                    <button
                      type="button"
                      className="absolute right-2 top-2 inline-flex size-7 items-center justify-center rounded-full bg-white/90 text-slate-600"
                    >
                      <FiHeart className="size-4 fill-current text-rose-500" />
                    </button>
                  </div>

                  <div>
                    <p className="text-2xl font-semibold text-slate-900">{property.title}</p>
                    <p className="text-xs text-slate-500">
                      {property.address}, {property.city}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span>{property.area ?? 0} sqft</span>
                    <span>{property.bedrooms ?? 0} bed</span>
                    <span>{property.bathrooms ?? 0} bath</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-3xl font-bold text-black">
                      {priceFormatter.format(Number(property.price))}
                      {property.type === "RENT" ? " / m" : ""}
                    </p>
                    <button
                      type="button"
                      className="inline-flex size-8 items-center justify-center rounded-full bg-black text-white"
                    >
                      <FiPlus className="size-4 rotate-45" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card className="border-0 bg-white shadow-sm">
          <CardContent className="p-8 text-center text-sm text-slate-500">
            No favorite properties yet.
          </CardContent>
        </Card>
      )}

      <PaginationControls
        page={pagination.page}
        totalPages={pagination.totalPages}
        onChange={onPageChange}
      />
    </div>
  );
}

type ReviewItem = {
  id: string;
  name: string;
  date: string;
  rating: number;
  comment: string;
  avatar: string;
  images?: string[];
};

const seededReviews: ReviewItem[] = [
  {
    id: "r1",
    name: "Zubayer Al Hasan",
    date: "17 Aug, 23",
    rating: 4.7,
    comment:
      "Lorem ipsum dolor sit amet consectetur. Pellentesque sed nulla facil diam posuere aliquam suscipit quam.",
    avatar: "https://i.pravatar.cc/80?img=12",
  },
  {
    id: "r2",
    name: "Rashed Kabir",
    date: "13 Aug, 23",
    rating: 4.9,
    comment:
      "Lorem ipsum dolor sit amet consectetur. Pellentesque sed nulla facil diam posuere aliquam suscipit quam.",
    avatar: "https://i.pravatar.cc/80?img=15",
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=200&q=60",
      "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?auto=format&fit=crop&w=200&q=60",
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=200&q=60",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=200&q=60",
    ],
  },
  {
    id: "r3",
    name: "Mithila Rahman",
    date: "17 Aug, 23",
    rating: 4.7,
    comment:
      "Lorem ipsum dolor sit amet consectetur. Amet amet id cursus dignissim. Eget vitae amet tempus sit mattis.",
    avatar: "https://i.pravatar.cc/80?img=45",
  },
  {
    id: "r4",
    name: "Zubayer Al Hasan",
    date: "17 Aug, 23",
    rating: 4.7,
    comment:
      "Lorem ipsum dolor sit amet consectetur. Pellentesque sed nulla facil diam posuere aliquam suscipit quam.",
    avatar: "https://i.pravatar.cc/80?img=12",
  },
];

function ReviewsContent({
  reviews,
  page,
  totalPages,
  total,
  pageSize,
  onPageChange,
}: {
  reviews: ReviewItem[];
  page: number;
  totalPages: number;
  total: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}) {
  const start = total ? (page - 1) * pageSize + 1 : 0;
  const end = total ? start + reviews.length - 1 : 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">
          Showing {start}-{end} of {total} results
        </p>
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-3 py-1.5 text-sm">
          <span className="text-slate-500">Sort by:</span>
          <span className="font-medium text-slate-800">Newest</span>
        </div>
      </div>

      <Card className="border-0 bg-white shadow-sm">
        <CardContent className="divide-y divide-slate-100 p-4 sm:p-6">
          {reviews.map((review) => (
            <article key={review.id} className="space-y-4 py-5 first:pt-0 last:pb-0">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="size-11 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-xl font-semibold text-slate-900">{review.name}</p>
                    <p className="text-sm text-slate-500">{review.date}</p>
                  </div>
                </div>
                <p className="inline-flex items-center gap-1 text-sm text-slate-500">
                  <span>({review.rating.toFixed(1)} Rating)</span>
                  <span className="inline-flex text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FiStar key={`${review.id}-star-${i}`} className="size-3.5 fill-current" />
                    ))}
                  </span>
                </p>
              </div>

              <p className="leading-7 text-slate-600">{review.comment}</p>

              {review.images?.length ? (
                <div className="flex gap-2 overflow-x-auto">
                  {review.images.map((img, index) => (
                    <div key={img} className="relative shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={img} alt={`review-${index}`} className="h-20 w-24 rounded-lg object-cover" />
                      {index === review.images.length - 1 ? (
                        <span className="absolute inset-0 grid place-items-center rounded-lg bg-black/45 text-sm font-semibold text-white">
                          13+
                        </span>
                      ) : null}
                    </div>
                  ))}
                </div>
              ) : null}

              <div className="flex items-center gap-6 text-sm text-slate-400">
                <button type="button" className="inline-flex items-center gap-1.5 hover:text-slate-600">
                  <FiThumbsUp className="size-4" />
                  Helpful
                </button>
                <button type="button" className="inline-flex items-center gap-1.5 hover:text-slate-600">
                  <FiFlag className="size-4" />
                  Flag
                </button>
                <button type="button" className="inline-flex items-center gap-1.5 hover:text-slate-600">
                  <FiMessageCircle className="size-4" />
                  Reply
                </button>
              </div>
            </article>
          ))}
        </CardContent>
      </Card>

      <PaginationControls page={page} totalPages={totalPages} onChange={onPageChange} />
    </div>
  );
}

type SavedSearchItem = {
  id: string;
  title: string;
  date: string;
};

const seededSavedSearches: SavedSearchItem[] = [
  { id: "s1", title: "Galaxy Family Home", date: "13 Sep, 2023" },
  { id: "s2", title: "Big Apartments", date: "27 Aug, 2023" },
  { id: "s3", title: "Villa in California with pool", date: "16 Jun, 2023" },
  { id: "s4", title: "Small Houses", date: "4 Apr, 2023" },
  { id: "s5", title: "Flat for Rent USA", date: "14 Feb, 2023" },
  { id: "s6", title: "Apartments Near Market", date: "8 Jan, 2023" },
  { id: "s7", title: "Home for Rent", date: "15 Dec, 2022" },
];
const SAVED_SEARCH_STORAGE_KEY = "dashboard_saved_searches";

function SavedSearchContent({
  searches,
  page,
  totalPages,
  total,
  pageSize,
  onPageChange,
  onDelete,
}: {
  searches: SavedSearchItem[];
  page: number;
  totalPages: number;
  total: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onDelete: (id: string) => void;
}) {
  const start = total ? (page - 1) * pageSize + 1 : 0;
  const end = total ? start + searches.length - 1 : 0;

  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-500">
        Showing {start}-{end} of {total} results
      </p>
      <Card className="border-0 bg-white shadow-sm">
        <CardContent className="p-3 sm:p-4">
          <div className="hidden rounded-lg bg-black px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.06em] text-white/90 md:grid md:grid-cols-[2fr_1fr_120px]">
            <span>Title</span>
            <span>Date</span>
            <span className="text-right">Action</span>
          </div>

          <div className="divide-y divide-slate-100">
            {searches.map((item) => (
              <article
                key={item.id}
                className="grid gap-2 py-4 md:grid-cols-[2fr_1fr_120px] md:items-center md:px-2"
              >
                <p className="text-xl font-semibold text-slate-900">{item.title}</p>
                <p className="text-sm text-slate-500">{item.date}</p>
                <div className="ml-auto flex items-center gap-3">
                  <button
                    type="button"
                    className="inline-flex size-8 items-center justify-center rounded-md text-slate-500 hover:bg-slate-100 hover:text-slate-800"
                  >
                    <FiEye className="size-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(item.id)}
                    className="inline-flex size-8 items-center justify-center rounded-md text-slate-500 hover:bg-slate-100 hover:text-rose-600"
                  >
                    <FiTrash2 className="size-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </CardContent>
      </Card>

      <PaginationControls page={page} totalPages={totalPages} onChange={onPageChange} />
    </div>
  );
}

export function AdminDashboard({ mode = "overview" }: AdminDashboardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isChartReady, setIsChartReady] = useState(false);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isSavingProperty, setIsSavingProperty] = useState(false);
  const [isLoadingMyProperties, setIsLoadingMyProperties] = useState(false);
  const [isLoadingFavorites, setIsLoadingFavorites] = useState(false);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [userName, setUserName] = useState("Admin");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [profileForm, setProfileForm] = useState<ProfileFormState>(emptyProfileForm);
  const [initialProfileForm, setInitialProfileForm] = useState<ProfileFormState>(emptyProfileForm);
  const [addPropertyForm, setAddPropertyForm] =
    useState<AddPropertyFormState>(emptyAddPropertyForm);
  const [initialAddPropertyForm, setInitialAddPropertyForm] =
    useState<AddPropertyFormState>(emptyAddPropertyForm);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [myProperties, setMyProperties] = useState<PropertyListItem[]>([]);
  const [myFavorites, setMyFavorites] = useState<FavoriteListItem[]>([]);
  const [myPropertiesPagination, setMyPropertiesPagination] =
    useState<PaginationMeta>(fallbackPagination);
  const [myFavoritesPagination, setMyFavoritesPagination] =
    useState<PaginationMeta>(fallbackPagination);
  const [myPropertiesPage, setMyPropertiesPage] = useState(1);
  const [favoritesPage, setFavoritesPage] = useState(1);
  const [reviewsPage, setReviewsPage] = useState(1);
  const [savedSearchPage, setSavedSearchPage] = useState(1);
  const [savedSearches, setSavedSearches] =
    useState<SavedSearchItem[]>(seededSavedSearches);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setIsChartReady(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("realestate_access_token");
    if (!token) {
      router.replace("/login");
      return;
    }

    const rawUser = localStorage.getItem("realestate_user");
    if (rawUser) {
      try {
        const parsed = JSON.parse(rawUser) as {
          name?: string;
          email?: string;
          phone?: string;
          role?: string;
          avatarUrl?: string | null;
        };

        const fullName = parsed.name ?? "";
        const names = splitName(fullName);
        const username = parsed.email
          ? parsed.email.split("@")[0] ?? ""
          : `${names.firstName}${names.lastName}`.toLowerCase();

        const normalized: ProfileFormState = {
          ...emptyProfileForm,
          username,
          firstName: names.firstName,
          lastName: names.lastName,
          email: parsed.email ?? "",
          position: parsed.role ?? "AGENT",
          phone: parsed.phone ?? "",
          website: parsed.email ? `https://${parsed.email.split("@")[1]}` : "",
          about: fullName
            ? `I am ${fullName}, and I am currently managing real-estate activities from the admin dashboard.`
            : emptyProfileForm.about,
          network1: fullName
            ? `https://facebook.com/${fullName.replace(/\s+/g, "").toLowerCase()}`
            : "",
          network2: fullName
            ? `https://twitter.com/${fullName.replace(/\s+/g, "").toLowerCase()}`
            : "",
          address: "19 Westkey Way",
        };

        if (fullName) {
          setUserName(fullName);
        }

        if (parsed.avatarUrl) {
          setAvatarUrl(parsed.avatarUrl);
        }

        setProfileForm(normalized);
        setInitialProfileForm(normalized);
      } catch {
        setUserName("Admin");
      }
    }

    setIsCheckingAuth(false);
  }, [router]);

  useEffect(() => {
    const raw = localStorage.getItem(SAVED_SEARCH_STORAGE_KEY);
    if (!raw) {
      return;
    }

    try {
      const parsed = JSON.parse(raw) as SavedSearchItem[];
      if (Array.isArray(parsed)) {
        setSavedSearches(parsed);
      }
    } catch {
      setSavedSearches(seededSavedSearches);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(SAVED_SEARCH_STORAGE_KEY, JSON.stringify(savedSearches));
  }, [savedSearches]);

  useEffect(() => {
    if (mode !== "my-properties") {
      return;
    }

    let ignore = false;
    const load = async () => {
      setIsLoadingMyProperties(true);
      try {
        const result = await fetchMyProperties(myPropertiesPage, 5);
        if (!ignore) {
          setMyProperties(result.data);
          setMyPropertiesPagination(result.pagination);
        }
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Failed to load properties";
        if (!ignore) {
          toast.error(message);
        }
      } finally {
        if (!ignore) {
          setIsLoadingMyProperties(false);
        }
      }
    };

    void load();
    return () => {
      ignore = true;
    };
  }, [mode, myPropertiesPage]);

  useEffect(() => {
    if (mode !== "favourites") {
      return;
    }

    let ignore = false;
    const load = async () => {
      setIsLoadingFavorites(true);
      try {
        const result = await fetchMyFavorites(favoritesPage, 9);
        if (!ignore) {
          setMyFavorites(result.data);
          setMyFavoritesPagination(result.pagination);
        }
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Failed to load favorites";
        if (!ignore) {
          toast.error(message);
        }
      } finally {
        if (!ignore) {
          setIsLoadingFavorites(false);
        }
      }
    };

    void load();
    return () => {
      ignore = true;
    };
  }, [mode, favoritesPage]);

  const headerTitle =
    mode === "profile"
      ? "Profile"
      : mode === "add-property"
        ? "Add New Property"
        : mode === "my-properties"
          ? "My Properties"
          : mode === "favourites"
            ? "Favourites"
            : mode === "reviews"
              ? "Review"
              : mode === "saved-search"
                ? "Saved Search"
        : "Dashboard";

  const avatarInitials = useMemo(() => initialsFromName(userName), [userName]);
  const reviewsPageSize = 3;
  const reviewsTotalPages = Math.max(1, Math.ceil(seededReviews.length / reviewsPageSize));
  const paginatedReviews = seededReviews.slice(
    (reviewsPage - 1) * reviewsPageSize,
    reviewsPage * reviewsPageSize
  );
  const savedSearchPageSize = 5;
  const savedSearchTotalPages = Math.max(
    1,
    Math.ceil(savedSearches.length / savedSearchPageSize)
  );
  const paginatedSavedSearches = savedSearches.slice(
    (savedSearchPage - 1) * savedSearchPageSize,
    savedSearchPage * savedSearchPageSize
  );

  const handleLogout = () => {
    localStorage.removeItem("realestate_access_token");
    localStorage.removeItem("realestate_user");
    toast.success("Logged out successfully");
    router.push("/login");
  };

  const handleProfileSave = async () => {
    const name = `${profileForm.firstName} ${profileForm.lastName}`.trim() || userName;
    const email = profileForm.email.trim();

    if (!email) {
      toast.error("Email is required");
      return;
    }

    setIsSavingProfile(true);
    try {
      const response = await updateMyProfile({
        name,
        email,
        phone: profileForm.phone,
      });

      const updatedUser = {
        name: response.data.name,
        email: response.data.email,
        phone: response.data.phone,
        role: response.data.role,
        avatarUrl: response.data.avatarUrl,
      };

      const names = splitName(updatedUser.name);
      const normalizedForm = {
        ...profileForm,
        firstName: names.firstName,
        lastName: names.lastName,
        email: updatedUser.email,
        phone: updatedUser.phone ?? "",
        position: updatedUser.role,
        username: updatedUser.email.split("@")[0] ?? profileForm.username,
      };

      localStorage.setItem("realestate_user", JSON.stringify(updatedUser));
      setUserName(updatedUser.name);
      setAvatarUrl(updatedUser.avatarUrl);
      setProfileForm(normalizedForm);
      setInitialProfileForm(normalizedForm);
      toast.success(response.message ?? "Profile updated successfully");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to update profile";
      toast.error(message);
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handleProfileCancel = () => {
    setProfileForm(initialProfileForm);
  };

  const handleDeleteSavedSearch = (id: string) => {
    setSavedSearches((prev) => prev.filter((item) => item.id !== id));
    toast.success("Saved search deleted");
  };

  const handlePhotoUpload = async (file: File) => {
    setIsUploadingPhoto(true);
    try {
      const updated = await uploadMyProfileAvatar(file);
      const rawUser = localStorage.getItem("realestate_user");
      const existing = rawUser ? (JSON.parse(rawUser) as Record<string, unknown>) : {};

      const mergedUser = {
        ...existing,
        name: updated.name,
        email: updated.email,
        phone: updated.phone,
        role: updated.role,
        avatarUrl: updated.avatarUrl,
      };

      localStorage.setItem("realestate_user", JSON.stringify(mergedUser));
      setUserName(updated.name);
      setAvatarUrl(updated.avatarUrl);
      toast.success("Profile photo updated successfully");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to upload profile photo";
      toast.error(message);
    } finally {
      setIsUploadingPhoto(false);
    }
  };

  useEffect(() => {
    if (savedSearchPage > savedSearchTotalPages) {
      setSavedSearchPage(savedSearchTotalPages);
    }
  }, [savedSearchPage, savedSearchTotalPages]);

  const handleAddPropertySave = async () => {
    if (!addPropertyForm.propertyTitle.trim()) {
      toast.error("Property title is required");
      return;
    }

    if (!addPropertyForm.description.trim()) {
      toast.error("Description is required");
      return;
    }

    if (!addPropertyForm.price.trim()) {
      toast.error("Price is required");
      return;
    }

    if (!addPropertyForm.address.trim() || !addPropertyForm.city.trim() || !addPropertyForm.country.trim()) {
      toast.error("Address, city and country are required");
      return;
    }

    if (!selectedImages.length) {
      toast.error("Please upload at least one property image");
      return;
    }

    setIsSavingProperty(true);
    try {
      await createPropertyListing({
        title: addPropertyForm.propertyTitle,
        description: addPropertyForm.description,
        price: addPropertyForm.price,
        type: addPropertyForm.listedFor,
        city: addPropertyForm.city,
        country: addPropertyForm.country,
        address: addPropertyForm.address,
        bedrooms: addPropertyForm.bedrooms,
        bathrooms: addPropertyForm.bathrooms,
        area: addPropertyForm.size,
        images: selectedImages,
      });

      setInitialAddPropertyForm(addPropertyForm);
      toast.success("Property created successfully");
      router.push("/dashboard");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to create property";
      toast.error(message);
    } finally {
      setIsSavingProperty(false);
    }
  };

  const handleAddPropertyCancel = () => {
    setAddPropertyForm(initialAddPropertyForm);
    setSelectedAmenities([]);
    setSelectedImages([]);
  };

  if (isCheckingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f4f2ef]">
        <p className="text-sm font-medium text-slate-500">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f4f2ef] text-slate-900">
      <div className="flex min-h-screen">
        <DashboardSidebar
          className="hidden lg:flex"
          userName={userName}
          avatarUrl={avatarUrl}
          pathname={pathname}
          onLogout={handleLogout}
        />

        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-20 border-b border-[var(--border)]/60 bg-[#f4f2ef]/95 backdrop-blur">
            <div className="mx-auto flex h-20 max-w-[1300px] items-center gap-2 px-4 sm:gap-3 sm:px-6">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="inline-flex size-10 items-center justify-center rounded-md border border-[var(--border)] bg-white text-slate-700 lg:hidden"
              >
                <FiMenu className="size-5" />
              </button>

              <h1 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                {headerTitle}
              </h1>

              <div className="ml-auto flex items-center gap-2 sm:gap-3">
                <div className="relative hidden w-56 lg:block xl:w-72">
                  <FiSearch className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    placeholder="Search here..."
                    className="rounded-full border-slate-300 bg-white pl-9"
                  />
                </div>

                <button
                  type="button"
                  className="relative inline-flex size-10 items-center justify-center rounded-full border border-[var(--border)] bg-white text-slate-700"
                >
                  <FiBell className="size-4" />
                  <span className="absolute right-2 top-2 size-2 rounded-full bg-rose-500" />
                </button>

                <Link
                  href="/dashboard/add-property"
                  className="hidden h-10 items-center rounded-xl bg-[#ff6a2f] px-4 text-sm font-semibold text-white hover:bg-[#ef5a1f] sm:inline-flex"
                >
                  Add Listing
                </Link>
                <Link
                  href="/dashboard/add-property"
                  className="inline-flex size-10 items-center justify-center rounded-full bg-[#ff6a2f] p-0 text-white hover:bg-[#ef5a1f] sm:hidden"
                  aria-label="Add listing"
                >
                  <FiPlus className="size-4" />
                </Link>

                <div className="relative inline-flex size-10 items-center justify-center overflow-hidden rounded-full bg-slate-900 text-sm font-semibold text-white sm:size-11">
                  {avatarUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={avatarUrl} alt="User avatar" className="size-full object-cover" />
                  ) : (
                    avatarInitials
                  )}
                  <span className="absolute bottom-1 right-1 size-2.5 rounded-full border-2 border-white bg-emerald-500" />
                </div>
              </div>
            </div>
          </header>

          <main className="mx-auto max-w-[1300px] space-y-6 px-4 py-6 sm:px-6">
            {mode === "profile" ? (
              <ProfileContent
                profileForm={profileForm}
                setProfileForm={setProfileForm}
                onSave={handleProfileSave}
                onCancel={handleProfileCancel}
                userName={userName}
                avatarUrl={avatarUrl}
                onUploadPhoto={handlePhotoUpload}
                isUploadingPhoto={isUploadingPhoto}
                isSaving={isSavingProfile}
              />
            ) : mode === "add-property" ? (
              <AddPropertyContent
                form={addPropertyForm}
                setForm={setAddPropertyForm}
                selectedAmenities={selectedAmenities}
                setSelectedAmenities={setSelectedAmenities}
                selectedImages={selectedImages}
                setSelectedImages={setSelectedImages}
                onSave={handleAddPropertySave}
                onCancel={handleAddPropertyCancel}
                isSaving={isSavingProperty}
              />
            ) : mode === "my-properties" ? (
              <MyPropertiesContent
                properties={myProperties}
                isLoading={isLoadingMyProperties}
                pagination={myPropertiesPagination}
                onPageChange={setMyPropertiesPage}
              />
            ) : mode === "favourites" ? (
              <FavouritesContent
                favorites={myFavorites}
                isLoading={isLoadingFavorites}
                pagination={myFavoritesPagination}
                onPageChange={setFavoritesPage}
              />
            ) : mode === "reviews" ? (
              <ReviewsContent
                reviews={paginatedReviews}
                page={reviewsPage}
                totalPages={reviewsTotalPages}
                total={seededReviews.length}
                pageSize={reviewsPageSize}
                onPageChange={setReviewsPage}
              />
            ) : mode === "saved-search" ? (
              <SavedSearchContent
                searches={paginatedSavedSearches}
                page={savedSearchPage}
                totalPages={savedSearchTotalPages}
                total={savedSearches.length}
                pageSize={savedSearchPageSize}
                onPageChange={setSavedSearchPage}
                onDelete={handleDeleteSavedSearch}
              />
            ) : (
              <OverviewContent isChartReady={isChartReady} />
            )}
          </main>
        </div>
      </div>

      {mobileMenuOpen ? (
        <div className="fixed inset-0 z-50 bg-black/40 lg:hidden">
          <div className="relative h-full w-[86%] max-w-sm bg-white shadow-xl">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="absolute right-5 top-6 z-10 inline-flex size-9 items-center justify-center rounded-md border border-[var(--border)] bg-white"
            >
              <FiX className="size-4" />
            </button>
            <DashboardSidebar
              className="w-full border-r-0"
              userName={userName}
              avatarUrl={avatarUrl}
              pathname={pathname}
              onNavigate={() => setMobileMenuOpen(false)}
              onLogout={handleLogout}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
