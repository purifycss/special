Very early stages.

### In your CLI
```
npm install --save special
```

```
$ special install bootstrap *modal*
```

<br />

A file named <b>`special.css`</b> will be created containing only the modal styles from bootstrap.

```css

/* file trimmed */
.modal-open {
  overflow: hidden;
}

.modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1050;
  display: none;
  overflow: hidden;
  -webkit-overflow-scrolling: touch;
  outline: 0;
}

.modal.fade .modal-dialog {
  -webkit-transition: -webkit-transform .3s ease-out;
  -o-transition: -o-transform .3s ease-out;
  transition: transform .3s ease-out;
  -webkit-transform: translate(0, -25%);
  -ms-transform: translate(0, -25%);
  -o-transform: translate(0, -25%);
  transform: translate(0, -25%);
}

.modal.in .modal-dialog {
  -webkit-transform: translate(0, 0);
  -ms-transform: translate(0, 0);
  -o-transform: translate(0, 0);
  transform: translate(0, 0);
}

.modal-open .modal {
  overflow-x: hidden;
  overflow-y: auto;
}
/* file trimmed */
```

### With a config
```js
// Example config file
// special.config.js
module.exports = {
  packages: {
    bootstrap: {
      selectors: ['*modal*']
    },

    'normalize.css': {
      selectors: ['**']
    }
  }
};
```

**Then, in your CLI do**
```
special install
```

And it will create a `special.css` file made up of all the selectors from `normalize.css` with the addition to all `modal` selectors from bootstrap.
