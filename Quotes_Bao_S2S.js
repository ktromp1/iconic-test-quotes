function round50(x, base = 50){
    return base * Math.round(x / base);
}

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
    // tripMileage = int(input("\n\nMiles?\n\n\n")) in python
    let tripMileage = prompt("Please enter the total mileage of the trip");
    const sTimeFrames = ["2 to 3 weeks",
    "2.5 to 3.5 weeks", "3 to 4 weeks"];
    const bTimeFrames = ["1 to 2 weeks", "1.5 to 2.5 weeks"];
    const sTripQuote = round50(
        s2sMax - (((milesVariant - tripMileage) / milesVariant) * s2sVariant));
    const bTripQuote = round50(
        baoMax - (((milesVariant - tripMileage) / milesVariant) * baoVariant));
    if (tripMileage<=200){
        document.getElementById("quotes").innerHTML = `<br>We likely can use an Iconic Sprinter Van for this trip.<br>`;
        return;
    }
    if (tripMileage>=3750){
        document.getElementById("quotes").innerHTML = `<br>Unfortunately, this would likely be an international shipment. Check in with Shippio for Europe shipments, Bikes Abroad for Australia shipments, Skyline for Africa shipments, and TFX for Canada shipments<br>`;
        return;
    }
    document.getElementById("quotes").innerHTML = `<br>Bao quote to Iconic (without markup): ${bTripQuote}<br>Bao timeframe: Roughly ${bTimeFrames[bTiming(tripMileage)]}<br>S2S quote to Iconic (without markup): ${sTripQuote}<br>S2S timeframe: Roughly ${sTimeFrames[sTiming(tripMileage)]}<br><br><br>`;
    document.getElementById("clientCopyPaste").innerHTML = `<br>Here is the format to paste to the client:<br><br>$${bTripQuote}(NEEDS MARKUP) - Roughly ${bTimeFrames[bTiming(tripMileage)]} - Private Shipper<br>$${sTripQuote}(NEEDS MARKUP) - Roughly ${sTimeFrames[sTiming(tripMileage)]} - Private Shipper<br>$TBD - Roughly 5 - 6 weeks - Haulbikes`;
    /** 
     * doc write the following:
     * print("\n\n\nBao quote to Iconic (without markup): {}\nBao timeframe: Roughly {}\nS2S quote to Iconic (without markup): {}\nS2S timeframe: Roughly {}\n\n\n".format(
        bTripQuote, bTimeFrames[bTiming(tripMileage)], sTripQuote, sTimeFrames[sTiming(tripMileage)]))
    print("\nHere is the format to paste to the client:\n\n${}(NEEDS MARKUP) - Roughly {} - Private Shipper\n${}(NEEDS MARKUP) - Roughly {} - Private Shipper\n$TBD - Roughly 5 - 6 weeks - Haulbikes\n\n\n".format(
        bTripQuote, bTimeFrames[bTiming(tripMileage)], sTripQuote, sTimeFrames[sTiming(tripMileage)]))
    */
    

}

function sTiming(miles){
    if (miles >= 300 && miles < 750) return 0;
    else if (miles >= 751 && miles <= 1500) return 1;
    else return 2;
}

function bTiming(miles){
    return miles >= 2000 ? 1 : 0;
}
