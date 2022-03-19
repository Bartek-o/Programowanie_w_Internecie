if (!Array.prototype.fill) {
    Object.defineProperty(Array.prototype, 'fill', {
        value: function(value) {

            if (this == null) {
            throw new TypeError('this is null or not defined');
            }
    
            var O = Object(this);

            var len = O.length >>> 0;

            var start = arguments[1];
            var relativeStart = start >> 0;

            var k = relativeStart < 0 ?
            Math.max(len + relativeStart, 0) :
            Math.min(relativeStart, len);

            var end = arguments[2];
            var relativeEnd = end === undefined ?
            len : end >> 0;

            var finalValue = relativeEnd < 0 ?
            Math.max(len + relativeEnd, 0) :
            Math.min(relativeEnd, len);

            while (k < finalValue) {
            O[k] = value;
            k++;
            }

            return O;
        }
    });
}

if (!("classList" in document.documentElement) && Object.defineProperty && typeof HTMLElement !== 'undefined') {
    Object.defineProperty(HTMLElement.prototype, 'classList', {
        get: function() {
            var self = this;
            function update(fn) {
                return function(value) {
                    var classes = self.className.split(/\s+/),
                        index = classes.indexOf(value);

                    fn(classes, index, value);
                    self.className = classes.join(" ");
                }
            }

            var ret = {                    
                add: update(function(classes, index, value) {
                    ~index || classes.push(value);
                }),

                remove: update(function(classes, index) {
                    ~index && classes.splice(index, 1);
                }),

                toggle: update(function(classes, index, value) {
                    ~index ? classes.splice(index, 1) : classes.push(value);
                }),

                contains: function(value) {
                    return !!~self.className.split(/\s+/).indexOf(value);
                },

                item: function(i) {
                    return self.className.split(/\s+/)[i] || null;
                }
            };
            
            Object.defineProperty(ret, 'length', {
                get: function() {
                    return self.className.split(/\s+/).length;
                }
            });

            return ret;
        }
    });
}

var images = new Array(
    'api-code',
    'bee',
    'binder',
    'bird',
    'cash',
    'coconut-oil',
    'coins',
    'colors',
    'configuration',
    'corona',
    'dollar-coins',
    'duck-color',
    'fact',
    'fire-hydrant',
    'fish-color',
    'fried-chicken',
    'geography',
    'go',
    'gold',
    'grain-rice',
    'healthy-food',
    'hot',
    'koo',
    'luck-lucky',
    'monster',
    'nutrition',
    'padlock',
    'paint-bucket',
    'painting',
    'piggy-bank',
    'pork',
    'push-pin-blue',
    'red-flag',
    'science-atom',
    'seedling',
    'speed-test',
    'star-line-yellow',
    'star-symbol',
    'stars-color',
    'themes',
    'waterproof',
    'woman-t-shirt'
)

var use_images = new Array(images.length).fill(0);

settings = new Array(
    //[height, width, number_of_images]
    [2, 2, 2],
    [4, 4, 8],
    [6, 6, 18],
    [8, 6, 24],
    [10, 6, 30],
    [12, 6, 36],
    [14, 6, 42]
)

var hidden_images;

