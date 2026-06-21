"use client";

import type { ChangeEvent, ReactNode } from "react";
import { LogOut, RotateCcw, Save, Upload } from "lucide-react";
import { useMemo, useState } from "react";
import type { GalleryItem, ImageAsset, SchoolConfig } from "@/data/school.config";
import {
  getValueAtPath,
  imageSlots,
  setValueAtPath,
  type ImageSlot
} from "@/lib/image-slots";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type AdminStatus = {
  supabaseConfigured: boolean;
  enquiryConfigured: boolean;
  adminConfigured: boolean;
};

type AdminDashboardProps = {
  initialConfig: SchoolConfig;
  status: AdminStatus;
};

type TabKey =
  | "overview"
  | "school"
  | "pages"
  | "programs"
  | "fees"
  | "gallery"
  | "testimonials"
  | "faqs"
  | "seo"
  | "images";

const tabs: { key: TabKey; label: string }[] = [
  { key: "overview", label: "Overview" },
  { key: "school", label: "School Info" },
  { key: "pages", label: "Pages" },
  { key: "programs", label: "Programs" },
  { key: "fees", label: "Fees" },
  { key: "gallery", label: "Gallery" },
  { key: "testimonials", label: "Testimonials" },
  { key: "faqs", label: "FAQs" },
  { key: "seo", label: "SEO" },
  { key: "images", label: "Images & Media" }
];

function stringList(value: string[]) {
  return value.join("\n");
}

