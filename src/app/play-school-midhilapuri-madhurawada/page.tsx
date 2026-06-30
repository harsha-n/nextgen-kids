import type { Metadata } from "next";
import Link from "next/link";
import { AdmissionCTA } from "@/components/sections/AdmissionCTA";
import { PageHeader } from "@/components/sections/PageHeader";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { getSchoolConfig } from "@/lib/runtime-config";
import { generatePageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const config = await getSchoolConfig();
  return generatePageMetadata("localSeo", config);
}

export default async function LocalSeoPage() {
  const config = await getSchoolConfig();

  return (
    <>
      <PageHeader
        content={{
          eyebrow: "Local Areas",
          title: "Play School in Midhilapuri & Madhurawada",
          description:
            "NextGen Kids Play School serves families in Midhilapuri VUDA Colony, near Westside and Kalam Jr. College, Visakhapatnam/Vizag. We offer Play Group, Nursery, LKG, UKG, and daycare with caring teachers and activity-based learning.",
          primaryCta: {
            label: "Enquire for Admission",
            href: "/admissions",
            ariaLabel: "Open preschool admission enquiry"
          },
          secondaryCta: {
            label: "Book a Visit",
            href: "/contact",
            ariaLabel: "Book a campus visit at NextGen Kids"
          }
        }}
      />

      <section className="section-padding bg-sunshine-50/70">
        <div className="container">
          <SectionHeading
            eyebrow="Why Parents Choose Us"
            title="A Trusted Preschool in Midhilapuri VUDA Colony"
            description="Parents in Midhilapuri, Madhurawada, and nearby areas choose NextGen Kids for our safe campus, caring teachers, and focus on early childhood development through play-based learning."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <h3 className="mb-3 text-lg font-bold text-slate-900">Safe Campus Location</h3>
              <p className="text-sm leading-6 text-slate-600">
                Located in Sumo Heights Apartment, opposite Westside, near Kalam Jr. College in Midhilapuri VUDA Colony. Our campus has CCTV monitoring and secure pickup routines.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <h3 className="mb-3 text-lg font-bold text-slate-900">Activity-Based Learning</h3>
              <p className="text-sm leading-6 text-slate-600">
                Children learn through rhymes, music, dance, storytelling, art, slate writing, phonics, number fun, and indoor games. Every activity builds language, confidence, and social skills.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <h3 className="mb-3 text-lg font-bold text-slate-900">Caring Teachers</h3>
              <p className="text-sm leading-6 text-slate-600">
                Our teachers guide children with patience, warmth, and structure. They focus on settling gently, building speech confidence, and supporting early writing and number skills.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <SectionHeading
            eyebrow="Our Programs"
            title="Play Group, Nursery, LKG, UKG & Daycare"
            description="Age-appropriate programs designed around comfort, readiness, independence, language, movement, and social confidence for children aged 2 to 6."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg bg-slate-50 p-6 ring-1 ring-slate-200">
              <h3 className="mb-2 text-lg font-bold text-slate-900">Play Group (2-3 years)</h3>
              <p className="mb-4 text-sm leading-6 text-slate-600">
                A warm first-school experience focused on settling, rhymes, free play, sensory exploration, sharing, and teacher-led comfort.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center text-sm font-bold text-coral-600 hover:text-coral-700"
              >
                Ask About Play Group →
              </Link>
            </div>
            <div className="rounded-lg bg-slate-50 p-6 ring-1 ring-slate-200">
              <h3 className="mb-2 text-lg font-bold text-slate-900">Nursery (3-4 years)</h3>
              <p className="mb-4 text-sm leading-6 text-slate-600">
                Activity-based learning that builds vocabulary, fine motor skills, confidence, independence, and early number sense.
              </p>
              <Link
                href="/programs"
                className="inline-flex items-center text-sm font-bold text-coral-600 hover:text-coral-700"
              >
                Explore Nursery →
              </Link>
            </div>
            <div className="rounded-lg bg-slate-50 p-6 ring-1 ring-slate-200">
              <h3 className="mb-2 text-lg font-bold text-slate-900">LKG (4-5 years)</h3>
              <p className="mb-4 text-sm leading-6 text-slate-600">
                A readiness-focused program with phonics, pattern play, early writing, conversation, creativity, and classroom habits.
              </p>
              <Link
                href="/admissions"
                className="inline-flex items-center text-sm font-bold text-coral-600 hover:text-coral-700"
              >
                Know LKG Readiness →
              </Link>
            </div>
            <div className="rounded-lg bg-slate-50 p-6 ring-1 ring-slate-200">
              <h3 className="mb-2 text-lg font-bold text-slate-900">UKG (5-6 years)</h3>
              <p className="mb-4 text-sm leading-6 text-slate-600">
                A confident bridge to primary school through reading readiness, number concepts, self-expression, routines, and independence.
              </p>
              <Link
                href="/admissions"
                className="inline-flex items-center text-sm font-bold text-coral-600 hover:text-coral-700"
              >
                Plan for UKG →
              </Link>
            </div>
            <div className="rounded-lg bg-slate-50 p-6 ring-1 ring-slate-200">
              <h3 className="mb-2 text-lg font-bold text-slate-900">Daycare (2-6 years)</h3>
              <p className="mb-4 text-sm leading-6 text-slate-600">
                Extended care with supervised indoor play, rest routines, hygiene support, meal-time guidance, and secure pickup.
              </p>
              <Link
                href="/daycare"
                className="inline-flex items-center text-sm font-bold text-coral-600 hover:text-coral-700"
              >
                View Daycare →
              </Link>
            </div>
            <div className="rounded-lg bg-slate-50 p-6 ring-1 ring-slate-200">
              <h3 className="mb-2 text-lg font-bold text-slate-900">Dance & Music</h3>
              <p className="mb-4 text-sm leading-6 text-slate-600">
                Joyful activity learning through movement, rhythm, songs, and musical expression that builds coordination and confidence.
              </p>
              <Link
                href="/activities"
                className="inline-flex items-center text-sm font-bold text-coral-600 hover:text-coral-700"
              >
                View Activities →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-sunshine-50/70">
        <div className="container">
          <SectionHeading
            eyebrow="Daycare Support"
            title="Extended Care for Working Parents"
            description="Our daycare routine supports young children after preschool hours with supervised indoor play, rest, hygiene, secure pickup, and regular parent communication."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <h3 className="mb-2 text-lg font-bold text-slate-900">Supervised Play</h3>
              <p className="text-sm leading-6 text-slate-600">
                Children enjoy calm indoor play, stories, puzzles, music, and teacher-guided activities in a safe environment.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <h3 className="mb-2 text-lg font-bold text-slate-900">Rest and Nap Care</h3>
              <p className="text-sm leading-6 text-slate-600">
                A quieter routine supports younger children who need rest during extended hours at our Midhilapuri campus.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <h3 className="mb-2 text-lg font-bold text-slate-900">Secure Pickup</h3>
              <p className="text-sm leading-6 text-slate-600">
                Parent-authorized pickup only with CCTV-supported entry monitoring and supervised handover routines.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <SectionHeading
            eyebrow="Safety & Communication"
            title="Parent Confidence Built on Trust"
            description="Safety is built into classroom setup, hygiene habits, entry routines, pickup practices, teacher supervision, and clear parent communication."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="rounded-lg bg-slate-50 p-6 ring-1 ring-slate-200">
              <h3 className="mb-2 text-lg font-bold text-slate-900">Safe Entry and Pickup</h3>
              <p className="text-sm leading-6 text-slate-600">
                The campus routine supports careful arrival, CCTV-supported monitoring, supervised handover, and parent-approved pickup for families in Midhilapuri and Madhurawada.
              </p>
            </div>
            <div className="rounded-lg bg-slate-50 p-6 ring-1 ring-slate-200">
              <h3 className="mb-2 text-lg font-bold text-slate-900">Parent Communication</h3>
              <p className="text-sm leading-6 text-slate-600">
                Parents can call, WhatsApp, or schedule visits to stay connected with admissions and daily care updates for their child.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-sunshine-50/70">
        <div className="container">
          <SectionHeading
            eyebrow="Our Location"
            title="Conveniently Located in Midhilapuri VUDA Colony"
            description="NextGen Kids is easily accessible for families in Midhilapuri, Madhurawada, PM Palem, Pothinamallayya Palem, and surrounding areas in Visakhapatnam/Vizag."
          />
          <div className="mt-12 rounded-lg bg-white p-8 shadow-sm ring-1 ring-slate-200">
            <h3 className="mb-4 text-lg font-bold text-slate-900">Address</h3>
            <p className="mb-6 text-sm leading-6 text-slate-600">
              G1, Ground Floor, Sumo Heights Apartment, Opp. Westside, Near Kalam Jr. College, Midhilapuri VUDA Colony, Visakhapatnam - 530041
            </p>
            <h3 className="mb-4 text-lg font-bold text-slate-900">Nearby Landmarks</h3>
            <ul className="mb-6 space-y-2 text-sm leading-6 text-slate-600">
              <li>• Opposite Westside, Midhilapuri</li>
              <li>• Near Kalam Jr. College</li>
              <li>• Serving Madhurawada, PM Palem, Pothinamallayya Palem</li>
              <li>• Easy access from Visakhapatnam/Vizag city areas</li>
            </ul>
            <Link
              href="/contact"
              className="inline-flex items-center rounded-md bg-coral-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-coral-700"
            >
              Get Directions & Contact Us →
            </Link>
          </div>
        </div>
      </section>

      <AdmissionCTA cta={config.ctas.admission} />
    </>
  );
}
