
function buildColumnDefinition(jsonql){
    let aColumnDefinitions = [];

    jsonql.table.forEach(e=>{
        e.column.forEach(f=>{
            let columnName = `"${e.name}"."${f.name}"`
            aColumnDefinitions.push(
                (f.groupOperator.length>0 ? `${f.groupOperator}(${columnName})`:`${columnName}`)+
                ` as "${f.alias}"`
            )
        })
    });

    let columnString= aColumnDefinitions.join(' , ');
    return columnString;
}

function buildFromTable(jsonql){
    let columnString= ` from "${jsonql.table[0].name}"`;
    if(!jsonql.join){
        return columnString;
    }
    let joinClauses = [];
    jsonql.join.forEach(e=>{
        joinClauses.push(` ${e.joinType}  "${e.toTable}" on 
            "${e.fromTable}"."${e.fromColumn}" = "${e.toTable}"."${e.toColumn}"
        ` )
    })
    return `${columnString}  ${joinClauses.join (' ')}`;
}

function buildGroupBy(jsonql){
    let aGroupBy= [];
    jsonql.table.forEach(e=>{
        e.column.forEach(f=>{
            let columnName = `"${e.name}"."${f.name}"`
            if(!f.groupOperator.length){
                aGroupBy.push(`${columnName}`)
            }
        })
    });
    return ` group by ${aGroupBy.join(',')}`;
}

function buildSorters(jsonql){
    if(!jsonql.sorters){
        return ''
    }
    let aSorters= [];
    jsonql.sorters.forEach(e=>{
        aSorters.push(
            e.desc? `"${e.columnAlias}" desc` : `"${e.columnAlias}"` 
        )
    });
    return `order by ${aSorters.join(',')}`;
}

function buildFilters(jsonql){
    if(!jsonql.filters){
        return ''
    }
    let aFilters= [];
    jsonql.filters.forEach(e=>{
        aFilters.push(
            `"${e.table}"."${e.columnName}"  ${e.operator}  ${e.value}` 
        )
    });
    return ` where ${aFilters.join(' and ')} `;
}

function JSON2HANASQL(jsonql){

    jsonql.top = jsonql.top || 99999;
    jsonql.skip = jsonql.skip || 0;

    let columnString = buildColumnDefinition(jsonql);
    let fromString = buildFromTable(jsonql);
    let groupByString = buildGroupBy(jsonql);
    let sorterString = buildSorters(jsonql);
    let filterString = buildFilters(jsonql);
    
    return `
    select
        ${columnString}
        ${fromString}
        ${filterString}
        ${groupByString}
        ${sorterString}
        limit ${jsonql.top} offset ${jsonql.skip}
    ;`;
}

module.exports=JSON2HANASQL

