"use client";

import ReactECharts from "echarts-for-react";
// import * as echarts from "echarts";
import { IUser } from "../../helpers/types";

interface StatisticsPolarGraphicsComponentProps {
  users: IUser[];
}

const StatisticsPolarGraphicsComponent: React.FC<
  StatisticsPolarGraphicsComponentProps
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

  const option = {
    angleAxis: {
      min: 0,
      max: 15,
      interval: 1,
    },
    radiusAxis: {
      type: "category",
      data: ["Ene", "Feb", "Mar", "Abr", "May"],
      z: 10,
      axisLabel: {
        show: true,
        interval: 0, // Muestra todas las etiquetas
        // rotate: 45, // Rota las etiquetas para evitar superposiciones
        textStyle: {
          // color: "#000", // Color de las etiquetas
          fontSize: 12, // Tamaño de fuente de las etiquetas
        },
      },
    },
    polar: {
      radius: [0, "80%"], // Ajusta el tamaño del gráfico
      center: ["50%", "50%"], // Centra el gráfico
    },
    series: [
      {
        type: "bar",
        data: [data[0], 0, 0, 0],
        coordinateSystem: "polar",
        name: "Enero",
        stack: "a",
        emphasis: {
          focus: "series",
        },
      },
      {
        type: "bar",
        data: [0, data[1], 0, 0, 0],
        coordinateSystem: "polar",
        name: "Febrero",
        stack: "a",
        emphasis: {
          focus: "series",
        },
      },
      {
        type: "bar",
        data: [0, 0, data[2], 0, 0],
        coordinateSystem: "polar",
        name: "Marzo",
        stack: "a",
        emphasis: {
          focus: "series",
        },
      },
      {
        type: "bar",
        data: [0, 0, 0, data[3], 0],
        coordinateSystem: "polar",
        name: "Abril",
        stack: "a",
        emphasis: {
          focus: "series",
        },
      },
      {
        type: "bar",
        data: [0, 0, 0, 0, data[4]],
        coordinateSystem: "polar",
        name: "Mayo",
        stack: "a",
        emphasis: {
          focus: "series",
        },
      },
    ],
    legend: {
      show: true,
      data: ["Enero", "Febrero", "Marzo", "Abril", "Mayo"],
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

export default StatisticsPolarGraphicsComponent;
