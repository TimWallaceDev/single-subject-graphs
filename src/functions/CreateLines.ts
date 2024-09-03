export function CreateLines(columns: any, maxHeight: number) {

    //add lines to the graphs
    //find the point where the condition changes. 
    const lines = []
    let lastXPos = 0
    //go over each graph
    for (let i = 0; i < columns.length; i++) {
        const column = columns[i]
        const lastDataPoint = column[0]
        const condition = lastDataPoint.split("-")[0]
        let lineXPos = 0
        //go over each datapoint in the graph and find where the condition changes
        for (let j = 0; j < column.length; j++) {
            const currentDataPoint = column[j]
            const currentCondition = currentDataPoint.split("-")[0]
            //check for new condition. This will be where a line is added. 
            if (condition !== currentCondition) {
                lineXPos = j
                break;
            }
        }
        let xRelative = lineXPos / columns[0].length; // Convert to paper-relative value
        // const yRelativeStart = 0;
        // const yRelativeEnd = 1; // Full height of the paper
        const yRelativeTop = 1 - (i * 0.34); // Adjust based on subplot height
        let yRelativeBottom = 1 - ((i + 1) * 0.34); // Adjust based on subplot height

        // //this fixes the vertical lines horizontal position
        switch (i) {
            case 0:
                xRelative += 0.01
                break;
            case 2:
                xRelative -= 0.01
                break;
        }

        //remove the overhang of the vertical line from the bottom graph
        if (i === columns.length -1){
            yRelativeBottom += 0.04
        }
        //create a new line object
        //the max height will be the height of the line
        //the lineXPos will be the x position of the line. 
        const xref = "x" + (i + 1).toString()
        const yref = "y" + (i + 1).toString()
        const newLine = {
            type: 'line',
            x0: xRelative,
            y0: yRelativeTop,
            x1: xRelative,
            y1: yRelativeBottom,
            line: {
                color: 'black',
                width: 1,
                dash: 'dot', // Line style
            },
            xref: 'paper',
            yref: 'paper'
        }
        const newHorizontalLine = {
            type: 'line',
            x0: lastXPos + 0.5,
            y0: maxHeight + 2,
            x1: lineXPos + 0.5,
            y1: maxHeight + 2, // Use the calculated max height
            line: {
                color: 'black',
                width: 2,
                dash: 'dot', // Line style
            },
            xref: xref,
            yref: yref
        }
        lines.push({ ...newLine });
        if (i > 0) {
            lines.push({ ...newHorizontalLine })
        }
        lastXPos = lineXPos
    }

    return lines
}