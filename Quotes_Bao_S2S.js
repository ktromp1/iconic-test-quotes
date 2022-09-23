// Rounds in increments of 50
function round50(x, base = 50){
    return base * Math.round(x / base);
}

// main
function runQuotes(){
    const s2sMax = 900;
    const s2sMin = 400;
    const baoMax = 1800;
    const baoMin = 700;
    const milesMax = 3300;
    const milesMin = 300;
    const s2sVariant = s2sMax - s2sMin;
    const baoVariant = baoMax - baoMin;
    const milesVariant = milesMax - milesMin;
    // asks user for mileage for quote. default 500
    let tripMileage = prompt("Please enter the total mileage of the trip", 500);
    const sTimeFrames = ["2.5 to 3.5 weeks",
    "3 to 4 weeks", "3.5 to 4.5 weeks", "4 to 5 weeks"];
    const bTimeFrames = ["1 to 2 weeks", "1.5 to 2.5 weeks"];
    // finds s2s' quote by comparing the total miles driven and the minimum/maximum quote we have ever received
    const sTripQuote = round50(
        s2sMax - (((milesVariant - tripMileage) / milesVariant) * s2sVariant));
    // finds bao's quote by comparing the total miles driven and the minimum/maximum quote we have ever received
    const bTripQuote = round50(
        baoMax - (((milesVariant - tripMileage) / milesVariant) * baoVariant));
    // shows user what they entered
    document.getElementById("mirroringInput").innerHTML = `<br>You entered: ${tripMileage}<br>`;
    
    if (!tripMileage || isNaN(tripMileage)){
        document.getElementById("quotes").innerHTML = `<br>Please make sure to enter a value.<br>`;
        document.getElementById("clientCopyPaste").innerHTML = ``;        
        return;
    }
    
    if (tripMileage <= 200){
        document.getElementById("quotes").innerHTML = `<br>We likely can use an Iconic Sprinter Van for this trip.<br>`;
        document.getElementById("clientCopyPaste").innerHTML = ``;        
        return;
    }
    if (tripMileage >= 3750){
        document.getElementById("quotes").innerHTML = `<br>Unfortunately, this would likely be an international shipment. Check in with Shippio for Europe shipments, Bikes Abroad for Australia shipments, Skyline for Africa shipments, and TFX for Canada shipments<br>`;
        document.getElementById("clientCopyPaste").innerHTML = ``;
        return;
    }
    // prints the cost to us
    document.getElementById("quotes").innerHTML = `<br>Bao quote to Iconic: ${bTripQuote}<br>Bao timeframe: Roughly ${bTimeFrames[bTiming(tripMileage)]}<br>Extras are would be included in the above price (nothing extra).<br><br>S2S quote to Iconic: ${sTripQuote}<br>S2S timeframe: Roughly ${sTimeFrames[sTiming(tripMileage)]}<br>Extras would increase the price by $25 - $100, depending on how much space they take.<br><br><br>`;
    // prints the formatted text we can include in the email
    document.getElementById("clientCopyPaste").innerHTML = `<br>Here is the format to paste to the client:<br><br>$${bTripQuote}(NEEDS MARKUP) - Roughly ${bTimeFrames[bTiming(tripMileage)]} - Private Shipper<br>$${sTripQuote}(NEEDS MARKUP) - Roughly ${sTimeFrames[sTiming(tripMileage)]} - Private Shipper<br>$TBD - Roughly 5 - 9 weeks - Haulbikes`;
    

}
// uses mileage of trip to find the index needed for string of sTimeFrames
function sTiming(miles){
    if (miles >= 300 && miles < 750) return 0;
    else if (miles <= 1499) return 1;
    else if (miles <= 2249) return 2;
    else return 3;
}
// uses mileage of trip to find the index needed for string of bTimeFrames
function bTiming(miles){
    return miles >= 2000 ? 1 : 0;
}
