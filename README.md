# W I P !!

# jQuery Element Revealer

Show / Hide elements with Pub/Sub

## Getting Started

Download the [production version][min] or the [development version][max].

[min]: https://raw.githubusercontent.com/cleargif/jquery-jq-element-revealer/master/dist/jquery.jq-element-revealer.min.js
[max]: https://raw.githubusercontent.com/cleargif/jquery-jq-element-revealer/master/dist/jquery.jq-element-revealer.js

In your web page:

```html
<script src="jquery.js"></script>
<script src="dist/jq-element-revealer.min.js"></script>
<script>
jQuery(function($) {
  $.awesome(); // "awesome"
});
</script>
```

## Documentation
  
  $ npm install

  bower install

  grunt serve

## Examples
_(Coming soon)_

## Release History
_(Nothing yet)_


## Grunt

The project is using `GruntJS` to automate alot of development task to save developer time. We have added some handle grunt tasks like

This command will watch for your changes to files compile your less/css, coffeescript on file save and reload your browser automatically. It will also run your tests and other tasks like jslint.

    grunt watch

This will start a http server and server /app folder on port 9001

    grunt server

This will start a http server and server /production folder on port 9002

    grunt production
    
This command will compile and copy all your production files to production folder. This will also remove all files you don't need for production like less, coffesscript files.

    grunt build
