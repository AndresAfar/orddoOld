

const valEmail=(email)=>{

    return /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(email.trim());
}

const valPass=(password)=>{
    return /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(password.trim());
}

const valUser=(user)=>{
    return /^[a-z0-9_-]{3,16}$/.test(user.trim());
}

const  valName=(name)=>{
    return /^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/.test(name.trim());
}
const  valNameLast=(lastName)=>{
    return /^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/.test(lastName.trim());
}

const valNum=(number)=>{
    return /^[0-9]+$/.test(number.trim());
}

const valDNI=(docu)=>{
    return /^[0-9]+$/.test(docu.trim());
}