


export function MaxHeightOfGraph(columns: string[][]) {
    //get the max height for all graphs
    let maxHeight = 0
    for (const column of columns) {
        for (const dataPoint of column) {
            const height = parseInt(dataPoint.split("-")[1])
            if (height > maxHeight) {
                maxHeight = height
            }
        }
    }

    return maxHeight
}