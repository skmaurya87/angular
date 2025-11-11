# Smart Chip Component - Usage Guide

## Overview
The Smart Chip Component is a fully-featured chip input that supports system (non-removable) chips and user-added chips with comprehensive keyboard support, accessibility features, and customization options.

---

## Features

✅ **Two Types of Chips**
- System chips: Pre-populated, non-removable, visually distinct
- User chips: Added by user, removable with "x" icon

✅ **Input Handling**
- Press Enter to add chip
- Click outside input to auto-add chip (if not empty)
- Backspace on empty input removes last user chip

✅ **Duplicate Prevention**
- Configurable `allowDuplicates` input
- Case-insensitive duplicate checking

✅ **Maximum Chips Limit**
- Configurable `maxChips` input
- Warning message when limit reached
- Visual chips counter

✅ **Styling**
- Separate colors for system vs user chips
- CSS variables for easy customization
- Smooth animations
- Responsive design

✅ **Accessibility**
- Full keyboard navigation (Tab, Enter, Backspace)
- ARIA attributes and roles
- Focus indicators
- Screen reader support

✅ **Clear All Button**
- Removes all user chips at once
- Only visible when user chips exist

---

## Basic Usage

### 1. Import in Module

```typescript
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    FormsModule, // Required for ngModel
    BrowserAnimationsModule, // Required for animations
    // ... other imports
  ]
})
export class YourModule { }
```

### 2. Use in Component Template

```html
<app-smart-chip
  [defaultChips]="systemChips"
  [maxChips]="10"
  [allowDuplicates]="false"
  [placeholder]="'Add a tag...'"
  (chipsChange)="onChipsChange($event)"
  (chipAdded)="onChipAdded($event)"
  (chipRemoved)="onChipRemoved($event)">
</app-smart-chip>
```

### 3. Component Class Example

```typescript
import { Component } from '@angular/core';
import { Chip } from './path-to-smart-chip/smart-chip.component';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html'
})
export class ParentComponent {
  
  // System chips (pre-populated, non-removable)
  systemChips: Chip[] = [
    { label: 'Required', type: 'system' },
    { label: 'Important', type: 'system' },
    { label: 'Default', type: 'system' }
  ];
  
  // Track all chips
  allChips: Chip[] = [];
  
  // Event handlers
  onChipsChange(chips: Chip[]): void {
    this.allChips = chips;
    console.log('All chips:', chips);
  }
  
  onChipAdded(chip: Chip): void {
    console.log('Chip added:', chip);
  }
  
  onChipRemoved(chip: Chip): void {
    console.log('Chip removed:', chip);
  }
}
```

---

## API Reference

### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `defaultChips` | `Chip[]` | `[]` | Pre-populated system chips (non-removable) |
| `maxChips` | `number` | `undefined` | Maximum number of chips allowed |
| `allowDuplicates` | `boolean` | `false` | Allow duplicate chip labels |
| `placeholder` | `string` | `'Add a chip...'` | Input field placeholder text |
| `systemChipColor` | `string` | `undefined` | Custom color for system chips (CSS color) |
| `userChipColor` | `string` | `undefined` | Custom color for user chips (CSS color) |

### Outputs

| Output | Type | Description |
|--------|------|-------------|
| `chipsChange` | `EventEmitter<Chip[]>` | Emits when chips array changes |
| `chipAdded` | `EventEmitter<Chip>` | Emits when a chip is added |
| `chipRemoved` | `EventEmitter<Chip>` | Emits when a chip is removed |

### Chip Interface

```typescript
interface Chip {
  label: string;        // Display text (required)
  value?: string;       // Optional value (defaults to label)
  type?: 'system' | 'user';  // Chip type
  color?: string;       // Custom color (CSS color value)
  id?: string;          // Unique identifier (auto-generated)
}
```

---

## Advanced Examples

### Example 1: Custom Colors via Inputs

```html
<app-smart-chip
  [defaultChips]="systemChips"
  [systemChipColor]="'#f59e0b'"
  [userChipColor]="'#10b981'">
</app-smart-chip>
```

### Example 2: Custom Colors via CSS Variables

```scss
app-smart-chip {
  // System chip colors
  --chip-system-bg: #fef3c7;
  --chip-system-color: #92400e;
  --chip-system-border: #fde68a;
  
  // User chip colors
  --chip-user-bg: #d1fae5;
  --chip-user-color: #065f46;
  --chip-user-border: #a7f3d0;
  
  // Container colors
  --chip-container-bg: #f9fafb;
  --chip-container-border: #e5e7eb;
  --chip-container-focus-border: #8b5cf6;
}
```

### Example 3: Programmatically Add Chips

```typescript
export class ParentComponent {
  @ViewChild(SmartChipComponent) chipComponent!: SmartChipComponent;
  
  addChipProgrammatically(): void {
    // Add chip through component method
    this.chipComponent.addChip('New Tag');
  }
  
  clearAllUserChips(): void {
    this.chipComponent.clearAllUserChips();
  }
}
```

### Example 4: With Maximum Limit

```html
<app-smart-chip
  [defaultChips]="systemChips"
  [maxChips]="5"
  (chipsChange)="onChipsChange($event)">
</app-smart-chip>

<div *ngIf="allChips.length >= 5" class="warning">
  You've reached the maximum number of chips!
</div>
```

