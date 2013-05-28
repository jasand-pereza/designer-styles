<?php

/**
 * Get all script files from array
 * @param $path string
 * @param $scripts array
 * @return string HTML
*/
function get_scripts($path, $scripts) {
  $output='';
  foreach($scripts as $script):
    $output.='<script type="text/javascript" src="'.$path.'/'.$script.'"></script>'. "\r\n";
  endforeach;
  return $output;
}


/**
 * Get all stylesheet files from array
 * @param $path string
 * @param $styles array
 * @return string HTML
*/
function get_styles($path, $styles) {
  $output='';
  foreach($styles as $style):
    $output.='<link rel="stylesheet type="text/css" href="'.$path.'/'.$style.'">'."\r\n";
  endforeach;
  return $output;
}


/**
 * load a template
 * @param $template_key string
*/
function load_template($template_key) {
  switch($template_key):
    case 'blog':
      require('templates/blog_template.php');
    break;
    case 'form':
      require('templates/form_template.php');
    break;
    default:
      require('templates/blog_template.php');
  endswitch;
}


/**
 * Get the page title
 * @return string HTML
*/
function get_title() {
  return TEXT_APP_TITLE.' - '.TEXT_APP_DESCRIPTION;
}
