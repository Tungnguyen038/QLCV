import React, { useEffect, useRef, useState } from "react";
import { CanvasJSChart } from "canvasjs-react-charts";
import ImageChart from '../../images/Chart.png'
import { BASE_URL } from "../../util/constants";
import axios from "axios";
const BarChartArea = ({ project, dateStarted, dateEnd }) => {
  const [datapoint, setDatapoint] = useState([]);
  var dataPoints = [];
  let ref = useRef(null);

  useEffect(() => {
    const dataP = async () => {
      await axios
        .get(
          `${BASE_URL}/api/Issue/StatisticIssueArchived?idProject=${project?.id}&dateStarted=${dateStarted}&dateEnd=${dateEnd}`
        )
        .then((res) => {
          setDatapoint(res.data);
        });
    };
    dataP();
  }, [project, dateStarted, dateEnd]);

  if (datapoint && datapoint.length > 0) {
    for (var i = 0; i < datapoint.length; i++) {
      dataPoints.push({
        x: new Date(datapoint[i].x),
        y: datapoint[i].y,
      });
    }
  }


  const options = {
    theme: "light2",
    title: {
      text: `Issue Satisfaction Archive - ${project?.dateEnd.slice(0, 4)}`,
    },
    height: 350,
    data: [
      {
        type: "area",
        // showInLegend: true,
        xValueFormatString: "MMM YYYY",
        yValueFormatString: "#,##0.##",
        dataPoints: dataPoints,
      },
    ],
  };

  const handleExportChart = () => {
    ref.current.chart.exportChart({ format: "png" })

  }
  if (datapoint.length === 0) {
    return (
      <>
        <h3 className="font-bold text-[20px]">No issue for the period</h3>
        <div className="justify-self-center w-full h-[full]">
          <img className="block w-full h-full object-cover opacity-20" src={ImageChart} alt="" />
        </div>
      </>
    )
  }

  return (
    <div >
      <h2 className="flex justify-center text-[40px] font-semibold archive-area ">Archive</h2>
      <CanvasJSChart ref={ref} options={options} />
      <button data-tut='tut-dashboard-export' onClick={handleExportChart} className="p-2 mt-3 text-white bg-blue-500 rounded-md hover:opacity-90">Export Chart</button>
    </div>
  );
};

export default BarChartArea;
