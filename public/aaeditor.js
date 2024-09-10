import { aaToVideoElement, parse, SECTION_SEPARATOR } from "./aa.js";

let data;
const fpsControl = document.getElementById('fps'),
    frameLengthControl = document.getElementById('frameLength'),
    currentFrameControl = document.getElementById('currentFrame'),
    frameDataControl = document.getElementById('frameData'),
    viewer = document.querySelector('.viewer');

const loadFrame = frameNumber => {
    frameDataControl.value = data.frames[frameNumber] || ''.padEnd(data.frameLemgth, ' ');
};
//Genera un nuevo string AA
const build = () => {
    return [
        'aa1',
        fpsControl.value,
        frameLengthControl.value,
        data.frames.join('')
    ].join(SECTION_SEPARATOR);

};
const updateVideo = () => {
    clearInterval(viewer.querySelector('pre').intervalId);
    viewer.replaceChildren(aaToVideoElement(build()));
};
const saveFrame = (position, frame) => {
    data.frames[position] = frame.padEnd(data.frameLength, ' ').substring(0, data.frameLength);
};

currentFrameControl.addEventListener(
    'change',
    () => loadFrame(currentFrameControl.value) 
);

frameLengthControl.addEventListener(
    'change',
    function() {
        data.frameLength = this.value;
        data.frames = data.frames.map(
            frame => frame.padEnd(this.value, ' ').substring(0, this.value)
        );
        updateVideo();
        loadFrame(currentFrameControl.value);
    }
);

fpsControl.addEventListener('change', updateVideo);

frameDataControl.addEventListener(
    'change', 
    () => {
        saveFrame(currentFrameControl.value, frameDataControl.value);
        loadFrame(currentFrameControl.value);
        updateVideo();
    }
);


const initEditor = aa => {
    data = parse(aa);
    fpsControl.value = data.fps;
    frameLengthControl.value = data.frameLength;
    currentFrameControl.max = data.frames.length - 1;
    frameDataControl.value = data.frames[0] || '';
};


export {
    initEditor
};