### Example 5: Allow Duplicates

```html
<app-smart-chip
  [defaultChips]="systemChips"
  [allowDuplicates]="true"
  [placeholder]="'Add duplicate tags allowed...'">
</app-smart-chip>
```

### Example 6: Dynamic System Chips

```typescript
export class ParentComponent {
  systemChips: Chip[] = [];
  
  ngOnInit(): void {
    // Load system chips from API
    this.loadSystemChips();
  }
  
  loadSystemChips(): void {
    this.apiService.getDefaultTags().subscribe(tags => {
      this.systemChips = tags.map(tag => ({
        label: tag.name,
        value: tag.id,
        type: 'system'
      }));
    });
  }
}
```

### Example 7: Form Integration

```typescript
import { FormControl } from '@angular/forms';

export class FormComponent {
  tagsControl = new FormControl([]);
  
  systemChips: Chip[] = [
    { label: 'TypeScript', type: 'system' },
    { label: 'Angular', type: 'system' }
  ];
  
  onChipsChange(chips: Chip[]): void {
    // Extract only user chips
    const userChips = chips.filter(c => c.type === 'user');
    this.tagsControl.setValue(userChips.map(c => c.value || c.label));
  }
}
```

---

## Styling Customization

### Available CSS Variables

```scss
:host {
  // System chip colors
  --chip-system-bg: #e0e7ff;
  --chip-system-color: #3730a3;
  --chip-system-border: #c7d2fe;
  
  // User chip colors
  --chip-user-bg: #dbeafe;
  --chip-user-color: #1e40af;
  --chip-user-border: #bfdbfe;
  
  // Container
  --chip-container-bg: #ffffff;
  --chip-container-border: #d1d5db;
  --chip-container-focus-border: #3b82f6;
  
  // Interactive states
  --chip-hover-brightness: 0.95;
  --chip-remove-hover-bg: rgba(0, 0, 0, 0.1);
  
  // Spacing
  --chip-gap: 8px;
  --chip-padding: 6px 12px;
  --chip-border-radius: 16px;
  
  // Warning colors
  --warning-bg: #fef3c7;
  --warning-color: #92400e;
  --warning-border: #fde68a;
}
```

### Theme Examples

#### Dark Theme

```scss
app-smart-chip {
  --chip-system-bg: #1e293b;
  --chip-system-color: #e2e8f0;
  --chip-system-border: #334155;
  
  --chip-user-bg: #0f172a;
  --chip-user-color: #60a5fa;
  --chip-user-border: #1e40af;
  
  --chip-container-bg: #0f172a;
  --chip-container-border: #334155;
  --chip-container-focus-border: #60a5fa;
}
```

#### Success Theme

```scss
app-smart-chip {
  --chip-system-bg: #f0fdf4;
  --chip-system-color: #166534;
  --chip-system-border: #bbf7d0;
  
  --chip-user-bg: #dcfce7;
  --chip-user-color: #15803d;
  --chip-user-border: #86efac;
}
```

---

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Enter` | Add chip from input text |
| `Backspace` | Remove last user chip (when input is empty) |
| `Tab` | Navigate between chips and input |
| `Escape` | Clear input without adding chip |

---

## Accessibility Features

- ✅ ARIA labels and roles (`role="list"`, `role="listitem"`)
- ✅ Screen reader announcements
- ✅ Keyboard navigation support
- ✅ Focus indicators on all interactive elements
- ✅ High contrast mode support
- ✅ Reduced motion support

---

## Best Practices

1. **Always provide system chips** if you want non-removable defaults
2. **Set maxChips** to prevent unlimited chip addition
3. **Use meaningful labels** that describe the chip content
4. **Handle chipsChange event** to sync with your data model
5. **Customize colors** to match your app's theme
6. **Test keyboard navigation** for accessibility
7. **Provide clear placeholder text** to guide users

---

## Common Use Cases

### Tags Input
```html
<app-smart-chip
  [placeholder]="'Add tags...'"
  [allowDuplicates]="false"
  [maxChips]="10">
</app-smart-chip>
```

### Skills Selector
```html
<app-smart-chip
  [defaultChips]="requiredSkills"
  [placeholder]="'Add additional skills...'"
  [maxChips]="15">
</app-smart-chip>
```

### Email Recipients
```html
<app-smart-chip
  [placeholder]="'Enter email addresses...'"
  [allowDuplicates]="false">
</app-smart-chip>
```

### Categories Filter
```html
<app-smart-chip
  [defaultChips]="allCategories"
  [placeholder]="'Search categories...'"
  (chipsChange)="filterByCategories($event)">
</app-smart-chip>
```

---

## Troubleshooting

### Animations Not Working
- Ensure `BrowserAnimationsModule` is imported in your module

### ngModel Not Working
- Import `FormsModule` in your module

### Chips Not Updating
- Use the `chipsChange` event to track changes
- Check that you're passing a valid `Chip[]` array to `defaultChips`

### Styling Issues
- Check CSS variable overrides
- Ensure no conflicting global styles
- Use browser DevTools to inspect applied styles

---

## License
This component is part of the Unified Dashboard project.
