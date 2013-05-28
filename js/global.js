/* global ,TODO: if production, add this to the $ namespace below */
var selected_object = new Array();
var so_inc = 0;
var clickedElements = new Array();
var c_e = 0;
var unit = "px";
var templateType = null;

$(function() {
  var sidebar = $('#sidebar');
  var sidebar_contraction = (-sidebar.width() + 25);
  var sidebar_expand = ((sidebar.width() - 20) + sidebar.offset().left);
  var side_toggle_button = sidebar.find('button.toggle').data('closed', 'true');
  var editable_area = $('#user-editable');
  var multiple_selections = false;
  templateType = (($('#user-editable').hasClass('form_template')) ? 'tform' : 'tblog');

  /* sidebar events */
  side_toggle_button.click(function() {
    var $this = $(this);

    /* if closed, open */
    if ($(this).data('closed') == 'true') {
      sidebar.animate({
        'left': sidebar_expand
      }, 200, function() {
        $this.data('closed', 'false');
      });
      side_toggle_button.text('close');
      sidebar.find('#sidebar-internal').fadeIn(200);
    }

    /* if open, close */
    if ($(this).data('closed') == 'false') {
      sidebar.animate({
        'left': sidebar_contraction
      }, 200, function() {
        $this.data('closed', 'true');
      });
      side_toggle_button.text('open');
      sidebar.find('#sidebar-internal').fadeOut(200);
    }
  })


  /* highlight editable objects */
  editable_area.find('*').live('hover', function() {
    $(this).addClass('hovered');
    $this = $(this);
    $(this).mouseleave(function() {
      $this.removeClass('hovered');
    })
  });



  /* disable links */
  editable_area.find('#user-editable a').live('click', function(e) {
    e.preventDefault();
  });

  /* global document keydown events */
  $(document).live('keydown', function(e) {

    /* unselect DOM objects if escape or alt + delete are pressed */
    if ((e.which == "8" && e.altKey) || e.which == "27") {
      $('#user-editable').find('.edit').removeClass('this-active');
      selected_object = new Array();
      multiple_selections = false;
      $('#identifier').text('nothing selected');
    }
    if (e.which == "9") $('.toggle').trigger('click');
  });


  /* keep all in (a) except for (b) and return a new array */

  function sort_out(a, b) {
    var d = new Array();
    for (c in a) {
      if (a[c][0].tagName != b) {
        d[c] = a[c];
      }
    }
    return d[0];
  }

  /* find and highlight/select all the same of @param obj */

  function find_and_select_like_items(obj) {
    var thisType = (obj[0].tagName).toLowerCase();
    $(thisType).addClass('this-active');
    if (multiple_selections) {
      selected_object[so_inc] = $('#user-editable ' + thisType);
      $('#identifier').text('selected: ' + thisType);
    }
    if (!multiple_selections) {
      selected_object = new Array($('#user-editable ' + thisType));
      $('#identifier').text('selected: ' + thisType);
      form_get_object_styles($(thisType));
    }
  }

  /* convert rgb to hex when css form updates */

  function colorToHex(color) {
    if (color.substr(0, 1) === '#') {
      return color;
    }
    var digits = /(.*?)rgb\((\d+), (\d+), (\d+)\)/.exec(color);
    var red = parseInt(digits[2]);
    var green = parseInt(digits[3]);
    var blue = parseInt(digits[4]);
    var rgb = blue | (green << 8) | (red << 16);
    return digits[1] + '#' + rgb.toString(16);
  };

  function strip(obj_value, b) {
    return ((obj_value.search(b) > -1) ? obj_value.replace(b, '') : obj_value);
  }

  function make_temp_resizable(o) {
    o.resizable();
  }

  /* update all form objects upon clicking a DOM object */

  function form_get_object_styles(obj) {
    $('select[name="font"]').val(obj.css("font-family"));
    $('select[name="font-size"]').val(obj.css("font-size"));
    $('select[name="font-weight"]').val(obj.css("font-weight"));
    $('select[name="line-height"]').val(obj.css("line-height"));
    $('#slider').slider('value', obj.css('letter-spacing'), 'px');
    $.farbtastic('#colorpicker').setColor(colorToHex(obj.css('color')));
  }

  /* events for when a DOM object gets clicked */
  editable_area.find('.edit').live('click', function(e) {
    clickedElements[c_e] = $(this);
    c_e++;
    if (clickedElements.length > 1) {
      var $this = ((templateType == 'tform') ? sort_out(clickedElements, "FORM") : sort_out(clickedElements, "P"));
    } else {
      var $this = $(this)
    }

    if (e.metaKey) {
      $this.resizable();
    }

    if (e.altKey) {
      $this.addClass('this-active');
      selected_object[so_inc] = $this;
      multiple_selections = true;
      find_and_select_like_items($this);
      so_inc++;
    } else {
      editable_area.find('.edit').removeClass('this-active');
      $this.addClass('this-active');
      selected_object = new Array($this);
      find_and_select_like_items($this);
      multiple_selections = false;
      so_inc = 0;
    }
    setTimeout(function() {
      clickedElements = new Array();
      c_e = 0;
    })
  });


  /* on keyup disable the object array */
  $(document).live('keyup', function(e) {
    if (e.which == "91") {
      multiple_selections = false;
    }
    if (e.metaKey == false) $(".edit").resizable("destroy");
  });


  /* create editable objects */
  editable_area.find('strong, b, li, em, a, sub, sup, h1, h2, h3, h4, h5, h6').live('dblclick', function() {
    $(this).after('<input type="text" name="temp" class="temp" value ="' + $(this).text() + '"/>');
    $(this).hide();
    var $this = $(this);
    $(this).next('.temp').trigger('focus');



  });

  $('.temp').live('mouseout', function() {
    var $this = $(this);
    setTimeout(function() {
      $this.prev().html($this.val());
      if ($this.prev().hasClass('noedit')) return;
      console.info('test');
      $('#user-editable').find('.edit').show();
      console.info($this);
      $this.remove();
    }, 300);

  });

  /* hiding/displaying a DOM objects input */
  editable_area.find('input').live('focusout', function() {
    if ($(this).hasClass('noedit')) return;
    $(this).prev().show();
    $(this).hide();
    $(this).prev().text($(this).val());
  });

  editable_area.find('input').live('keydown', function(e) {
    if (e.which == '13') {
      $(this).prev().text($(this).val());
      $(this).prev().show();
      $(this).hide();
    }
  });


  /* form events */
  $('select[name="font"]').change(function() {
    if ($(this).val() == "'Comic Sans MS', cursive, sans-serif") alert("Use this font, and you will be fired!");
    for (b in selected_object) {
      selected_object[b].css('font-family', $(this).val());
      update_css_array(css_array, selected_object[b], 'font-family', $(this).val());
    }

  });

  $('select[name="font-size"]').change(function() {
    for (b in selected_object) {
      selected_object[b].css('font-size', $(this).val());
      update_css_array(css_array, selected_object[b], 'font-size', $(this).val() + unit);
    }
  });

  $('select[name="line-height"]').change(function() {
    for (b in selected_object) {
      selected_object[b].css('line-height', $(this).val());
      update_css_array(css_array, selected_object[b], 'line-height', $(this).val() + unit);
    }
  });

  $('select[name="font-weight"]').change(function() {
    for (b in selected_object) {
      selected_object[b].css('font-weight', $(this).val());
      update_css_array(css_array, selected_object[b], 'font-weight', $(this).val());
    }
  });

  $('textarea[name="inline-css-styles"]').keydown(function(e) {
    if (e.which == "13") {
      for (b in selected_object) {
        selected_object[b].attr('style', $(this).val());
      }
    }
  });

  $('button#export').click(function() {
    loop_and_get_inline_styles();
    mystyles = convert_object_style_to_string(mystyles);
    $css_out = make_css_from_object();
    $('#inline_content pre').text($css_out);;
    $.colorbox({
      inline: true,
      width: '90%',
      height: '80%',
      href: '#inline_content'
    });
  });

  $('button#export-file').click(function() {
    export_document($('#container'));
  });

  $('button#import-file').click(function() {
    load_file();
  });
});

