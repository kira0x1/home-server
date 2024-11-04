const startTime = Date.now();

export function getUptime() {
  const curTime = Date.now();
  const uptime = new Date(curTime - startTime);

  console.log(`\nuptime: ${uptime}\n`);

  return uptime;
}
