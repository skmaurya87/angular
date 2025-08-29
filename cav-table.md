## How to implements cav-table

```HTML
<cav-table [value]="microsoftTeamsTableDataArr" [headerRelativePath]="relativePath" 
(clickButtonEvent)="clickButtonEvent($event)" scrollable="true"
scrollHeight="calc(100vh - 320px)"></cav-table>
````

## cav table type
STRING = 0,
NUMBER = 1,
TIME_STAMP = 2, 
DECIMAL = 3,
ID = 4,
ACTION = 5,
// MASTER_CHECKBOX = 6,
RADIO_BUTTON = 6,
INPUT_SWITCH = 7,
ICON_CLS = 8,
ICON_IMAGE = 9,
COLOR_PICKER = 10,
PROGRESS_BAR = 11,
STATUS = 12,
JSON = 13,
CHECKBOX = 14


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
        "masterCheckbox": true,
        "rowSelection": false,
        "allboxChecked": true,
        "tableName": ""
      },
      "tableAction": [
      ],
      "rowAction": {
        "rightAction": [
          {
            "iconType": "icon",
            "iconClass": "icons8 icons8-edit-2",
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
            "label": "Type",
            "key": "type",
            "dataKey": true,
            "type": 8,
            "width": "80px",
            "classes": "text-center",
            "definition": [
                {
                    "value": "1",
                    "iconCls": "icons8 icons8-futures",
                    "tooltip": "graph"
                  },
                  {
                    "value": "2",
                    "iconCls": "icons8 icons8-memories",
                    "tooltip": "time"
                  },
                  {
                    "value": "3",
                    "iconCls": "icons8 icons8-final-state",
                    "tooltip": "tick"
                  }
            ]
          },
          {
            "label": "Name",
            "key": "name",
            "type": 0
          },
          {
            "label": "Time",
            "key": "time",
            "type": 2
          },
          {
            "label": "Target",
            "key": "target",
            "type": 1,
            "format": "dec_2",
            "suffix": "%"
          },
          {
            "label": "Status",
            "key": "status",
            "type": 1,
            "format": "dec_2",
            "suffix": "%"
          },
          {
            "label": "Error Budget Left",
            "key": "errorBudgetLeft",
            "type": 1,
             "format": "dec_2",
             "suffix": "%",
            "click": true
          },
          {
            "label": "Service Transaction",
            "key": "serviceTransaction",
            "type": 0
          },
          {
            "label": "User Journey",
            "key": "userJourney",
            "type": 0
          },
          {
            "label": "Action",
            "key": "action",
            "type": 5,
            "width": "100px"
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

