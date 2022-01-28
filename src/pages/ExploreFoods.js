import React from 'react';

export default function ExploreFoods() {
  return (
    <div>
      <button type="button" data-testid="explore-by-ingredient">By Ingridient</button>
      <button type="button" data-testid="explore-by-nationality">By Nationality</button>
      <button type="button" data-testid="explore-surprise">Surprise me!</button>
    </div>
  );
}
