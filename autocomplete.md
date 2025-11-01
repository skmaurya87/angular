# Cav Auto Complete Component

A reusable, feature-rich autocomplete component built with Angular and Angular CDK. **No child component modifications required** - just import the module and use the selector with your data.

## Features

✅ **Searchable list** - Filters as you type  
✅ **Keyboard navigation** - ↑/↓ arrows + Enter to select, Escape to close  
✅ **Mouse hover descriptions** - Shows descriptions in a side panel  
✅ **Nested data support** - Flattens metric group structure automatically  
✅ **Dynamic positioning** - Opens above/below based on available space  
✅ **Click outside to close** - Uses CDK overlay backdrop  
✅ **Flexible data structure** - Works with any data via `displayField` and `descriptionField`  
✅ **Zero configuration** - Works out of the box with minimal setup  

---

## Quick Start (3 Steps)

### Step 1: Import the Module

Add `CavAutoCompleteModule` to your feature module:

```typescript
// filepath: your-feature.module.ts
import { CavAutoCompleteModule } from 'src/app/shared/cav-auto-complete/cav-auto-complete.module';

@NgModule({
  imports: [
    // ...other imports
    CavAutoCompleteModule  // ← Add this line
  ]
})
export class YourFeatureModule { }
```

### Step 2: Import Types (TypeScript)

```typescript
// filepath: your-component.ts
import { AutoCompleteOption, MetricGroupOption } from 'src/app/shared/cav-auto-complete/cav-auto-complete.component';
```

### Step 3: Use the Selector (HTML)

```html
<!-- filepath: your-component.html -->
<app-cav-auto-complete
  [options]="yourDataArray"
  [placeholder]="'Search...'"
  (optionSelected)="onOptionSelected($event)">
</app-cav-auto-complete>
```

**That's it!** No child component modifications needed.

---

## Component Selector

### Selector Name
```
app-cav-auto-complete
```

### Inputs (Properties)

| Input | Type | Default | Required | Description |
|-------|------|---------|----------|-------------|
| `[options]` | `AutoCompleteOption[]` \| `MetricGroupOption[]` | `[]` | ✅ **Yes** | Array of data to display |
| `[isNested]` | `boolean` | `false` | No | Set to `true` for nested metric group data |
| `[placeholder]` | `string` | `'Search...'` | No | Placeholder text for input field |
| `[displayField]` | `string` | `'name'` | No | Field name to display in the list |
| `[descriptionField]` | `string` | `'description'` | No | Field name for description tooltip |
| `[minChars]` | `number` | `0` | No | Minimum characters before showing suggestions |

### Outputs (Events)

| Output | Type | Description |
|--------|------|-------------|
| `(optionSelected)` | `EventEmitter<AutoCompleteOption>` | Emitted when user selects an option |

---

## Data Types

### 1. Simple Flat Data (`AutoCompleteOption`)

**Type Definition:**
```typescript
export interface AutoCompleteOption {
  [key: string]: any;  // Flexible - accepts any fields
}
```

**Example Data:**
```typescript
// Minimal example
options: AutoCompleteOption[] = [
  { name: 'Apple', description: 'A sweet red fruit' },
  { name: 'Banana', description: 'A yellow tropical fruit' }
];

// With additional custom fields
options: AutoCompleteOption[] = [
  { 
    name: 'Apple', 
    description: 'A sweet red fruit',
    price: 1.50,
    inStock: true,
    category: 'Fruits'
  }
];
```

**Usage in Template:**
```html
<app-cav-auto-complete
  [options]="options"
  [displayField]="'name'"
  [descriptionField]="'description'"
  (optionSelected)="onOptionSelected($event)">
</app-cav-auto-complete>
```

---

### 2. Nested Metric Group Data (`MetricGroupOption`)

**Type Definition:**
```typescript
export interface MetricGroupOption {
  groupName: string;
  mgId: number;
  glbMgId: string;
  metricTypeName: string;
  vectorType: boolean;
  hierarchicalComponent: string;
  mAttr: any[];
  graph: {
    name: string;
    metricId: number;
    description: string;
    glbMetricId: number;
    aggrType: number;
    unitId: number;
    mAttr: any[];
  }[];
}
```

