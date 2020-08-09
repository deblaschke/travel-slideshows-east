// getDescription returns description for compilation slide including trip name
function getDescription(path) {
  var result = "";

  // path is of format "*/dir/file.jpg"
  // dir is of format "20nn*"
  // file is of format "nnn_picture-description"

  // Process valid paths (must have directory separator and .jpg extension)
  var index = path.lastIndexOf('/');
  if (index >= 0 && path.lastIndexOf('.jpg') > index) {
    var file = path.substring(index + 1, path.lastIndexOf('.'));

    // file begins with "nnn_" for slides
    if (file.match(/^[0-9]{3}_/) && file.length >= 12) {
      // Picture name is first 8 characters after "nnn_"
      result = file.substring(4, 12);

      // Special handling for cellular phone camera picture names
      if (file.match(/^[0-9]{3}_[0-9]{8}T[0-9]{6}/)) {
        result = result + file.substring(13, 19);
      }

      // Handle description if present
      index = file.indexOf('-');
      if (index >= 0) {
        // Picture description is everything after "-"
        var desc = file.substring(index + 1);

        // Replace underscores with spaces
        result = result + " - " + desc.replace(/_/g, ' ');

        // Replace special characters ("[*]") with HTML entity names ("&*;")
        index = file.indexOf('[');
        if (index >= 0 && index < file.indexOf(']')) {
          result = result.replace(/\[/g, '&');
          result = result.replace(/\]/g, ';');
        }

        // Break up description over 80 characters in length into two lines
        if (result.length > 80) {
          index = result.lastIndexOf(" ", 80);
          if (index >= 0) {
            var newResult = result.substring(0, index) + "<BR>" + result.substring(index+1);
            result = newResult;
          }
        }
      }
    }

    // Append trip name if valid dir format
    var dir = path.match(/\/20[0-9]{2}(-[0-9]{2})?[A-Z]*\//gi);
    if (dir != null) {
      var trip = "";

      // Get trip name from dir
      switch (dir[0].slice(1, -1)) {
        // Summer Vacation cases
        case "2007Trip":
        case "2008Trip":
        case "2009Trip":
        case "2011Trip":
        case "2012Trip":
        case "2013Trip":
        case "2014Trip":
        case "2015Trip":
        case "2017Trip":
        case "2018Trip":
        case "2019Trip":
        case "2020Trip":
          trip = dir[0].substring(1, 5) + " Summer Vacation";
          break;

        // Spring Break cases
        case "2014WashDC":
        case "2016WashDC":
        case "2018Colorado":
          trip = dir[0].substring(1, 5) + " Spring Break";
          break;

        // Two-year Winter Break cases
        case "2013-14Florida":
        case "2014-15Arizona":
        case "2018-19Florida":
          trip = dir[0].substring(1, 8) + " Winter Break";
          break;

        // Summer Vacation I cases
        case "2010Trip":
        case "2016Alaska":
          trip = dir[0].substring(1, 5) + " Summer Vacation I";
          break;

        // Summer Vacation II cases
        case "2010Wisconsin":
        case "2016Trip":
          trip = dir[0].substring(1, 5) + " Summer Vacation II";
          break;

        // One-year Winter Break cases
        case "2015NewMexico":
          trip = dir[0].substring(1, 5) + " Winter Break";
          break;

        // Special cases
        case "2016Berlin":
          trip = "2016 Business Trip";
          break;
        case "2019Berlin":
          trip = "2019 Business Trip I";
          break;
        case "2019Cologne":
          trip = "2019 Business Trip II";
          break;
        case "2017Dusseldorf":
        case "2018Dusseldorf":
          trip = "Germany compilation";
          break;
        case "2005Trip":
          trip = "Yellowstone National Park compilation";
          break;
      }

      // Append trip name if one exists
      if (trip.length > 0) {
        result = result + "<BR>(" + trip + ")";
      }
    }
  }

  return result;
}
