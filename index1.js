htmlelements = {
    response:function(){
        return document.getElementById("response")
    },
    get_url:function(){
        return document.getElementById("get_url").value
    }
}

function get_response(){ 
    var xtp = new XMLHttpRequest
    xtp.onreadystatechange = function(){
        if(this.status=404){
            document.getElementById('response').innerHTML=this.statusText
        }
        if(this.status=200 && this.readyState==4){
            if(this.responseText == "INVALID PROTOCOL"){
                document.getElementById('response').innerHTML=this.responseText    
            }
            else if(this.responseText){
                document.getElementById('response').innerHTML=this.responseText
                
                if(document.getElementById("download")){
                    btn=document.getElementById("download")
                    btn.innerHTML = htmlelements.get_url()
                    btn.setAttribute("onClick", "download_file()");
                    
                }
                else{
                    var btn = document.createElement("button"); 
                    btn.id = "download" 
                    btn.innerHTML = htmlelements.get_url()
                    btn.setAttribute("onClick", "download_file()");                
                    document.body.appendChild(btn);
                }
            }
            else{
                if(navigator.onLine)
                document.getElementById('response').innerHTML = this.responseText
               
            }
        }        
    }

    xtp.onerror= function(){
        document.getElementById('response').innerHTML=this.statusText
    }
    
    xtp.open("get","/url?f="+htmlelements.get_url())
    xtp.send()
    
}

function download_file(){
    
    var xtp = new XMLHttpRequest
    xtp.open("get","file?f="+document.getElementById('response').innerHTML)
    xtp.responseType="blob"
    xtp.onload = function (event) {
        var blob = xtp.response;
        var link=document.createElement('a');
        link.href=window.URL.createObjectURL(blob);
        link.download="file.txt";
        link.innerHTML = "LINK"
        link.click();
     };
    xtp.send()
}

window.addEventListener('online',()=>{
    document.getElementById("online").innerHTML = "Connection established"
    document.getElementById("btn").disabled = false
})

window.addEventListener('offline',()=>{
    document.getElementById("online").innerHTML = "No Internet"
})

window.addEventListener('load',()=>{
    navigator.serviceWorker.register("/cachereq.js").then(e=>{
        console.log("REGISTERED")
    })
})

navigator.serviceWorker.addEventListener('message', async function(event) {
  var data  =event.data.url.split('f=')[1]
  console.log(data)
  var res = await wait_for_connection(data)
  
});

function wait_for_connection(data){
    return new Promise(res=>{
        window.addEventListener('online',()=>{
            get_response()
            resolve()
        })
    })
}