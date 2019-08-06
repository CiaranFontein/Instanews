# Instanews
Responsive site using javascript and a news API

## Features

### New York Times API

Images and abstracts come from the New York Times website. Clicking a grid cell will bring users to the article.

### Responsive Design

Mobile first design, tablet second, and desktop third. Most changes are seen when comparing mobile and tablet resolutions
(having the display wider than 600px). Most disinguishable change is the number of columns going from 1 on mobile, to 
3 on tablet, to 4 on desktop.

### CSS Animations

Smooth transitions of some elements positions and scales when the user selects an article.

## Stretch Goals

### Robotic Voice Reading with Accent Options

To make the site accessible and considering users who cannot read but only understand certain robotic accents I made it so that 
if a user hovers their mouse over an article their browser will start reading the abstract in a robot voice with the accent
of their choosing. The accent selector is only visible on desktop because other formats have limited space and I did not want
to take up too much valuable screen real estate with this niche feature.

### Other Design Choices

The blue arrows on the selection menu clashed so I have mine as black and white to match the theme. The abstracts are
visible all the time on mobile and tablet but on desktop there are some mouse hovering animations. When a cell is 
hovered over it grows slightly and a shadow is put around it so it looks like it pops out infront of the other cells.
Rounded corners are also added on hover because I thought it looked cool the way they animated. The tricky part was also
animating the text-box on the cell to have the same size rounded corners (but only on the bottim and animation time so it 
looked like a single unit (text-box and cell).