**Example Data:**
```typescript
metricGroupOptions: MetricGroupOption[] = [
  {
    "groupName": "HTTP Requests",
    "mgId": 3,
    "glbMgId": "01000000",
    "metricTypeName": "HTTP information.",
    "vectorType": true,
    "hierarchicalComponent": "TestMetrics",
    "mAttr": [],
    "graph": [
      {
        "name": "HTTP Response Time (msec)",
        "metricId": 3,
        "description": "Average response time taken by HTTP requests.",
        "glbMetricId": -1,
        "aggrType": 0,
        "unitId": 2,
        "mAttr": []
      },
      {
        "name": "HTTP Request Count",
        "metricId": 4,
        "description": "Total number of HTTP requests",
        "glbMetricId": -1,
        "aggrType": 0,
        "unitId": 0,
        "mAttr": []
      }
    ]
  }
];
```

**Usage in Template:**
```html
<app-cav-auto-complete
  [options]="metricGroupOptions"
  [isNested]="true"
  [displayField]="'name'"
  [descriptionField]="'description'"
  (optionSelected)="onMetricSelected($event)">
</app-cav-auto-complete>
```

**What Happens:**
- Component automatically flattens nested `graph` array
- Each metric becomes a searchable item
- Group information is preserved in selected object
- Group name displayed below metric name

---

## Complete Examples

### Example 1: Simple Fruit Selector

**Component TypeScript:**
```typescript
// filepath: fruit-selector.component.ts
import { Component } from '@angular/core';
import { AutoCompleteOption } from 'src/app/shared/cav-auto-complete/cav-auto-complete.component';

export class FruitSelectorComponent {
  fruits: AutoCompleteOption[] = [
    { name: 'Apple', description: 'A sweet red fruit', price: 1.50 },
    { name: 'Banana', description: 'A yellow tropical fruit', price: 0.80 },
    { name: 'Cherry', description: 'A small red stone fruit', price: 3.00 }
  ];

  selectedFruit: AutoCompleteOption | null = null;

  onFruitSelected(fruit: AutoCompleteOption): void {
    this.selectedFruit = fruit;
    console.log('Selected:', fruit.name, 'Price:', fruit.price);
  }
}
```

**Component Template:**
```html
<!-- filepath: fruit-selector.component.html -->
<div class="fruit-selector">
  <h3>Select a Fruit</h3>
  
  <app-cav-auto-complete
    [options]="fruits"
    [placeholder]="'Search fruits...'"
    [displayField]="'name'"
    [descriptionField]="'description'"
    [minChars]="1"
    (optionSelected)="onFruitSelected($event)">
  </app-cav-auto-complete>

  <div *ngIf="selectedFruit" class="selected-info">
    <p>You selected: {{ selectedFruit.name }}</p>
    <p>Price: ${{ selectedFruit.price }}</p>
  </div>
</div>
```

---

### Example 2: Metric Selector with Nested Data

**Component TypeScript:**
```typescript
// filepath: metric-selector.component.ts
import { Component } from '@angular/core';
import { MetricGroupOption, AutoCompleteOption } from 'src/app/shared/cav-auto-complete/cav-auto-complete.component';

export class MetricSelectorComponent {
  metricGroups: MetricGroupOption[] = [
    {
      "groupName": "HTTP Requests",
      "mgId": 3,
      "glbMgId": "01000000",
      "metricTypeName": "HTTP information.",
      "vectorType": true,
      "hierarchicalComponent": "TestMetrics",
      "mAttr": [],
      "graph": [
        {
          "name": "HTTP Response Time (msec)",
          "metricId": 3,
          "description": "Average response time",
          "glbMetricId": -1,
          "aggrType": 0,
          "unitId": 2,
          "mAttr": []
        }
      ]
    }
  ];

  onMetricSelected(metric: AutoCompleteOption): void {
    console.log('Metric Name:', metric.name);
    console.log('Metric ID:', metric.metricId);
    console.log('Group Name:', metric.groupName);
    console.log('Group ID:', metric.mgId);
    console.log('Description:', metric.description);
  }
}
```

