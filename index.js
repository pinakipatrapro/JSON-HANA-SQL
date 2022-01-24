
function buildColumnDefinition(jsonql){
    let aColumnDefinitions = [];

    jsonql.table.forEach(e=>{
        e.column.forEach(f=>{
            aColumnDefinitions.push(
                (f.groupOperator.length>0 ? `${f.groupOperator}("${f.name}")`:`"${f.name}"`)+
                ` as "${f.alias}"`
            )
        })
    });

    let columnString= aColumnDefinitions.join(' , ');
    return columnString;
}

function buildFromTable(jsonql){
    let columnString= ` from "${jsonql.table[0].name}"`;
    return columnString;
}

function buildGroupBy(jsonql){
    let aGroupBy= [];
    jsonql.table.forEach(e=>{
        e.column.forEach(f=>{
            if(!f.groupOperator.length){
                aGroupBy.push(`"${f.name}"`)
            }
        })
    });
    return ` group by ${aGroupBy.join(',')}`;
}

function buildSorters(jsonql){
    let aSorters= [];
    jsonql.sorters.forEach(e=>{
        aSorters.push(
            e.desc? `"${e.columnAlias}" desc` : `"${e.columnAlias}"` 
        )
    });
    return `order by ${aSorters.join(',')}`;
}



function JSON2HANASQL(jsonql){
    let columnString = buildColumnDefinition(jsonql);
    let fromString = buildFromTable(jsonql);
    let groupByString = buildGroupBy(jsonql);
    let sorterString = buildSorters(jsonql);
    return `
    select
        ${columnString}
        ${fromString}

        ${groupByString}
        ${sorterString}
        limit ${jsonql.top}
    `;
}

module.exports=JSON2HANASQL

