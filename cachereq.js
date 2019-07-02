self.addEventListener('install',()=>{
    console.log("INSTALLED")
})

self.addEventListener('activate',()=>{
    console.log("ACTIVATED")
})

self.addEventListener('fetch',e=>{
    console.log("Fetching")
    e.respondWith(
        fetch(e.request)
        .then(res => {

            const resClone = res.clone();
            caches.open("foo")
            .then(cache=>{
                cache.put(e.request,resClone)
            })
            console.log("S")
            return res
        })
        .catch(()=> caches.match(e.request).then(res=>{if(res){return res}else{throw "E"}}).catch(()=>{

console.log("NOT IN CACHE")
console.log(navigator.onLine)
 clients.get(e.clientId).then(client=>{client.postMessage({
      msg: "Hey I just got a fetch from you!",
      url: e.request.url
    });
    })

}))
)
})
