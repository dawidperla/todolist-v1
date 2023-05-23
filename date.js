module.exports = getYear

function getYear(){
    let data = new Date();
    let options = {
        year: "numeric"
    };
    let year = data.toLocaleDateString("pl-PL", options )
    return year;
}