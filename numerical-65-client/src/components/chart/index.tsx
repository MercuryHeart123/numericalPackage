import React, { useEffect, useState } from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LogarithmicScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ChartOptions,
    ScaleChartOptions
} from 'chart.js';

import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LogarithmicScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);
interface custom extends ChartOptions {
    scales: {
        x: {
            display: boolean
        },
        y: {
            display: boolean,
            type: 'logarithmic'
        }
    }
}
export const options: custom = {
    responsive: true,
    interaction: {
        intersect: false,
        mode: 'index',
    },

    plugins: {

        legend: {
            position: 'bottom' as const,
        },
        title: {
            display: true,
            text: 'Data table preview as chart (log scale)',
        },
    },
    scales: {
        x: {
            display: true,
        },
        y: {
            display: true,
            type: 'logarithmic',
        }
    },
};
interface chartProps {
    data: Object[]
}
const Chart = (props: chartProps) => {
    const [legend, setLegend] = useState<number[]>([])
    const [dataLegend, setDataLegend] = useState<Object[]>([])
    useEffect(() => {
        if (props.data.length > 0) {
            let raw = Object.keys(props.data[0]).filter((data) => { if (data != 'iteration') return data })
            let iter: number[] = []
            for (let i = 0; i < props.data.length; i++) {
                iter.push(i)
            }

            let tmpArr = raw.map((data: string) => {
                let tmp: Object = {}
                tmp = {
                    [`${data}`]: props.data.map((eachRow: Object) => {
                        let key = data as keyof typeof eachRow
                        return eachRow[key]
                    })
                }
                return tmp
            })
            setDataLegend(tmpArr)
            setLegend(iter)
        }

    }, [])

    const genDataset = (): dataset[] => {
        let tmpArr: dataset[] = []
        console.log(dataLegend);

        dataLegend.map((data: {}) => {
            let key = Object.keys(data)[0] as keyof typeof data
            let color = `${randomIntFromInterval(0, 255)}, ${randomIntFromInterval(0, 255)}, ${randomIntFromInterval(0, 255)}`
            let tmpData = {
                label: key,
                data: data[key],
                borderColor: `rgb(${color})`,
                backgroundColor: `rgba(${color}, 0.5)`
            } as dataset
            tmpArr.push(tmpData)
        })
        return tmpArr
    }
    interface dataset {
        label: string,
        data: [],
        borderColor: string,
        backgroundColor: string
    }
    function randomIntFromInterval(min: number, max: number) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    return (
        <div>
            {
                legend && <Line
                    style={{ width: '50vw', height: '50vh' }}
                    data={{
                        labels: legend,
                        datasets: genDataset()
                    }}
                    options={options}
                />
            }

        </div>
    )
}

export default Chart