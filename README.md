# JSON-HANA-SQL


##Input

{
    "table":[
        {
            name:"IBI.CLVStandard_CUS",
            column:[
                {name:"CustomerCategory",groupOperator:"",alias:"Customer Category"},
                {name:"CustomerID",groupOperator:"COUNT",alias:"Customer ID"},
                {name:"TotalSales",groupOperator:"SUM",alias:"Total Sales"},
                {name:"SalesFrequency",groupOperator:"AVG",alias:"Average Sales Frequency"}
            ]
        }
    ],
    "filters":[
        {table:"<>",columnName:"ProjectID",operator:"in",value:"('3C6802B0B2AB4AE31700BA3AF0A68918','0')"}
    ],
    "sorters":[
        {columnAlias:"Total Sales",desc:false}
    ],
    "top":3
}


Output :


 select
        "CustomerCategory" as "Customer Category" , COUNT("CustomerID") as "Customer ID" , SUM("TotalSales") as "Total Sales" , AVG("SalesFrequency") as "Average Sales Frequency"
         from "<>"
         where "<>"."ProjectID"  in  ('3C6802B0B2AB4AE31700BA3AF0A68918','0') 
         group by "CustomerCategory"
        order by "Total Sales"
        limit 3