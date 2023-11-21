// ##############################
// // // javascript library for creating charts
// #############################
var Chartist = require("chartist");

// ##############################
// // // variables used to create animation on charts
// #############################
var delays = 80,
  durations = 500;
var delays2 = 80,
  durations2 = 500;

// ##############################
// // // Daily Sales
// #############################

const noOfReviews = {
  
  data: {
    labels: ["1", "2", "3", "4", "5", "6", "7"],
    series: [[2, 1, 5, 3, 4, 7, 7]],
  },
  options: {
    lineSmooth: Chartist.Interpolation.cardinal({
      tension: 0,
    }),
    low: 0,
    high: 6, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
    chartPadding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
  },
  // for animation
  animation: {
    draw: function (data) {
      if (data.type === "line" || data.type === "area") {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path
              .clone()
              .scale(1, 0)
              .translate(0, data.chartRect.height())
              .stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint,
          },
        });
      } else if (data.type === "point") {
        data.element.animate({
          opacity: {
            begin: (data.index + 1) * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: "ease",
          },
        });
      }
    },
  },
};

// ##############################
// // // Email Subscriptions
// #############################

const mostRev = {
  data: {
    labels: [
      "Google",
      "Amazon",
      "Netflix",
      "Meta",
      "Microsoft",
    ],
    series: [[542, 900, 320, 780, 553]],
  },
  options: {
    axisX: {
      showGrid: false,
    },
    low: 0,
    high: 6,
    chartPadding: {
      top: 0,
      right: 5,
      bottom: 0,
      left: 0,
    },
  },
  responsiveOptions: [
    [
      "screen and (max-width: 640px)",
      {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function (value) {
            return value[0];
          },
        },
      },
    ],
  ],
  animation: {
    draw: function (data) {
      if (data.type === "bar") {
        data.element.animate({
          opacity: {
            begin: (data.index + 1) * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: "ease",
          },
        });
      }
    },
  },
};




const avgRatingsChart = {
  data: {
    labels: [
      "Google",
      "Amazon",
      "Netflix",
      "Meta",
      "Microsoft",
    ],
    series: [15,15,17,20,25],
    donut: true,
    showLabel: false
  },
  
  options: {
    lineSmooth: Chartist.Interpolation.cardinal({
      tension: 0,
    }),
    low: 0,
    high: 6, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
    chartPadding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
  },
  // for animation
  animation: {
    draw: function (data) {
      if (data.type === "line" || data.type === "area") {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path
              .clone()
              .scale(1, 0)
              .translate(0, data.chartRect.height())
              .stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint,
          },
        });
      } else if (data.type === "point") {
        data.element.animate({
          opacity: {
            begin: (data.index + 1) * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: "ease",
          },
        });
      }
    },
  },
};






const jobSeekersReviews = {
  data: {
    labels: [
      "Archita",
      "Anay",
      "Sushan",
      "Priyanka",
      "Anish",
    ],
    series: [5,4,3,2,1],
    
  },
  
  options: {
    axisX: {
      showGrid: false,
    },
    low: 0,
    high: 6,
    chartPadding: {
      top: 0,
      right: 5,
      bottom: 0,
      left: 0,
    },
  },
  responsiveOptions: [
    [
      "screen and (max-width: 640px)",
      {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function (value) {
            return value[0];
          },
        },
      },
    ],
  ],
  animation: {
    draw: function (data) {
      if (data.type === "bar") {
        data.element.animate({
          opacity: {
            begin: (data.index + 1) * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: "ease",
          },
        });
      }
    },
  },
};
// ##############################
// // // Completed Tasks
// #############################


const topCEO = {
  data: {
    labels: [
      "AB",
      "CD",
      "EF",
      "GH",
      "IJ",
      "KL",
      "MN",
      "OP",
      "QR",
      "ST"
    ],
    series: [[20, 17, 15, 14, 12, 10, 9, 7, 6, 5]],
  },

  options: {
    lineSmooth: Chartist.Interpolation.cardinal({
      tension: 0,
    }),
    low: 0,
    high: 6, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
    chartPadding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
  },
  animation: {
    draw: function (data) {
      if (data.type === "bar") {
        data.element.animate({
          opacity: {
            begin: (data.index + 1) * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: "ease",
          },
        });
      }
    },
    
  },
  
};

const topCompanies = {
  data: {
    labels: [
      "AB",
      "CD",
      "EF",
      "GH",
      "IJ",
      "KL",
      "MN",
      "OP",
      "QR",
      "ST"
    ],
    series: [[20, 17, 15, 14, 12, 10, 9, 7, 6, 5]],
  },

  options: {
    lineSmooth: Chartist.Interpolation.cardinal({
      tension: 0,
    }),
    low: 0,
    high: 102, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
    chartPadding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
  },
  animation: {
    draw: function (data) {
      if (data.type === "bar") {
        data.element.animate({
          opacity: {
            begin: (data.index + 1) * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: "ease",
          },
        });
      }
    },
    
  },
};

module.exports = {
  noOfReviews,
  mostRev,
  avgRatingsChart,
  jobSeekersReviews,
  topCEO,
  topCompanies,
};
