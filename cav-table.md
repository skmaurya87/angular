## How to implements cav-table

```HTML
<cav-table [value]="microsoftTeamsTableDataArr" [headerRelativePath]="relativePath" 
(clickButtonEvent)="clickButtonEvent($event)" scrollable="true"
scrollHeight="calc(100vh - 320px)"></cav-table>
````

```TypeScript
  relativePath: string = 'user-management/users.json';
  microsoftTeamsTableDataArr: any[] = [];

  constructor() { 
    this.microsoftTeamsTableDataArr = [
      {name: 'Joy', email: 'santosh.maurya@cavisson.com', group: 'Admin', modifiedOn: '12/12/2023'},
      {name: 'Pal', email: 'pal@cavisson.com', group: 'Read Only', modifiedOn: '12/12/2022'},
      {name: 'Ayush', email: 'ayush@cavisson.com', group: 'Standard', modifiedOn: '12/12/2021'},
      {name: 'Amit', email: 'amit@cavisson.com', group: 'Write Only', modifiedOn: '12/12/2021'},
    ];
  }


  clickButtonEvent(event: any) {
    if (event?.cavEventExt?.actionConfig?.action === "add") {
      alert('add user');
     }
    if (event?.cavEventExt?.actionConfig?.action === "clickable" && event?.cavEventExt?.columnClicked?.key === "transaction") {
      alert('add transaction'); 
     } // if table any rows column data clicked
  }

```

```json
{
  "tableConfig": {
    "config": {
      "globalFilter": true,
      "toggleFilter": true,
      "masterCheckbox": false,
      "rowSelection": false,
      "allboxChecked": false,
      "tableName": "Available Users"
    },
    "tableAction": [
      {
        "iconType": "icon",
        "iconClass": "icons8 icons8-add",
        "toolTip": "Add",
        "action": "add",
        "needRowData": true,
        "disable":false
      }
    ],
    "rowAction": {
      "rightAction": [
        {
          "iconType": "icon",
          "iconClass": "icons8 icons8-edit-2",
          "toolTip": "Edit",
          "action": "edit",
          "needRowData": true
        },
        {
          "iconType": "icon",
          "iconClass": "icons8 icons8-trash",
          "toolTip": "Edit",
          "action": "edit",
          "needRowData": true
        }
      ]
    }
  },
  "headers": [
    {
      "cols": [
        {
          "label": "Avatar",
          "key": "avatar",
          "dataKey": true,
          "type": 9,
          "width": "100px"
        },
        {
          "label": "Name",
          "key": "name",
          "type": 0
        },
        {
          "label": "Email",
          "key": "email",
          "type": 0
        },
        {
          "label": "Group",
          "key": "group",
          "type": 0
        },
        {
          "label": "ModifiedOn",
          "key": "modifiedOn",
          "type": 0
        },
        {
          "label": "Action",
          "key": "action",
          "type": 5,
          "width": "10%"
        }
      ]
    }
  ]
}


```
## If any column comes icon
```json 
{
          "label": "Action Type",
          "key": "actions",
          "type": 8,
          "definition": [
            {
              "value": "1",
              "iconCls": "icon icons8 icons8-send-email",
              "tooltip": "Email"
            },
            {
              "value": "2",
              "iconCls": "icon icons8 icons8-sms-2",
              "tooltip": "SMS"
            },
            {
              "value": "4",
              "iconCls": "cav1 icon snmp-trap",
              "tooltip": "SNMP Traps"
            },


```

##Mat menu 

```HTML

<button  [matMenuTriggerFor]="menu.childMenu" icon="icons8 las-exchange-alt-solid"></button>
<app-widget-submenu #menu [items]="transactionMenuOptions" (onMenuClick)="onMenuClick($event)" ></app-widget-submenu>

<div class="p-grid p-align-center" *ngIf="selectedFunctionMenus.includes('Average')">Average</div>

```

```TypeScript
   onMenuClick(event: any){
     const clickedOption = event.label;
     if (!this.selectedFunctionMenus.includes(clickedOption)) {
           this.selectedFunctionMenus.push(clickedOption);
         }
   }
```

