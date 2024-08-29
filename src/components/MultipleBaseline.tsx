import Plot from 'react-plotly.js';
import { DataPoint } from '../interface';

interface GraphProps {
    csvData: DataPoint[]
}

export const MultipleBaselineGraph = (props: GraphProps) => {
    const { csvData } = props
    console.log({csvData})
    // const colors: string[] = ["red", "blue"]
    // Separate data based on condition
    const separatedData = []
    const conditions = [csvData[0].condition]
    let tmpCondition: string = csvData[0].condition
    let tmpData: DataPoint[] = []
    let maxHeight: number = 0

    //go through every datapoint
    for (let i = 0; i < csvData.length; i++) {
        //if the datapoint condition does not match the previous condition, 
        const tmpDataPoint = csvData[i]
        tmpDataPoint.order = i + 1
        if (tmpDataPoint.value > maxHeight) {
            maxHeight = tmpDataPoint.value
        }
        if (tmpDataPoint.condition !== tmpCondition) {
            // add the tmp array to data array and start new. 
            separatedData.push(tmpData)
            tmpData = [tmpDataPoint]
            tmpCondition = tmpDataPoint.condition
            conditions.push(tmpDataPoint.condition)
        }
        else {
            tmpData.push(tmpDataPoint)
        }
    }

    separatedData.push(tmpData)

    console.log({ separatedData })

    //create an object for each of the items in the data array. 
    const objects = []
    const lines = []
    let totalItem = 1

    for (let i = 0; i < separatedData.length; i++) {
        const tmpArray = separatedData[i]
        const tmpTime = tmpArray.map(item => item.order)
        const tmpValue = tmpArray.map(item => item.value)
        
        objects.push(
            {
                x: tmpTime,
                y: tmpValue,
                type: 'scatter',
                mode: 'lines+markers',
                name: separatedData[i][0].condition,
                marker: { color: "black"},
            }
        )
        if (objects.length > 1) {

            lines.push(
                {
                    type: 'line',
                    x0: totalItem - 0.5,
                    y0: 0,
                    x1: totalItem - 0.5,
                    y1: Math.max(maxHeight),
                    line: {
                        color: 'black',
                        width: 1,
                        dash: "dot"
                    }
                },
            )
        }
        totalItem += tmpArray.length
    }

    console.log({ objects })

    return (
        <Plot
            data={objects}
            layout={{
                title: 'Single Subject Design Graph',
                yaxis: { title: 'Number Of Job Applications' },
                xaxis: { title: 'Session' },
                shapes: lines
            }}
        />
    );
};

