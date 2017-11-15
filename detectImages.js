var initHoverButton = function () {
    var hoverButton = document.createElement('div');
    hoverButton.id = '4c-ext-editor-button';
    hoverButton.style.display = 'none';
    hoverButton.style.position = 'absolute';
    hoverButton.style.width = hoverButton.style.height = '25px';
    hoverButton.style.borderRadius = '3px';
    //hoverButton.style.background = '#000000';
    hoverButton.style.backgroundImage = 'url(' + chrome.runtime.getURL('res/btn.png') + ')';
    hoverButton.style.backgroundSize = 'contain';
    hoverButton.style.backgroundRepeat = 'no-repeat';
    hoverButton.style.zIndex = "9800000";
    hoverButton.style.cursor = "pointer";
    document.addEventListener('click', function (e) {
        var target = e.target;
        if (target == hoverButton) {
            e.preventDefault();
            console.log(hoverButton.getAttribute('data-4c-src'));
            loadIFrame(hoverButton.getAttribute('data-4c-src'));
        }
    });

    document.getElementsByTagName('body')[0].append(hoverButton);

    return hoverButton;
}

var cumulativeOffset = function (element) {
    var top = 0, left = 0;
    do {
        top += element.offsetTop || 0;
        left += element.offsetLeft || 0;
        element = element.offsetParent;
    } while (element);

    return {
        top: top,
        left: left
    };
};

function loadIFrame(imageUrl) {
    var iframeOL = document.getElementById('fce-overlay') || document.createElement('div');
    iframeOL.id = 'fce-overlay';
    iframeOL.innerHTML = '<div id="fce-container"><iframe id="fce-content-box" src="' + chrome.runtime.getURL('editor/index.html') + '"></iframe><div id="fce-close">&times;</div></div>'
    document.getElementsByTagName('body')[0].append(iframeOL);
    document.getElementById('fce-close').addEventListener('click', function () {
        document.getElementById('fce-overlay').outerHTML = '';
    });
    var iframe = document.getElementById('fce-content-box');
    var obj = {};
    obj.url = imageUrl;
    obj.type = "data";
    obj.extension = true;
    iframe.onload = function(){
        iframe.contentWindow.postMessage(JSON.stringify(obj), "*")
    };
}

((document) => {
    var hoverButton = initHoverButton();
    document.addEventListener('mouseover', function (e) {
        var target = e.target;
        if (target.tagName.toLowerCase() == 'img') {
            if (target.height > 100 && target.width > 100 && target.naturalHeight > 200 && target.naturalWidth > 200 && target.getAttribute('data-4c') == null) {
                var offset = cumulativeOffset(target);
                hoverButton.setAttribute('data-4c-src', target.src);
                hoverButton.style.top = (offset.top + target.height - 35) + 'px';
                hoverButton.style.left = (offset.left + 10) + 'px';
                hoverButton.style.display = 'block';
            }
        } else if (target != hoverButton) {
            hoverButton.style.display = 'none';
        }
    })
})(document);