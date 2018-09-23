class Identicon extends React.Component {
  static defaultProps = {
    colors: [
      '#00c29e',
      '#00c1ff',
      '#ffe39f',
      '#042337',
      '#ffb653',
      '#cf5061',
    ],
    circles: 20,
    name: 'plop',
    size: 150,
  }

  componentDidMount() {
    this.drawCanvas();
  }

  getRelativeNumber(num, inMax, outMax) {
    return Math.round((num / inMax) * outMax);
  }

  getStringHashCode(text) {
    var hash = 0, i, chr;
    for (i = 0, l = text.length; i < l; i++) {
      chr   = text.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0;
    }
    return Math.abs(hash);
  }

  getValuesArray(hash, maxValue) {
    return String(hash)
      .split('')
      .map((char, i, arr) => {
        let next = i === arr.length - 1 ? arr[0] : i,
            num = parseInt(String(char) + next, 10);
        return this.getRelativeNumber(num, 99, maxValue)
      })
  }

  drawCanvas() {
    const { colors, circles, name, size } = this.props,
          halfSize = Math.round(size/2),
          hashedName = this.getStringHashCode(name),
          colorsArray = this.getValuesArray(hashedName, colors.length);

    let drawedCirclesCounter = circles;

    ctx = this.canvas.getContext('2d');

    // Constrain canvas to round form;
    ctx.beginPath();
    ctx.arc(halfSize, halfSize, halfSize, 0, Math.PI * 2, true);
    ctx.clip();

    // Draw circles;
    while(drawedCirclesCounter) {
      const circleSize = (size/circles) * drawedCirclesCounter;
      ctx.beginPath();
      ctx.fillStyle = colors[colorsArray[this.getRelativeNumber(drawedCirclesCounter, circles, colors.length)]];
      ctx.arc(halfSize, halfSize, circleSize/2, 0, Math.PI * 2, true);
      ctx.fill();
      drawedCirclesCounter -= 1;
    }
  }

  render() {
    const { size } = this.props;
    return (
      <canvas
        width={size}
        height={size}
        ref={el => this.canvas = el}
      />
    )
  }
}
