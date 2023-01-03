const gernRandom = (max)=>{
    return Math.floor(Math.random()*(max))
}

async function sleep(ms) {
    return new Promise(r => setTimeout(r, ms));
}

export {gernRandom,sleep}