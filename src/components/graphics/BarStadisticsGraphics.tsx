"use client";

import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import { IUser } from "../../helpers/types";

interface BarStadisticsGraphicsComponentProps {
  users: IUser[];
}

const BarStadisticsGraphicsComponent: React.FC<
  BarStadisticsGraphicsComponentProps
> = ({ users }): React.ReactElement => {
  //desgloso las fechas
  const usersDateCreated = users.map((user) => user.createdAt);
  // array vacio con 13 espacios
  const data = new Array(13).fill(0);
  // itero sobre las fechas, cuento por mes y lo guardo
  usersDateCreated.forEach((dateCreated) => {
    if (dateCreated !== undefined) {
      const date = new Date(dateCreated);
      const month = date.getUTCMonth();
      data[month]++;
    }
  });

  const dataAxis = ["Ene-24", "Feb-24", "Mar-24", "Abr-24", "May-24"];

  const option = {
    xAxis: {
      data: dataAxis,
      axisLabel: {
        inside: true,
        color: "#fff",
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      z: 10,
    },
    yAxis: {
      min: 0,
      max: 20,
      interval: 2,
      axisLine: {
        show: true,
      },
      axisTick: {
        show: true,
      },
      axisLabel: {
        color: "#999",
      },
    },
    dataZoom: [
      {
        type: "inside",
      },
    ],
    series: [
      {
        type: "bar",
        showBackground: true,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#83bff6" },
            { offset: 0.5, color: "#188df0" },
            { offset: 1, color: "#188df0" },
          ]),
        },
        emphasis: {
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#2378f7" },
              { offset: 0.7, color: "#2378f7" },
              { offset: 1, color: "#83bff6" },
            ]),
          },
        },
        data: data, // cantidad de barras varia segun la longitud del array a mostrar y tiene que coincidir con la data a amostrar
      },
    ],
    // Ajuste de grid para eliminar espacios en blanco
    grid: {
      top: 20,
      bottom: 50,
      left: 50,
      right: 10,
    },
  };

  return (
    <>
      <ReactECharts
        option={option}
        className="min-h-[400px] min-w-[50%] max-w-[850px]"
      />
    </>
  );
};

export default BarStadisticsGraphicsComponent;
