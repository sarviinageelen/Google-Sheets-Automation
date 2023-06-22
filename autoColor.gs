function autoColor() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var range = sheet.getDataRange();
  var formulas = range.getFormulas();
  
  // Reset fill color for all cells, set the font size, font family, and wrap strategy
  sheet.getDataRange().setBackground(null);
  sheet.getDataRange().setFontSize(10);
  sheet.getDataRange().setFontFamily('Arial');
  sheet.getDataRange().setWrapStrategy(SpreadsheetApp.WrapStrategy.CLIP);
  
  // Set the column widths
  sheet.setColumnWidths(1, 3, 50);
  sheet.setColumnWidth(4, 200);
  sheet.setColumnWidths(5, sheet.getLastColumn() - 4, 100);
  
  for(var i=0; i<formulas.length; i++) {
    for(var j=0; j<formulas[i].length; j++) {
      var cell = formulas[i][j];
      var cellValue = cell.toLowerCase();

      if(cell.startsWith('=')) { // Cell contains a formula
        if(cell.includes("importrange") || cell.includes("importdata") || cell.includes("!")) {
          sheet.getRange(i+1, j+1).setFontColor("green");
        } else if(cell.replace('=','').replace(/[^\d.-]/g, '') == cell.replace('=','')) {
          sheet.getRange(i+1, j+1).setFontColor("purple"); 
        } else {
          sheet.getRange(i+1, j+1).setFontColor("black");
        }
      } else if(!isNaN(cell) && cell !== "") { // Cell is numeric
        sheet.getRange(i+1, j+1).setFontColor("blue");
      } else if (cell !== "") { // Cell contains text
        sheet.getRange(i+1, j+1).setFontColor("black");
      }
    }
  }
}
