# Axeit Documentation

## Examples

### main.js

```js
// ### View definitions ###

// Here define views, template to load and script list to include. Maybe later I add loading CSS files.
// Additional option in view definition is it whether view can be load more than once.

var index = new ViewDefinition('/test/templates/index.html', ['/test/modules/index.js'], true);
var _notFound = new ViewDefinition('/test/templates/notFound.html', ['/test/modules/notFound.js'], true);

// # Events #

var addEvent = new ViewDefinition('/test/templates/addEvent.html', ['/test/modules/addEvent.js'], true);
var showEvent = new ViewDefinition('/test/templates/showEvent.html', ['/test/modules/showEvent.js'], true);
var editEvent = new ViewDefinition('/test/templates/editEvent.html', ['/test/modules/editEvent.js'], true);



// ### Pattern handling ###

// Here is pattern handling. It is manage via pattern manager. Here we create pattern tree.
// When user show site /event/add should looks related view template.
// Yes, here we define pattern definition, where we passed pattern and view reference.

var patternManager = new PatternManager();

patternManager.addPattern(new PatternDefinition('index', index));

// # Events #

patternManager.addPattern(new PatternDefinition('event/add', addEvent));
patternManager.addPattern(new PatternDefinition('event/show/:id', showEvent));
patternManager.addPattern(new PatternDefinition('event/show/:edit_id/edit', editEvent));
```