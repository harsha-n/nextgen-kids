"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CalendarDays, CheckCircle, Loader2, MessageCircle, Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { SchoolConfig } from "@/data/school.config";
import { type EnquiryApiResponse, type EnquiryPayload, enquirySchema } from "@/lib/enquiry";
import { cn } from "@/lib/utils";

type ContactFormProps = {
  contact: SchoolConfig["contact"];
  programs: SchoolConfig["programs"]["items"];
  schoolInfo: SchoolConfig["schoolInfo"];
};

type DateInputElement = HTMLInputElement & {
  showPicker?: () => void;
};

function formatDateLabel(value?: string) {
  if (!value) {
    return "";
  }

  const [year, month, day] = value.split("-").map(Number);

  if (!year || !month || !day) {
    return value;
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  }).format(new Date(year, month - 1, day));
}

function openDatePicker(input: DateInputElement) {
  if (typeof input.showPicker === "function") {
    try {
      input.showPicker();
    } catch {
      input.focus();
    }
    return;
  }

  input.focus();
}

export function ContactForm({ contact, programs, schoolInfo }: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors }
  } = useForm<EnquiryPayload>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      parentName: "",
      childName: "",
      childAge: "",
      phone: "",
      email: "",
      program: "",
      preferredVisitDate: "",
      message: "",
      pageUrl: "",
      website: ""
    }
  });

  function getOptions(fieldId: string, configuredOptions?: string[]) {
    if (configuredOptions?.length) {
      return configuredOptions;
    }

    if (fieldId === "program") {
      return programs.map((program) => program.title);
    }

    return [];
  }

  function getWhatsAppUrl() {
    const digits = schoolInfo.whatsapp.replace(/\D/g, "");
    return `https://wa.me/${digits}?text=${encodeURIComponent(contact.whatsappCtaMessage)}`;
  }

  async function onSubmit(values: EnquiryPayload) {
    setIsLoading(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...values,
          pageUrl: window.location.href
        })
      });
      const result = (await response.json()) as EnquiryApiResponse;

      if (!response.ok || !result.ok) {
        throw new Error(result.message || contact.errorMessage);
      }

      setSubmitted(true);
      reset();
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : contact.errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  if (submitted) {
    return (
      <Card className="border-mint-100 bg-mint-50 shadow-soft">
        <CardContent className="p-8 text-center">
          <CheckCircle className="mx-auto h-14 w-14 text-mint-500" aria-hidden="true" />
          <h2 className="mt-5 text-2xl font-extrabold text-slate-950">{contact.successTitle}</h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-600">
            {contact.successMessage}
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: "coral" }), "w-full sm:w-auto")}
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              {contact.whatsappCtaLabel}
            </a>
            <Button type="button" variant="outline" onClick={() => setSubmitted(false)}>
              {contact.resetLabel}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-skysoft-100 shadow-soft">
      <CardContent className="p-5 md:p-7">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-950">{contact.formTitle}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">{contact.formDescription}</p>
        </div>

        <form className="mt-6 grid gap-4 md:grid-cols-2" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            aria-hidden="true"
            {...register("website")}
          />
          {contact.fields.map((field) => {
            const error = errors[field.id]?.message;
            const options = getOptions(field.id, field.options);
            const fieldId = `enquiry-${field.id}`;
            const dateValue =
              field.type === "date" ? String(watch(field.id) || "") : "";
            const dateRegistration =
              field.type === "date" ? register(field.id) : null;

            return (
              <div
                key={field.id}
                className={cn(field.type === "textarea" && "md:col-span-2")}
              >
                <Label htmlFor={fieldId}>
                  {field.label}
                  {field.required ? <span className="text-coral-600"> *</span> : null}
                </Label>
                {field.type === "textarea" ? (
                  <Textarea
                    id={fieldId}
                    placeholder={field.placeholder}
                    className="mt-2"
                    {...register(field.id)}
                  />
                ) : field.type === "select" ? (
                  <select
                    id={fieldId}
                    className="mt-2 flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    {...register(field.id)}
                  >
                    <option value="">{field.placeholder}</option>
                    {options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : field.type === "date" && dateRegistration ? (
                  <div className="relative mt-2 h-11 overflow-hidden rounded-md border border-input bg-background ring-offset-background transition focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                    <div
                      aria-hidden="true"
                      className="pointer-events-none flex h-full items-center justify-between gap-3 px-3 text-sm"
                    >
                      <span
                        className={cn(
                          "truncate",
                          dateValue ? "font-semibold text-slate-900" : "text-muted-foreground"
                        )}
                      >
                        {dateValue ? formatDateLabel(dateValue) : field.placeholder}
                      </span>
                      <CalendarDays className="h-4 w-4 shrink-0 text-slate-500" />
                    </div>
                    <input
                      id={fieldId}
                      type="date"
                      aria-label={field.label}
                      className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                      {...dateRegistration}
                      onClick={(event) => openDatePicker(event.currentTarget)}
                      onFocus={(event) => openDatePicker(event.currentTarget)}
                    />
                  </div>
                ) : (
                  <Input
                    id={fieldId}
                    type={field.type}
                    placeholder={field.placeholder}
                    className="mt-2"
                    {...register(field.id)}
                  />
                )}
                {error ? (
                  <p className="mt-2 text-sm font-semibold text-coral-600">{error}</p>
                ) : null}
              </div>
            );
          })}
          <div className="md:col-span-2">
            {submitError ? (
              <div className="mb-4 rounded-md border border-coral-100 bg-coral-50 p-4 text-sm text-coral-700">
                <div className="flex gap-2">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  <div>
                    <p className="font-extrabold">{contact.errorTitle}</p>
                    <p className="mt-1 leading-6">{submitError}</p>
                  </div>
                </div>
              </div>
            ) : null}
            <Button type="submit" disabled={isLoading} className="w-full md:w-auto">
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  {contact.loadingLabel}
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" aria-hidden="true" />
                  {contact.submitLabel}
                </>
              )}
            </Button>
            <p className="mt-3 text-xs leading-5 text-slate-500">{contact.privacyNotice}</p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
