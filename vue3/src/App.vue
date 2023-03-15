<template>
  <div class="main">
    <div dir="rtl">
      <div class="d-flex justify-content-center p-5">
        <ve-progress
          :progress="
            (results.length / (numIPs != 'custom' ? numIPs : parseInt(customIPs))) * 100
          "
          :legend-formatter="
            ({ currentValue }) =>
              `${results.length}/${numIPs != 'custom' ? numIPs : parseInt(customIPs)}`
          "
          lineMode="in"
        />
      </div>
      <div v-if="results.length > 1 && result[0].speed != -1" class="p-5 pb-0">
        <label for="">بهترین:</label>
        <div class="d-flex justify-content-center">
          <div
            style="cursor: pointer"
            v-clipboard:copy="results[0].ip"
            v-clipboard:success="onCopy"
          >
            <span class="mr-2 pr-2 pl-2"
              ><svg
                fill="#f8f7f7"
                height="16px"
                width="16px"
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 64 64"
                enable-background="new 0 0 64 64"
                xml:space="preserve"
                stroke="#f8f7f7"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <g id="Text-files">
                    <path
                      d="M53.9791489,9.1429005H50.010849c-0.0826988,0-0.1562004,0.0283995-0.2331009,0.0469999V5.0228 C49.7777481,2.253,47.4731483,0,44.6398468,0h-34.422596C7.3839517,0,5.0793519,2.253,5.0793519,5.0228v46.8432999 c0,2.7697983,2.3045998,5.0228004,5.1378999,5.0228004h6.0367002v2.2678986C16.253952,61.8274002,18.4702511,64,21.1954517,64 h32.783699c2.7252007,0,4.9414978-2.1725998,4.9414978-4.8432007V13.9861002 C58.9206467,11.3155003,56.7043495,9.1429005,53.9791489,9.1429005z M7.1110516,51.8661003V5.0228 c0-1.6487999,1.3938999-2.9909999,3.1062002-2.9909999h34.422596c1.7123032,0,3.1062012,1.3422,3.1062012,2.9909999v46.8432999 c0,1.6487999-1.393898,2.9911003-3.1062012,2.9911003h-34.422596C8.5049515,54.8572006,7.1110516,53.5149002,7.1110516,51.8661003z M56.8888474,59.1567993c0,1.550602-1.3055,2.8115005-2.9096985,2.8115005h-32.783699 c-1.6042004,0-2.9097996-1.2608986-2.9097996-2.8115005v-2.2678986h26.3541946 c2.8333015,0,5.1379013-2.2530022,5.1379013-5.0228004V11.1275997c0.0769005,0.0186005,0.1504021,0.0469999,0.2331009,0.0469999 h3.9682999c1.6041985,0,2.9096985,1.2609005,2.9096985,2.8115005V59.1567993z"
                    ></path>
                    <path
                      d="M38.6031494,13.2063999H16.253952c-0.5615005,0-1.0159006,0.4542999-1.0159006,1.0158005 c0,0.5615997,0.4544001,1.0158997,1.0159006,1.0158997h22.3491974c0.5615005,0,1.0158997-0.4542999,1.0158997-1.0158997 C39.6190491,13.6606998,39.16465,13.2063999,38.6031494,13.2063999z"
                    ></path>
                    <path
                      d="M38.6031494,21.3334007H16.253952c-0.5615005,0-1.0159006,0.4542999-1.0159006,1.0157986 c0,0.5615005,0.4544001,1.0159016,1.0159006,1.0159016h22.3491974c0.5615005,0,1.0158997-0.454401,1.0158997-1.0159016 C39.6190491,21.7877007,39.16465,21.3334007,38.6031494,21.3334007z"
                    ></path>
                    <path
                      d="M38.6031494,29.4603004H16.253952c-0.5615005,0-1.0159006,0.4543991-1.0159006,1.0158997 s0.4544001,1.0158997,1.0159006,1.0158997h22.3491974c0.5615005,0,1.0158997-0.4543991,1.0158997-1.0158997 S39.16465,29.4603004,38.6031494,29.4603004z"
                    ></path>
                    <path
                      d="M28.4444485,37.5872993H16.253952c-0.5615005,0-1.0159006,0.4543991-1.0159006,1.0158997 s0.4544001,1.0158997,1.0159006,1.0158997h12.1904964c0.5615025,0,1.0158005-0.4543991,1.0158005-1.0158997 S29.0059509,37.5872993,28.4444485,37.5872993z"
                    ></path>
                  </g>
                </g></svg
            ></span>
            {{ results[0].ip }}
          </div>
        </div>
      </div>
      <div class="p-5 pt-4 pb-3">
        <label> تعداد آی پی:</label>
        <div class="row mt-3" style="text-align: center">
          <div
            @click="
              num != 'custom' ? (numIPs = num) : (numIPs = 'custom');
              customInput = true;
            "
            class="col-1 bg-light text-dark m-1 p-1 pt-2"
            :style="
              numIPs == num
                ? {
                    background: '#007bff!important',
                    color: 'white!important',
                  }
                : {}
            "
            dir="ltr"
            style="border-radius: 10px; min-width: 100px"
            v-for="num in ['custom', 10, 50, 100, 200, 500, 1000, 10000, 1000000]"
            :key="num"
          >
            {{ num != "custom" ? num : "مقدار دلخواه" + " " }}
          </div>
        </div>
        <hr v-if="numIPs == 'custom'" />
        <div v-if="numIPs == 'custom'" class="col-md-5 col-sm-12">
          <label for="">مقدار دلخواه:</label>
          <input v-model="customIPs" class="form-control mt-2" />
        </div>
      </div>
      <div class="p-5 pt-2">
        <label> حجم دانلود برای تست: </label>
        <div>
          <select
            class="form-select-sm mt-3 col-md-2 col-sm-10"
            v-model="downloadSize"
            style=""
          >
            <option value="262144">256KB</option>
            <option value="524288">512KB</option>
            <option value="1048576">1MB</option>
            <option value="2097152">2MB</option>
            <option value="5242880">5MB</option>
            <option value="10485760">10MB</option>
          </select>
        </div>
      </div>
      <div class="d-flex justify-content-center">
        <button @click="startScan" class="circle-button">شروع</button>
      </div>
    </div>

    <hr />
    <h3 dir="rtl" class="p-2" id="results">نتایج:</h3>
    <div class="d-flex justify-content-center">
      <div style="min-height: 90vh; overflow-y: scroll; overflow-x: hidden">
        <div
          class="row p-2 pt-3"
          style="border-bottom: 1px gray solid; cursor: pointer"
          v-clipboard:copy="result.ip"
          v-clipboard:success="onCopy"
          v-for="result in results"
          :key="result.ip"
        >
          <small class="col-4" :style="{ color: result.color }">{{
            result.speed != -1 ? result.speed + "MB/s" : "Error"
          }}</small
          ><span class="col-5">{{ result.ip }}</span>
          <span class="col-3" style="float: right"
            ><svg
              style="float: right"
              fill="#f8f7f7"
              height="16px"
              width="16px"
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 64 64"
              enable-background="new 0 0 64 64"
              xml:space="preserve"
              stroke="#f8f7f7"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <g id="Text-files">
                  <path
                    d="M53.9791489,9.1429005H50.010849c-0.0826988,0-0.1562004,0.0283995-0.2331009,0.0469999V5.0228 C49.7777481,2.253,47.4731483,0,44.6398468,0h-34.422596C7.3839517,0,5.0793519,2.253,5.0793519,5.0228v46.8432999 c0,2.7697983,2.3045998,5.0228004,5.1378999,5.0228004h6.0367002v2.2678986C16.253952,61.8274002,18.4702511,64,21.1954517,64 h32.783699c2.7252007,0,4.9414978-2.1725998,4.9414978-4.8432007V13.9861002 C58.9206467,11.3155003,56.7043495,9.1429005,53.9791489,9.1429005z M7.1110516,51.8661003V5.0228 c0-1.6487999,1.3938999-2.9909999,3.1062002-2.9909999h34.422596c1.7123032,0,3.1062012,1.3422,3.1062012,2.9909999v46.8432999 c0,1.6487999-1.393898,2.9911003-3.1062012,2.9911003h-34.422596C8.5049515,54.8572006,7.1110516,53.5149002,7.1110516,51.8661003z M56.8888474,59.1567993c0,1.550602-1.3055,2.8115005-2.9096985,2.8115005h-32.783699 c-1.6042004,0-2.9097996-1.2608986-2.9097996-2.8115005v-2.2678986h26.3541946 c2.8333015,0,5.1379013-2.2530022,5.1379013-5.0228004V11.1275997c0.0769005,0.0186005,0.1504021,0.0469999,0.2331009,0.0469999 h3.9682999c1.6041985,0,2.9096985,1.2609005,2.9096985,2.8115005V59.1567993z"
                  ></path>
                  <path
                    d="M38.6031494,13.2063999H16.253952c-0.5615005,0-1.0159006,0.4542999-1.0159006,1.0158005 c0,0.5615997,0.4544001,1.0158997,1.0159006,1.0158997h22.3491974c0.5615005,0,1.0158997-0.4542999,1.0158997-1.0158997 C39.6190491,13.6606998,39.16465,13.2063999,38.6031494,13.2063999z"
                  ></path>
                  <path
                    d="M38.6031494,21.3334007H16.253952c-0.5615005,0-1.0159006,0.4542999-1.0159006,1.0157986 c0,0.5615005,0.4544001,1.0159016,1.0159006,1.0159016h22.3491974c0.5615005,0,1.0158997-0.454401,1.0158997-1.0159016 C39.6190491,21.7877007,39.16465,21.3334007,38.6031494,21.3334007z"
                  ></path>
                  <path
                    d="M38.6031494,29.4603004H16.253952c-0.5615005,0-1.0159006,0.4543991-1.0159006,1.0158997 s0.4544001,1.0158997,1.0159006,1.0158997h22.3491974c0.5615005,0,1.0158997-0.4543991,1.0158997-1.0158997 S39.16465,29.4603004,38.6031494,29.4603004z"
                  ></path>
                  <path
                    d="M28.4444485,37.5872993H16.253952c-0.5615005,0-1.0159006,0.4543991-1.0159006,1.0158997 s0.4544001,1.0158997,1.0159006,1.0158997h12.1904964c0.5615025,0,1.0158005-0.4543991,1.0158005-1.0158997 S29.0059509,37.5872993,28.4444485,37.5872993z"
                  ></path>
                </g>
              </g></svg
          ></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const cfIPv4 = [
  "173.245.48.0/20",
  "103.21.244.0/22",
  "103.22.200.0/22",
  "103.31.4.0/22",
  "141.101.64.0/18",
  "108.162.192.0/18",
  "190.93.240.0/20",
  "188.114.96.0/20",
  "197.234.240.0/22",
  "198.41.128.0/17",
  "162.158.0.0/15",
  "104.16.0.0/13",
  "104.24.0.0/14",
  "172.64.0.0/13",
  "131.0.72.0/22",
];

