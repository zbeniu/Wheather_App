export function convertTemperature(celsius, unit){
    switch(unit){
        case 'F':
            return Math.round((celsius * 9/5) + 32);
        case 'K':
            return Math.round(celsius +273.15);

        case 'C':
            default:
                return celsius;
    }
}

export function getUnitSymbol(unit){
    switch(unit){
        case 'F': return '℉';
        case 'K': return 'K';
        case 'C' :
            default: return '℃';
    }
}