import { Component, signal } from '@angular/core';

interface FaqItem {
  question: string;
  answer: string;
  open: boolean;
}

interface TeamMember {
  name: string;
  role: string;
}

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly isDark = signal(false);

  protected readonly team: TeamMember[] = [
    { name: 'Colm Tuite', role: 'Director of Design Engineering' },
    { name: 'Marija Najdova', role: 'Director of Engineering' },
    { name: 'Albert Yu', role: 'Engineer' },
    { name: 'Flavien Delangle', role: 'Engineer' },
    { name: 'James Nelson', role: 'Engineer' },
    { name: 'Lukas Tyla', role: 'Engineer' },
    { name: 'Michał Dudak', role: 'Engineer' },
    { name: 'Vlad Moroz', role: 'Contributor' },
  ];

  protected readonly faqItems = signal<FaqItem[]>([
    {
      question: 'What is Base UI?',
      answer:
        'Base UI is a library of unstyled UI components for building accessible component libraries, user interfaces, web applications, and websites with React.',
      open: false,
    },
    {
      question: 'Does Base UI work with any styling library?',
      answer:
        'Yes. Base UI works with Tailwind, CSS Modules, CSS-in-JS, plain CSS, and any other styling library you prefer.',
      open: false,
    },
    {
      question: 'Which accessibility standards does Base UI follow?',
      answer:
        'Base UI follows the ARIA Authoring Practices Guide patterns and the WCAG 2.2 standard for accessibility.',
      open: false,
    },
    {
      question: 'How does Base UI differ from Radix UI?',
      answer:
        'Base UI emphasizes robust maintenance with a dedicated 7-person team committed to long-term support and development.',
      open: false,
    },
    {
      question: 'Can I use Base UI without React?',
      answer:
        'Base UI is a React library. It is not designed to be used without React. However, Base NG is an unofficial Angular port.',
      open: false,
    },
    {
      question: 'Is Base UI free for commercial use?',
      answer: 'Yes. Base UI is licensed under the MIT license, and is free for commercial use.',
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
      items.map((item, i) => (i === index ? { ...item, open: !item.open } : item)),
    );
  }
}
