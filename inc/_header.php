<!DOCTYPE html>
<html>
<head>
  <title><?php echo get_title(); ?></title>
  <?php echo get_styles(CSS_DIR, $styles); ?>
  <?php echo get_scripts(JS_DIR, $scripts); ?>
<script>        

var storeData;

function createUploader() {
  var uploader = new qq.FileUploader({
    element: document.getElementById('file-uploader-demo1'),
    action: '../inc/file-uploader/do-nothing.php',
    uploadButtonText: 'background image',
    onComplete: function(id, fileName, response) {
      $('#container #c-bg').css('background', 'url("../bg-uploads/' + fileName + '")');
    },
    debug: true
  });
}

window.onload = createUploader;
$(function() {
  $('#container #c-bg').draggable();
  $('#user-editable').draggable();
});

</script>
</head>