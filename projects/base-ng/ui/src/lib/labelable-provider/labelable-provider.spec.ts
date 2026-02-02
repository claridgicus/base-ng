/**
 * @fileoverview Tests for labelable provider
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/labelable-provider/
 */
import { TestBed } from '@angular/core/testing';
import { describe, expect, it, beforeEach } from 'vitest';
import {
  generateId,
  LABELABLE_CONFIG,
  LabelableService,
  provideLabelable,
} from './labelable-provider.service';

describe('generateId', () => {
  it('should generate unique IDs', () => {
    const id1 = generateId();
    const id2 = generateId();
    expect(id1).not.toBe(id2);
  });

  it('should use default prefix', () => {
    const id = generateId();
    expect(id).toMatch(/^base-ui-\d+$/);
  });

  it('should use custom prefix', () => {
    const id = generateId('custom');
    expect(id).toMatch(/^custom-\d+$/);
  });
});

describe('LabelableService', () => {
  describe('with default configuration', () => {
    let service: LabelableService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [LabelableService],
      });
      service = TestBed.inject(LabelableService);
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should have auto-generated controlId', () => {
      expect(service.controlId()).toMatch(/^control-\d+$/);
    });

    it('should have auto-generated labelId', () => {
      expect(service.labelId()).toMatch(/^label-\d+$/);
    });

    it('should have empty messageIds by default', () => {
      expect(service.messageIds()).toEqual([]);
    });

    it('should have undefined ariaDescribedBy when no messages', () => {
      expect(service.ariaDescribedBy()).toBeUndefined();
    });

    it('should have ariaLabelledBy from labelId', () => {
      expect(service.ariaLabelledBy()).toBe(service.labelId());
    });
  });

  describe('setters', () => {
    let service: LabelableService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [LabelableService],
      });
      service = TestBed.inject(LabelableService);
    });

    it('should set controlId', () => {
      service.setControlId('my-control');
      expect(service.controlId()).toBe('my-control');
    });

    it('should set labelId', () => {
      service.setLabelId('my-label');
      expect(service.labelId()).toBe('my-label');
    });

    it('should set controlId to null', () => {
      service.setControlId(null);
      expect(service.controlId()).toBeNull();
    });
  });

  describe('message IDs', () => {
    let service: LabelableService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [LabelableService],
      });
      service = TestBed.inject(LabelableService);
    });

    it('should add message ID', () => {
      service.addMessageId('msg-1');
      expect(service.messageIds()).toContain('msg-1');
    });

    it('should not add duplicate message ID', () => {
      service.addMessageId('msg-1');
      service.addMessageId('msg-1');
      expect(service.messageIds().filter((id) => id === 'msg-1')).toHaveLength(1);
    });

    it('should remove message ID', () => {
      service.addMessageId('msg-1');
      service.addMessageId('msg-2');
      service.removeMessageId('msg-1');
      expect(service.messageIds()).not.toContain('msg-1');
      expect(service.messageIds()).toContain('msg-2');
    });

    it('should clear all message IDs', () => {
      service.addMessageId('msg-1');
      service.addMessageId('msg-2');
      service.clearMessageIds();
      expect(service.messageIds()).toEqual([]);
    });

    it('should update ariaDescribedBy when messages change', () => {
      expect(service.ariaDescribedBy()).toBeUndefined();

      service.addMessageId('msg-1');
      expect(service.ariaDescribedBy()).toBe('msg-1');

      service.addMessageId('msg-2');
      expect(service.ariaDescribedBy()).toBe('msg-1 msg-2');
    });
  });

  describe('props getters', () => {
    let service: LabelableService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [LabelableService],
      });
      service = TestBed.inject(LabelableService);
    });

    it('should return control props', () => {
      const props = service.getControlProps();
      expect(props['id']).toBe(service.controlId());
      expect(props['aria-labelledby']).toBe(service.labelId());
    });

    it('should return label props', () => {
      const props = service.getLabelProps();
      expect(props['id']).toBe(service.labelId());
      expect(props['for']).toBe(service.controlId());
    });

    it('should return description props and register message', () => {
      const props = service.getDescriptionProps('my-desc');
      expect(props['id']).toBe('my-desc');
      expect(service.messageIds()).toContain('my-desc');
    });

    it('should auto-generate description ID if not provided', () => {
      const props = service.getDescriptionProps();
      expect(props['id']).toMatch(/^message-\d+$/);
    });
  });

  describe('implicit labeling', () => {
    let service: LabelableService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [LabelableService],
      });
      service = TestBed.inject(LabelableService);
    });

    it('should detect implicit label', () => {
      const label = document.createElement('label');
      const input = document.createElement('input');
      label.appendChild(input);
      document.body.appendChild(label);

      expect(service.isImplicitlyLabeled(input)).toBe(true);

      document.body.removeChild(label);
    });

    it('should detect non-implicit element', () => {
      const input = document.createElement('input');
      document.body.appendChild(input);

      expect(service.isImplicitlyLabeled(input)).toBe(false);

      document.body.removeChild(input);
    });
  });

  describe('resolveControlId', () => {
    let service: LabelableService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [LabelableService],
      });
      service = TestBed.inject(LabelableService);
    });

    it('should use explicit ID when provided', () => {
      const id = service.resolveControlId({ id: 'explicit-id' });
      expect(id).toBe('explicit-id');
      expect(service.controlId()).toBe('explicit-id');
    });

    it('should use existing controlId when no explicit ID', () => {
      service.setControlId('existing-id');
      const id = service.resolveControlId();
      expect(id).toBe('existing-id');
    });
  });
});

describe('provideLabelable', () => {
  it('should return providers array with service', () => {
    const providers = provideLabelable();
    expect(providers).toContain(LabelableService);
  });

  it('should include config when provided', () => {
    const providers = provideLabelable({ controlId: 'custom-control' });
    expect(providers.length).toBeGreaterThan(1);
  });
});

describe('LabelableService with custom config', () => {
  let service: LabelableService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: LABELABLE_CONFIG,
          useValue: {
            controlId: 'custom-control',
            labelId: 'custom-label',
            messageIds: ['msg-1', 'msg-2'],
          },
        },
        LabelableService,
      ],
    });
    service = TestBed.inject(LabelableService);
  });

  it('should use custom controlId', () => {
    expect(service.controlId()).toBe('custom-control');
  });

  it('should use custom labelId', () => {
    expect(service.labelId()).toBe('custom-label');
  });

  it('should use custom messageIds', () => {
    expect(service.messageIds()).toEqual(['msg-1', 'msg-2']);
  });

  it('should compute ariaDescribedBy from custom messageIds', () => {
    expect(service.ariaDescribedBy()).toBe('msg-1 msg-2');
  });
});
