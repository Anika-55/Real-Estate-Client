import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookSiteVisitCard } from "@/features/properties/components/book-site-visit-card";
import type { PropertyDetail } from "@/features/properties/types/property";

type PropertyDetailsPageProps = {
  property: PropertyDetail;
};

export function PropertyDetailsPage({ property }: PropertyDetailsPageProps) {
  return (
    <main className="bg-[var(--background)] pb-16 pt-10 sm:pt-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <h1 className="max-w-3xl text-3xl font-bold leading-tight text-[var(--foreground)] sm:text-4xl">
            {property.title}
          </h1>
          <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] px-4 py-3">
            <p className="text-xs uppercase tracking-[0.1em] text-[var(--muted-foreground)]">
              Asking Price
            </p>
            <p className="text-2xl font-bold text-[var(--foreground)]">
              {property.price}
            </p>
          </div>
        </div>

        <section className="mt-8">
          <div className="grid gap-4 lg:grid-cols-[2.2fr_1fr]">
            <div className="overflow-hidden rounded-2xl">
              <Image
                src={property.heroImage}
                alt={property.title}
                width={1600}
                height={900}
                className="h-[360px] w-full object-cover sm:h-[460px]"
                priority
              />
            </div>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-1">
              {property.gallery.map((image, index) => (
                <div key={image} className="overflow-hidden rounded-2xl">
                  <Image
                    src={image}
                    alt={`${property.title} gallery ${index + 1}`}
                    width={800}
                    height={500}
                    className="h-40 w-full object-cover lg:h-[147px]"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[2fr_1fr]">
          <Card>
            <CardContent className="space-y-8">
              <article>
                <h2 className="text-xl font-semibold text-[var(--foreground)]">
                  Description
                </h2>
                <p className="mt-3 text-sm leading-7 text-[var(--muted-foreground)]">
                  {property.description}
                </p>
              </article>

              <article>
                <h2 className="text-xl font-semibold text-[var(--foreground)]">
                  Address
                </h2>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <InfoItem label="Area" value={property.address.area} />
                  <InfoItem label="City" value={property.address.city} />
                  <InfoItem label="Country" value={property.address.country} />
                  <InfoItem label="Zip Code" value={property.address.zipCode} />
                </div>
              </article>

              <article>
                <h2 className="text-xl font-semibold text-[var(--foreground)]">
                  Details
                </h2>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {property.details.map((item) => (
                    <InfoItem key={item.label} label={item.label} value={item.value} />
                  ))}
                </div>
              </article>

              <article>
                <h2 className="text-xl font-semibold text-[var(--foreground)]">
                  Features
                </h2>
                <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {property.features.map((feature) => (
                    <p
                      key={feature}
                      className="rounded-md bg-[var(--muted)] px-3 py-2 text-sm text-[var(--foreground)]"
                    >
                      {feature}
                    </p>
                  ))}
                </div>
              </article>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="space-y-6">
              <div>
                <p className="text-xs uppercase tracking-[0.12em] text-[var(--muted-foreground)]">
                  Need Help?
                </p>
                <h3 className="mt-2 text-lg font-semibold text-[var(--foreground)]">
                  Talk to our property specialist
                </h3>
              </div>
              <BookSiteVisitCard propertyId={property.id} />
              <Link href="/property" className="block">
                <Button variant="outline" className="w-full">
                  Back to Properties
                </Button>
              </Link>
            </CardContent>
          </Card>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-[var(--foreground)]">
            Property Video Tour
          </h2>
          <div className="mt-4 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)]">
            <div className="aspect-video w-full">
              <iframe
                className="h-full w-full"
                src={property.youtubeEmbedUrl}
                title={`${property.title} video tour`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </section>

        <section className="mt-10 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-7">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--primary)]">
                Support
              </p>
              <h2 className="mt-3 text-3xl font-bold leading-tight text-[var(--foreground)] sm:text-4xl">
                Frequently Asked Questions
              </h2>
              <p className="mt-4 text-sm leading-7 text-[var(--muted-foreground)]">
                Browse common questions about this property, booking process, and
                financing support. Reach out to our team for personalized
                guidance.
              </p>
            </div>

            <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] px-4">
              {property.faqs.map((faq, index) => (
                <details
                  key={faq.question}
                  className="group border-b border-[var(--border)] py-4 last:border-b-0"
                  open={index === 0}
                >
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-left">
                    <span className="pr-2 text-sm font-semibold text-[var(--foreground)]">
                      {faq.question}
                    </span>
                    <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-[var(--border)] text-[var(--muted-foreground)] transition group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="pt-3 text-sm leading-7 text-[var(--muted-foreground)]">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-10 overflow-hidden rounded-2xl">
          <Image
            src={property.gallery[0]}
            alt={`${property.title} bottom showcase`}
            width={1600}
            height={900}
            className="h-64 w-full object-cover sm:h-80"
          />
        </section>
      </div>
    </main>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-[var(--border)] bg-[var(--muted)] px-3 py-2">
      <p className="text-[11px] uppercase tracking-[0.1em] text-[var(--muted-foreground)]">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold text-[var(--foreground)]">{value}</p>
    </div>
  );
}
