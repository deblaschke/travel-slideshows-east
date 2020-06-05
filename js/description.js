// getDescription returns description for regular slide
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
  }

  return result;
}
