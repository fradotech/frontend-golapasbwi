import React from 'react'
import { useTheme } from '@mui/system'
import ReactEcharts from 'echarts-for-react'

const JobChart = ({ height, color = [], data }) => {
  const theme = useTheme()

  const option = {
    legend: {
      show: true,
      itemGap: 20,
      icon: 'circle',
      bottom: 0,
      textStyle: {
        color: theme.palette.text.secondary,
        fontSize: 13,
        fontFamily: 'roboto',
      },
    },
    tooltip: {
      show: false,
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)',
    },
    xAxis: [
      {
        axisLine: {
          show: false,
        },
        splitLine: {
          show: false,
        },
      },
    ],
    yAxis: [
      {
        axisLine: {
          show: false,
        },
        splitLine: {
          show: false,
        },
      },
    ],

    series: [
      {
        name: 'Traffic Rate',
        type: 'pie',
        radius: ['45%', '72.55%'],
        center: ['50%', '35%'],
        avoidLabelOverlap: false,
        hoverOffset: 5,
        stillShowZeroSum: false,
        label: {
          normal: {
            show: false,
            position: 'center', // shows the description data to center, turn off to show in right side
            textStyle: {
              color: theme.palette.text.secondary,
              fontSize: 13,
              fontFamily: 'roboto',
            },
            formatter: '{a}',
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: '14',
              fontWeight: 'normal',
              // color: "rgba(15, 21, 77, 1)"
            },
            formatter: '{b} \n{c} ({d}%)',
          },
        },
        labelLine: {
          normal: {
            show: false,
          },
        },
        data: [
          {
            value: data.job[0],
            name: 'Pelajar/Mahasiswa',
          },
          {
            value: data.job[1],
            name: 'Pegawai Negeri',
          },
          { 
            value: data.job[2], 
            name: 'Pegawai Swasta' 
          },
          { 
            value: data.job[3], 
            name: 'TNI/Polri' 
          },
          { 
            value: data.job[4], 
            name: 'Wiraswasta' 
          },
          { 
            value: data.job[5], 
            name: 'Lainnya' 
          },
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  }

  return (
    <ReactEcharts
      style={{ height: height }}
      option={{
        ...option,
        color: [...color],
      }}
    />
  )
}

export default JobChart
