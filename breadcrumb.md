## How to add Breadcumb 

### Import two services

```typescript
import { CavNavBarService } from 'src/app/shared/cav-nav-bar/cav-nav-bar.service';
import { BreadcrumbService } from 'src/app/core/breadcrumb/breadcrumb.service';
```

```TypeScript
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

```Typescript
export class AccessControlManagementComponent implements OnInit {
  menuItems: MenuItem[];
  constructor(
    private cavNavBarService: CavNavBarService,
    private breadcrumb: BreadcrumbService,
  ) {
    this.cavNavBarService.showBreadCrumb = true
    this.breadcrumb.addNewBreadcrumb({ label: 'User Management', routerLink: '/access-control-management/users' });
    this.breadcrumb.addNewBreadcrumb({ label: 'User' });
    this.breadcrumb.handleBreadcrumbClick = this.updateBreadcrumb.bind(this);
   }
  

  ngOnInit(): void {
    this.menuItems = [
      {label: 'Users', routerLink: './users'},
      {label: 'Groups', routerLink: './groups'},
      {label: 'Roles', routerLink: './roles'},
    ];
  }

  updateBreadcrumb(mode: string) {
    this.breadcrumb.removeFrom(1);
    if (mode === 'Users') {
      this.breadcrumb.addNewBreadcrumb({ label: 'User' });
    } else if (mode === 'Groups') {
      this.breadcrumb.addNewBreadcrumb({ label: 'Groups' });
    } else if (mode === 'Roles') {
      this.breadcrumb.addNewBreadcrumb({ label: 'Roles' });
    } else {
      this.breadcrumb.addNewBreadcrumb({ label: 'User' });
    }
  }

  ngOnDestroy() {
    this.cavNavBarService.showBreadCrumb = false
  }


}

```
