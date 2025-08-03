"use client"

import * as echarts from 'echarts';
import React, { useEffect } from 'react';
import { FaUserGraduate } from "react-icons/fa";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FaGraduationCap } from "react-icons/fa";
import { FaGlobeAfrica } from "react-icons/fa";

const KeyFigures = () => {
  useEffect(() => {
    // Initialize success rate chart
    const chartDom = document.getElementById('success-rate-chart');
    if (chartDom) {
      const myChart = echarts.init(chartDom);
      const option = {
        animation: false,
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['2020', '2021', '2022', '2023', '2024'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            max: 100
          }
        ],
        series: [
          {
            name: 'Taux de réussite',
            type: 'bar',
            barWidth: '60%',
            data: [98, 88, 92, 94, 96],
            itemStyle: {
              color: '#1B2A4A'
            }
          }
        ]
      };
      myChart.setOption(option);
      window.addEventListener('resize', () => {
        myChart.resize();
      });
    }

    // Initialize student distribution chart
    const distributionChartDom = document.getElementById('student-distribution-chart');
    if (distributionChartDom) {
      const distributionChart = echarts.init(distributionChartDom);
      const distributionOption = {
        animation: false,
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: 'Répartition des étudiants',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 16,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 45, name: 'Licence', itemStyle: { color: '#1B2A4A' } },
              { value: 30, name: 'Master', itemStyle: { color: '#D4AF37' } },
              { value: 15, name: 'Doctorat', itemStyle: { color: '#4A6FA5' } },
              { value: 10, name: 'Formation continue', itemStyle: { color: '#8C9DB5' } }
            ]
          }
        ]
      };
      distributionChart.setOption(distributionOption);
      window.addEventListener('resize', () => {
        distributionChart.resize();
      });
    }
  }, []);

  const figures = [
    { icon: <FaUserGraduate className='text-[#34773D] text-4xl' />, value: '1,500+', label: 'Étudiants inscrits' },
    { icon: <FaChalkboardTeacher className='text-[#34773D] text-4xl' />, value: '40+', label: 'Professeurs et chercheurs' },
    { icon: <FaGraduationCap className='text-[#34773D] text-4xl' />, value: '98%', label: 'Taux de réussite' },
    { icon: <FaGlobeAfrica className='text-[#34773D] text-4xl' />, value: '12', label: 'Partenariats internationaux' }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1B2A4A] mb-4">{"L'UIJP2 en chiffres"}</h2>
          <div className="w-20 h-1 bg-[#34773D] mx-auto"></div>
          <p className="mt-6 text-gray-600 max-w-2xl mx-auto">{"Découvrez notre institut à travers quelques chiffres qui témoignent de notre engagement envers l'excellence académique et le développement personnel de nos étudiants."}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {figures.map((figure, index) => (
            <div key={index} className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#1B2A4A]/10 flex items-center justify-center">
                {figure.icon}
              </div>
              <h3 className="text-4xl font-bold text-[#1B2A4A] mb-2">{figure.value}</h3>
              <p className="text-gray-600">{figure.label}</p>
            </div>
          ))}
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-serif font-bold text-[#1B2A4A] mb-4">Taux de réussite par année</h3>
            <div id="success-rate-chart" className="w-full h-[300px]"></div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-serif font-bold text-[#1B2A4A] mb-4">Répartition des étudiants</h3>
            <div id="student-distribution-chart" className="w-full h-[300px]"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KeyFigures;