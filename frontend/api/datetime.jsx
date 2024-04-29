function GetDateTime(){
    const cd = new Date();
    const yr = cd.getFullYear();
    const mo = String(cd.getMonth()+1).padStart(2, '0')
    const dy = String(cd.getDate()).padStart(2, '0')
    const ho = String(cd.getHours()).padStart(2, '0')
    const mn = String(cd.getMinutes()).padStart(2, '0')
    const sc = String(cd.getSeconds()).padStart(2, '0')

    const DateTime = `${yr}-${mo}-${dy}-${ho}-${mn}-${sc}`
    return DateTime
}

export default GetDateTime