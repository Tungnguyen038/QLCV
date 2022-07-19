import React, { useEffect, useRef, useState } from "react";
import { CanvasJSChart } from "canvasjs-react-charts";
import ImageChart from '../../images/Chart.png'
import axios from "axios";
import { BASE_URL } from "../../util/constants";

const BarChartColumn = ({ project, dateStarted, dateEnd }) => {
  const [datapoint, setDatapoint] = useState([]);
  console.log('date', {
    dateStarted, dateEnd
  });
  let ref = useRef(null)
  useEffect(() => {
    const dataP = async () => {
      await axios
        .get(
          `${BASE_URL}/api/Issue/StatisticIssue?idProject=${project?.id}&dateStarted=${dateStarted}&dateEnd=${dateEnd}`
        )
        .then((res) => {
          setDatapoint(res.data);
        });
    };
    dataP();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project, dateStarted, dateEnd]);
  const options = {
    title: {
      text: "Issue Satisfaction",
    },
    height: 350,
    data: [
      {
        // Change type to "doughnut", "line", "splineArea", etc.
        type: "column",
        dataPoints: datapoint,
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
    <div className="mt-[30px]">
      <CanvasJSChart ref={ref} options={options} />
      <button data-tut='tut-dashboard-export' onClick={handleExportChart} className="p-2 mt-3 text-white bg-blue-500 rounded-md hover:opacity-90">Export Chart</button>
    </div>
  );
};

export default BarChartColumn;