function parseStringList(value: string) {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function getImageDimensions(file: File) {
  return new Promise<{ width: number; height: number }>((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const image = new Image();

    image.onload = () => {
      URL.revokeObjectURL(url);
      resolve({ width: image.naturalWidth, height: image.naturalHeight });
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Could not read image dimensions."));
    };
    image.src = url;
  });
}

function TextField({
  label,
  value,
  onChange,
  textarea = false
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  textarea?: boolean;
}) {
  return (
    <div>
      <Label>{label}</Label>
      {textarea ? (
        <Textarea className="mt-2 min-h-24" value={value} onChange={(event) => onChange(event.target.value)} />
      ) : (
        <Input className="mt-2" value={value} onChange={(event) => onChange(event.target.value)} />
      )}
    </div>
  );
}

function StatusPill({ ok, label }: { ok: boolean; label: string }) {
  return (
    <span
      className={`rounded-md px-3 py-2 text-sm font-extrabold ${
        ok ? "bg-mint-50 text-mint-700" : "bg-coral-50 text-coral-700"
      }`}
    >
      {label}: {ok ? "Configured" : "Missing"}
    </span>
  );
}

export function AdminDashboard({ initialConfig, status }: AdminDashboardProps) {
  const [config, setConfig] = useState(initialConfig);
  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  const [message, setMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const pages = useMemo(() => Object.entries(config.pageContent), [config.pageContent]);
  const seoPages = useMemo(() => Object.entries(config.seo.pages), [config.seo.pages]);

  function updateConfig(nextConfig: SchoolConfig) {
    setConfig(nextConfig);
    setMessage("");
  }

  function updateAt(path: Array<string | number>, value: unknown) {
    updateConfig(setValueAtPath(config, path, value) as SchoolConfig);
  }

  async function save(nextConfig = config) {
    setIsSaving(true);
    setMessage("");

    const response = await fetch("/api/admin/config", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ config: nextConfig })
    });

    setIsSaving(false);

    if (!response.ok) {
      const body = (await response.json().catch(() => null)) as { message?: string } | null;
      setMessage(body?.message || "Could not save changes.");
      return false;
    }

    setMessage("Saved. Public pages will use the latest content.");
    return true;
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  async function uploadForSlot(slot: ImageSlot, file: File, alt: string) {
    setMessage("");
    const dimensions = await getImageDimensions(file);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("slotKey", slot.key);
    formData.append("alt", alt);
    formData.append("width", String(dimensions.width));
    formData.append("height", String(dimensions.height));

    const response = await fetch("/api/admin/upload", {
      method: "POST",
      body: formData
    });
    const body = (await response.json()) as { ok: boolean; image?: ImageAsset; message?: string };

    if (!response.ok || !body.image) {
      setMessage(body.message || "Could not upload image.");
      return;
    }

    const nextConfig = setValueAtPath(config, slot.path, body.image) as SchoolConfig;
    updateConfig(nextConfig);
    await save(nextConfig);
  }

  async function restoreSlot(slotKey: string) {
    const response = await fetch("/api/admin/image-slot/restore", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slotKey })
    });
    const body = (await response.json()) as { ok: boolean; config?: SchoolConfig; message?: string };

    if (!response.ok || !body.config) {
      setMessage(body.message || "Could not restore default image.");
      return;
    }

    updateConfig(body.config);
    setMessage("Default image restored.");
  }

  async function restoreGallery() {
    const response = await fetch("/api/admin/gallery/restore-defaults", { method: "POST" });
    const body = (await response.json()) as { ok: boolean; config?: SchoolConfig; message?: string };

    if (!response.ok || !body.config) {
      setMessage(body.message || "Could not restore default gallery.");
      return;
    }

    updateConfig(body.config);
    setMessage("Default gallery restored.");
  }

  async function uploadGalleryImage(file: File, alt: string, category: string) {
    const dimensions = await getImageDimensions(file);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("slotKey", "gallery");
    formData.append("alt", alt);
    formData.append("width", String(dimensions.width));
    formData.append("height", String(dimensions.height));

    const response = await fetch("/api/admin/upload", { method: "POST", body: formData });
    const body = (await response.json()) as { ok: boolean; image?: ImageAsset; message?: string };

    if (!response.ok || !body.image) {
      setMessage(body.message || "Could not upload gallery image.");
      return;
    }

    const nextConfig = {
      ...config,
      gallery: {
        ...config.gallery,
        items: [...config.gallery.items, { ...body.image, category }]
      }
    };
    updateConfig(nextConfig);
    await save(nextConfig);
  }

  return (
    <div className="min-h-screen bg-skysoft-50/65 py-10">
      <div className="container">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-extrabold uppercase tracking-[0.14em] text-coral-600">
              NextGen Kids Admin
            </p>
            <h1 className="mt-2 text-3xl font-extrabold text-slate-950">Website editor</h1>
          </div>
          <div className="flex gap-2">
            <Button type="button" onClick={() => save()} disabled={isSaving}>
              <Save className="h-4 w-4" aria-hidden="true" />
              {isSaving ? "Saving..." : "Save changes"}
            </Button>
            <Button type="button" variant="outline" onClick={logout}>
              <LogOut className="h-4 w-4" aria-hidden="true" />
              Logout
            </Button>
          </div>
        </div>

        {message ? (
          <div className="mt-5 rounded-md border border-sunshine-100 bg-white px-4 py-3 text-sm font-semibold text-slate-700">
            {message}
          </div>
        ) : null}

        <div className="mt-8 grid gap-6 lg:grid-cols-[260px_1fr]">
          <Card className="h-fit bg-white">
            <CardContent className="p-3">
              <nav className="grid gap-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveTab(tab.key)}
                    className={`rounded-md px-3 py-2 text-left text-sm font-extrabold transition ${
                      activeTab === tab.key
                        ? "bg-coral-500 text-white"
                        : "text-slate-700 hover:bg-sunshine-50"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </CardContent>
          </Card>

          <div className="space-y-6">
            {activeTab === "overview" ? (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-extrabold text-slate-950">System status</h2>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <StatusPill ok={status.supabaseConfigured} label="Supabase" />
                    <StatusPill ok={status.enquiryConfigured} label="Enquiry form" />
                    <StatusPill ok={status.adminConfigured} label="Admin login" />
                  </div>
                  <p className="mt-5 text-sm leading-6 text-slate-600">
                    Secrets are never shown here. Keep Supabase keys, admin password hash, and enquiry secrets in Vercel environment variables.
                  </p>
                </CardContent>
              </Card>
            ) : null}

            {activeTab === "school" ? (
              <Section title="School info">
                <div className="grid gap-4 md:grid-cols-2">
                  {[
                    ["Name", "name"],
                    ["Tagline", "tagline"],
                    ["Type", "type"],
                    ["City", "city"],
                    ["Phone", "phone"],
                    ["WhatsApp", "whatsapp"],
                    ["Email", "email"],
                    ["Timings", "timings"],
                    ["Established year", "establishedYear"],
                    ["Google Maps URL", "googleMapsUrl"],
                    ["Domain", "domain"]
                  ].map(([label, key]) => (
                    <TextField
                      key={key}
                      label={label}
                      value={String(config.schoolInfo[key as keyof typeof config.schoolInfo] || "")}
                      onChange={(value) => updateAt(["schoolInfo", key], value)}
                    />
                  ))}
                  <div className="md:col-span-2">
                    <TextField
                      label="Address"
                      value={config.schoolInfo.address}
                      onChange={(value) => updateAt(["schoolInfo", "address"], value)}
                      textarea
                    />
                  </div>
                  <div className="md:col-span-2">
                    <TextField
                      label="Description"
                      value={config.schoolInfo.description}
                      onChange={(value) => updateAt(["schoolInfo", "description"], value)}
                      textarea
                    />
                  </div>
                  <div className="md:col-span-2">
                    <TextField
                      label="Nearby areas, one per line"
                      value={stringList(config.schoolInfo.nearbyAreas)}
                      onChange={(value) => updateAt(["schoolInfo", "nearbyAreas"], parseStringList(value))}
                      textarea
                    />
                  </div>
                </div>
              </Section>
            ) : null}

            {activeTab === "pages" ? (
              <Section title="Page headers">
                <div className="space-y-5">
                  {pages.map(([pageKey, page]) => (
                    <Card key={pageKey} className="bg-white">
                      <CardContent className="grid gap-4 p-5 md:grid-cols-2">
                        <h3 className="text-lg font-extrabold capitalize text-slate-950 md:col-span-2">
                          {pageKey}
                        </h3>
                        <TextField label="Eyebrow" value={page.eyebrow} onChange={(value) => updateAt(["pageContent", pageKey, "eyebrow"], value)} />
                        <TextField label="Title" value={page.title} onChange={(value) => updateAt(["pageContent", pageKey, "title"], value)} />
                        <div className="md:col-span-2">
                          <TextField label="Description" value={page.description} onChange={(value) => updateAt(["pageContent", pageKey, "description"], value)} textarea />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </Section>
            ) : null}

            {activeTab === "programs" ? (
              <Section title="Programs">
                <div className="space-y-5">
                  {config.programs.items.map((program, index) => (
                    <Card key={`${program.title}-${index}`}>
                      <CardContent className="grid gap-4 p-5 md:grid-cols-2">
                        <TextField label="Program title" value={program.title} onChange={(value) => updateAt(["programs", "items", index, "title"], value)} />
                        <TextField label="Age group" value={program.ageGroup} onChange={(value) => updateAt(["programs", "items", index, "ageGroup"], value)} />
                        <div className="md:col-span-2">
                          <TextField label="Description" value={program.description} onChange={(value) => updateAt(["programs", "items", index, "description"], value)} textarea />
                        </div>
                        <div className="md:col-span-2">
                          <TextField label="Highlights, one per line" value={stringList(program.highlights)} onChange={(value) => updateAt(["programs", "items", index, "highlights"], parseStringList(value))} textarea />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </Section>
            ) : null}

            {activeTab === "fees" ? (
              <Section title="Fees">
                <div className="space-y-5">
                  <TextField label="Fees note" value={config.fees.note} onChange={(value) => updateAt(["fees", "note"], value)} textarea />
                  {config.fees.items.map((fee, index) => (
                    <Card key={`${fee.program}-${index}`}>
                      <CardContent className="grid gap-4 p-5 md:grid-cols-2">
                        <TextField label="Program" value={fee.program} onChange={(value) => updateAt(["fees", "items", index, "program"], value)} />
                        <TextField label="Admission fee" value={fee.admissionFee} onChange={(value) => updateAt(["fees", "items", index, "admissionFee"], value)} />
                        <TextField label="Monthly fee" value={fee.monthlyFee} onChange={(value) => updateAt(["fees", "items", index, "monthlyFee"], value)} />
                        <TextField label="Includes, one per line" value={stringList(fee.includes)} onChange={(value) => updateAt(["fees", "items", index, "includes"], parseStringList(value))} textarea />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </Section>
            ) : null}

            {activeTab === "gallery" ? (
              <GalleryEditor
                config={config}
                updateConfig={updateConfig}
                save={save}
                restoreGallery={restoreGallery}
                uploadGalleryImage={uploadGalleryImage}
              />
            ) : null}

            {activeTab === "testimonials" ? (
              <Section title="Testimonials">
                <div className="space-y-5">
                  {config.testimonials.items.map((testimonial, index) => (
                    <Card key={`${testimonial.parentName}-${index}`}>
                      <CardContent className="grid gap-4 p-5 md:grid-cols-2">
                        <TextField label="Parent name" value={testimonial.parentName} onChange={(value) => updateAt(["testimonials", "items", index, "parentName"], value)} />
                        <TextField label="Child info" value={testimonial.childInfo} onChange={(value) => updateAt(["testimonials", "items", index, "childInfo"], value)} />
                        <div className="md:col-span-2">
                          <TextField label="Quote" value={testimonial.quote} onChange={(value) => updateAt(["testimonials", "items", index, "quote"], value)} textarea />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </Section>
            ) : null}

            {activeTab === "faqs" ? (
              <Section title="FAQs">
                <div className="space-y-5">
                  {config.faqs.items.map((faq, index) => (
                    <Card key={`${faq.question}-${index}`}>
                      <CardContent className="grid gap-4 p-5">
                        <TextField label="Question" value={faq.question} onChange={(value) => updateAt(["faqs", "items", index, "question"], value)} />
                        <TextField label="Answer" value={faq.answer} onChange={(value) => updateAt(["faqs", "items", index, "answer"], value)} textarea />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </Section>
            ) : null}

            {activeTab === "seo" ? (
              <Section title="SEO">
                <div className="space-y-5">
                  <TextField label="Default title" value={config.seo.defaultTitle} onChange={(value) => updateAt(["seo", "defaultTitle"], value)} />
                  <TextField label="Default description" value={config.seo.defaultDescription} onChange={(value) => updateAt(["seo", "defaultDescription"], value)} textarea />
                  {seoPages.map(([pageKey, page]) => (
                    <Card key={pageKey}>
                      <CardContent className="grid gap-4 p-5 md:grid-cols-2">
                        <h3 className="text-lg font-extrabold capitalize text-slate-950 md:col-span-2">
                          {pageKey}
                        </h3>
                        <TextField label="SEO title" value={page.title} onChange={(value) => updateAt(["seo", "pages", pageKey, "title"], value)} />
                        <TextField label="Canonical path" value={page.path} onChange={(value) => updateAt(["seo", "pages", pageKey, "path"], value)} />
                        <div className="md:col-span-2">
                          <TextField label="SEO description" value={page.description} onChange={(value) => updateAt(["seo", "pages", pageKey, "description"], value)} textarea />
                        </div>
                        <div className="md:col-span-2">
                          <TextField label="Keywords, one per line" value={stringList(page.keywords)} onChange={(value) => updateAt(["seo", "pages", pageKey, "keywords"], parseStringList(value))} textarea />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </Section>
            ) : null}

            {activeTab === "images" ? (
              <Section title="Images & Media">
                <div className="grid gap-5 xl:grid-cols-2">
                  {imageSlots.map((slot) => (
                    <ImageSlotCard
                      key={slot.key}
                      slot={slot}
                      currentImage={getValueAtPath<ImageAsset>(config, slot.path) ?? slot.defaultImage}
                      uploadForSlot={uploadForSlot}
                      updateSlotAlt={(nextAlt) => {
                        const currentImage =
                          getValueAtPath<ImageAsset>(config, slot.path) ?? slot.defaultImage;
                        updateAt(slot.path, { ...currentImage, alt: nextAlt });
                      }}
                      restoreSlot={restoreSlot}
                    />
                  ))}
                </div>
              </Section>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="mb-5 text-xl font-extrabold text-slate-950">{title}</h2>
        {children}
      </CardContent>
    </Card>
  );
}

function ImageSlotCard({
  slot,
  currentImage,
  uploadForSlot,
  updateSlotAlt,
  restoreSlot
}: {
  slot: ImageSlot;
  currentImage: ImageAsset;
  uploadForSlot: (slot: ImageSlot, file: File, alt: string) => Promise<void>;
  updateSlotAlt: (alt: string) => void;
  restoreSlot: (slotKey: string) => Promise<void>;
}) {
  const [isUploading, setIsUploading] = useState(false);

  async function onFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setIsUploading(true);
    await uploadForSlot(slot, file, currentImage.alt);
    setIsUploading(false);
    event.target.value = "";
  }

  return (
    <Card className="overflow-hidden bg-white">
      <CardContent className="p-5">
        <div className="grid gap-4 md:grid-cols-2">
          <ImagePreview title="Current" image={currentImage} />
          <ImagePreview title="Default" image={slot.defaultImage} />
        </div>
        <h3 className="mt-4 text-lg font-extrabold text-slate-950">{slot.label}</h3>
        <p className="mt-1 text-sm leading-6 text-slate-600">{slot.description}</p>
        <p className="mt-2 text-xs font-bold uppercase tracking-[0.12em] text-coral-600">
          Recommended: {slot.recommended}
        </p>
        <div className="mt-4">
          <Label>Alt text</Label>
          <Input
            className="mt-2"
            value={currentImage.alt}
            onChange={(event) => updateSlotAlt(event.target.value)}
          />
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <label className="inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-md bg-coral-500 px-4 py-2 text-sm font-bold text-white transition hover:bg-coral-600">
            <Upload className="h-4 w-4" aria-hidden="true" />
            {isUploading ? "Uploading..." : "Replace image"}
            <input type="file" accept="image/*" className="hidden" onChange={onFileChange} />
          </label>
          <Button type="button" variant="outline" onClick={() => restoreSlot(slot.key)}>
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            Restore default
          </Button>
          <a
            href={slot.viewPath}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 items-center justify-center rounded-md border px-4 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
          >
            View page
          </a>
        </div>
      </CardContent>
    </Card>
  );
}

function ImagePreview({ title, image }: { title: string; image: ImageAsset }) {
  return (
    <div>
      <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.12em] text-slate-500">{title}</p>
      <div className="relative aspect-[4/3] overflow-hidden rounded-md border bg-slate-50">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image.src} alt={image.alt} className="h-full w-full object-cover" />
      </div>
    </div>
  );
}

function GalleryEditor({
  config,
  updateConfig,
  save,
  restoreGallery,
  uploadGalleryImage
}: {
  config: SchoolConfig;
  updateConfig: (config: SchoolConfig) => void;
  save: (config?: SchoolConfig) => Promise<boolean>;
  restoreGallery: () => Promise<void>;
  uploadGalleryImage: (file: File, alt: string, category: string) => Promise<void>;
}) {
  const [alt, setAlt] = useState("");
  const [category, setCategory] = useState("Gallery");

  function updateGalleryItem(index: number, item: GalleryItem) {
    updateConfig({
      ...config,
      gallery: {
        ...config.gallery,
        items: config.gallery.items.map((existing, itemIndex) => (itemIndex === index ? item : existing))
      }
    });
  }

  function removeGalleryItem(index: number) {
    const nextConfig = {
      ...config,
      gallery: {
        ...config.gallery,
        items: config.gallery.items.filter((_, itemIndex) => itemIndex !== index)
      }
    };
    updateConfig(nextConfig);
    void save(nextConfig);
  }

  async function onFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file || !alt || !category) {
      return;
    }

    await uploadGalleryImage(file, alt, category);
    setAlt("");
    event.target.value = "";
  }

  return (
    <Section title="Gallery">
      <div className="mb-6 grid gap-4 rounded-md border bg-sunshine-50/60 p-4 md:grid-cols-[1fr_1fr_auto] md:items-end">
        <TextField label="New image alt text" value={alt} onChange={setAlt} />
        <TextField label="Category" value={category} onChange={setCategory} />
        <label className="inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-md bg-coral-500 px-4 py-2 text-sm font-bold text-white transition hover:bg-coral-600">
          <Upload className="h-4 w-4" aria-hidden="true" />
          Add image
          <input type="file" accept="image/*" className="hidden" onChange={onFileChange} />
        </label>
      </div>
      <div className="mb-5">
        <Button type="button" variant="outline" onClick={restoreGallery}>
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          Restore default gallery
        </Button>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        {config.gallery.items.map((item, index) => (
          <Card key={`${item.src}-${index}`} className="overflow-hidden">
            <div className="aspect-[4/3] overflow-hidden bg-slate-50">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.src} alt={item.alt} className="h-full w-full object-cover" />
            </div>
            <CardContent className="space-y-3 p-4">
              <TextField
                label="Alt text"
                value={item.alt}
                onChange={(value) => updateGalleryItem(index, { ...item, alt: value })}
              />
              <TextField
                label="Category"
                value={item.category}
                onChange={(value) => updateGalleryItem(index, { ...item, category: value })}
              />
              <Button type="button" variant="outline" onClick={() => removeGalleryItem(index)}>
                Remove
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}
