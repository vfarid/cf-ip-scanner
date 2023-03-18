const findIP = (function () {
  let runScan = false;
  let validIPs = [];

  function cidrToIpArray() {
    let AllIPs = [];
    for (const cdnLocation in cfIPv4) {
      for (const cidr of cfIPv4[cdnLocation]) {
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
          ips.push({ip: `${a}.${b}.${c}.${d}`, location: cdnLocation});
        }
        AllIPs = AllIPs.concat(ips);
      }
    }  
    return AllIPs;
  }

  function randomizeElements(IPs, max) {
    const randIPs = [...IPs].sort(ip => {
      return ip.location === 'London' ? 0.75 - Math.random() : 0.5 - Math.random();
    });
    return randIPs.slice(0, max);
  }

  async function testIPs(ipList, timeout, maxResults) {
    let testNo = 0;
    let numberOfWorkingIPs = 0;
    validIPs = [];

    for (const el of ipList) {
      if(!runScan) break;
      testNo++;
      var testResult = 0;
      const url = `https://${el.ip}/__down`;
      const startTime = new Date().getTime();
      const controller = new AbortController();
  
      for (const ch of ['', '|', '/', '-', '\\']) {
        const timeoutId = setTimeout(() => {
          controller.abort();
        }, timeout);
        document.querySelector('.status').innerHTML = `Test #${testNo}: ${el.ip} ${ch}`;
        if (ch) {
          document.querySelector('.status').style.color = 'green';
        } else {
          document.querySelector('.status').style.color = 'red';
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
  
      const duration = (new Date().getTime()) - startTime;
      if (testResult === 5) { 
        numberOfWorkingIPs++;
        validIPs.push({ip: el.ip, location: el.location, time: Math.floor(duration / 5)});

        let progress = numberOfWorkingIPs * 100 / maxResults;
        document.querySelector('.progress-bar').style.width = `${progress}%`;
        document.querySelector('.progress-bar').innerHTML = `${progress}%`;

        listResults();
      }
      if (numberOfWorkingIPs >= maxResults) {
        break;
      }
    }
    document.querySelector('.status').innerHTML = `Scan Complete &#x2022 Scanned ${testNo}
    IPs &#x2022 Found ${numberOfWorkingIPs} working IPs`;
    document.querySelector('.start-scan-btn').innerHTML = "Start";
  }

  function listResults() {
    const sortedArr = validIPs.sort((a, b) => a.time - b.time);
    const tableArr = sortedArr.map(obj => {
      return `<tr><td></td><td>${obj.ip}</td><td>${obj.location}</td><td>${obj.time} ms</td>
      <td><button class="copy-btn" title="Copy to clipboard"></button></td></tr>`;
    });

    const tableRows = tableArr.join('\n');
    document.getElementById('best-table').innerHTML = tableArr[0];
    document.getElementById('all-table').innerHTML = tableRows;

    document.querySelectorAll('.copy-btn').forEach(btn => {
      let ip = btn.parentNode.parentNode.childNodes[1].innerHTML;
      btn.addEventListener('click', () => copyToClipboard(ip));
    });
    document.querySelector('.download-btn').addEventListener('click', downloadAsCSV);
  }

  function copyToClipboard(ip) {
    navigator.clipboard.writeText(ip);
  }

  function downloadAsCSV() {
    const csvString = validIPs.map(el => `${el.ip},${el.location},${el.time}`).join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'ip-list.csv');
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return function(start) {
    const timeout = Number(document.getElementById('timeout-list').value);
    const maxScan = Number(document.getElementById('scan-ip-list').value);
    const maxResults = Number(document.getElementById('results-list').value);
    let scanArr = [];
    if(start) {
      runScan = true;
      scanArr = randomizeElements(cidrToIpArray(), maxScan);
      testIPs(scanArr, timeout, maxResults);
    } else {
      runScan = false;
      return undefined;
    }
  }
})();

document.querySelector('.start-scan-btn').addEventListener('click', function () {
  if(this.innerHTML === "Stop") {
    this.innerHTML = "Start";
    findIP(false);
  } else {
    this.innerHTML = "Stop";
    document.querySelector('.progress-bar').style.width = '0%';
    document.querySelector('.progress-bar').innerHTML = '0%';
    findIP(true);
  }
});