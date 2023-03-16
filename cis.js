// Version 1.1

const cfIPv4 = {
  London: [
    '45.8.104.0/29',
    '185.207.92.0/24',
    '185.193.28.0/23',
    '185.193.30.0/23',
    '203.17.126.0/24',
    '207.189.149.0/24',
    '89.47.56.0/23',
    '93.114.64.0/23',
    '176.126.206.0/23',
    '203.23.103.0/24',
    '203.24.102.0/24',
    '203.24.103.0/24',
    '203.24.109.0/24',
    '203.29.52.0/24',
    '203.29.54.0/23',
    '203.30.188.0/22',
    '203.32.120.0/23',
    '203.34.28.0/24',
    '203.34.80.0/24',
    '203.55.107.0/24',
    '185.162.228.0/23',
    '185.162.230.0/23',
    '203.13.32.0/24',
    '203.22.223.0/24',
    '203.23.104.0/24',
    '203.23.106.0/24',
    '203.24.108.0/24',
    '203.28.8.0/24',
    '203.28.9.0/24',
    '203.29.53.0/24',
    '141.193.213.0/24',
    '185.201.139.0/24',
    '199.60.103.0/24',
    '12.221.133.0/24',
    '203.107.173.0/24',
    '195.245.221.0/24',
    '212.110.134.0/23',
    '45.14.174.0/24',
    '194.169.194.0/24',
    '185.109.21.0/24',
    '185.170.166.0/24',
    '191.101.251.0/24',
    '45.12.30.0/23',
    '45.85.118.0/23',
    '103.156.22.0/23',
    '194.152.44.0/24',
    '45.131.4.0/22',
    '45.131.208.0/22',
    '103.160.204.0/24',
    '45.133.247.0/24',
    '185.174.138.0/24',
    '185.221.160.0/24',
    '194.53.53.0/24',
    '195.85.23.0/24',
    '154.83.22.0/23',
    '154.83.30.0/23',
    '154.84.14.0/23',
    '154.84.16.0/21',
    '154.84.24.0/22',
    '154.85.8.0/22',
    '154.94.8.0/23',
    '154.219.2.0/23',
    '156.237.4.0/23',
    '156.238.14.0/23',
    '156.238.18.0/23',
    '156.239.152.0/22',
    '195.85.59.0/24',
    '31.43.179.0/24',
    '185.72.49.0/24',
    '194.40.240.0/24',
    '104.254.140.0/24',
    '103.244.116.0/22',
    '185.238.228.0/24',
    '199.181.197.0/24',
    '91.193.58.0/23',
    '108.165.216.0/24',
    '147.78.140.0/24',
    '154.83.2.0/24',
    '193.16.63.0/24',
    '195.137.167.0/24',
    '45.142.120.0/24',
    '204.68.111.0/24',
    '174.136.134.0/24',
    '193.188.14.0/24',
    '196.207.45.0/24',
    '194.40.241.0/24',
    '194.36.55.0/24',
    '103.169.142.0/24',
    '147.185.161.0/24',
    '208.100.60.0/24',
    '45.8.211.0/24',
    '194.36.49.0/24',
    '80.94.83.0/24',
    '45.145.28.0/24',
    '45.145.29.0/24',
    '89.207.18.0/24',
    '194.1.194.0/24',
    '5.226.179.0/24',
    '203.193.21.0/24',
    '204.62.141.0/24',
    '185.146.172.0/24',
    '23.227.37.0/24',
    '185.146.173.0/24',
    '141.101.100.0/24',
    '23.227.60.0/24',
    '103.81.228.0/24',
    '198.217.251.0/24',
    '190.93.244.0/22',
    '190.93.240.0/20',
    '64.68.192.0/24',
    '23.227.38.0/23'
  ],
  Worldwide: [
    '173.245.48.0/20',
    '103.21.244.0/22',
    '103.22.200.0/22',
    '103.31.4.0/22',
    '141.101.64.0/18',
    '108.162.192.0/18',
    '190.93.240.0/20',
    '188.114.96.0/20',
    '197.234.240.0/22',
    '198.41.128.0/17',
    '162.158.0.0/15',
    '104.16.0.0/13',
    '104.24.0.0/14',
    '172.64.0.0/13',
    '131.0.72.0/22'
  ]
};

const urlParams = new URLSearchParams(window.location.search);

let maxIP = ~~urlParams.get('max')
let testNo = 0;
let validIPs = [];

var ips;
var cidr;
let numberOfWorkingIPs = 0;

for (var cdnLocation in cfIPv4) {
  if (maxIP == 0 || numberOfWorkingIPs < maxIP) {
    ips = [];
    for (cidr of cfIPv4[cdnLocation]) {
      ips = ips.concat(cidrToIpArray(cidr));
    }
    testIPs(randomizeElements(ips), cdnLocation);
  }
}

async function testIPs(ipList, cdnLocation) {
  const timeout = 2500;
  for (const ip of ipList) {
    testNo++;
    var testResult = 0;
    const url = `https://${ip}/__down`;
    const startTime = performance.now();
    const controller = new AbortController();

    for (const ch of ['', '|', '/', '-', '\\']) {
      const timeoutId = setTimeout(() => {
        controller.abort();
      }, timeout);
      if (ch) {
        document.getElementById('searching').innerHTML = `<p dir="ltr" style="color: green">Test #${testNo}: ${ip} &nbsp; &nbsp; ${ch}</p>`;
      } else {
        document.getElementById('searching').innerHTML = `<p dir="ltr" style="color: red">Test #${testNo}: ${ip}</p>`;
      }
      try {
        const response = await fetch(url, {
          signal: controller.signal,
        });

        testResult++;
      } catch (error) {
        if (error.name === "AbortError") {
          //
        } else {
          testResult++;
        }
      }
      clearTimeout(timeoutId);
    }

    const duration = performance.now() - startTime;

    if (testResult === 5) {
      numberOfWorkingIPs++;
      validIPs.push({ip: ip, location: cdnLocation, time: Math.floor(duration / 5)});
      const sortedArr = validIPs.sort((a, b) => a.time - b.time);
      const tableRows = sortedArr.map(obj => `<tr><td>${obj.ip}</td><td>${obj.location}</td><td>${obj.time}</td><tr>`).join('\n');
      document.getElementById('result').innerHTML = tableRows;
    }

    if (maxIP > 0 && numberOfWorkingIPs >= maxIP) {
      break;
    }
  }
  document.getElementById('searching').innerHTML = `<strong>DONE</strong>`;
}


function cidrToIpArray(cidr) {
  const parts = cidr.split('/');
  const ip = parts[0];
  const mask = parseInt(parts[1], 10);
  const ipParts = ip.split('.');
  const start = (
    (parseInt(ipParts[0], 10) << 24) |
    (parseInt(ipParts[1], 10) << 16) |
    (parseInt(ipParts[2], 10) << 8) |
    parseInt(ipParts[3], 10)
  ) >>> 0; // convert to unsigned int
  const end = (start | (0xffffffff >>> mask)) >>> 0; // convert to unsigned int

  const ips = [];
  for (let i = start; i <= end; i++) {
    const a = (i >> 24) & 0xff;
    const b = (i >> 16) & 0xff;
    const c = (i >> 8) & 0xff;
    const d = i & 0xff;
    ips.push(`${a}.${b}.${c}.${d}`);
  }
  return ips;
}

function randomizeElements(arr) {
  return [...arr].sort(() => 0.5 - Math.random());
}