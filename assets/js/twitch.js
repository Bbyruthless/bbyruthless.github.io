var player = new Twitch.Player('twitch-embed', {
    channel: 'zerkaa',
    width: 400,
    height: 225,
    parent: [
        'github.io',
        'bbyruthless.com'
    ]
});

var twitchElement = document.getElementById('twitch-content');

var streamOnline = function () {
    twitchElement.classList.remove('hidden');
    setTimeout(function () {
        twitchElement.classList.remove('visuallyhidden');
    }, 20);
};

var streamOffline = function () {
    twitchElement.classList.add('visuallyhidden');
    twitchElement.addEventListener('transitionend', function (e) {
        twitchElement.classList.add('hidden');
    }, {
        capture: false,
        once: true,
        passive: false
    });
};

player.addEventListener(Twitch.Player.PLAYING, streamOnline);
player.addEventListener(Twitch.Player.ENDED, streamOffline);
