function checkSheets() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();

  // Get the source and target sheets
  var sourceSheet = spreadsheet.getSheetByName('New Malaysia');
  var targetSheet = spreadsheet.getSheetByName('Kuala Lumpur');

  // Duplicate the target sheet and name it as "Check_<target_sheet_name>"
  var checkSheet = targetSheet.copyTo(spreadsheet);
  checkSheet.setName("Check_" + targetSheet.getName());

  // Get all the values from the source and target sheets
  var sourceValues = sourceSheet.getDataRange().getValues();
  var targetValues = targetSheet.getDataRange().getValues();

  // Store source values in a map for faster lookups
  var sourceMap = new Map();
  for (var i = 0; i < sourceValues.length; i++) {
    for (var j = 0; j < sourceValues[i].length; j++) {
      if (typeof sourceValues[i][j] == 'number') {
        sourceMap.set(sourceValues[i][j], [i + 1, j + 1]);  // store row and column indices
      }
    }
  }

  // Clear numeric values in the check sheet and set formulas
  for (var i = 0; i < targetValues.length; i++) {
    for (var j = 0; j < targetValues[i].length; j++) {
      if (typeof targetValues[i][j] == 'number') {
        var cell = checkSheet.getRange(i + 1, j + 1);
        cell.setValue('');
        if (sourceMap.has(targetValues[i][j])) {
          var sourceCoords = sourceMap.get(targetValues[i][j]);
          var targetCell = "'" + targetSheet.getName() + "'!" + targetSheet.getRange(i + 1, j + 1).getA1Notation();
          var sourceCell = "'" + sourceSheet.getName() + "'!" + sourceSheet.getRange(sourceCoords[0], sourceCoords[1]).getA1Notation();
          cell.setFormula(targetCell + '=' + sourceCell);
        }
      }
    }
  }

  // Reset fill color in the check sheet
  checkSheet.getDataRange().setBackground(null);

  // Apply conditional formatting to the check sheet
  var range = checkSheet.getDataRange();
  var ruleTrue = SpreadsheetApp.newConditionalFormatRule()
    .whenFormulaSatisfied('=AND(A1<>"" , A1=TRUE)')
    .setBackground("green")
    .setRanges([range])
    .build();
  var ruleFalse = SpreadsheetApp.newConditionalFormatRule()
    .whenFormulaSatisfied('=AND(A1<>"" , A1=FALSE)')
    .setBackground("red")
    .setRanges([range])
    .build();
  
  var rules = checkSheet.getConditionalFormatRules();
  rules.push(ruleTrue);
  rules.push(ruleFalse);
  checkSheet.setConditionalFormatRules(rules);
}
