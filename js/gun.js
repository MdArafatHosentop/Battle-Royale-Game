let ammo = 30;
let reloading = false;

function shoot(){
    if(ammo > 0 && !reloading){
        ammo--;
        document.getElementById("ammo").innerText = "AK47 Ammo: " + ammo;
    }
}

function reload(){
    if(!reloading){
        reloading = true;
        setTimeout(()=>{
            ammo = 30;
            document.getElementById("ammo").innerText = "AK47 Ammo: " + ammo;
            reloading = false;
        },2000);
    }
}
