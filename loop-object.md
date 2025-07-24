```TypeScript
export interface ConfigureAnonymization {
  configTableName: string;
  columnName: string;
  category: string;
}

import {ConfigureAnonymization } from './db-connection.model';


  anonymizeSettings: ConfigureAnonymization[] = [
     { configTableName: '', columnName: '', category: '' }
  ];

    addAnonymize() {
      this.anonymizeSettings.push({
        configTableName: '',
        columnName: '',
        category: ''
      });
    }
    removeAnonymize(index: number) {
      this.anonymizeSettings.splice(index, 1);
    }
```



```HTML
<div class="p-grid" *ngFor="let input of anonymizeSettings; let i = index; let isLast = last">
                <div class="p-col-4 form-group">
                    <label class="p-col-4 control-label">Table Name</label>
                    <div class="p-col-8">
                        <input class="w-100-p" type="text" [(ngModel)]="input.configTableName" placeholder="Enter Table Name" pInputText />
                    </div>
                </div>
                <div class="p-col-3 form-group">
                    <label class="p-col-4 control-label">Column</label>
                    <div class="p-col-8">
                        <input class="w-100-p" type="text" [(ngModel)]="input.columnName" placeholder="Enter Column Name" pInputText />
                    </div>
                </div>
                <div class="p-col-4 form-group">
                    <label class="p-col-4 control-label">Category</label>
                    <div class="p-col-8">
                        <p-dropdown class="w-100-p" [options]="categoryList" [(ngModel)]="input.category" optionLabel="label"
                            placeholder="Select Category" appendTo="body">
                        </p-dropdown>
                    </div>
                </div>
                <div class="p-col-1 form-group">
                <div class="p-col-fixed mln-8">
                    <button type="button" pButton icon="icons8 icons8-trash" *ngIf="anonymizeSettings.length > 1"
                        class="btn-danger-outline mx-3" matTooltip="Delete Row" (click)="removeAnonymize(i)"></button>                
                    <button type="button" pButton icon="icons8 icons8-plus-math" class="btn-primary-outline mx-3"
                        (click)="addAnonymize()" *ngIf="isLast" matTooltip="Add Row"></button>
                </div>
                </div>
            </div>
```
