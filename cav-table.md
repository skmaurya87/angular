## How to implements cav-table

```Angular
<cav-table [value]="microsoftTeamsTableDataArr" [headerRelativePath]="relativePath" 
(clickButtonEvent)="clickButtonEvent($event)" scrollable="true"
scrollHeight="calc(100vh - 320px)"></cav-table>
````

```Angular
 relativePath: string = '';

  constructor() { 
    this.relativePath = "alert/extensions_configuration.json";
    this.microsoftTeamsTableDataArr = []
  }

```

```json
{
  "tableConfig": {
    "config": {
      "globalFilter": true,
      "toggleFilter": true,
      "masterCheckbox": true,
      "rowSelection": true,
      "allboxChecked": true,
      "tableName": "Teams Detail"
    },
    "tableAction": [
      {
        "iconType": "icon",
        "iconClass": "icons8 icons8-add",
        "toolTip": "Add",
        "action": "add",
        "needRowData": true,
        "disable":false
      },
      {
        "iconType": "icon",
        "iconClass": "las-edit",
        "toolTip": "Edit",
        "action": "edit",
        "needRowData": true,
        "disable":false
      },
      {
        "iconType": "icon",
        "iconClass": "icons8 icons8-trash",
        "toolTip": "Delete",
        "action": "deleteRow",
        "needRowData": true,
        "disable":false
        
      }
    ]
  },
  "headers": [
    {
      "cols": [
        {
          "label": "Name",
          "key": "pageName",
          "dataKey": true,
          "type": 0,
          "width": "20%"
        },
        {
          "label": "Webhook URL",
          "key": "webhookUrl",
          "type": 1,
          "width": "70%"
        },
        {
          "label": "Action",
          "key": "action",
          "type": 1,
          "width": "10%"
        }
      ]
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
      }
    ]
  }
}


```