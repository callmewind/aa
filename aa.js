const getFrames = (frameData, frameLength) => {
    const frames = [];
    while(frameData) {
        frames.push(frameData.slice(0, frameLength));
        frameData = frameData.slice(frameLength);
    }
    return frames;
};

const parse = aa => {
    const [ version, fps, frameLength, ...data ] = aa.split('.');
    return {
        version: version,
        fps: fps,
        frameLength: frameLength,
        frames: getFrames(data.join('.'), frameLength)
    };
}

const aaToVideoElement = aa => {
    const data = parse(aa);
    const videoContainer = document.createElement('pre');
    videoContainer.textContent = data.frames[0];
    let count = 0;
    window.setInterval(
        () => videoContainer.textContent = data.frames[count=(count+1)%data.frames.length],
        1000 / Math.min(60, data.fps)
    );
    return videoContainer;
}

export {
    getFrames,
    parse,
    aaToVideoElement
}