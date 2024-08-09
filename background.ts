
// const config = {
//     mode: "fixed_servers",
//     rules: {
//         singleProxy: {
//             scheme: "http",
//             host: "185.105.108.169",
//             port: 3128
//         },
//         bypassList: ["<all_urls>"]
//     }
// };

function FindProxyForURL(url, host) {
    // use proxy for specific domains
    const regexp = new RegExp("^youtube.com.*$")
    console.log(url, 'url')
    console.log(host, 'host')
    if (host.includes('youtube') || host.includes("googlevideo.com") || host.includes("whatismyipaddress.com"))
        return "PROXY 185.105.108.169:3128";

    // by default use no proxy
    return "DIRECT";
}

const config = {
    mode: "pac_script",
    pacScript: {
        data: FindProxyForURL.toString()
    }
};



const main = async () => {

    chrome.runtime.onInstalled.addListener(() => {
        chrome.proxy.settings.set(
            { value: config, scope: "regular" },
            (v) => console.log(v)
        );
        chrome.proxy.settings.get(
        {'incognito': false},
        function(nconf) {
          console.log(JSON.stringify(nconf));
        }
      );
    })
}

main()
