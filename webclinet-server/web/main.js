const $ = document.querySelector.bind(document);
const heart_1 = $("#heart_1");
const spo2_1 = $("#spo2_1");
const body_temp_1 = $("#body_temp_1");
const Environment_temp_1 = $("#Environment_temp_1");
const heart_2 = $("#heart_2");
const spo2_2 = $("#spo2_2");
const body_temp_2 = $("#body_temp_2");
const Environment_temp_2 = $("#Environment_temp_2");
const labels = [];
const dataValues = [];
const dataValues_2 = [];

const labels_2 = [];
const dataValues_3 = [];
const dataValues_4 = [];

function fetchData() {
  fetch("http://127.0.0.1:3000/node")
    .then((data) => {
      return data.json();
    })
    .then((data) => {
      console.log(data);
      let data_1 = data.database_1.length - 1;
      let data_2 = data.database_2.length - 1;

      heart_1.innerText = data.database_1[data_1].heartbeat;
      spo2_1.innerText = data.database_1[data_1].Spo2;
      body_temp_1.innerText = data.database_1[data_1].body_temperature;
      Environment_temp_1.innerText = data.database_1[data_1].Environment_temp;

      heart_2.innerText = data.database_2[data_2].heartbeat;
      spo2_2.innerText = data.database_2[data_2].Spo2;
      body_temp_2.innerText = data.database_2[data_2].body_temperature;
      Environment_temp_2.innerText = data.database_2[data_2].Environment_temp;
    });
}

const myChartKhu1 = new Chart(document.getElementById("environmentKhu1"), {
  type: "line",
  data: {
    labels: labels,
    datasets: [
      {
        label: "Độ ẩm Khu 1",
        data: dataValues, // Dữ liệu độ ẩm
        fill: false,
        borderColor: "blue",
        lineTension: 0.1,
      },
      {
        label: "Nhiệt độ Khu 1",
        data: dataValues_2, // Dữ liệu nhiệt độ
        fill: false,
        borderColor: "red",
        lineTension: 0.1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

const myChartKhu2 = new Chart(document.getElementById("environmentKhu2"), {
  type: "line",
  data: {
    labels: labels_2,
    datasets: [
      {
        label: "Độ ẩm Khu 2",
        data: dataValues_3, // Dữ liệu độ ẩm
        fill: false,
        borderColor: "blue",
        lineTension: 0.1,
      },
      {
        label: "Nhiệt độ Khu 2",
        data: dataValues_4, // Dữ liệu nhiệt độ
        fill: false,
        borderColor: "red",
        lineTension: 0.1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

function addData(value, chart, datasetIndex) {
  labels.push(new Date().toLocaleTimeString()); // Thêm thời gian hiện tại làm nhãn
  dataValues.push(value);

  // Giới hạn số lượng dữ liệu hiển thị trên biểu đồ
  const maxDataPoints = 30;
  if (labels.length > maxDataPoints) {
    labels.shift();
    dataValues.shift();
  }

  // Cập nhật dữ liệu cho biểu đồ
  chart.data.labels = labels;
  chart.data.datasets[datasetIndex].data = dataValues; // Cập nhật dữ liệu
  chart.update();
}

function addDataTemperature(value, chart) {
  dataValues_2.push(value); // Thêm dữ liệu nhiệt độ

  // Giới hạn số lượng dữ liệu hiển thị trên biểu đồ
  const maxDataPoints = 30;
  if (dataValues_2.length > maxDataPoints) {
    dataValues_2.shift();
  }

  // Cập nhật dữ liệu cho biểu đồ
  chart.data.datasets[1].data = dataValues_2; // Cập nhật dữ liệu nhiệt độ
  chart.update();
}

function addData(value, chart, datasetIndex) {
  labels_2.push(new Date().toLocaleTimeString()); // Thêm thời gian hiện tại làm nhãn
  dataValues_4.push(value);

  // Giới hạn số lượng dữ liệu hiển thị trên biểu đồ
  const maxDataPoints = 30;
  if (labels_2.length > maxDataPoints) {
    labels_2.shift();
    dataValues_4.shift();
  }

  // Cập nhật dữ liệu cho biểu đồ
  chart.data.labels = labels_2;
  chart.data.datasets[datasetIndex].data = dataValues_4; // Cập nhật dữ liệu
  chart.update();
}

/////////////////////////////////////////////////////////

setInterval(() => {
  // Giá trị mới (giả lập giá trị bạn nhận được từ dữ liệu thời gian thực)
  const newValueHumidity1 = Math.floor(Math.random() * (85 - 70 + 1)) + 70; // Độ ẩm khu 1
  const newValueTemperature1 = Math.floor(Math.random() * (80 - 75 + 1)) + 75; // Nhiệt độ khu 1
  const newValueHumidity2 = Math.floor(Math.random() * (85 - 70 + 1)) + 70; // Độ ẩm khu 2
  const newValueTemperature2 = Math.floor(Math.random() * (80 - 75 + 1)) + 75; // Nhiệt độ khu 2

  // Cập nhật đồ thị khu 1
  addData(newValueHumidity1, myChartKhu1, 0); // Cập nhật độ ẩm khu 1
  addDataTemperature(newValueTemperature1, myChartKhu1); // Cập nhật nhiệt độ khu 1

  // Cập nhật đồ thị khu 2
  addData(newValueHumidity2, myChartKhu2, 0); // Cập nhật độ ẩm khu 2
  addDataTemperature(newValueTemperature2, myChartKhu2); // Cập nhật nhiệt độ khu 2
}, 3000); // Cập nhật giá trị mỗi 1,5 giây
