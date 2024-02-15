import React, {
  useEffect,
  useState,
  useRef,
  useSyncExternalStore,
} from "react";
import Chart from "chart.js/auto"; 

const ChartComponent = () => {

  const [todayWage,setTodayWage] = useState(780)
  const [yesterdayWage,setYesterdayWage] = useState(650)


  // Setup data
  const data = {
    // labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        //   label: 'Weekly Sales',
        data: [216, 216, 216],
        backgroundColor: ["#4dfa8d", "#3ecf73", "#32a85e"],
        circumference: 180,
        rotation: 270,
        cutout: "80%",
        borderRadius: 2,
        needleValue: 216,
      },
    ],
  };

  const guageNeedle = {
    id: "guageNeedle",
    afterDatasetsDraw(chart, args, plugins) {
      const { ctx, data } = chart;

      ctx.save();

      const wageDiff = todayWage - yesterdayWage;
      const halfValue = yesterdayWage / 2;

      const angle = Math.PI;

      const xCenter = chart.getDatasetMeta(0).data[0].x;
      const yCenter = chart.getDatasetMeta(0).data[0].y - 30;
      const yCenterForText = chart.getDatasetMeta(0).data[0].y - 4;
      //   const yCenterForText = chart.getDatasetMeta(0).data[0].y + 20;

      const totalData = data.datasets[0].data.reduce((a, b) => a + b, 0);

      let circumference =
        (chart.getDatasetMeta(0).data[0].circumference /
          Math.PI /
          data.datasets[0].data[0]) *
        halfValue;

      let needleValueAngle = circumference + 1.49;

      function circumference2(value) {
        let circumference2 =
          (chart.getDatasetMeta(0).data[0].circumference /
            Math.PI /
            data.datasets[0].data[0]) *
          Math.abs(value);
        return circumference2;
      }

      if (todayWage > yesterdayWage) {
        if (wageDiff > halfValue) {
          needleValueAngle =
            circumference + 1.49 + circumference2(yesterdayWage / 2);
        } else {
          needleValueAngle = circumference + 1.49 + circumference2(wageDiff);
        }
      } else if (todayWage < yesterdayWage) {
        if (wageDiff < halfValue) {
          needleValueAngle = circumference + 1.49 - circumference2(yesterdayWage/2);
        } else {
          needleValueAngle = circumference + 1.49 - circumference2(wageDiff);
        }
      }

      ctx.translate(xCenter, yCenter);

      ctx.rotate(angle * needleValueAngle);

      ctx.beginPath();
      ctx.moveTo(-5, 0); // Move to the left of the center
      ctx.lineTo(0, -70); // Draw the needle to a point above the center
      ctx.lineTo(5, 0); // Draw to the right of the center
      ctx.closePath(); // Close the path
      ctx.fillStyle = "gray"; // Set the fill color
      ctx.fill(); // Fill the needle

      ctx.beginPath();
      ctx.arc(0, 1, 5, 1, Math.PI * 3, false);
      ctx.fill();

      // Restore the canvas context
      ctx.restore();

      ctx.fillStyle = "#34c2ed";
      ctx.font = "16px Arial";
      ctx.textAlign = "center";
      ctx.fillText("Yesterday Wage: 650.00 INR", xCenter, yCenterForText); // Adjust Y position as needed
    },
  };

  // Config
  const config = {
    type: "doughnut",
    data,
    options: {
      aspectRatio: 1.8,
      scales: {
        y: {
          display: false,
        },
      },
    },
    plugins: [guageNeedle],
  };

  // State for storing chart version
  const [chartVersion, setChartVersion] = useState(null);
  const chartRef = useRef(null);

  useEffect(() => {
    // Render chart
    const ctx = document.getElementById("myChart");
    if (ctx) {
      // Destroy previous chart if it exists
      if (chartRef.current !== null) {
        chartRef.current.destroy();
      }
      const myChart = new Chart(ctx, config);
      chartRef.current = myChart;
    }

    // Set chart version
    setChartVersion(Chart.version);
  }, [config]);

  return (
    <div className="chartCard">
      <div className="chartBox">
        <canvas id="myChart" className="max-h-[20rem]" />
      </div>
    </div>
  );
};

export default ChartComponent;
