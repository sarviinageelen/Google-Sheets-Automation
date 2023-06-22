function splitSheets() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName('New Malaysia');
  
  var i = 2; // Start from second occurrence
  while(true){
    // Get city name
    var data = sheet.getRange('D:D').getValues();
    var count = 0;
    var cityName = null;
    for(var j = 0; j < data.length; j++) {
      if(data[j][0] == 'Gross revenue') {
        count++;
        if(count == i) {
          cityName = data[j-1][0];
          break;
        }
      }
    }
    if(cityName == null) break;

    // Get range to copy
    var data = sheet.getRange('C:D').getValues();
    var grossRevenueCount = 0;
    var costCount = 0;
    var startRow = 0;
    var endRow = 0;
  
    for(var j = 0; j < data.length; j++) {
      if(data[j][1] == 'Gross revenue') {
        grossRevenueCount++;
        if(grossRevenueCount == i) {
          startRow = j;
        }
      }
      if(data[j][1] == 'Cost' && data[j][0] == 'Others') {
        costCount++;
        if(costCount == i && grossRevenueCount == i) {
          endRow = j;
          break;
        }
      }
    }

    if(startRow != 0 && endRow != 0){
      var newSheet = spreadsheet.insertSheet();
      newSheet.setName(cityName);

      // Copy values only, ignoring formulas
      var firstRange = sheet.getRange("A1:U4");
      firstRange.copyTo(newSheet.getRange("A1"), {contentsOnly: true});

      var rangeToCopy = sheet.getRange(startRow + 1, 1, endRow - startRow + 1, 21);
      var pasteRange = newSheet.getRange(newSheet.getLastRow() + 1, 1);
      rangeToCopy.copyTo(pasteRange, {contentsOnly: true});

      // Copy format separately
      firstRange.copyFormatToRange(newSheet, 1, 21, 1, 4);
      rangeToCopy.copyFormatToRange(newSheet, 1, 21, pasteRange.getRow(), pasteRange.getRow() + rangeToCopy.getNumRows() - 1);
    } else {
      break;
    }
    
    i++;
  }
}
