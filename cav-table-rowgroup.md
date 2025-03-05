```HTML
<cav-table [value]="tabularData" [headerRelativePath]="relativePath"
 (clickButtonEvent)="handleTabularDataClick($event)" scrollable="true"
 scrollHeight="calc(100vh - 220px)" [rowGrouping]="groupBy" expandedRowGrouping="true"></cav-table>
```


```Typescript
 relativePath: string = 'reports/tabular-view.json';
  tabularData: any[] = [];


 ngOnInit(): void {
    this.tabularData = [
      { metricName: 'CPU Utilization (%) - SystemCheck', tr1: '45.23', tr2: '47.89', change: '2.66', changePer: '5.88', comment: 'Add Comment', rowGroup: "Total VUsers", parent: true },
      { metricName: 'Memory Usage (MB) - SystemCheck', tr1: '2048', tr2: '2176', change: '128', changePer: '6.25', comment: 'Add Comment' ,rowGroup: "Total VUsers"},
      { metricName: 'Disk Read Speed (MB/s) - SystemCheck', tr1: '150.75', tr2: '149.60', change: '-1.15', changePer: '-0.76', comment: 'Add Comment', rowGroup: "Total VUsers" },
      { metricName: 'Network Latency (ms) - SystemCheck', tr1: '12.5', tr2: '13.2', change: '0.7', changePer: '5.6', comment: 'Add Comment', rowGroup: "Total VUsers" },
      { metricName: 'CPU Utilization (%) - SystemCheck', tr1: '45.23', tr2: '47.89', change: '2.66', changePer: '5.88', comment: 'Add Comment',rowGroup: "HTTP Request completed/Sec" },
      { metricName: 'Memory Usage (MB) - SystemCheck', tr1: '2048', tr2: '2176', change: '128', changePer: '6.25', comment: 'Add Comment',rowGroup: "HTTP Request completed/Sec" },
      { metricName: 'Disk Read Speed (MB/s) - SystemCheck', tr1: '150.75', tr2: '149.60', change: '-1.15', changePer: '-0.76', comment: 'Add Comment',rowGroup: "HTTP Request completed/Sec" },
      { metricName: 'Network Latency (ms) - SystemCheck', tr1: '12.5', tr2: '13.2', change: '0.7', changePer: '5.6', comment: 'Add Comment',rowGroup: "HTTP Request completed/Sec" },
      { metricName: 'CPU Utilization (%) - SystemCheck', tr1: '45.23', tr2: '47.89', change: '2.66', changePer: '5.88', comment: 'Add Comment',rowGroup: "Send TCP Throughput (Kbps)" },
      { metricName: 'Memory Usage (MB) - SystemCheck', tr1: '2048', tr2: '2176', change: '128', changePer: '6.25', comment: 'Add Comment',rowGroup: "Send TCP Throughput (Kbps)" },
      { metricName: 'HTTP Failures - PerfTest > All', tr1: '45.23', tr2: '47.89', change: '2.66', changePer: '5.88', comment: 'Add Comment',rowGroup: "Errors" },
      { metricName: 'Page Failures - PerfTest> All', tr1: '2048', tr2: '2176', change: '128', changePer: '6.25', comment: 'Add Comment',rowGroup: "Errors" },
      { metricName: 'Session Failures - PerfTest> All', tr1: '2048', tr2: '2176', change: '128', changePer: '6.25', comment: 'Add Comment',rowGroup: "Errors" },
      { metricName: 'Transaction Failures - PertTest>All', tr1: '2048', tr2: '2176', change: '128', changePer: '6.25', comment: 'Add Comment',rowGroup: "Errors" },
    ]
  }
```

##Click on row first column

```Typescript
  handleTabularDataClick(event: any) {
    console.log(event);
    if (
      event?.cavEventExt?.actionConfig?.action === "clickable" &&
      event?.cavEventExt?.columnClicked?.key === "metricName"
    ) {
      this.metricsGraph = true;
      if (event.target) {
        this.metricName = event.target.innerText.trim();
      }
    }
    if (event?.cavEventExt?.actionConfig?.action === "clickable" && event?.cavEventExt?.columnClicked?.key === "comment") {
      this.addComment = true
     }
  }
```

##Row group json
```json
{
    "tableConfig": {
      "config": {
        "globalFilter": true,
        "toggleFilter": true,
        "masterCheckbox": true,
        "rowSelection": false,
        "allboxChecked": true,
        "download": true,
        "toggleColumn": true,
        "tableName": ""
      },
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
            "label": "Group",
            "key": "rowGrouping",
            "type": 0,
            "width": "200px"
          },
          {
            "label": "Metric Name",
            "key": "metricName",
            "type": 0,
            "width": "30%",
            "click": true
          },
          {
            "label": "TR1444",
            "key": "tr1",
            "type": 3
          },
          {
            "label": "TR1445",
            "key": "tr2",
            "type": 3
          },
          {
            "label": "Change",
            "key": "change",
            "type": 3
          },
          {
            "label": "Change(%)",
            "key": "changePer",
            "type": 3
          },
          {
            "label": "Comment",
            "key": "comment",
            "type": 0,
            "click": true
          }
        ]
      }
    ]
  }
  
  ```
