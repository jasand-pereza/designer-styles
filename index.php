<?php require('config/config.php'); ?>
<?php require('functions.php'); ?>
<?php require('inc/_header.php'); ?>

<body>
<?php require('inc/controls.php'); ?>
<?php require('inc/help.php'); ?>

<?php 
  /* check if template is set and if so load that specific template */
  $template_key = (array_key_exists('template', $_GET)) ? $_GET['template'] : null;
  load_template($template_key); 
?>

<div style="display: none">
  <div id="inline_content"><pre></pre></div>
</div>

<?php require('inc/_footer.php'); ?>