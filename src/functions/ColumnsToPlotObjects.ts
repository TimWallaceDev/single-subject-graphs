interface LineSegment {
    "x": string[],
    "y": string[],
    "type": "scatter",
    "mode": "lines+markers",
    "name": "Baseline",
    "marker": { "color": "black" },
    "xaxis": string,
    "yaxis": string
}


export function ColumnsToPlotObjects(columns){
    //turn columns into objects for the Plot  
    const data = []

    //go over each column
    for (let i = 0; i < columns.length; i++) {
        const column = columns[i]
        const lastDataPoint = column[0]
        let condition = lastDataPoint.split("-")[0]
        const tmpData: LineSegment = {
            "x": [],
            "y": [],
            "type": "scatter",
            "mode": "lines+markers",
            "name": "Baseline",
            "marker": { "color": "black" },
            "xaxis": "x1",
            "yaxis": "y1",
        }
        //go over each datapoint in the column
        for (let j = 0; j < column.length; j++) {
            //set the count of the x and y axis
            tmpData["xaxis"] = "x" + (i + 1).toString()
            tmpData["yaxis"] = "y" + (i + 1).toString()
            //get the condition for this 'half' of datapoints
            const currentDataPoint = column[j]
            const currentCondition = currentDataPoint.split("-")[0]
            const currentValue = currentDataPoint.split("-")[1]
            //check for new condition. if we find one, we will push the current object to data, and reset the tmpData
            if (condition !== currentCondition) {
                //push the first half of the column data
                data.push({ ...tmpData })
                //reset the tmpData
                tmpData["x"] = []
                tmpData["y"] = []
                //set the new condition
                condition = currentCondition
            }

            //add the data to tmpData
            tmpData["x"].push((j + 1).toString())
            tmpData["y"].push(currentValue)
        }
        //push the second half of the column data
        data.push({ ...tmpData })
    }

    return data
}