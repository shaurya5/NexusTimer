import { Categories } from "@/interfaces/Categories";
import calcAoStatistics from "@/lib/calcAoStatistics";
import calcAverageStatistics from "@/lib/calcAverageStatistics";
import calcBestTime from "@/lib/calcBestTime";
import calcDeviation from "@/lib/calcDeviation";
import calcSuccessRate from "@/lib/calcSuccessRate";
import calcTimeSpentStatistics from "@/lib/calcTimeSpentStatistics";
import calcTotalSolvesStatistics from "@/lib/calcTotalSolvesStatistics";
import { cubeCollection } from "@/lib/const/cubeCollection";
import {
  defaultChartValuesA,
  defaultChartValuesS,
  defaultChartValuesN,
  defaulCharAoValues,
} from "@/lib/const/defaultChartValues";
import getSolvesMetrics from "@/lib/getSolvesMetrics";
import { useSettingsModalStore } from "@/store/SettingsModalStore";
import { useTimerStore } from "@/store/timerStore";
import translation from "@/translations/global.json";
import { useEffect, useState } from "react";

export default function useMetricsSwitch() {
  const { lang } = useSettingsModalStore();
  const { cubes } = useTimerStore();
  const [filterCategory, setFilterCategory] = useState<Categories>("3x3");
  const [filterCube, setFilterCube] = useState(
    translation.solves.filter["all"][lang]
  );

  const [optInChart, setOptInChart] = useState({
    mean: true,
    best: false,
  });

  const [average, setAverage] = useState(defaultChartValuesN);
  const [timeSpent, setTimeSpent] = useState(defaultChartValuesS);
  const [counter, setCounter] = useState(defaultChartValuesN);
  const [stats, setStats] = useState(defaulCharAoValues);
  const [deviation, setDeviation] = useState(defaultChartValuesN);
  const [successRate, setSuccessRate] = useState(defaultChartValuesS);
  const [best, setBest] = useState(defaultChartValuesN);
  const [data, setData] = useState(defaultChartValuesA);

  const categoryOptions = loadCategoryOptions();
  const cubeOptions = loadCubeOptions();

  function loadCategoryOptions() {
    const categoryOptions: any[] = [];
    cubeCollection.map((cat) => {
      categoryOptions.push({ name: cat.name, id: cat.name });
    });
    return categoryOptions;
  }

  function loadCubeOptions() {
    const CubeOptions: any[] = [
      {
        name: translation.solves.filter["all"][lang],
        id: translation.solves.filter["all"][lang],
      },
    ];
    cubes?.map((cube) => {
      if (cube.category === filterCategory) {
        CubeOptions.push({ name: cube.name, id: cube.name });
      }
    });
    return CubeOptions;
  }

  const handleChangeCategory = (value: any) => {
    setFilterCube(translation.solves.filter["all"][lang]);
    setFilterCategory(value);
  };

  const handleChangeCube = (value: any) => {
    setFilterCube(value);
  };

  useEffect(() => {
    setFilterCube(translation.solves.filter["all"][lang]);
  }, [lang]);

  useEffect(() => {
    const calculatedAverage = calcAverageStatistics(filterCategory, filterCube);
    const calculatedTimeSpent = calcTimeSpentStatistics(
      filterCategory,
      filterCube
    );
    const calculatedCounter = calcTotalSolvesStatistics(
      filterCategory,
      filterCube
    );
    const calculatedStats = calcAoStatistics(filterCategory, filterCube);
    const calculatedDeviation = calcDeviation(filterCategory, filterCube);
    const calculatedSuccessRate = calcSuccessRate(filterCategory, filterCube);
    const calculatedBest = calcBestTime(filterCategory, filterCube);
    const calculatedData = getSolvesMetrics(filterCategory, filterCube);

    setAverage(calculatedAverage);
    setTimeSpent(calculatedTimeSpent);
    setCounter(calculatedCounter);
    setStats(calculatedStats);
    setDeviation(calculatedDeviation);
    setSuccessRate(calculatedSuccessRate);
    setBest(calculatedBest);
    setData(calculatedData);
  }, [filterCategory, filterCube]);

  return {
    filterCategory,
    filterCube,
    handleChangeCategory,
    handleChangeCube,
    categoryOptions,
    cubeOptions,
    optInChart,
    setOptInChart,
    average,
    timeSpent,
    counter,
    stats,
    deviation,
    successRate,
    best,
    data,
  };
}
