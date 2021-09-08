import { Bar } from 'react-chartjs-2'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import './RatingDevs.css'


const RatingDevsChart = () => {

    const devs = useSelector(state => state.devs.devs)
    const devsRating = []
    const getDevsRating = () => {
        devs.map(dev => {
            devsRating.push(dev.rating)
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
                        label: "Ratings",
                        data: devsRating,
                        backgroundColor: ['rgba(5, 89, 104)']
                    }
                ],
               
                
            })
        })
    }

















    


    console.log(Array.isArray(devsRating));
    return <Bar data={chartData} />







    












}

export default RatingDevsChart;