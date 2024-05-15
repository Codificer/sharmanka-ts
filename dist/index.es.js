function _instanceof(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return right[Symbol.hasInstance](left);
    }
    else {
        return left instanceof right;
    }
}
const Sharmanka = {
    node: null,
    playPromise: null,
    duration: 0,
    currentTime: 0,
    buffered: 0,
    isUnlockedAudio: false,
    observers: [],
    init: function () {
        this.node = document.createElement('audio');
        if (this.node) {
            this.node.addEventListener('loadedmetadata', this.getDuration);
            this.node.addEventListener('timeupdate', this.getCurrentTime);
            this.node.addEventListener('progress', this.getProgress);
            window.addEventListener('click', this.listenerMoveMouse.bind(this, this.node), false);
        }
    },
    destroy: function () {
        if (this.node) {
            this.node.removeEventListener('loadedmetadata', this.getDuration);
            this.node.removeEventListener('timeupdate', this.getCurrentTime);
            this.node.removeEventListener('progress', this.getProgress);
            window.removeEventListener('click', this.listenerMoveMouse.bind(this, this.node), false);
        }
        this.node.src = '';
        this.node = null;
    },
    onPlay: function onPlay(callback) {
        try {
            if (_instanceof(callback, Function))
                this.node.addEventListener('playing', function removingListener() {
                    return callback(removingListener);
                });
        }
        catch (e) {
            console.error(e);
        }
    },
    onPause: function onPause(callback) {
        try {
            if (_instanceof(callback, Function))
                this.node.addEventListener('pause', function removingListener() {
                    return callback(removingListener);
                });
        }
        catch (e) {
            console.error(e);
        }
    },
    onStart: function onStart(callback) {
        try {
            if (_instanceof(callback, Function))
                this.node.addEventListener('playing', function removingListener() {
                    if (this.node.currentTime === 0)
                        callback(removingListener);
                });
        }
        catch (e) {
            console.error(e);
        }
    },
    onEnd: function onEnd(callback) {
        try {
            if (_instanceof(callback, Function))
                this.node.addEventListener('ended', function removingListener() {
                    return callback(removingListener);
                });
        }
        catch (e) {
            console.error(e);
        }
    },
    onLoad: function onLoad(callback) {
        try {
            if (_instanceof(callback, Function))
                this.node.addEventListener('loadedmetadata', function removingListener() {
                    return callback(removingListener);
                });
        }
        catch (e) {
            console.error(e);
        }
    },
    onTick: function onTick(callback) {
        try {
            if (_instanceof(callback, Function))
                this.node.addEventListener('timeupdate', function removingListener() {
                    return callback(removingListener);
                });
        }
        catch (e) {
            console.error(e);
        }
    },
    onBuffer: function onBuffer(callback) {
        try {
            if (_instanceof(callback, Function))
                this.node.addEventListener('progress', function removingListener() {
                    return callback(removingListener);
                });
        }
        catch (e) {
            console.error(e);
        }
    },
    onLoadError: function onLoadError(callback) {
        if (_instanceof(callback, Function))
            this.node.addEventListener('error', function removingListener() {
                return callback(removingListener);
            });
    },
    onError: function onError(callback) {
        if (_instanceof(callback, Function))
            this.node.addEventListener('abort', function removingListener() {
                return callback(removingListener);
            });
    },
    removeEvent: function removeEvent(eventName, callback) {
        if (_instanceof(callback, Function))
            return this.node.removeEventListener(eventName, callback);
    },
    isPlay: function isPlay() {
        try {
            return !this.node.paused;
        }
        catch (e) {
            console.error(e);
        }
    },
    isMuted: function isMuted() {
        try {
            return this.node.muted;
        }
        catch (e) {
            console.error(e);
        }
    },
    isLooped: function isLooped() {
        try {
            return this.node.loop;
        }
        catch (e) {
            console.error(e);
        }
    },
    play: function play(callback) {
        try {
            if (_instanceof(callback, Function))
                callback();
            this.playPromise = this.node.play();
        }
        catch (e) {
            console.error(e);
        }
    },
    pause: function pause(callback) {
        try {
            if (_instanceof(callback, Function))
                callback();
            if (this.playPromise !== undefined) {
                this.playPromise.then(_ => this.node.pause());
            }
            else {
                this.node.pause();
            }
        }
        catch (e) {
            console.error(e);
        }
    },
    volume: function volume(value) {
        if (typeof value === 'number' && value >= 0 && value <= 1)
            this.node.volume = value;
        if (typeof value !== 'number')
            console.error('Volume value should be a number');
        if (typeof value === 'number' && (value < 0 || value > 1))
            console.error('Volume value should be a positive number between 0 and 1');
    },
    mute: function mute() {
        try {
            this.node.muted = !this.node.muted;
        }
        catch (e) {
            console.error(e);
        }
    },
    loop: function setLoop(loop) {
        try {
            this.node.loop = loop;
        }
        catch (e) {
            console.error(e);
        }
    },
    seek: function seek(value) {
        if (typeof value === 'number' && value <= this.duration) {
            this.node.currentTime = value;
            this.currentTime = value.toFixed();
        }
        if (typeof value !== 'number')
            console.error('SeekValue should be a number');
        if (typeof value === 'number' && (value < 0 || value > this.duration))
            return console.error('Seek Value should be more then 0 and less then track duration');
    },
    setTrack: function setTrack(value) {
        Sharmanka.buffered = 0;
        Sharmanka.currentTime = 0;
        Sharmanka.duration = 0;
        if (typeof value === 'string' && value.length > 0)
            this.node.src = value;
        if (typeof value !== "string" || value.length === 0)
            console.error('URL for track should be string by 1 character');
    },
    clearTrack: function clearTrack() {
        this.node.src = '';
    },
    togglePlay: function togglePlay() {
        try {
            return this.node.paused ? this.node.play() : this.node.pause();
        }
        catch (e) {
            console.error(e);
        }
    },
    listenerMoveMouse: function (node) {
        if (!this.isUnlockedAudio && node) {
            this.isUnlockedAudio = true;
            this.playPromise = this.node.play();
            window.removeEventListener('click', this.listenerMoveMouse.bind(this, node), false);
        }
    },
    getDuration: function () {
        Sharmanka.duration = parseInt(Sharmanka.node.duration.toFixed(0));
    },
    getCurrentTime: function () {
        Sharmanka.currentTime = parseInt(Sharmanka.node.currentTime.toFixed(0));
    },
    getProgress: function () {
        var duration = Sharmanka.duration;
        if (duration > 0) {
            for (var i = 0; i < Sharmanka.node.buffered.length; i++) {
                if (Sharmanka.node.buffered.start(Sharmanka.node.buffered.length - 1 - i) < duration) {
                    Sharmanka.buffered = Sharmanka.node.buffered.end(Sharmanka.node.buffered.length - 1 - i);
                    break;
                }
            }
        }
    },
    addObserver: function addObserver(observer) {
        this.observers.push(observer);
    },
    removeObserver: function removeObserver(observer) {
        const index = Sharmanka.observers.findIndex((el) => observer === el);
        if (index !== -1)
            Sharmanka.observers = Sharmanka.observers.filter((_, i) => i !== index);
    }
};

export { Sharmanka as default };
