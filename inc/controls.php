<div id="sidebar">
  <button class="toggle">open</button><br>
  <div id="sidebar-internal">
    <label id="identifier">nothing selected</label><br>
    <hr>
    <div id="colorwheel">
      <form>
        <input type="text" id="color" name="color" value="#123456">
      </form>
      <div id="colorpicker"></div>
    </div>
    <hr>
    <button id="export">Export CSS</button> <button id="export-file">Export file</button> <button id="import-file">Import file</button>
    <hr>
    <br>
    <label>Font</label> <select name="font">
      <option value="" disabled="disabled" selected="selected">
        please select
      </option>
      <optgroup label="serif">
        <option value="'Times New Roman', Times, serif">
          Times New Roman, Times, serif
        </option>
        <option value="'Palatino Linotype', 'Book Antiqua', Palatino, serif">
          Palatino Linotype, Book Antiqua, Palatino, serif
        </option>
      </optgroup>
      <optgroup label="sans-serif">
        <option value="Arial, Helvetica, sans-serif">
          Arial, Helvetica, sans-serif
        </option>
        <option value="'Arial Black', Gadget, sans-serif">
          Arial Black, Gadget, sans-serif
        </option>
        <option value="'Comic Sans MS', cursive, sans-serif">
          Comic Sans MS, cursive, sans-serif
        </option>
        <option value="Impact, Charcoal, sans-serif">
          Impact, Charcoal, sans-serif
        </option>
        <option value="'Lucida Sans Unicode', 'Lucida Grande', sans-serif">
          Lucida Sans Unicode, Lucida Grande, sans-serif
        </option>
        <option value="Tahoma, Geneva, sans-serif">
          Tahoma, Geneva, sans-seriff
        </option>
        <option value="'Trebuchet MS', Helvetica, sans-serif">
          Trebuchet MS, Helvetica, sans-serif
        </option>
        <option value="Verdana, Geneva, sans-serif">
          Verdana, Geneva, sans-serif
        </option>
      </optgroup>
      <optgroup label="mono-space">
        <option value="'Courier New', Courier, monospace">
          Courier New, Courier, monospace
        </option>
        <option value="'Lucida Console', Monaco, monospace">
          Lucida Console, Monaco, monospace
        </option>
      </optgroup>
    </select>
    <hr>
    <label>Font Size</label><br>
    <div id="slider-font-size"></div>
    <hr>
    <label>Line Height/Leading</label><br>
    <div id="slider-line-height"></div>
    <hr>
    <label>Tracking</label><br>
    <div id="slider-letter-spacing"></div>
    <hr>
    <label>Font Weight</label> <select name="font-weight">
      <option value="" disabled="disabled" selected="selected">
        please select
      </option>
      <option value="light">
        Light
      </option>
      <option value="bold">
        Bold
      </option>
    </select>
    <hr>
    <div id="file-uploader-demo1"></div>
  </div>
</div>
