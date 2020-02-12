# Gettour widget library methods

## Main

- **init(hash, options = {})** - Init widget
  `(String) hash` - Hash of Getchat widget.
  For example: `gettour.init('e54907bc-43f3-4c1e-8e73-5bd1e04791ed', {env: 'development', devHost: 'http://localhost'})`
- **expandBlock()** - Expand widget window
- **hideBlock()** - Hide widget window

## Work with styles

- **changeWidgetAlignment(alignment)** - change widget window's alignment when widget expanded
  Available values: `'right-bottom', 'left-bottom', 'middle-center'`
- **renderWidget(chatUrl, asExpanded)** - load chat as widget.
  `(String) chatUrl` - parameter is link of chat.
  `(Boolean) asExpanded` - if set true, chat expanded automatically
  For example: `gettour.renderWidget('https://getchat.me/my-chat', true)`
