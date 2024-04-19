const batteryLevel = document.querySelector(".batteryLevel");
const batteryCharging = document.querySelector(".batteryCharging");
const batteryChargingTime = document.querySelector(".batteryChargingTime");
const batteryDisChargingTime = document.querySelector(
  ".batteryDisChargingTime"
);
const battery = () => {
  if ("getBattery" in navigator) {
    navigator.getBattery().then((battery) => {
      function updateAllBatteryDetails() {
        updateChargingInfo();
        updateLevelChange();
        updateDischargingTimeInfo();
        updateChargingTimeChangeInfo();
      }
      updateAllBatteryDetails();
      //battery charging change
      battery.addEventListener("chargingchange", () => {
        updateChargingInfo();
      });
      function updateChargingInfo() {
        const isCharging = battery.charging ? "Yes" : "No";
        batteryCharging.innerHTML = isCharging;
      }
      //battery charging time
      battery.addEventListener("chargingtimechange", () => {
        updateChargingTimeChangeInfo();
      });
      function updateChargingTimeChangeInfo() {
        const chargeRound = (battery.chargingTime / 3600).toFixed(1);
        batteryChargingTime.innerHTML = chargeRound + " hours";
      }
      //battery discharging time
      battery.addEventListener("dischargingtimechange", () => {
        updateDischargingTimeInfo();
      });
      function updateDischargingTimeInfo() {
        const roundedTime = (battery.dischargingTime / 3600).toFixed(1);
        batteryDisChargingTime.innerHTML = roundedTime + " hours";
      }
      //battery level change
      battery.addEventListener("levelchange", () => {
        updateLevelChange();
      });
      function updateLevelChange() {
        const level = battery.level * 100;
        let status = "";
        if (level < 20) {
          status = "(Low)";
          batteryLevel.style.color = "red";
        } else if (level === 100) {
          status = "(Fully Charged)";
          batteryLevel.style.color = "green";
        } else {
          batteryLevel.style.color = "black";
        }
        batteryLevel.innerHTML = level + "% " + status;
      }
      //battery status
    });
  }
};
battery();
