// 微型模板引擎，不支持循环
$.fn.template = function (data) {
    var template = $(this[0]).html().trim();

    if (typeof data === "object") {
        for (var key in data) {
            template = template.replace(new RegExp('\\${' + key + '}', 'g'), data[key]);
        }
    }
    return template;
};

function getImgProxyUrl (img) {
    return '/img/proxy?img=' + encodeURIComponent(img);
}

App.controller('home', function (page) {
    var $top_container = $(page).find('#top-stories-container');
    var $container = $(page).find('#js-story-container');
    var $template = $(page).find('#js-story-template');

    $.getJSON('/api/4/news/latest', function (data) {
        if (data.stories && data.stories.length) {
            for (var i = 0, m = data.stories.length; i < m; i++) {
                var tplData = {
                    image: getImgProxyUrl(data.stories[i].images[0]),
                    title: data.stories[i].title,
                    id: data.stories[i].id
                };

                $container.append($template.template(tplData));
            }
        }

        if (data.top_stories && data.top_stories.length) {
            for (var j = 0, n = data.top_stories.length; j < n; j++) {
                var ttplData = {
                    image: '/img/proxy?img=' + encodeURI(data.top_stories[j].image),
                    title: data.top_stories[j].title,
                    id: data.top_stories[j].id
                };

                $top_container.append($template.template(ttplData));
            }
            $top_container.css({
                'height': 60 * (n - 2) + 'px',
                'overflow': 'hidden'
            });
        }
    });
});

App.controller('detail', function (page, args) {
    $.getJSON('/api/4/news/' + args.id, function (data) {
        var body = $(data.body);
        body.find('img').each(function (i, img) {
            var ndImg = $(img);
            ndImg.attr('src', getImgProxyUrl(ndImg.attr('src')));
        });
        $(page).find('.js-story-title').html(data.title);
        $(page).find('.js-story-cover').attr('src', getImgProxyUrl(data.image));
        $(page).find('.js-comment-button').attr('data-target-args', JSON.stringify(args));
        $(page).find('.js-story-content').html(body);
    });
});

App.controller('comments', function (page, args) {
    var $container = $(page).find('#js-comment-container');
    var $template = $(page).find('#js-comment-template');

    $.getJSON('/api/4/news/' + args.id + '/long-comments', function (data) {
        if (data.comments && data.comments.length) {
            for (var i = 0, m = data.comments.length; i < m; i++) {
                var tplData = {
                    image: getImgProxyUrl(data.comments[i].avatar),
                    author: data.comments[i].author,
                    content: data.comments[i].content
                };

                $container.append($template.template(tplData));
            }
        }
    });
});

try {
    App.restore();
} catch (err) {
    App.load('home');
}