$(function() {
  var shortcuts_help = $('#shortcuts_help div');
  $('#shortcuts_link').click(function() {
    $.colorbox({
      inline: true,
      width: '50%',
      height: '40%',
      href: shortcuts_help
    });
  });
});

/* third party plugins */
$(document).ready(function() {

  $('#container #c-bg').draggable();
  $('#user-editable').draggable();

  /* farbtastic colorpicker */
  $('#colorpicker').farbtastic(function callback(color) {
    for (b in selected_object) {
      selected_object[b].css('color', color);
      update_css_array(css_array, selected_object[b], 'color', color);

    }
  });

  /* jQuery ui - slider - letter-spacing */
  $("#slider-letter-spacing").slider({
    slide: function(event, ui) {
      var thisValue = ui.value;
      $('.units-letter-spacing').text(thisValue + 'px');
      for (b in selected_object) {
        selected_object[b].css('letter-spacing', ui.value + unit);
        update_css_array(css_array, selected_object[b], 'letter-spacing', thisValue + unit);
      }
    }
  });

  /* jQuery ui - slider - letter-spacing */
  $("#slider-line-height").slider({
    slide: function(event, ui) {
      var thisValue = ui.value;
      $('.units-line-height').text(thisValue + unit);
      for (b in selected_object) {
        selected_object[b].css('line-height', ui.value + unit);
        update_css_array(css_array, selected_object[b], 'line-height', thisValue + unit);
      }
    }
  });

  /* jQuery ui - slider - letter-spacing */
  $("#slider-font-size").slider({
    slide: function(event, ui) {
      var thisValue = ui.value;
      $('.units-font-size').text(thisValue + unit);
      for (b in selected_object) {
        selected_object[b].css('font-size', ui.value + unit);
        update_css_array(css_array, selected_object[b], 'font-size', thisValue + unit);
      }
    }
  });

  /* form template */

  $('#user-editable input[type="submit"].edit').live('click', function(e) {
    e.preventDefault();
  });

  $('#user-editable button.edit').live('click', function(e) {
    e.preventDefault();
  });

  $('#user-editable input[type="checkbox"]').live('click', function() {
    alert('you cannot style checkboxes using css');
  });


  /* jQuery ui - resizable */
  $("#user-editable").resizable();
  $("#user-editable p .img").resizable();

});


