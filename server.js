const { exec } = require("child_process");

// Sử dụng child_process để chạy lệnh npm start
const child = exec("next start");

child.stdout.on("data", (data) => {
  console.log(data);
});

child.stderr.on("data", (data) => {
  console.error(data);
});

child.on("close", (code) => {
  console.log(`Child process exited with code ${code}`);
});

process.on("exit", () => {
  // Khi tiến trình thoát, hãy chắc chắn kết thúc tiến trình con (npm start)
  child.kill();
});
