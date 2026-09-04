import React, { useState } from 'react';
import { Section } from '../layout/Section';
import { SectionHeader } from '../layout/SectionHeader';
import { Accordion } from '../ui/Accordion';
import { Button } from '../ui/Button';
import { faqData, faqCategories } from '../../data/faqData';

export const FAQSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const filteredFaqs = selectedCategory === 'ALL'
    ? faqData
    : faqData.filter((item) => item.category === selectedCategory);

  return (
    <Section id="faq" variant="primary">
      <SectionHeader
        badge="FREQUENTLY ASKED QUESTIONS"
        title="Everything You Need to Know"
        subtitle="Got questions? We've got answers across registration, team requirements, event logistics, and policies."
      />

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10 max-w-4xl mx-auto">
        {faqCategories.map((cat) => (
          <Button
            key={cat}
            variant={selectedCategory === cat ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory(cat)}
            className="text-xs"
          >
            {cat}
          </Button>
        ))}
      </div>

      {/* Accordion List */}
      <div className="max-w-3xl mx-auto">
        <Accordion
          items={filteredFaqs.map((faq) => ({
            id: faq.id,
            title: faq.question,
            content: faq.answer,
          }))}
        />
      </div>
    </Section>
  );
};
