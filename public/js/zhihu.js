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

App.controller('home', function(page) {
    $top_container = $(page).find('#top-stories-container');
    $container = $(page).find('#js-story-container');
    $template = $(page).find('#js-story-template');

    $.getJSON('/api/4/news/latest', function (data) {
        if (data.stories && data.stories.length) {
            for (var i = 0, m = data.stories.length; i < m; i++) {
                var tplData = {
                    image: '/img/proxy?img=' + encodeURI(data.stories[i].images[0]),
                    title: data.stories[i].title
                };

                $container.append($template.template(tplData));
            }
        }
        // if (data.top_stories && data.top_stories.length) {
        //     for (var j = 0, n = data.top_stories.length; j < n; j++) {
        //         var ttplData = {
        //             image: '/img/proxy?img=' + encodeURI(data.top_stories[j].image),
        //             title: data.top_stories[j].title
        //         };
        //
        //         $top_container.append($template.template(ttplData));
        //     }
        // }
    });
});

App.controller('page2', function(page) {
    // put stuff here
});

try {
    App.restore();
} catch (err) {
    App.load('home');
}
