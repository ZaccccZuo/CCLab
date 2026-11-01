# Project A Documentation: BAWAF

**Creative Coding Lab, Fall 2026, Project A: Generative Creatures**

> BAWAF is a tiny red creature that lives inside a computer and eats code. It moves around on a black screen full of flashing numbers, and it leaves a red trail that never goes away. You can left-click to make more BAWAFs appear, and hold the right mouse button to call them to your mouse. When they start following you, you will hear a different sound.

- [Link to the CODE on github.com](https://github.com/ZaccccZuo/CCLab/blob/main/project-a/sketch.js)
- [Link to the LIVE project on GitHub Pages](https://zacccczuo.github.io/CCLab/project-a/)

[[IMAGE 1]]

### How to play

Left-click anywhere on the screen to bring a BAWAF up from deep inside the code, so you can see it. Hold the right mouse button near a BAWAF to call it. The BAWAFs nearby will follow your mouse, and you will hear them start to explore. If you let go of the right button, or move too far away, they will calm down and wander around again. Their trails never disappear, so the longer you watch, the more of the screen they eat. Turn your sound on. It makes interesting sounds.

---

## BAWAF: Atlas Entry

### Scientific Name

BAWAF

### Found by / at

Dr. Nailong, 6:07 AM, on a lab server that would not shut down.

### Family

Codeater. A group of tiny creatures that can only live inside computers that are turned on. BAWAF is the only one that people have seen moving on a screen.

### Where it lives

The dark space behind the screen, where the memory is full of code that nobody uses anymore. It likes computers that are left on all night.

### What it looks like

A few tiny red dots that never stop moving. Up close, a BAWAF looks like a small group of shaking red dots. Everywhere it goes, it leaves a red trail that never fades. The trail is a record of all the code it has already eaten.

### Main features

- Eats code.
- Leaves a red trail that never goes away.
- Splits quickly when you click it.
- Likes to follow the mouse.

### What we know so far

People first noticed BAWAF as a strange red mark on a black test screen. At first, the engineers thought it was just a broken pixel, until it started to move. After that, researchers found out that BAWAF lives inside the computer and stays alive by eating code. The flashing numbers in the background are its food. Every step it takes, it eats a little more, and the red trail is all that is left of that code. Restarting the computer does not kill it. BAWAF is not dangerous, but it is curious. It seems to think the mouse is another living thing, and it will gather around the mouse when you call it. Some people say they can hear it: a low hum when it is resting, and a different sound when it starts to chase.

[[IMAGE 2]]

---

## 1) Process: Design and Composition

### The idea

At the beginning, I was just playing around with p5.js. I was learning how to make a small ball move randomly, and I wrote a very simple program for it. Then, by accident, I deleted `background(0)` from `draw()`, and the ball's trail showed up on the screen. The trail looked really nice. After that, I made the ball's size a random number between 1 and 4, and the whole shape became smoother, more abstract, and really beautiful. So I decided to use this for my Project A.

Later, I made up a story for these trails: BAWAF, a tiny creature that lives inside the computer, eats code, and leaves a red trail behind.

[[IMAGE 3]]

### How it looks

- **Black background and gray numbers.** The background is a grid of random numbers (0–9) that change every frame. This idea came from Ryoji Ikeda's *data.tron*, which I saw at a museum by the river in Xuhui (West Bund), Shanghai. That work turns a huge amount of data about space and tiny particles into 0s and 1s. The numbers flow and fill the whole screen, so you can see data that is normally invisible, and you can feel the hidden order of the digital world. In my project, the numbers are the creature's food. Their brightness slowly goes up and down (I used `noise()` for this), so the screen feels alive even when nothing else is moving.
- **Red creature, red trail.** Red is the only real color on the screen, so your eyes can always find the creature. Every dot it draws stays on the screen forever. I like the idea that the trail is "what is left of the code it ate". The longer you watch, the more of the screen gets eaten.
- **Changing red.** In the last version, the trail color slowly changes between dark red and bright red (also with `noise()`). Because of this, the trail has layers, and you can kind of tell *when* each part was drawn. Old and new paths look different.
- **Black-and-white page.** I have always liked a black, dark, and simple look. Most of my works are in this style, and this one is the same.

### How you interact with it

- **Left-click anywhere:** a new BAWAF shows up where you clicked. *(It is pulled up from deep inside the code.)*
- **Hold the right mouse button near BAWAFs (within 100 pixels):** they slowly move toward the mouse, and an "exploring" sound starts. *(BAWAF is curious and thinks the mouse is another living thing.)*
- **Let go or move away:** they go back to wandering around, and the exploring sound fades out. *(They calm down.)*

There are two sounds. One is a low hum that always plays in a loop (the creature is resting). The other one only plays while you are calling them (the creature is chasing).

[[IMAGE 4]]

### What I tried and what changed

**Version 1: left-click + holding M.**
At first, I used the left mouse button to make new creatures, and you had to hold the **M key** while dragging to move them. But this did not feel natural. You need both hands, and holding a key while moving the mouse is awkward.

**Version 2: creatures show up near the mouse.**
Then I tried making creatures show up when the mouse got close to them, and you could drag them by holding the mouse button. But this made the code more complicated. It was also hard to control how many creatures showed up and where. (In one version, clicking on a creature split it into three, but each dot is only 1–2 pixels big, so it was really hard to click on one.)

**Version 3: left button makes, right button calls.**
So in the end, I used the left mouse button to make new creatures and the right mouse button to drag them. This way, everything is on the mouse, and each button does one clear thing. But this caused another problem: right-clicking opened the browser's right-click menu (the fix is in the technical part).

**Version 4: trails and numbers.**
This was the biggest change in how the project looks. Before this, the creature was drawn straight onto the canvas without clearing it, so its path stayed. But I could not add a moving background without covering everything. I moved the creature's drawing onto a separate layer (explained in the technical part), so I could redraw the number background every frame and still keep the trail on top.

**Version 5: sound.**
I added two pieces of music. Both of them are original. I made them myself, just for this creature.

**Version 6: changing trail color.**
Finally, I used `noise()` to make the trail's red change over time, instead of always being the same `(255, 0, 0)`.

### What I think is special about it

I think the most interesting part is that you can barely see BAWAF's "body". The creature itself is just a few pixels, but the path it leaves becomes the artwork. Everyone who plays with it ends up with a different picture, depending on where they clicked and where they called the creatures. In a way, the person and the creature make the picture together.

[[IMAGE 5]]

---

## 2) Process: Technical

### How it works, in short

**Background:** I used a `for` loop to make the grid of numbers, and `noise()` to control how bright the numbers are.

**Creature:** Each BAWAF is just one position (an x and a y). In every frame, I draw one small red circle at that position, and its size is a random number between 1 and `maxSize`. The circle is drawn on the trail layer, which is never cleared, so the circles from every frame pile up. The position moves a little every frame and the size keeps changing, so these circles connect into a rough, shaky line. This line is what you see as the creature and its trail. So the creature is not one shape that I draw. It is the marks left by a moving point.

I used `noise()` to change the color, and arrays to make lots of creatures. I used `if` statements to give the creatures two kinds of movement. The first kind follows the mouse, and the second kind moves randomly around the screen.

### What I was able to do and learn

- **`createGraphics()`.** The first main thing I used was `createGraphics()`. It let me draw the creatures and the background separately, and it worked really well.
- **Arrays.** The second main thing was arrays, which I learned in Interaction Lab. This was really useful because I knew I would add more creatures later. For example, I could use `push()` to add a new creature where the mouse is when you left-click.
- **`lerp()`.** The third thing I learned was `lerp()`. It made it easy to make the creatures chase the mouse, and I could also easily change how fast they move.

### How the code is organized

The code is in `sketch.js` and it is about 100 lines long. This is how the parts connect:

```
setup()
 ├─ createCanvas(800, 500) + turn off the right-click menu
 ├─ trail = createGraphics(800, 500)      ← a separate layer for the trails
 ├─ put 4 BAWAFs on the screen, one in each corner area
 └─ loadMusic()  (loads in the background)  ← loads BG.mp3 + Explor.mp3

draw()  (every frame)
 ├─ background(0)            ← clear the main canvas
 ├─ drawNumbers()            ← redraw the random numbers
 ├─ drawCreature(100, 2)     ← move every BAWAF and draw a dot on the trail layer
 ├─ image(trail, 0, 0)       ← put the trail layer on top of the numbers
 └─ updateSound()            ← start or fade out the "exploring" sound

mousePressed()
 ├─ userStartAudio()         ← browsers only play sound after a click
 └─ left button → add a new BAWAF where the mouse is
```

### Keeping track of the creatures

Every BAWAF is just one point. I keep all of them in two arrays, one for x and one for y:

```js
let ballX = [];
let ballY = [];

ballX[1] = random(20, 380);  ballY[1] = random(20, 230);   // top-left
ballX[2] = random(420, 780); ballY[2] = random(20, 230);   // top-right
ballX[3] = random(20, 380);  ballY[3] = random(270, 480);  // bottom-left
ballX[4] = random(420, 780); ballY[4] = random(270, 480);  // bottom-right
```

The four starting creatures are put in four different areas, so the trails spread over the whole canvas instead of all starting in one place. To add a creature, I just push a new x and y:

```js
function mousePressed() {
    userStartAudio();
    if (mouseButton.left) {
        ballX.push(mouseX);
        ballY.push(mouseY);
    }
}
```

### Movement: wandering and following

Every frame, each creature checks two things: is the right mouse button held down, and is the mouse closer than `range` (100 pixels)? If yes, it moves 4% of the way toward the mouse with `lerp()`. If not, it shakes randomly by up to 2 pixels in each direction.

```js
for (let i = 1; i < ballX.length; i++) {
    if (mouseIsPressed && mouseButton.right &&
        dist(mouseX, mouseY, ballX[i], ballY[i]) < range) {
        ballX[i] = lerp(ballX[i], mouseX, 0.04);   // follow
        ballY[i] = lerp(ballY[i], mouseY, 0.04);
    } else {
        ballX[i] += random(-2, 2);                 // wander
        ballY[i] += random(-2, 2);
    }
    ...
}
```

`lerp` moves a *percentage* of the distance that is left, so the creatures move fast when they are far from the mouse and slow down when they get close. This makes them look like they are gathering around the mouse, not jumping onto it. I first used `0.02`, but it felt too slow, so I changed it to `0.04`.

The random shaking is also what makes the creature look like it is "trembling". The dot size is random too (`random(1, maxSize)`), so the trail looks rough and natural, not like a clean line.

### The trail layer (the most important part)

This was the first problem I ran into. My creature needed to leave marks on the screen, so I could not use `background()` to clear the screen in every `draw()`. But my background needed to be redrawn every time. So I wanted two things that seemed to fight each other:

1. The background numbers should change **every frame**, so I need to clear the screen with `background(0)` every frame.
2. The trail should **never** disappear, so I can't clear it.

The answer was `createGraphics()`. It makes a second, invisible canvas. The creature draws its dots on this layer (`trail.circle(...)` instead of `circle(...)`), and this layer is never cleared. Every frame, I clear the main canvas, draw the numbers, and then put the whole trail layer on top with `image(trail, 0, 0)`.

```js
function draw() {
    background(0);
    drawNumbers();
    drawCreature(100, 2);
    image(trail, 0, 0);
    updateSound();
}
```

```js
let red = noise(millis() * 0.001) * 255;
trail.fill(red, 0, 0);
trail.noStroke();
trail.circle(ballX[i], ballY[i], random(1, maxSize));
```

The red value comes from `noise()`, using time as the input, so it changes smoothly between dark and bright red instead of jumping around.

[[IMAGE 6]]

### The number background

```js
function drawNumbers() {
    let numAlpha = noise(millis() * 0.0005) * 200;
    fill(100, numAlpha);
    noStroke();
    textSize(14);
    for (let x = 0; x < 100; x++) {
        for (let y = 0; y < 50; y++) {
            text(floor(random(10)), x * 8, y * 11);
        }
    }
}
```

Two loops, one inside the other, draw a grid of 100 × 50 random numbers. The numbers are picked again with `random()` every frame, so they flash. The brightness uses `noise()` at a slower speed (`0.0005`), so the whole background slowly fades in and out.

### Sound

`updateSound()` runs every frame and controls the "exploring" sound:

```js
function updateSound() {
    if (!epMusic) {
        return;                       // the sound is not loaded yet
    }
    if (mouseIsPressed && mouseButton.right) {
        if (!epMusic.isPlaying()) {
            epMusic.play();
        }
        epVolume = 1;                 // full volume right away
    } else if (epMusic.isPlaying()) {
        epVolume -= 0.02;             // turn it down a little every frame
        if (epVolume <= 0) {
            epVolume = 0;
            epMusic.stop();
        }
    }
    epMusic.amp(epVolume, 0.05);
}
```

When you press the right button, the sound starts at full volume. When you let go, the volume goes down by 0.02 every frame, so it takes about 50 frames (less than a second) to fade out, and then it stops. I made it start fast but end slowly, so it feels like the creature is calming down, not like the sound is suddenly cut off.

### Problems I ran into and how I fixed them

**1. The sound would not load in p5.js 2.x.**
My first version loaded the sounds in `preload()`, like most tutorials do. But the template uses p5.js **2.x**, and in 2.x `preload()` does not work like this anymore, so the sound never loaded. In p5 2.x, loading functions give back a Promise, so I changed `setup()` to `async function setup()` and used `await loadSound(...)`.

**2. The canvas stayed empty while the music loaded.**
After that fix, a new problem showed up. `setup()` was waiting for the music to load (the background music is about 4 MB), so the creatures did not show up until the music was done loading. To fix this, I moved the loading into its own `async` function, `loadMusic()`, and `setup()` calls it *without* waiting for it. Both files load at the same time with `Promise.all`. The creatures start moving right away, and `updateSound()` just does nothing (`if (!epMusic) return;`) until the sound is ready.

```js
async function loadMusic() {
    let sounds = await Promise.all([
        loadSound('assets/BG.mp3'),
        loadSound('assets/Explor.mp3')
    ]);
    bgMusic = sounds[0];
    bgMusic.loop(true);
    bgMusic.play();
    epMusic = sounds[1];
    epMusic.loop(true);
}
```

**3. Browsers block sound at the start.**
Chrome does not let a web page play sound before the user does something on the page. I added `userStartAudio()` inside `mousePressed()`, so the first click "unlocks" the sound. Because of this, the background hum only starts after the first click. That is why the page tells people to turn their sound on and click.

**4. Mouse buttons work differently in p5.js 2.x.**
In p5 1.x you write `mouseButton === RIGHT`. In 2.x, `mouseButton` is an object, so you have to write `mouseButton.right` / `mouseButton.left`. My right-click code did not work until I found this out.

**5. Right-click opened the browser menu.**
After I chose the right mouse button for dragging the creatures, right-clicking opened the browser's menu, which covered the canvas. I asked AI about this and learned this line of code, which turns the menu off only on the canvas:

```js
canvas.elt.oncontextmenu = () => false;
```

**6. The code got stuck in a loop when creatures split (early version).**
When a creature split, I added three new creatures to the array **while I was still looping through that same array**. The loop then checked the new creatures too, and because they were right next to the mouse, they split as well, again and again. I fixed it by stopping the loop after the first split (first with a `found` variable, later with `break`). In the end, I took out splitting completely, for the design reasons above.

### Compromises

My biggest compromise is that the creatures' trails are fixed in place, so they cannot change after they are drawn. I wanted the whole trail to look like it was moving, for example flashing or "breathing". But I did not know how to make these trails move, and maybe it is just not possible with the way I built it. I am pretty happy with the other parts of the project.

---

## 3) Reflection and Future Development

### Reflection

One thing I can improve is the interaction. I noticed that a lot of people drag the creatures really fast, so the creatures cannot keep up. Once the mouse is more than 100 pixels away, the creatures stop following. Also, in the first few versions, a creature only split when you clicked right on the moving creature, and many people did not know how to interact with it. In the final version, I took out this rule and changed it so you can click anywhere. So, besides the trails not being able to move, the interaction also needs to get better.

[[IMAGE 7]]

### Future development

- **Moving trails.** I wanted the creatures' trails to move too, but I have not found a way yet, because the trails are fixed once they are drawn on the trail layer. One idea is to save every trail point in an array instead of drawing it only once, so I can move and redraw the points every frame. But I would need to limit how many points I save, or the sketch would get slow.
- Rewrite BAWAF as a **class**, so each one can have its own personality: some faster, some shy (moving *away* from the mouse), some hungrier.
- Make the creatures really **eat the numbers**: the numbers under a BAWAF's path could disappear or turn red, so the food and the trail are connected in the picture, not only in the story.
- Make the sound **change with how many creatures are following** (louder or higher when the group is bigger), instead of just on and off.
- Add a slow fade or a "restart the computer" button, so the screen does not stay all red forever.

---

## 4) Credits & References

**Technical help**

- p5.js reference: `createGraphics()`: https://p5js.org/reference/p5/createGraphics/
- p5.js reference: `noise()`: https://p5js.org/reference/p5/noise/
- p5.js reference: `lerp()`: https://p5js.org/reference/p5/lerp/
- p5.js reference: `mouseButton`: https://p5js.org/reference/p5/mouseButton/
- p5.sound reference: `loadSound()`, `userStartAudio()`: https://p5js.org/reference/p5.sound/
- AI help: I asked AI how to stop the browser's right-click menu from opening on the canvas (`canvas.elt.oncontextmenu = () => false;`). *(Name the tool you used, and add anything else you used it for.)*
- *(Add any tutorials or videos you watched.)*

**Audio**

- `BG.mp3` (background hum) and `Explor.mp3` (exploring sound): original music, made by me for BAWAF.

**Inspiration**

- Ryoji Ikeda, *data.tron*: a work with sound and images that turns data about space and tiny particles into flowing 0s and 1s. I saw it at a museum by the river in Xuhui (West Bund), Shanghai, and it gave me the idea for the number background. https://www.ryojiikeda.com/
