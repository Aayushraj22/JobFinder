function getCurrentDateTime() {
    const date = new Date();
    return date.toISOString();  // dateTime string 2024-08-02T17:34:24.974Z
}

function getTodayDate(){
    return new Date().toLocaleDateString(); // data string dd/mm/yyyy
}



function redirectToDestination(currentLocation, endpoint, id ) {
    // console.log('curLoc: ',currentLocation);

    const destination = `${currentLocation}${endpoint ? `/${endpoint}` : ''}${id ? `/${id}` : ''}`
    // console.log(`destination: `,destination )
    window.location.href = destination;
}

function isAutherised(req) {
    let isAutherised = false;
    if(req.session.user){
        isAutherised = true;
    }

    return isAutherised;
}


function hasCookie(req){
    let lastvisit = req.cookies.lastVisit;
    const currentTime = Date.now()

    console.log('last visit: ',lastvisit, ' and current time : ',currentTime)

    let result = undefined;

    if(lastvisit){
        lastvisit = new Date(lastvisit);
        const timeDifferenceMs =  Math.abs(currentTime - lastvisit);
        const DAY_IN_MILLISECONDS = 24 * 3600 * 1000; // 1 day in milliseconds
        const daysDifference = Math.ceil(timeDifferenceMs / DAY_IN_MILLISECONDS);

        result = daysDifference;
    }

    
    console.log('result : ',result)
    return result;
}

export {getCurrentDateTime, getTodayDate, redirectToDestination, isAutherised, hasCookie}