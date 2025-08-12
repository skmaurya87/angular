## Parent Component

```HTML
<app-cav-email [(emailData)]="emailData" (validationStatus)="isChildValid = $event" [hints]="hints">
</app-cav-email>
<div class="form-group p-col-12 p-nogutter">
    <div class="p-col ml-100">
        <button pButton type="button" label="Send" class="ui-btn-primary" (click)="saveEmail()"></button>
        <button pButton type="button" label="Cancel" class="btn-secondary-outline mx-6"
            (click)="cancelEmail()"></button>
    </div>
</div>
```
```TypeScript

emailData = { toList: [], subject: '', body: '' };
hints = [
  { label: 'ReportName =$Reportname', value: '$Reportname' },
  { label: 'StartDate =$Sddate', value: '$Sddate' },
  { label: 'EndDate =$Eddate', value: '$Eddate' },
  { label: 'GenerationDateTime =$GenDatetime', value: '$GenDatetime' }
];

isChildValid = false; // tracked from child
saveEmail() {
  if (!this.isChildValid) {
    this.loadTestCommonService.errorMessage('Please enter at least one valid email address.');
    return;
  }
  this.loadTestCommonService.successMessage('Email sent successfully!');
  console.log('Email Data:', this.emailData);
  this.cancelEmail();
}

cancelEmail() {
  this.emailData = { toList: [], subject: '', body: '' };
  this.loadTestCommonService.successMessage('Email draft cleared.');
}
```

```TpyeScript
import { CavEmailModule } from 'src/app/shared/cav-email/cav-email.module';

CavEmailModule

```