function createTable(options) {
    var table = document.getElementById("tabela");
    table.innerHTML = '';
    use_images.fill(0);
    hidden_images = 0;

    var range;
    if (options[2] == 42) {
        range = 0;
    } else {
        range = Math.round(Math.random() * ((images.length - 1 - options[2])-0))+0;
    }

    for (var  i = 0; i < options[1]; i++) {
        var row = table.insertRow(i);
        for (var j = 0; j < options[0]; j++) {
            var cell = row.insertCell(j);
            var div1 = document.createElement('div');
            var div2 = document.createElement('div');

            if (/*@cc_on!@*/false || !!document.documentMode) {
                div1.style.opacity = 1;
                div2.style.opacity = 0;

                div1.style.position = "absolute";
                div2.style.position = "relative";
            } else {
                div1.setAttribute("class","transition");
                div2.setAttribute("class","transition");
                div2.classList.toggle('rotate');

                div1.style.position = "absolute";
                div2.style.position = "absolute";
            }
            
            var index = Math.round(Math.random() * ((range + options[2] - 1) - range)) + range;
            while (use_images[index] >= 2) {
                var index = Math.round(Math.random() * ((range + options[2] - 1) - range)) + range;
            }
            use_images[index]++;
            var img = images[index];
            hidden_images++;

            div1.innerHTML = '<img src="./icons/question-mark-line.svg" alt="question-mark-line" style="padding: 5%; width: 100px; height: 100px">';
            div2.innerHTML = '<img src="./icons/' + img + '.svg" alt="' + img + '" style="padding: 5%; width: 100px; height: 100px">';
            add(cell,img);

            cell.appendChild(div1);
            cell.appendChild(div2);
        }
    }
    hidden_images /= 2;
}

var stack = [];

function add(cell, img_name) {
    cell.addEventListener("click", function() {
        var firstChild = cell.firstElementChild;
        var lastChild = cell.lastElementChild;

        if (stack.length < 6) {

            if (!firstChild.classList.contains('rotate')) {
                if (/*@cc_on!@*/false || !!document.documentMode) {
                    firstChild.style.opacity = 0;
                    lastChild.style.opacity = 1;
                } else {
                    firstChild.classList.remove("delay");
                    firstChild.classList.toggle('rotate');

                    lastChild.classList.toggle('delay');
                    lastChild.classList.toggle('rotate');
                }

                stack.push(img_name);
                stack.push(lastChild);
                stack.push(firstChild);
                if (stack.length == 6)  {
                    setTimeout(check, 1200);
                }
            }
        }
    });
}

function check() {
    var firstChildTD1 = stack.pop();
    var secondChildTD1 = stack.pop();
    var imageTD1 = stack.pop();

    var firstChildTD2 = stack.pop();
    var secondChildTD2 = stack.pop();
    var imageTD2 = stack.pop();

    if (imageTD1 == imageTD2) {
        hidden_images--;
        firstChildTD1.removeEventListener("click", function() {});
        secondChildTD1.removeEventListener("click", function() {});
        firstChildTD2.removeEventListener("click", function() {});
        secondChildTD2.removeEventListener("click", function() {});

        if (hidden_images == 0) {
            // W Y G R A N A ! ! ! 
            var win = document.getElementById("win");
            if (!(/*@cc_on!@*/false || !!document.documentMode)) {
                win.classList.remove("fade_out");
                win.classList.toggle("fade_in");
            }
            win.style.display = "block";
        }

    } else {
        if (/*@cc_on!@*/false || !!document.documentMode) {
            firstChildTD1.style.opacity = 1;
            firstChildTD2.style.opacity = 1;
            secondChildTD1.style.opacity = 0;
            secondChildTD2.style.opacity = 0;
        } else {
            secondChildTD1.classList.remove("delay");
            secondChildTD1.classList.toggle('rotate');

            secondChildTD2.classList.remove("delay");
            secondChildTD2.classList.toggle('rotate');

            firstChildTD1.classList.toggle('delay');
            firstChildTD1.classList.toggle('rotate');
            
            firstChildTD2.classList.toggle('delay');
            firstChildTD2.classList.toggle('rotate');
        }
    }
}

document.getElementById("OK").addEventListener("click", function() {
    var e = document.getElementById("select_size");
    var value = e.options[e.selectedIndex].value;

    createTable(settings[value]);
});

document.getElementById("reset").addEventListener("click", function() {
    document.getElementById("tabela").innerHTML = '';
    var win = document.getElementById("win");
    if (!(/*@cc_on!@*/false || !!document.documentMode)) {
        win.classList.toggle("fade_out");
        win.classList.remove("fade_in");
    }

    setTimeout(function() { win.style.display = "none"; }, 700);
});
