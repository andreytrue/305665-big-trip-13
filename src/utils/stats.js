import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {getDurationInDays} from '../utils/common.js';

export const renderMoneyChart = (moneyCtx, points, labels) => {
  const sumForTypes = [];

  labels.map((type) => {
    let sum = 0;

    points.forEach((point) => {
      sum += point.type.toUpperCase() === type ? +point.price : 0;
    });

    sumForTypes.push(sum);
  });

  return new Chart(moneyCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels,
      datasets: [{
        data: sumForTypes,
        backgroundColor: `#1E90FF`,
        hoverBackgroundColor: `#B0E0E6`,
        anchor: `start`,
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `€ ${val}`,
        },
      },
      title: {
        display: true,
        text: `MONEY`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`,
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          minBarLength: 50,
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

export const renderTypeChart = (typeCtx, points, labels) => {
  const countOfTypes = [];

  labels.map((type) => {
    let count = 0;

    points.forEach((point) => {
      count += point.type.toUpperCase() === type ? 1 : 0;
    });

    countOfTypes.push(count);
  });

  return new Chart(typeCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels,
      datasets: [{
        data: countOfTypes,
        backgroundColor: `#1E90FF`,
        hoverBackgroundColor: `#B0E0E6`,
        anchor: `start`,
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `${val}x`,
        },
      },
      title: {
        display: true,
        text: `TYPE`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`,
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          minBarLength: 50,
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

export const renderTimeSpendChart = (typeCtx, points, labels) => {
  const durationTimeOfTypes = [];

  labels.map((type) => {
    let duration = 0;

    points.forEach((point) => {
      duration += point.type.toUpperCase() === type ? point.date.finish.diff(point.date.start) : 0;
    });

    durationTimeOfTypes.push(duration);
  });

  return new Chart(typeCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels,
      datasets: [{
        data: durationTimeOfTypes,
        backgroundColor: `#1E90FF`,
        hoverBackgroundColor: `#B0E0E6`,
        anchor: `start`,
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => getDurationInDays(val),
        },
      },
      title: {
        display: true,
        text: `TIME-SPEND`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`,
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          minBarLength: 50,
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};