**Component Template:**
```html
<!-- filepath: metric-selector.component.html -->
<app-cav-auto-complete
  [options]="metricGroups"
  [isNested]="true"
  [placeholder]="'Search metrics...'"
  [displayField]="'name'"
  [descriptionField]="'description'"
  [minChars]="2"
  (optionSelected)="onMetricSelected($event)">
</app-cav-auto-complete>
```

---

### Example 3: Custom Fields

**Component TypeScript:**
```typescript
// filepath: product-selector.component.ts
export class ProductSelectorComponent {
  products: AutoCompleteOption[] = [
    { 
      title: 'Laptop', 
      info: 'High-performance laptop', 
      sku: 'LAP-001',
      price: 999.99 
    },
    { 
      title: 'Mouse', 
      info: 'Wireless gaming mouse', 
      sku: 'MSE-042',
      price: 49.99 
    }
  ];

  onProductSelected(product: AutoCompleteOption): void {
    console.log('SKU:', product.sku);
    console.log('Price:', product.price);
  }
}
```

**Component Template:**
```html
<!-- filepath: product-selector.component.html -->
<app-cav-auto-complete
  [options]="products"
  [displayField]="'title'"
  [descriptionField]="'info'"
  [placeholder]="'Search products...'"
  (optionSelected)="onProductSelected($event)">
</app-cav-auto-complete>
```

---

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `↓` (Arrow Down) | Move to next option |
| `↑` (Arrow Up) | Move to previous option |
| `Enter` | Select highlighted option |
| `Escape` | Close dropdown |
| Type any character | Filter options |

---

## Styling (Optional)

The component uses these CSS classes that you can override in your global styles:

```scss
// Override autocomplete styles globally
.cav-auto-complete-wrapper { 
  width: 500px;  // Change dropdown width
}

.auto-complete-item.highlighted { 
  background-color: #007bff;  // Change highlight color
  color: white;
}

.option-description { 
  background-color: #fffacd;  // Change description background
}
```

---

## Advanced Usage

### Loading Data from API

```typescript
export class ApiExampleComponent implements OnInit {
  options: AutoCompleteOption[] = [];
  loading = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadOptions();
  }

  loadOptions(): void {
    this.loading = true;
    this.http.get<any[]>('/api/metrics').subscribe(
      (data) => {
        this.options = data;
        this.loading = false;
      }
    );
  }
}
```

### Conditional Display

```html
<app-cav-auto-complete
  *ngIf="showAutocomplete"
  [options]="options"
  [placeholder]="userRole === 'admin' ? 'Search all metrics...' : 'Search available metrics...'"
  (optionSelected)="onSelect($event)">
</app-cav-auto-complete>
```

---

## Troubleshooting

### Issue: Dropdown not appearing

**Solution:** Ensure `CavAutoCompleteModule` is imported in your feature module.

```typescript
import { CavAutoCompleteModule } from 'src/app/shared/cav-auto-complete/cav-auto-complete.module';

@NgModule({
  imports: [CavAutoCompleteModule]  // Add this
})
```

### Issue: "Cannot find name 'AutoCompleteOption'"

**Solution:** Import the type in your component:
```typescript
import { AutoCompleteOption } from 'src/app/shared/cav-auto-complete/cav-auto-complete.component';
```

### Issue: Dropdown hidden behind other elements

**Solution:** The component uses `z-index: 9999`. If still hidden, check parent container z-index values.

### Issue: Description not showing

**Solution:** Ensure your data has the field specified in `descriptionField` input:
```html
[descriptionField]="'description'"  <!-- Must match your data field -->
```

---

## Summary

**Selector:** `<app-cav-auto-complete>`

**Required Inputs:**
- `[options]` - Your data array

**Optional Inputs:**
- `[isNested]` - Set `true` for nested metric groups
- `[placeholder]` - Placeholder text
- `[displayField]` - Field to display (default: `'name'`)
- `[descriptionField]` - Field for description (default: `'description'`)
- `[minChars]` - Min characters to search (default: `0`)

**Output:**
- `(optionSelected)` - Emits selected item

**Data Types:**
- `AutoCompleteOption` - Flat data (any fields)
- `MetricGroupOption` - Nested metric groups

**No child component modifications required!** Just import, use selector, pass data. 🎉

---

## Support

For issues or questions, contact the development team.

**License:** Internal use only - Cavisson Systems Inc.
