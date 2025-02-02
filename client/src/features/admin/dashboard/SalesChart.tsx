import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { Theme, useTheme } from '@mui/material/styles';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const todaysDate = new Date();
const options2: Intl.DateTimeFormatOptions = { month: 'short' };
const monthName = todaysDate.toLocaleString('en-US', options2);

const options = (theme: Theme) => {
  return {
  responsive: true,
  scales: {
    x: {
      type: 'category',
      labels: Array.from({ length: 30 }, (_, index) => `${index + 1} ${monthName}`),
      title: {
        display: true,
        text: 'Days of the Month',
      },
      ticks: {
        color: theme.palette.neutral.main
      }
    },
    y: {
      beginAtZero: true,
        ticks: {
            stepSize: 1,
            color: theme.palette.neutral.main
        },
    },
  },
  plugins: {
    legend: {
      display: false,
      position: 'top' as const,
    },
    title: {
      display: false,
      text: 'Number of products sold',
    },
  },
} as const; }
const generateRandomData = () => {
  return Array.from({ length: 30 }, () => Math.floor(Math.random() * 200) - 100)
}

const labels = Array.from({ length: 30 }, (_, index) => (index % 3 === 0 ? `${index + 1} ${monthName}` : ''));

const data = (theme: Theme) => {
  return{
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: generateRandomData(),
      borderColor: theme.palette.primary.main, // Use the primary color for the line
      backgroundColor: theme.palette.secondary.main,
    },
  ],
}}

type DataPoints = {dateString: string, quantity: number}

interface Props {
  myData: DataPoints[] | undefined
}

export const SalesChart = ({myData}: Props) => {
  const theme = useTheme()
  const theData = Array.from({ length: 30 }).fill(0) as number[]
  const currentDate = new Date()
  myData?.forEach((d) => {
    const date = new Date(d.dateString);
    const dayOfMonth = date.getDate();

    date.getMonth() === currentDate.getMonth() ? theData[dayOfMonth - 1] += d.quantity : theData[dayOfMonth - 1] = theData[dayOfMonth - 1]
  });
  const themedData = data(theme)
  themedData.datasets[0].data = theData as number[]
  return <Line style={{height: 300}} options={options(theme)} data={themedData} />
}
