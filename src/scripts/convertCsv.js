import csvToJson from 'convert-csv-to-json'

let fileInputName =  '/home/john/Documents/Projects/ny_car_crash_map/public/collision-data.csv'
let fileOutputName = '/home/john/Documents/Projects/ny_car_crash_map/public/collision-data.json'

console.log("Converting CSV to JSON...")

csvToJson
    .supportQuotedField(true)
    .fieldDelimiter(',')
    .generateJsonFileFromCsv(fileInputName, fileOutputName);