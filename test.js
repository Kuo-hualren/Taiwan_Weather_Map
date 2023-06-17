const body = document.body
// body.append("body")
const div = document.createElement("div")
body.append(div)
const main = document.querySelector(".container")
var p = 15;
let htmlString = "";




function getdata() {
    fetch("https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=rdec-key-123-45678-011121314").then(function(res) {
        // console.log(res);
        return res.json();
    }).then(function(data) {
        // main.innerHTML = "";
        console.log(data["records"]["location"][0]["locationName"]);
        console.log(data.records.location.length);
        for (let i = 1; i <= data.records.location.length; i++) {
            htmlString += `<div id="d" class="c${i}"><h1 id="dh">${i}</h1> <h1 id="dh2">${data.records.location[i-1].locationName}<img src="C:\\Users\\User\\OneDrive\\桌面\\大四課程總覽\\進階物件導向(java)\\Final_Project\\cloudy-cloud-svgrepo-com.svg"/></h1></div>`;
            // ${data.records.location[i-1].weatherElement[0].time[0].startTime}  
            main.innerHTML = htmlString;
            
        }
        console.log(main)
        main.addEventListener('click', function (event) {
            //按下 button 執行
            if(event.target.textContent.length < 50 ) {
                console.log("click",event.srcElement.textContent);
                let num = event.srcElement.textContent[0] + event.srcElement.textContent[1]
                console.log(parseInt(num))
                console.log(event.target.textContent.length)
                change(data.records.location[parseInt(num)-1]);
                console.log(data.records.location[parseInt(num)-1].weatherElement[4].time[0].parameter.parameterName,"99999")
            } else {
                console.log(event.target.textContent.length)
            }
            // console.log(main.childNodes[5].textContent)
        });
        
        // let c = document.querySelector(".c7")
        // console.log(c.textContent)
        // console.log(main.childElementCount)
        // main.innerHTML = htmlString;
        // main.innerHTML = "";

    });
    // return 1;
}


// var ctx = document.getElementById('myChart').getContext('2d');

function change(s) {
    console.log("a",s)
    let f = document.querySelector(".container");
    let m = document.querySelector("#mc2");
    let n = document.querySelector("#pname");
    let w = document.querySelector("#pwx");
    var max1 = s.weatherElement[4].time[0].parameter.parameterName;
    var max2 = s.weatherElement[4].time[1].parameter.parameterName;
    var max3 = s.weatherElement[4].time[2].parameter.parameterName;
    var min1 = s.weatherElement[2].time[0].parameter.parameterName;
    var min2 = s.weatherElement[2].time[1].parameter.parameterName;
    var min3 = s.weatherElement[2].time[2].parameter.parameterName;
    var pop1 = s.weatherElement[1].time[0].parameter.parameterName;
    var pop2 = s.weatherElement[1].time[1].parameter.parameterName;
    var pop3 = s.weatherElement[1].time[2].parameter.parameterName;
    n.innerHTML = s.locationName+"<img src='C:\\Users\\User\\OneDrive\\桌面\\大四課程總覽\\進階物件導向(java)\\Final_Project\\cloudy-svgrepo-com.svg'/>";
    let times =  String(s.weatherElement[0].time[0].startTime).split(" ");
    w.innerHTML = times[0]+"  "+max2+"°C"+"<br>"+s.weatherElement[0].time[0].parameter.parameterName;
    console.log(max1,"www")
    // m.innerHTML = s.weatherElement[4].time[0].parameter.parameterName;
    // e.className = "v";
    // let e = document.querySelector("#c");
    // e.style.display = "block";
    f.style.display = "none";
    m.style.display = "block";

    
    const ctx = document.getElementById('myChart').getContext('2d');
    
    if(Chart.getChart("myChart")) {
        Chart.getChart("myChart").destroy();
    }
    var bar = new Chart(ctx, {
        type: 'bar',
        data: {
        labels: ['上午0時-上午8時', '上午8時-下午4時', '下午4時-上午12時'],
        datasets: [{
            label: '最高溫度',
            data: [max1,max2,max3],
            backgroundColor: [
                'rgb(255, 99, 132)',  //rgb(75, 192, 192)
                'rgb(255, 205, 86)',
                'white'
            ],
            borderWidth: 1
        }]
        },
        options: {
        scales: {
            y: {
                beginAtZero: true,
                suggestedMax: 30
            }
        }
        }
    });
    
    const ctx2 = document.getElementById('myChart2').getContext('2d');
    
    if(Chart.getChart("myChart2")) {
        Chart.getChart("myChart2").destroy();
    }
    var bar = new Chart(ctx2, {
        type: 'bar',
        data: {
        labels: ['上午0時-上午8時', '上午8時-下午4時', '下午4時-上午12時'],
        datasets: [{
            label: '最低溫度',
            data: [min1,min2,min3],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 205, 86)',
                'white'
            ],
            borderWidth: 1
        }]
        },
        options: {
        scales: {
            y: {
                beginAtZero: true,
                suggestedMax: 30
            }
        },
        
        
        }
    });
    
    
    const ctx3 = document.getElementById('myChart3').getContext('2d');
    
    if(Chart.getChart("myChart3")) {
        Chart.getChart("myChart3").destroy();
    }
    var bar = new Chart(ctx3, {
        type: 'doughnut',
        data: {
        labels: ['上午0時-上午8時', '上午8時-下午4時', '下午4時-上午12時'],
        datasets: [{
            label: '降雨機率',
            data: [pop1,pop2,pop3],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 205, 86)',
                'white'
            ],
            borderWidth: 0,
            hoverOffset: 4
        }]
        },
        // options: {
        // scales: {
        //     y: {
        //         beginAtZero: true,
        //         suggestedMax: 30
        //     }
        // },
        
        
        // }
    });


}
function changeback() {
    let f = document.querySelector(".container");
    let m = document.querySelector("#mc2");
    f.style.display = "block";
    f.style.display = "flex";
    m.style.display = "none";

    
}


// var ctx = document.getElementById('myChart').getContext('2d');
// var myChart = new Chart(ctx, {
//     type: 'line',
//     data: {
//         labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
//         datasets: [{
//             label: '平均溫度',
//             data: [20, 22.3, 25, 26, 28, 31.2,80],
//             fill: false,
//             borderColor: 'rgb(75, 192, 192)',
//         }]
//     },
// });


// var bar = new Chart(ctx, {
//     type: 'bar',
//     data: {
//       labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//       datasets: [{
//         label: '# of Votes',
//         data: [12, 19, 3, 5, 2, 3],
//         backgroundColor: [
//             'rgb(255, 99, 132)',
//             'rgb(75, 192, 192)',
//             'rgb(255, 205, 86)',
//             'rgb(201, 203, 207)',
//             'rgb(54, 162, 235)',
//             'white'
//         ],
//         borderWidth: 1
//       }]
//     },
//     options: {
//       scales: {
//         y: {
//           beginAtZero: true
//         }
//       }
//     }
//   });

  
// var polar = new Chart(ctx, {
//     type: 'polarArea',
//     data: {
//         labels: [
//             'Red',
//             'Green',
//             'Yellow',
//             'Grey',
//             'Blue'
//           ],
//           datasets: [{
//             label: 'My First Dataset',
//             data: [11, 16, 7, 3, 14],
//             backgroundColor: [
//               'rgb(255, 99, 132)',
//               'rgb(75, 192, 192)',
//               'rgb(255, 205, 86)',
//               'rgb(201, 203, 207)',
//               'rgb(54, 162, 235)'
//             ]
            
//           }]
//     }
// });
// polar.canvas.style.width = "123px";