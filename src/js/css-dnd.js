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
                ev.originalEvent.dataTransfer.setData('text', ev.target.id);
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
                const id = ev.originalEvent.dataTransfer.getData('text');
                const node = $(document.getElementById(id));
                ev.target.appendChild(node[0]);
            });
            $this.on('dragenter', function (ev) {
                ev.preventDefault();
            });
            $this.on('dragend', function (ev) {
                $this.removeClass(_obj.draggingClass)
            });
            $this.on('dragover', function (ev) {
                ev.preventDefault();
                $this.addClass(_obj.draggingClass)
            });
            $this.on('dragleave', function (ev) {
                $this.removeClass(_obj.draggingClass)
            });

        });
    };
})(jQuery);

// ---
