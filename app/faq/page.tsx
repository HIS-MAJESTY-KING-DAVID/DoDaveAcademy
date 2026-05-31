import { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Find answers to common questions about DoDave Academy. Learn more about our courses, enrollment, and support.',
};

export default async function FAQPage() {
  const faqs = await prisma.faq.findMany({
    include: { course: { select: { title: true, slug: true } } },
    orderBy: { id: 'asc' },
    take: 50,
  });

  const groupedFaqs: { courseTitle: string; courseSlug: string; items: typeof faqs }[] = [];
  const seen = new Set<string>();
  for (const faq of faqs) {
    const key = faq.course?.slug || 'general';
    if (!seen.has(key)) {
      seen.add(key);
      groupedFaqs.push({ courseTitle: faq.course?.title || 'General', courseSlug: faq.course?.slug || '', items: [] });
    }
    const group = groupedFaqs.find(g => g.courseSlug === key);
    if (group) group.items.push(faq);
  }

  return (
    <main>
      <section className="py-4">
        <div className="container">
          <div className="bg-light p-4 text-center rounded-3">
            <h1 className="m-0">Frequently Asked Questions</h1>
            <div className="d-flex justify-content-center">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb breadcrumb-dots mb-0">
                  <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                  <li className="breadcrumb-item active" aria-current="page">FAQ</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-0">
        <div className="container">
          {groupedFaqs.length === 0 ? (
            <div className="text-center py-5">
              <i className="fas fa-question-circle fa-3x text-muted mb-3"></i>
              <p className="lead text-muted">No FAQs available yet. Check back soon!</p>
            </div>
          ) : (
            groupedFaqs.map((group) => (
              <div key={group.courseSlug} className="mb-5">
                <h3 className="mb-3">
                  {group.courseSlug ? (
                    <Link href={`/courses/${group.courseSlug}`} className="text-decoration-none">{group.courseTitle}</Link>
                  ) : group.courseTitle}
                </h3>
                <div className="accordion accordion-icon accordion-bg-light" id={`faq-accordion-${group.courseSlug}`}>
                  {group.items.map((faq, index) => (
                    <div className="accordion-item mb-3" key={faq.id}>
                      <h6 className="accordion-header" id={`faq-heading-${group.courseSlug}-${index}`}>
                        <button className={`accordion-button rounded ${index !== 0 ? 'collapsed' : ''}`} type="button" data-bs-toggle="collapse" data-bs-target={`#faq-collapse-${group.courseSlug}-${index}`} aria-expanded={index === 0}>
                          {faq.question}
                        </button>
                      </h6>
                      <div id={`faq-collapse-${group.courseSlug}-${index}`} className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`} aria-labelledby={`faq-heading-${group.courseSlug}-${index}`} data-bs-parent={`#faq-accordion-${group.courseSlug}`}>
                        <div className="accordion-body mt-3">{faq.answer}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
}
