```HTML
<cav-table [value]="tabularData" [headerRelativePath]="relativePath"
        (clickButtonEvent)="handleTabularDataClick($event)" scrollable="true"
        scrollHeight="calc(100vh - 220px)" [rowGrouping]="groupBy" expandedRowGrouping="true"></cav-table>
```
