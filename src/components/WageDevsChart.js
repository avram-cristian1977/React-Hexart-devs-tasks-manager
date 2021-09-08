import { Bar } from 'react-chartjs-2'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import './RatingDevs.css'


const WageDevsChart = () => {

    const devs = useSelector(state => state.devs.devs)
    const devsWages = []
    const getDevsRating = () => {
        devs.map(dev => {
            devsWages.push(dev.wage)
        })
    }

    useEffect(() => {
        chart()
    }, [devs])

    getDevsRating()
    const [chartData, setChartData] = useState({})
    const labels = []
    const chart = () => {
        devs.map((dev, idx) => {
            labels.push(dev.name)
            setChartData({
                labels,
                datasets: [
                    {
                        label: "Wages",
                        data: devsWages,
                        backgroundColor: [
                            'rgba(5, 89, 104)'
                        ],
                      
                        
                       
                    }
                ],
                
            })
        })
    }


    console.log(Array.isArray(devsWages));
    return <Bar data={chartData} />
}

export default WageDevsChart;