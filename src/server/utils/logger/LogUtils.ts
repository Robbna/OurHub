type LOG_TYPE = "INFO" | "WARN" | "ERROR";

export const consoleLog = (type: LOG_TYPE, message: string) => {
  const date = new Date();
  const time = date.toLocaleTimeString();
  const log = `[${time}] ${type}: ${message}`;
  switch (type) {
    case "INFO":
      console.log(log);
      break;
    case "WARN":
      console.warn(log);
      break;
    case "ERROR":
      console.error(log);
      break;
  }
};
