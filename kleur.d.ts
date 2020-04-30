// Originally by: Rogier Schouten <https://github.com/rogierschouten>
// Adapted by: Madhav Varshney <https://github.com/madhavarshney>
declare namespace kleur {
	interface Color {
		(x: string | number): string;
		(): Kleur;
	}

	interface Kleur {
		// Colors
		black: Color;
		blackBright: Color;
		red: Color;
		redBright: Color;
		green: Color;
		greenBright: Color;
		yellow: Color;
		yellowBright: Color;
		blue: Color;
		blueBright: Color;
		magenta: Color;
		magentaBright: Color;
		cyan: Color;
		cyanBright: Color;
		white: Color;
		whiteBright: Color;
		gray: Color;
		grey: Color;

		// Backgrounds
		bgBlack: Color;
		bgBlackBright: Color;
		bgRed: Color;
		bgRedBright: Color;
		bgGreen: Color;
		bgGreenBright: Color;
		bgYellow: Color;
		bgYellowBright: Color;
		bgBlue: Color;
		bgBlueBright: Color;
		bgMagenta: Color;
		bgMagentaBright: Color;
		bgCyan: Color;
		bgCyanBright: Color;
		bgWhite: Color;
		bgWhiteBright: Color;

		// Modifiers
		reset: Color;
		bold: Color;
		dim: Color;
		italic: Color;
		underline: Color;
		inverse: Color;
		hidden: Color;
		strikethrough: Color;
	}
}

declare let kleur: kleur.Kleur & { enabled: boolean };
export = kleur;
