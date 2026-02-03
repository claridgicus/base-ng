import { Component, signal } from '@angular/core';

interface FaqItem {
  question: string;
  answer: string;
  open: boolean;
}

interface TeamMember {
  name: string;
  role: string;
  initials: string;
}

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly isDark = signal(false);

  protected readonly companies = [
    'Paper',
    'GitHub',
    'Zed',
    'Unsplash',
    'Vercel',
    'Linear',
  ];

  protected readonly team: TeamMember[] = [
    { name: 'Colm Tuite', role: 'Director of Design Engineering', initials: 'CT' },
    { name: 'Marija Najdova', role: 'Director of Engineering', initials: 'MN' },
    { name: 'Albert Yu', role: 'Engineer', initials: 'AY' },
    { name: 'Flavien Delangle', role: 'Engineer', initials: 'FD' },
    { name: 'James Nelson', role: 'Engineer', initials: 'JN' },
    { name: 'Lukas Tyla', role: 'Engineer', initials: 'LT' },
    { name: 'Michal Dudak', role: 'Engineer', initials: 'MD' },
    { name: 'Vlad Moroz', role: 'Contributor', initials: 'VM' },
  ];

  protected readonly faqItems = signal<FaqItem[]>([
    {
      question: 'What is Base UI?',
      answer:
        'Base UI is a library of unstyled UI components for building accessible user interfaces. It provides the behavior and accessibility features without imposing any visual design, giving you complete control over styling.',
      open: false,
    },
    {
      question: 'Does Base UI work with any styling library?',
      answer:
        'Yes! Base UI is completely unstyled, which means you can use any CSS solution you prefer: plain CSS, CSS modules, Tailwind CSS, styled-components, Emotion, or any other styling approach.',
      open: false,
    },
    {
      question: 'Which accessibility standards does Base UI follow?',
      answer:
        'Base UI components follow WAI-ARIA guidelines and implement proper keyboard navigation, focus management, and screen reader support. We test with various assistive technologies to ensure broad compatibility.',
      open: false,
    },
    {
      question: 'How does Base UI differ from Radix UI?',
      answer:
        'Base UI and Radix UI share similar goals of providing unstyled, accessible components. Base UI comes from the MUI team and is designed to integrate well with the MUI ecosystem while remaining completely independent and usable on its own.',
      open: false,
    },
    {
      question: 'Can I use Base UI without React?',
      answer:
        'The original Base UI is React-only, but Base NG is an Angular port that brings the same unstyled, accessible component patterns to Angular applications.',
      open: false,
    },
    {
      question: 'Is Base UI free for commercial use?',
      answer:
        'Yes, Base UI is released under the MIT license, which allows free use in both personal and commercial projects without any restrictions.',
      open: false,
    },
    {
      question: 'Do you offer enterprise SLAs?',
      answer:
        'For enterprise support options, please contact the MUI team directly. They offer various support plans for organizations requiring guaranteed response times and dedicated assistance.',
      open: false,
    },
  ]);

  toggleTheme(): void {
    this.isDark.update((v) => !v);
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', this.isDark());
    }
  }

  toggleFaq(index: number): void {
    this.faqItems.update((items) =>
      items.map((item, i) =>
        i === index ? { ...item, open: !item.open } : item
      )
    );
  }
}
