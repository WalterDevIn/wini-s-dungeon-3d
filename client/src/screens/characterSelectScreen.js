const raceLabels = Object.freeze({
  human: 'Humano',
});

const classLabels = Object.freeze({
  warrior: 'Guerrero',
});

function getCharacterKindLabel(character) {
  const race = raceLabels[character.race] || character.race;
  const characterClass = classLabels[character.class] || character.class;

  return `${race} ${characterClass}`;
}

export function createCharacterSelectScreen(character) {
  const screen = document.createElement('section');
  screen.style.display = 'grid';
  screen.style.gap = '12px';
  screen.style.maxWidth = '360px';
  screen.style.margin = '48px auto';
  screen.style.fontFamily = 'system-ui, sans-serif';

  const title = document.createElement('h1');
  title.textContent = 'Personaje listo';
  title.style.margin = '0';

  const kind = document.createElement('p');
  kind.textContent = getCharacterKindLabel(character);
  kind.style.margin = '0';

  const name = document.createElement('p');
  name.textContent = `Nombre: ${character.name}`;
  name.style.margin = '0';

  const note = document.createElement('p');
  note.textContent = 'Entrada a la mazmorra pendiente para el próximo hito.';
  note.style.margin = '0';

  screen.append(title, kind, name, note);

  return screen;
}