export default {
  computed: {
    formatter() {
      return "per 100";
    },
  },
  data() {
    return {
      numIPs: 10,
      customIPs: 4000000000,
      downloadSize: "1048576",
      results: [],
      customInput: false,
      sortedResult: [],
    };
  },

  methods: {
    onCopy() {
      alert("Copied to clipboard");
    },
    async startScan() {
      this.results = [];
      const bytes = this.downloadSize;
      const num = this.numIPs != "custom" ? this.numIPs : this.customIPs;
      let ipList = [];
      for (let cidr of cfIPv4) {
        ipList = ipList.concat(this.cidrToIpArray(cidr));
      }
      this.ips = [];
      for (let ip of this.getMultipleRandomElements(ipList, num)) {
        const result = await this.testIP(ip, bytes);
        this.results.push({
          ip,
          speed: result.speed,
          color: result.color,
          error: result.error,
        });
      }
      this.results.sort((a, b) => b.speed - a.speed);
    },
    async testIP(ip, bytes, timeout = 5000) {
      const sniHostname = "speed.cloudflare.com";
      const url = `https://${sniHostname}/__down?bytes=${bytes}`;
      const ts = Date.now();
      const controller = new AbortController();
      const timeoutSignal = controller.signal;
      const timeoutId = setTimeout(() => {
        controller.abort();
      }, timeout);

      const request = new Request(url, {
        method: "GET",
        headers: {
          Host: ip,
          sni: sniHostname,
          servername: sniHostname,
        },
        redirect: "follow",
        mode: "no-cors",
      });

      try {
        await fetch(request, {
          signal: timeoutSignal,
          cf: {
            sni: sniHostname,
          },
        });

        const t = Date.now() - ts;
        const speed = Math.round(bytes / t / 10) / 100;
        const color = speed < 2 ? "orange" : "green";
        clearTimeout(timeoutId);
        this.results.sort((a, b) => b.speed - a.speed);
        return { speed, color, error: -1 };
      } catch (error) {
        clearTimeout(timeoutId);
        if (error.name === "AbortError") {
          console.log("here");
          this.results.sort((a, b) => b.speed - a.speed);
          return { speed: -1, color: "red", error: "Timed out" };
        } else {
          this.results.sort((a, b) => b.speed - a.speed);
          return { speed: -1, color: "red", error: error.message };
        }
      }
    },
    cidrToIpArray(cidr) {
      const parts = cidr.split("/");
      const ip = parts[0];
      const mask = parseInt(parts[1], 10);
      const ipParts = ip.split(".");
      const start =
        ((parseInt(ipParts[0], 10) << 24) |
          (parseInt(ipParts[1], 10) << 16) |
          (parseInt(ipParts[2], 10) << 8) |
          parseInt(ipParts[3], 10)) >>>
        0; // convert to unsigned int
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
    },
    getMultipleRandomElements(arr, num) {
      var shuffled = [...arr].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, num);
    },
  },
};
</script>
<style scoped>
@import url("https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css");
.main {
  font-family: Vazirmatn, sans-serif;
  background: #314864 !important;
  min-height: 100vh;
  color: white;
}
.circle-button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 2px solid #ccc;
  background: linear-gradient(to bottom, #1e90ff, #0080ff);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  color: #fff;
  font-size: 24px;
  font-weight: bold;
  text-transform: uppercase;
}

.circle-button:hover {
  cursor: pointer;
  background: linear-gradient(to bottom, #0080ff, #1e90ff);
}
</style>
