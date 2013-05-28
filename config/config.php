<?php 

/* Config file */


define('LOCAL_ABS_PATH', '/* your local abs path here */');

// constants
define('PRODUCTION_URL','/* add yours here */');
define('LOCAL_DEV_URL', 'designer-styles.dev');
define('LOCAL_ROOT', LOCAL_ABS_PATH);
define('ENVIRONMENT', (($_SERVER['SERVER_NAME'] == PRODUCTION_URL) ? 'production' : 'local_dev'));
define('ABSPATH', ((ENVIRONMENT == 'production') ? '/* replace */' :  LOCAL_ROOT));
define('PROJECT_ROOT','');
define('BG_UPLOADS_DIR','bg-uploads');
define('CSS_DIR','css');
define('TEMPLATES_DIR','templates');
define('JS_DIR', 'js');
define('INC_DIR','inc');
define('IMAGES_DIR', 'images');
define('TEXT_APP_TITLE', 'stylekit');
define('TEXT_APP_DESCRIPTION', 'an HTML/CSS create and export tool for designers');

$scripts = array(
  'jquery-1.8.0.min.js',
  'jquery-ui-1.8.23.custom.min.js',
  'farbtastic/farbtastic.js',
  'colorbox/jquery.colorbox.js',
  'global.js',
  'fileuploader.js',
  'jquery.livequery.min.js'
);

$styles = array(
  'farbtastic.css',
  'colorbox.css',
  'ui-lightness/jquery-ui-1.8.23.custom.css',
  'fileuploader.css',
  'style.css'
);
