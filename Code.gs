
//spreadsheet 
var ss = SpreadsheetApp.getActiveSpreadsheet();

//worksheets 
var todoList = ss.getSheetByName("To-Do List");
var oneTime = ss.getSheetByName("One Time Tasks");
var repeated = ss.getSheetByName("Repeated Tasks");
var calls = ss.getSheetByName("Phone Calls");


//ranges 
var dailies = todoList.getRange("a6:d22").getValues();
var weeklies = todoList.getRange("e6:h22").getValues();
var other = todoList.getRange("i6:l22").getValues();
var phoneCalls = todoList.getRange("m6:p22").getValues();





function moveData(){

// 1. Checks if checkbox if checkbox has been checked
var dailyData = dailies.filter(row => row[0] === true);
var weeklyData = weeklies.filter(row => row[0] === true); 
var otherData = other.filter(row => row[0] === true); 
var phoneCallData = phoneCalls.filter(row => row[0] === true); 

// 2. Send checked tasks to other tabs 
var dailyTarget = repeated.getRange(6, 1, dailyData.length, 4);
dailyTarget.setValues(dailyData);
var weeklyTarget = repeated.getRange(6, 5, weeklyData.length, 4);
weeklyTarget.setValues(weeklyData);
var otherTarget =oneTime.getRange(6, 1, otherData.length, 4);
otherTarget.setValues(otherData);
var phoneCallTarget = calls.getRange(6, 1, phoneCallData.length, 4);
phoneCallTarget.setValues(phoneCallData);


// 2. Move down tasks in target sheet 
dailyTarget.insertCells(SpreadsheetApp.Dimension.ROWS);
weeklyTarget.insertCells(SpreadsheetApp.Dimension.ROWS);
otherTarget.insertCells(SpreadsheetApp.Dimension.ROWS);
phoneCallTarget.insertCells(SpreadsheetApp.Dimension.ROWS);

// 3. Remove completed tasks from ToDo sheet 
var clearRange1 = [];
dailies.forEach(function(e,i){
  if(e[0] === true){
  clearRange1.push("B"+(i +6)+":"+"D"+(i +6)); 
  }; 
});
var clearRange2 = [];
weeklies.forEach(function(e,i){
  if(e[0] === true){
  clearRange2.push("F"+(i +6)+":"+"H"+(i +6));
  }; 
});
var clearRange3 = [];
other.forEach(function(e,i){
  if(e[0] === true){
  clearRange3.push("J"+(i +6)+":"+"L"+(i +6));
  }; 
});
var clearRange4 = [];
phoneCalls.forEach(function(e,i){
  if(e[0] === true){
  clearRange4.push("N"+(i +6)+":"+"P"+(i +6));
  }; 
});

todoList.getRangeList(clearRange1).clearContent();
todoList.getRangeList(clearRange2).clearContent();
todoList.getRangeList(clearRange3,).clearContent();
todoList.getRangeList(clearRange4).clearContent();
todoList.getRange("a6:m22").uncheck();
}


function onEdit(e){
  var row = e.range.getRow();
  var col = e.range.getColumn();
  
  if(col == 1 && e.source.getActiveSheet().getName() === "To-Do List"){
  e.source.getActiveSheet().getRange(row,4).setValue(new Date());
  };
  
  if(col == 5 && row > 1 && e.source.getActiveSheet().getName() === "To-Do List"){
   e.source.getActiveSheet().getRange(row,8).setValue(new Date());
  };
  
  if(col == 9 && row > 1 && e.source.getActiveSheet().getName() === "To-Do List"){
   e.source.getActiveSheet().getRange(row,12).setValue(new Date());
  };
  
  if(col == 13 && row > 1 && e.source.getActiveSheet().getName() === "To-Do List"){
   e.source.getActiveSheet().getRange(row,16).setValue(new Date());
  };
 
}


 function test(){
  var lr = repeated.getLastRow();
  var repeatedTasks = repeated.getRange(6, 2, lr).getValues();
  Logger.log(removeDups(repeatedTasks))

}
 
 
function removeDups(arr){
 var newArr = [];
 arr.sort(); 
 for(var n in arr){
   if(newArr[newArr.length -1]!=arr[n]){
       newArr.push(arr[n]);
       }
     }
  return newArr
  }
   

 



  










