let zoneSize = 200;

function updateZone(){
    setInterval(()=>{
        zoneSize -= 5;
        if(Math.abs(player.position.x) > zoneSize){
            alert("Outside Safe Zone!");
        }
    },5000);
}
