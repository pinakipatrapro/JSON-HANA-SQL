# JSON-HANA-SQL


##### JSON-HANA-SQL library converts JSON parameters into HANA SQL for easily building custom analytics query from the UI


## Functionality

| Feature  | Available |
| ------------- |:-------------:|
| Grouping      | Yes   |
| Join     | Yes    |
| Filter     | Yes     |
| Sorter     | Yes     |
| Top     | Yes     |
| Skip     | Yes    |
| Union     | No    |


## Samples

```
const JSON2HANASQL = require('json-hana-sql');
let jsonql = {
    "table":[
        {
            name:"IBI.CLVStandard_CUS",
            column:[
                {name:"CustomerCategory",groupOperator:"",alias:"Customer Category"},
                {name:"CustomerID",groupOperator:"COUNT",alias:"Customer ID"},
                {name:"TotalSales",groupOperator:"SUM",alias:"Total Sales"},
                {name:"SalesFrequency",groupOperator:"AVG",alias:"Average Sales Frequency"}
            ]
        },
        {
            name:"IBI.Project",
            column:[
                {name:"Name",groupOperator:"",alias:"Project Name"}
            ]
        }
    ],
    "filters":[
        {table:"IBI.CLVStandard_CUS",columnName:"ProjectID",operator:"in",value:"('3C6802B0B2AB4AE31700BA3AF0A68918','0')"}
    ],
    "sorters":[
        {columnAlias:"Total Sales",desc:false}
    ],
    "join":[
        {fromTable:"IBI.CLVStandard_CUS",fromColumn:"ProjectID",toTable:"IBI.Project",toColumn:"ID",joinType:"inner join"}
    ],
    "top":3,
    "skip":0
}

console.log(JSON2HANASQL(jsonql));
```
### Output
```
select
        "IBI.CLVStandard_CUS"."CustomerCategory" as "Customer Category" , COUNT("IBI.CLVStandard_CUS"."CustomerID") as "Customer ID" , SUM("IBI.CLVStandard_CUS"."TotalSales") as "Total Sales" , AVG("IBI.CLVStandard_CUS"."SalesFrequency") as "Average Sales Frequency" , "IBI.Project"."Name" as "Project Name"
         from "IBI.CLVStandard_CUS"   inner join  "IBI.Project" on 
            "IBI.CLVStandard_CUS"."ProjectID" = "IBI.Project"."ID"
        
         where "IBI.CLVStandard_CUS"."ProjectID"  in  ('3C6802B0B2AB4AE31700BA3AF0A68918','0') 
         group by "IBI.CLVStandard_CUS"."CustomerCategory","IBI.Project"."Name"
        order by "Total Sales"
        limit 3 offset 0
    ;
```





## Samples

```
jsonql = {
    "table":[
        {
            name:"IBI.CLVStandard_CUS",
            column:[
                {name:"CustomerCategory",groupOperator:"",alias:"Customer Category"},
                {name:"CustomerID",groupOperator:"COUNT",alias:"Customer ID"},
                {name:"TotalSales",groupOperator:"Max",alias:"Total Sales"},
                {name:"SalesFrequency",groupOperator:"AVG",alias:"Average Sales Frequency"}
            ]
        }
    ]
}

console.log(JSON2HANASQL(jsonql));
```
### Output
```
    select
        "IBI.CLVStandard_CUS"."CustomerCategory" as "Customer Category" , COUNT("IBI.CLVStandard_CUS"."CustomerID") as "Customer ID" , Max("IBI.CLVStandard_CUS"."TotalSales") as "Total Sales" , AVG("IBI.CLVStandard_CUS"."SalesFrequency") as "Average Sales Frequency"
         from "IBI.CLVStandard_CUS"
        
         group by "IBI.CLVStandard_CUS"."CustomerCategory"
        
        limit 99999 offset 0
    ;
```
