"use client";

import * as echarts from 'echarts';
import React, { useEffect } from 'react';
import { Users, GraduationCap, BookOpen, Globe } from "lucide-react";
import { motion } from "framer-motion";

const figures = [
  { icon: <Users className="w-7 h-7 text-white" />, value: '1 500+', label: 'Étudiants inscrits' },
  { icon: <BookOpen className="w-7 h-7 text-white" />, value: '40+', label: 'Professeurs & chercheurs' },
  { icon: <GraduationCap className="w-7 h-7 text-white" />, value: '98%', label: 'Taux de réussite' },
  { icon: <Globe className="w-7 h-7 text-white" />, value: '12', label: 'Partenariats internationaux' },
];

const KeyFigures = () => {
  useEffect(() => {
    const chartDom = document.getElementById('success-rate-chart');
    if (chartDom) {
      const myChart = echarts.init(chartDom);
      myChart.setOption({
        animation: true,
        tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
        grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
        xAxis: [{ type: 'category', data: ['2020', '2021', '2022', '2023', '2024'], axisTick: { alignWithLabel: true } }],
        yAxis: [{ type: 'value', max: 100 }],
        series: [{
          name: 'Taux de réussite',
          type: 'bar',
          barWidth: '55%',
          data: [98, 88, 92, 94, 96],
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#205C03' },
              { offset: 1, color: '#0B30BB' },
            ]),
            borderRadius: [4, 4, 0, 0],
          },
        }],
      });
      window.addEventListener('resize', () => myChart.resize());
    }

    const distDom = document.getElementById('student-distribution-chart');
    if (distDom) {
      const distChart = echarts.init(distDom);
      distChart.setOption({
        animation: true,
        tooltip: { trigger: 'item' },
        legend: { top: '5%', left: 'center' },
        series: [{
          name: 'Répartition',
          type: 'pie',
          radius: ['42%', '68%'],
          avoidLabelOverlap: false,
          itemStyle: { borderRadius: 8, borderColor: '#011636', borderWidth: 3 },
          label: { show: false, position: 'center' },
          emphasis: { label: { show: true, fontSize: 16, fontWeight: 'bold' } },
          labelLine: { show: false },
          data: [
            { value: 45, name: 'Licence', itemStyle: { color: '#205C03' } },
            { value: 30, name: 'Master', itemStyle: { color: '#0B30BB' } },
            { value: 15, name: 'Doctorat', itemStyle: { color: '#E3A402' } },
            { value: 10, name: 'Formation continue', itemStyle: { color: '#069CC5' } },
          ],
        }],
      });
      window.addEventListener('resize', () => distChart.resize());
    }
  }, []);

  return (
    <section className="py-24" style={{ background: "#011636" }}>
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* ── En-tête UIJP inversé (fond sombre) ── */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="font-black uppercase leading-tight mb-4"
            style={{
              fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              letterSpacing: "0.03em",
              color: "#ffffff",
            }}
          >
            L'UIJP2
            <span
              className="block text-[#E3A402]"
            >
              EN CHIFFRES
            </span>
          </h2>
          <div
            className="mx-auto h-1 w-16 rounded-full"
            style={{ background: "linear-gradient(90deg, #205C03, #E3A402)" }}
          />
          <p
            className="mt-5 text-white/60 max-w-2xl mx-auto text-base leading-relaxed"
            style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
          >
            Découvrez notre institut à travers quelques chiffres qui témoignent de notre engagement
            envers l'excellence académique.
          </p>
        </motion.div>

        {/* ── Stats ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {figures.map((figure, i) => (
            <motion.div
              key={i}
              className="text-center p-6 relative overflow-hidden"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              style={{
                background: "rgba(255,255,255,0.04)",
                borderLeft: "4px solid #205C03",
                borderBottom: "4px solid #0B30BB",
                borderRadius: "2px",
              }}
            >
              {/* Icône */}
              <div
                className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-sm"
                style={{ background: "linear-gradient(135deg, #205C03 0%, #0B30BB 100%)" }}
              >
                {figure.icon}
              </div>
              {/* Valeur */}
              <h3
                className="font-black text-white mb-1"
                style={{
                  fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
                  fontSize: "2.25rem",
                  lineHeight: 1,
                }}
              >
                {figure.value}
              </h3>
              <p
                className="text-white/50 text-sm uppercase tracking-wider"
                style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif" }}
              >
                {figure.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ── Graphiques ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div
            className="p-6"
            style={{
              background: "rgba(255,255,255,0.05)",
              borderLeft: "4px solid #205C03",
              borderBottom: "4px solid #0B30BB",
              borderRadius: "2px",
            }}
          >
            <h3
              className="font-bold text-white mb-4 uppercase text-sm tracking-wider"
              style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif" }}
            >
              Taux de réussite par année
            </h3>
            <div id="success-rate-chart" className="w-full" style={{ height: "280px" }} />
          </div>
          <div
            className="p-6"
            style={{
              background: "rgba(255,255,255,0.05)",
              borderLeft: "4px solid #E3A402",
              borderBottom: "4px solid #205C03",
              borderRadius: "2px",
            }}
          >
            <h3
              className="font-bold text-white mb-4 uppercase text-sm tracking-wider"
              style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif" }}
            >
              Répartition des étudiants
            </h3>
            <div id="student-distribution-chart" className="w-full" style={{ height: "280px" }} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default KeyFigures;