import { DataPoint } from "../interface"



export function CSVToColumns(csvData: DataPoint[], fields: string[]){
    
    
    const columns: string[][] = []
    const setNames = fields.filter(field => field !== "session")

    //split the csv data into columns for each set of data
    //loop over every data point
    for (let i = 0; i < csvData.length; i++) {
        //loop over every set in the datapoint
        const point = csvData[i]
        for (let j = 0; j < setNames.length; j++) {
            const dataValue = point[setNames[j]]
            if (!columns[j]) {
                columns[j] = []
            }
            columns[j].push(dataValue)
        }
    }

    return columns
}