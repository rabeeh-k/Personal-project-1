const clock = document.getElementById("clock");
const alarmTime = document.getElementById("alarmTime");
const alarmList = document.getElementById("alarmList");
const alarmSound = document.getElementById("alarmSound");

let alarms = JSON.parse(localStorage.getItem("alarms")) || [];

function updateClock() {

    const now = new Date();

    clock.innerHTML = now.toLocaleTimeString();

    let current = now.getHours().toString().padStart(2, "0") + ":" +
        now.getMinutes().toString().padStart(2, "0");

    alarms.forEach(alarm => {

        if (alarm == current) {

            alarmSound.play();

            alert("⏰ Alarm!");

        }

    });

}

setInterval(updateClock, 1000);

function save() {

    localStorage.setItem("alarms", JSON.stringify(alarms));

}

function render() {

    alarmList.innerHTML = "";

    alarms.forEach((alarm, index) => {

        const li = document.createElement("li");

        li.innerHTML = `
${alarm}
<button class="delete" onclick="removeAlarm(${index})">
Delete
</button>
`;

        alarmList.appendChild(li);

    });

}

document.getElementById("setAlarm").onclick = () => {

    if (alarmTime.value == "") return;

    alarms.push(alarmTime.value);

    save();

    render();

    alarmTime.value = "";

}

function removeAlarm(index) {

    alarms.splice(index, 1);

    save();

    render();

}

render();

document.getElementById("modeBtn").onclick = () => {

    document.body.classList.toggle("dark");

}

