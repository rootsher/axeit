# Axeit Documentation

## Examples

### main.js

```js
// ### View definitions ###

// Here define views, template to load and script list to include. Maybe later I add loading CSS files.
// Additional option in view definition is it whether view can be load more than once.

var index = new ViewDefinition('/templates/index.html', ['/modules/index.js']);
var _notFound = new ViewDefinition('/templates/notFound.html', ['/modules/notFound.js']);

// # Events #

var addEvent = new ViewDefinition('/templates/addEvent.html', ['/modules/addEvent.js']);
var showEvent = new ViewDefinition('/templates/showEvent.html', ['/modules/showEvent.js']);
var editEvent = new ViewDefinition('/templates/editEvent.html', ['/modules/editEvent.js']);



// ### Pattern handling ###

// Here is pattern handling. It is manage via pattern manager. Here we create pattern tree.
// When user show site /event/add should looks related view template.
// Yes, here we define pattern definition, where we passed pattern and view reference.

var patternManager = new PatternManager();

patternManager.addPattern(new PatternDefinition('index', index));

// # Events #

patternManager.addPattern(new PatternDefinition('event/add', addEvent, 'view'));
patternManager.addPattern(new PatternDefinition('event/show/:id', showEvent));
patternManager.addPattern(new PatternDefinition('event/show/:edit_id/edit', editEvent, 'popup'));
```