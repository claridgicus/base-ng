# @copied/base-ng

Angular 21 port of [Base UI](https://base-ui.com/) - unstyled, accessible components for building design systems.

## Installation

```bash
npm install @copied/base-ng
```

## Features

- **Unstyled** - Bring your own styles, full design control
- **Accessible** - WAI-ARIA compliant, keyboard navigation support
- **Signal-based** - Built with Angular 21 signals for reactive state
- **Standalone** - No NgModules, tree-shakable components
- **SSR Compatible** - Works with Angular Universal

## Components

### Form Components

| Component | Description |
|-----------|-------------|
| `Button` | Accessible button with loading states |
| `Input` | Text input with validation support |
| `Checkbox` | Tri-state checkbox (checked, unchecked, indeterminate) |
| `Switch` | Toggle switch for on/off states |
| `Slider` | Range slider with single/multi-thumb support |
| `Radio` | Radio button groups |
| `NumberField` | Numeric input with increment/decrement |
| `Field` | Form field wrapper with validation |
| `Form` | Form submission handling |

### Selection Components

| Component | Description |
|-----------|-------------|
| `Tabs` | Tabbed interface with panels |
| `Accordion` | Collapsible content sections |
| `Select` | Dropdown selection |
| `Combobox` | Filterable dropdown |
| `Autocomplete` | Text input with suggestions |
| `Toggle` | Pressable toggle button |
| `ToggleGroup` | Group of toggles (single/multi-select) |

### Overlay Components

| Component | Description |
|-----------|-------------|
| `Dialog` | Modal dialog |
| `AlertDialog` | Confirmation dialog |
| `Popover` | Positioned popup content |
| `Tooltip` | Contextual information popup |
| `Menu` | Dropdown menu |
| `ContextMenu` | Right-click menu |

### Feedback Components

| Component | Description |
|-----------|-------------|
| `Toast` | Notification system |
| `Progress` | Progress indicator |
| `Meter` | Scalar measurement display |

### Layout Components

| Component | Description |
|-----------|-------------|
| `ScrollArea` | Custom scrollbars |
| `Separator` | Visual divider |
| `Toolbar` | Action bar container |

## Usage Examples

### Button

```html
<button baseUiButton [disabled]="loading()">
  Submit
</button>
```

### Checkbox

```html
<button baseUiCheckboxRoot [(checked)]="accepted">
  <span baseUiCheckboxIndicator>✓</span>
  Accept terms
</button>
```

### Switch

```html
<button baseUiSwitchRoot [(checked)]="enabled">
  <span baseUiSwitchThumb></span>
</button>
```

### Tabs

```html
<div baseUiTabsRoot [value]="activeTab()">
  <div baseUiTabsList>
    <button baseUiTab value="tab1">Tab 1</button>
    <button baseUiTab value="tab2">Tab 2</button>
  </div>
  <div baseUiTabsPanel value="tab1">Content 1</div>
  <div baseUiTabsPanel value="tab2">Content 2</div>
</div>
```

### Accordion

```html
<div baseUiAccordionRoot>
  <div baseUiAccordionItem value="item1">
    <h3 baseUiAccordionHeader>
      <button baseUiAccordionTrigger>Section 1</button>
    </h3>
    <div baseUiAccordionPanel>Content 1</div>
  </div>
</div>
```

### Dialog

```html
<div baseUiDialogRoot>
  <button baseUiDialogTrigger>Open</button>
  @if (dialog.open()) {
    <div baseUiDialogBackdrop></div>
    <div baseUiDialogPopup>
      <h2 baseUiDialogTitle>Title</h2>
      <p baseUiDialogDescription>Content</p>
      <button baseUiDialogClose>Close</button>
    </div>
  }
</div>
```

### Tooltip

```html
<div baseUiTooltipRoot>
  <button baseUiTooltipTrigger>Hover me</button>
  <div baseUiTooltipPositioner>
    <div baseUiTooltipPopup>Tooltip content</div>
  </div>
</div>
```

### Menu

```html
<div baseUiMenuRoot>
  <button baseUiMenuTrigger>Menu</button>
  <div baseUiMenuPositioner>
    <div baseUiMenuPopup>
      <button baseUiMenuItem>Edit</button>
      <button baseUiMenuItem>Delete</button>
    </div>
  </div>
</div>
```

### Toast

```typescript
// In component
constructor(private toastManager: ToastManagerService) {}

showToast() {
  this.toastManager.add({
    title: 'Success',
    description: 'Operation completed',
    type: 'success'
  });
}
```

```html
<div baseUiToastProvider #provider="toastProvider">
  <div baseUiToastViewport>
    @for (toast of provider.toasts(); track toast.id) {
      <div baseUiToastRoot [toast]="toast">
        <div baseUiToastTitle>{{ toast.title }}</div>
        <div baseUiToastDescription>{{ toast.description }}</div>
        <button baseUiToastClose>×</button>
      </div>
    }
  </div>
</div>
```

### Field with Validation

```html
<div baseUiFieldRoot [name]="'email'">
  <label baseUiFieldLabel>Email</label>
  <input baseUiInput baseUiFieldControl type="email" />
  <span baseUiFieldDescription>Enter your email address</span>
  <span baseUiFieldError match="valueMissing">Email is required</span>
  <span baseUiFieldError match="typeMismatch">Invalid email format</span>
</div>
```

### Slider

```html
<div baseUiSliderRoot [(value)]="volume" [min]="0" [max]="100">
  <div baseUiSliderTrack>
    <div baseUiSliderThumb></div>
  </div>
</div>
```

### Select

```html
<div baseUiSelectRoot [(value)]="selected">
  <button baseUiSelectTrigger>
    <span baseUiSelectValue>{{ selected || 'Select...' }}</span>
  </button>
  <div baseUiSelectPositioner>
    <div baseUiSelectPopup>
      <button baseUiSelectItem value="opt1">Option 1</button>
      <button baseUiSelectItem value="opt2">Option 2</button>
    </div>
  </div>
</div>
```

### Progress

```html
<div baseUiProgressRoot [value]="progress()" [max]="100">
  <div baseUiProgressTrack>
    <div baseUiProgressIndicator></div>
  </div>
</div>
```

## Styling

Components have CSS class names for styling:

- `.base-ui-{component}` - Root element
- `.base-ui-{component}-{state}` - State classes (checked, disabled, etc.)
- `[data-{state}]` - Data attributes for state

Example CSS:

```css
.base-ui-button {
  padding: 8px 16px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.base-ui-button:hover {
  background: #f5f5f5;
}

.base-ui-button[data-disabled] {
  opacity: 0.5;
}
```

## Providers

### DirectionProvider

```html
<div baseUiDirectionProvider [dir]="'rtl'">
  <!-- RTL content -->
</div>
```

### CSPProvider

```html
<div baseUiCspProvider [nonce]="cspNonce">
  <!-- Content with CSP support -->
</div>
```

## Testing

Tests use Vitest:

```bash
npm test
```

## API Reference

Each component exports:
- Main directive (e.g., `ButtonDirective`)
- Types (e.g., `ButtonState`)
- Context tokens (e.g., `BUTTON_CONTEXT`)

Import from the main entry:

```typescript
import {
  ButtonDirective,
  CheckboxRootDirective,
  DialogRootDirective,
  // ...
} from '@copied/base-ng';
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Source

Ported from [Base UI React](https://github.com/mui/base-ui) with adaptations for Angular patterns.

## License

MIT
