/******************************
 ****    CSS Drag & Drop   ****
 ******************************/
import * as jQuery from 'jquery'

(function ($) {
    $.fn.draggable = function (obj) {
        var _obj = obj || {};
        if (!_obj.hasOwnProperty('idPrefix')) {
            _obj.idPrefix = 'dnd-draggable-item_'
        }
        return this.each(function (index) {
            var $this = $(this);
            $this.attr('id', _obj.idPrefix + index).attr('draggable', 'true');
            $this.on('dragstart', function (ev) {
                const callback = () => {
                    ev.originalEvent.dataTransfer.setData('text', ev.target.id)
                };
                if (_obj.hasOwnProperty('onDragStart')) {
                    _obj.onDragStart(ev,callback);
                } else {
                    callback();
                }
            })
        });
    };
})(jQuery);

(function ($) {
    $.fn.droppable = function (obj) {
        var _obj = obj || {};
        if (!_obj.hasOwnProperty('draggingClass')) {
            _obj.draggingClass = 'dnd--dragging';
        }
        return this.each(function () {
            var $this = $(this);
            $this.on('drop', function (ev) {
                ev.preventDefault();
                const callback = () => {
                    const id = ev.originalEvent.dataTransfer.getData('text');
                    const node = $(document.getElementById(id));
                    ev.target.appendChild(node[0]);
                };
                if (_obj.hasOwnProperty('onDrop')) {
                    _obj.onDrop(ev,callback);
                } else {
                    callback();
                }
            });
            $this.on('dragenter', function (ev) {
                ev.preventDefault();
                const callback = () => {
                    $this.addClass(_obj.draggingClass);
                };
                if (_obj.hasOwnProperty('onDragEnter')) {
                    _obj.onDragEnter(ev,callback);
                }else {
                    callback();
                }
            });
            $this.on('dragend', function (ev) {
                const callback = () => {
                    $this.removeClass(_obj.draggingClass);
                };
                if (_obj.hasOwnProperty('onDragEnd')) {
                    _obj.onDragEnd(ev,callback);
                } else {
                    callback();
                }
            });
            $this.on('dragover', function (ev) {
                ev.preventDefault();
                if (_obj.hasOwnProperty('onDragOver')) {
                    _obj.onDragOver(ev);
                }
            });
            $this.on('dragleave', function (ev) {
                const callback = () => {
                    $this.removeClass(_obj.draggingClass);
                };
                if (_obj.hasOwnProperty('onDragLeave')) {
                    _obj.onDragLeave(ev,callback);
                } else {
                    callback();
                }
            });

        });
    };
})(jQuery);

// ---
