## How to add Breadcumb 

### Import two services

```typescript
import { CavNavBarService } from 'src/app/shared/cav-nav-bar/cav-nav-bar.service';
import { BreadcrumbService } from 'src/app/core/breadcrumb/breadcrumb.service';
```

```typscript
  constructor(
    private cavNavBarService: CavNavBarService,
    private breadcrumb: BreadcrumbService
    
  ) {
    this.cavNavBarService.showBreadCrumb = true
    this.breadcrumb.addNewBreadcrumb({label: 'Add Service: Using User Input', routerLink: '/home/net-ocean/addServices'});
   }
  

  ngOnDestroy() {
    this.cavNavBarService.showBreadCrumb = false
  }

cancleService() {
    this.breadcrumb.back();
  }



```

## Add help file in helpConfig.json

```JSON
   "/home/net-ocean/addServices":{
    "helpFileName": "openHelpUsingUserInput",
       "helpTitle": "Add Service Using User Input",
       "helpFolder": "netOcean"
   }
```
