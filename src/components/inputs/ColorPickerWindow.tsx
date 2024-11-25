interface ColorButtonProps {
  hue?: string;
  accent: string;
  topRow: boolean;
}

const hues = [
  "pink",
  "red",
  "deep-orange",
  "orange",
  "amber",
  "yellow",
  "lime",
  "light-green",
  "green",
  "teal",
  "cyan",
  "light-blue",
  "blue",
  "indigo",
  "deep-purple",
  "purple",
  "blue-grey",
  "grey",
  "brown",
];
const accents = [
  "",
  "darken-4",
  "darken-3",
  "darken-2",
  "darken-1",
  "lighten-1",
  "lighten-2",
  "lighten-3",
  "lighten-4",
  "lighten-5",
];

function ColorPickerWindow() {
  return (
    <div className="color-window z-depth-2">
      <div>
        {accents.map((accent, index) => (
          <ColorPickerRow
            accent={accent}
            topRow={index === 0}
            key={accent}
          ></ColorPickerRow>
        ))}
      </div>
    </div>
  );
}

function ColorPickerRow(props: ColorButtonProps) {
  return (
    <>
      {hues.map((hue) => (
        <ColorButton
          hue={hue}
          accent={props.accent}
          topRow={props.topRow}
          key={`${hue}-${props.accent}`}
        ></ColorButton>
      ))}
    </>
  );
}

function ColorButton(props: ColorButtonProps) {
  let className = "plain clickable trigger-clickaway";
  if (props.hue) {
    className += ` ${props.hue}`;
  }
  if (props.accent) {
    className += ` ${props.accent}`;
  }
  if (props.topRow) {
    className += " top-row";
  }
  return <button className={className}></button>;
}

export default ColorPickerWindow;
