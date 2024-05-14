# HTML5 audio player

This module is an modified version of [Sharmanka](https://www.npmjs.com/package/sharmanka?activeTab=readme).
I add TypeScript support and make some minor changes in code.

This is a React audio player that allows you to fully control the playback of audio files.
The player object is returned from the module, so it will be available at all points in the project.
An example of usage will be below

## Methods

* init() - initializing of audio player
* destroy() - destroing of current player
* play() - starts playing the audio track.
* pause() - pauses the audio track.
* volume(number) - set volume value (0 to 1).
* mute() - toggle volume value to 0 or previous value.
* seek(number) - set the moment on audio track (s|ms?).
* loop(boolean) - set a looping of audio track.
* setTrack(string) - set track by url.
* removeEvent(string, function) - remove function on selected event.

```ts
const someFunction = () => {
  console.log(`Current time: ${Sharmanka.currentTime}`);
  if (Sharmanka.currentTime >= Sharmanka.duration) {
    console.log('Track ended');
    Sharmanka.removeEvent('timeupdate', someFunction);
  }
 }
 
Sharmanka.onTick(someFunction);
```

## Events

* onPlay - fires when audio track begins playing.
* onPause - fires when audio track was paused.
* onStart - fires when audio track begins playing by start.
* onEnd - fires when audio track was ending.
* onLoad - fires when audio track was loaded.
* onTick - fires when audio track change current time.
* onBuffer - fires when audio track was buffered.
* onLoadError - fires when load audio track was crushed.
* onError - fires when playing audio track was crushed.

## Observers

* observers: SharmankaObserver[] - an array of observers
* addaddObserver(observer: SharmankaObserver) - add some observers
* removeObserver(observer: SharmankaObserver) - remove observer

```ts
//components/SomeComponent/index.ts
 const [time, setTime] = useState(0);

 useEffect(() => {
   const listeners:SharmankaObserver = {
    onTick: () => {
     setTime(Sharmanka.currentTime);
    },
    onBuffer: () => {}
   };

   Sharmanka.addObserver(listeners);

   return () => {
    Sharmanka.removeObserver(listeners);
   };
 }, []);

//components/SharmankaWrapper/index.ts
  Sharmanka.onTick(() => {
   Sharmanka.observers.forEach((obs: SharmankaObserver) => obs.onTick(Sharmanka.currentTime));
  });
```

## States  

* isPlay - return boolean for audio track playing.
* isMuted - return boolean for mute.
* isLooped - return boolean for loop.

## Example

```ts
//components/SharmankaWrapper/index.ts
import Sharmanka from 'sharmanka-ts';
import { useCallback, useEffect } from 'react';

export default function SharmankaWrapper(){

    const sharmankaInitEvents = useCallback(() => {
        Sharmanka.onTick(() => {
            //do smth on tick
            Sharmanka.observers.forEach((obs: SharmankaObserver) => obs.onTick(Sharmanka.currentTime));
  
        });
        Sharmanka.onPlay(() => {
            //do smth, when audio get 'playing' event. F.E. - alert for others browser tabs to stop playing
        });

        /*others*/
    })
    useEffect(() => {
        if (!Sharmanka.node) {
            Sharmanka.init();
            sharmankaInitEvents();
        }
    }, [sharmankaInitEvents]);

    return null;
}

//mainLayout.tsx
import SharmankWrapper from @components/SharmankaWrapper
export default function RootLayout(){

    return(
        <html>
            <body>
                <SharmankaWrapper />
                {children}
            </body>
        </html>
    );
}
```