function make_css_from_object() {
  var css_string = "";
  var cssbefore = css_array;
  var selectorsLength = 0;
  for (c in cssbefore) {
    if (cssbefore[c].styles.length > 0) {
      css_string += ((cssbefore[c] != undefined) ? cssbefore[c].selector + " {\r\n" : "")
    }
    for (d in cssbefore[c]) {
      for (e in cssbefore[c][d]) {
        if (cssbefore[c][d][e].hasOwnProperty('property')) {
          css_string += ((cssbefore[c][d][e].property != undefined) ? ' ' + ' ' + cssbefore[c][d][e].property + ": " : "");
          css_string += ((cssbefore[c][d][e].value != undefined) ? cssbefore[c][d][e].value + "; \r\n" : "");
          if (e == cssbefore[c].styles.length - 1) {
            css_string += "} \r\n";
          };
        }
      }
    }
    selectorsLength++;
  }
  return css_string;
}


function create_css_scafold() {
  var css_array = new Array();
  var inc = 0;
  $('#user-editable .edit').each(function() {
    if (!$(this).hasClass('duplicate')) {
      $(this).data('id', inc);
      css_array[inc] = new Array();
      css_array[inc]['id'] = inc;
      css_array[inc]['selector'] = ($(this)[0].tagName).toLowerCase();
      css_array[inc]['styles'] = new Array();
      inc++;
    }
  });
  return css_array;
}

function htmlEntities(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function export_document(area) {
  var output;
  output = area.html();
  $.colorbox({
    width: '90%',
    height: '80%',
    html: htmlEntities(output)
  });
}

function load_file() {
  var loadFileForm = "<form name='importForm'>"
  loadFileForm += "<textarea></textarea>"
  loadFileForm += "<input type='submit'/>"
  $.colorbox({
    width: '90%',
    height: '80%',
    html: loadFileForm
  });
  $('form[name="importForm"]').live('submit', function(e) {
    e.preventDefault();
    $('#container').html($(this).find('textarea').val());
    $.colorbox.close();
    multiple_selections = new Array();
    clickedElements = new Array();
    css_array = create_css_scafold();
    $("#user-editable").resizable();
    $("#user-editable").draggable();
    $("#user-editable p .img").resizable();
    $('#container #c-bg').draggable();
    $('#user-editable').draggable();
    editable_area = $('#user-editable');
    editable_area.find('*').removeClass('this-active');
  });
}

function inObject(a, b) {
  var inc = 0;
  for (c in a) {
    for (d in a[c]) {
      if (a[c][d] == b) {
        return inc;
      }
      inc++
    }
  }
  return -1;
}

function update_css_array(a, obj, css_property, p_value) {
  var id = obj.data('id');
  var cap = a[id].styles;
  var oToAdd = {
    'property': css_property,
    'value': p_value
  }

  if (inObject(cap, css_property) > -1) {
    var this_index = inObject(cap, css_property);
    cap[((this_index == 0) ? 0 : this_index - 1)].value = p_value;
  }
  if (inObject(cap, css_property) == -1) {
    cap.push(oToAdd)
  }
}

var css_scalfold;
$(function() {
  css_array = create_css_scafold();
})

function convert_object_style_to_string(o) {
  var $newStyles = new Array();
  for (a in o) {
    $newStyles[a] = o[a].selector + "{" + o[a].style + "}";
  }
  return (("<style>" + $newStyles.join(';') + "</style>").replace(/\,/g, ';')).replace(/\'\"/g, ' ');
}

/* Get styles */
var mystyles;

function loop_and_get_inline_styles() {

  var s = new Array();
  var $tempCss;
  var $tempNodeName;

  mystyles = s;
}
