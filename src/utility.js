function getCurrentDateTime() {
    const date = new Date();
    return date.toISOString();  // dateTime string 2024-08-02T17:34:24.974Z
}

function getTodayDate(){
    return new Date().toLocaleDateString(); // data string dd/mm/yyyy
}



function redirectToDestination(currentLocation, endpoint, id ) {
    // console.log('curLoc: ',currentLocation);

    const destination = `${currentLocation}${endpoint ? `/${endpoint}/` : '/'}${id}`
    // console.log(`destination: `,destination )
    window.location.href = destination;
}

export {getCurrentDateTime, getTodayDate, redirectToDestination, }