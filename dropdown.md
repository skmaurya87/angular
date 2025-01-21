##Typescript Code

```TypeScript
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';



@Component({
  selector: 'app-cav-query-filter',
  templateUrl: './cav-query-filter.component.html',
  styleUrls: ['./cav-query-filter.component.scss']
})
export class CavQueryFilterComponent implements OnInit {
  columnData: any[] = [];
  searchText = '';
  originalItems:any[] = []
  @Input() 
  set optionItems(data: any[]) {
    this.columnData = [...data];
    this.originalItems = [...data];
  }
  dropdownOpen = false;
  selectedItems: { label: string; value: string }[] = [];
  activeIndex = -1;
  @ViewChild('dropdown') dropdown: ElementRef | undefined;
  @ViewChild('chipInput') chipInput!: ElementRef;

  @Input() queryFilterObject: { 
    height?: string; 
    placeholder?: string; 
    footerVisible?: boolean; 
    itemCountVisible?: boolean; 
  };
  dropdownStyles: any = {};


  constructor() { }

  ngOnInit(): void {
    // this.columnData = DummyOptions.columnData;
  }

  focusInput() {
    this.chipInput.nativeElement.focus();
  }

  onSearch() {
    this.dropdownOpen = true; // Ensure dropdown is open when searching

    this.columnData = this.originalItems.filter(
      (item) => item.label.toLowerCase().includes(this.searchText.toLowerCase())
    );
    this.activeIndex = -1; // Reset active index
  }

  openDropdown() {
    this.dropdownOpen = true;

    setTimeout(() => this.adjustDropdownPosition(), 0);
  }

  closeDropdown() {
    setTimeout(() => {
      this.dropdownOpen = false;
    }, 200); // Delay to allow mouse selection
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'ArrowDown') {
      this.activeIndex = (this.activeIndex + 1) % this.columnData.length;
      this.scrollToActiveItem();
    } else if (event.key === 'ArrowUp') {
      this.activeIndex =
        (this.activeIndex - 1 + this.columnData.length) %
        this.columnData.length;
      this.scrollToActiveItem();
    } else if (event.key === 'Enter' && this.activeIndex >= 0) {
      this.selectItem(this.columnData[this.activeIndex]);
    } else if (event.key === 'Escape') {
      this.dropdownOpen = false;
    }
  }

  scrollToActiveItem() {
    const dropdown = document.querySelector('.scroll-list') as HTMLElement;
    if (dropdown) {
      const activeItem = dropdown.children[this.activeIndex] as HTMLElement;
      if (activeItem) {
        const dropdownRect = dropdown.getBoundingClientRect();
        const activeItemRect = activeItem.getBoundingClientRect();
        if (activeItemRect.top < dropdownRect.top) {
          dropdown.scrollTop -= dropdownRect.top - activeItemRect.top;
        }
        if (activeItemRect.bottom > dropdownRect.bottom) {
          dropdown.scrollTop += activeItemRect.bottom - dropdownRect.bottom;
        }
      }
    }
  }
  
  

  selectItem(item: { label: string; value: string }) {
    this.selectedItems.push(item);
    this.searchText = ''; // Clear the search input
    this.onSearch(); // Update filtered items
    console.log('Selected item:', item);
  }

  removeSelectedItem(item: { label: string; value: string }) {
    this.selectedItems = this.selectedItems.filter(
      (selected) => selected.value !== item.value
    );
    this.onSearch(); // Update filtered items
  }

  adjustDropdownPosition() {
    if (!this.dropdown) return;
  
    const dropdownRect = this.dropdown.nativeElement.getBoundingClientRect();
    const inputRect = this.dropdown.nativeElement.parentElement.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const dropdownHeight = dropdownRect.height;
  
    // Check available space below and above the input field
    const spaceBelow = viewportHeight - inputRect.bottom;
    const spaceAbove = inputRect.top;
  
    // Open dropdown above or below based on space availability
    if (spaceBelow < dropdownHeight && spaceAbove > dropdownHeight) {
      this.dropdownStyles = { top: 'auto', bottom: '100%' };
    } else {
      this.dropdownStyles = { top: '100%', bottom: 'auto' };
    }
  }
}
```
##HTML Code

```HTML
<div class="query-filer-dropdown">
    <div class="cav-chip min-width-220 border-all border-3 mrn-1 rounded-tr-4 rounded-br-4" (click)="focusInput()">
      <ng-container *ngFor="let selectedItem of selectedItems">
        <span class="chipSet border-1">
          {{ selectedItem.label }}
          <i class="icons8 icons8-delete close border-3 bg-danger-500 d-bg-danger-1200" (click)="removeSelectedItem(selectedItem)"></i>
        </span>
      </ng-container>
      <input
        #chipInput
        class="chip-input"
        type="text"
        pInputText
        [(ngModel)]="searchText"
        (input)="onSearch()"
        [placeholder]="queryFilterObject?.placeholder"
        (keydown)="handleKeyDown($event)"
        (focus)="openDropdown()"
        (blur)="closeDropdown()"/>
    </div>


    <div class="dropdown-list border-all border-3 mat-elevation-z2"
    [ngStyle]="dropdownStyles"
    *ngIf="dropdownOpen"
    #dropdown>
    <ul class="scroll-list" [style.maxHeight]="queryFilterObject?.height">
      <li class="p-grid p-align-center p-justify-between"
        *ngFor="let item of columnData; let i = index" 
        [class.active]="i === activeIndex"
        (mousedown)="selectItem(item)">
        <span>{{ item.label }}</span>
        <span class="opc50" *ngIf="queryFilterObject?.itemCountVisible">app/database/user</span>
      </li>
    </ul>
    <div class="p-grid p-align-center bg-neutral-100" *ngIf="queryFilterObject?.footerVisible">
      <div class="p-col-fixed">Wildcard: <i>service:<span class="text-warning-1200">*</span></i></div>
      <div class="p-col-fixed">Union: <i>service:<span class="text-warning-1200">(</span> <span class="text-warning-1200"> OR</span> service_b<span class="text-warning-1200">)</span>*</i></div>
      <!-- <div class="p-col">Use: <span class="chipSet border-1">
        <i class="icons8 icons8-up"></i></span>
        <span class="chipSet border-1"><i class="icons8 icons8-down"></i></span> to navigate</div>
      <div class="p-col"><span class="chipSet border-1">enter</span> to update query</div>
      <div class="p-col"><span class="chipSet border-1">Esc</span> to update close</div> -->
    </div>
    </div>
</div>
```
##CSS

```css
.query-filer-dropdown {
    position: relative;
    .dropdown-list {
      position: absolute;
      left: 0;
      right: 0;
      z-index: 1000;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      .scroll-list{
        max-height: 125px;
        overflow-y: auto;
        list-style: none;
        padding: 0;
        margin: 0;
      }
    }
     li {
      padding: 6px;
      cursor: pointer;
      transition: all 200ms ease-in;
    }
  }  
  
```
