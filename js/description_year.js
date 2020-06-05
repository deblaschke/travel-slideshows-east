// getDescription returns description for compilation slide including trip year
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

    // Append trip year if valid dir format
    var dir = path.match(/\/20[0-9]{2}(-[0-9]{2})?[A-Z]*\//gi);
    if (dir != null) {
      if (dir[0].lastIndexOf('-') >= 5 && dir[0].length >= 8) {
        result = result + " (" + dir[0].substring(1,8) + ")";
      } else if (dir[0].length >= 5) {
        result = result + " (" + dir[0].substring(1,5) + ")";
      }
    }
  }

  return result;
}
